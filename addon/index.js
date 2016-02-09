import Ember from 'ember';
import { isGeneratorIterator, Arguments } from 'ember-concurrency/utils';
import {
  _makeIteration,
  dropIntermediateValues,
  _dropIntermediateValues,
  keepFirstIntermediateValue,
  keepLastIntermediateValue,
  _keepLastIntermediateValue,
  restartable,
  _restartable,
  _enqueue,
} from 'ember-concurrency/iteration';
import { _makeIterator } from 'ember-concurrency/iterators';

export {
  dropIntermediateValues,
  keepFirstIntermediateValue,
  keepLastIntermediateValue,
  restartable
};

let testGenFn = function * () {};
let testIter = testGenFn();
Ember.assert(`ember-concurrency requires that you set babel.includePolyfill to true in your ember-cli-build.js (or Brocfile.js) to ensure that the generator function* syntax is properly transpiled, e.g.:

  var app = new EmberApp({
    babel: {
      includePolyfill: true,
    }
  });`, isGeneratorIterator(testIter));


const ComputedProperty = Ember.__loader.require("ember-metal/computed").ComputedProperty;

function TaskProperty(taskFunc) {
  let tp = this;
  ComputedProperty.call(this, function() {
    let presubscribeQueue;
    let publish = (v) => {
      presubscribeQueue = presubscribeQueue || [];
      presubscribeQueue.push(v);
    };

    // TODO: we really need a subject/buffer primitive
    let obs = createObservable(_publish => {
      publish = _publish;
      for (let i = 0; i < presubscribeQueue.length; i++) {
        _publish(presubscribeQueue[i]);
      }
    });

    forEach(obs, taskFunc, tp.bufferPolicy).attach(this);

    let perform = function(...args) {
      let argsObject = new Arguments(args);
      argsObject.defer = Ember.RSVP.defer();
      publish(argsObject);
      return argsObject.defer.promise;
    };

    let task = {
      perform: perform,
      _perform(...args) {
        publish(new Arguments(args));
      },
    };

    return task;
  });

  this.bufferPolicy = null;
  this.eventNames = null;
}

TaskProperty.prototype = Object.create(ComputedProperty.prototype);
TaskProperty.prototype.constructor = TaskProperty;
TaskProperty.prototype.setup = function(obj, keyname) {
  let eventNames = this.eventNames;
  if (eventNames) {
    for (let i = 0; i < eventNames.length; ++i) {
      let eventName = eventNames[i];
      Ember.addListener(obj, eventName, null, makeListener(keyname));
    }
  }
};

TaskProperty.prototype.on = function() {
  this.eventNames = this.eventNames || [];
  this.eventNames.push.apply(this.eventNames, arguments);
  return this;
};

TaskProperty.prototype.restartable = function() {
  this.bufferPolicy = _restartable;
  return this;
};

TaskProperty.prototype.enqueue = function() {
  this.bufferPolicy = _enqueue;
  return this;
};

TaskProperty.prototype.drop = function() {
  this.bufferPolicy = _dropIntermediateValues;
  return this;
};

TaskProperty.prototype.keepLatest = function() {
  this.bufferPolicy = _keepLastIntermediateValue;
  return this;
};

export function task(func) {
  return new TaskProperty(func);
}

function makeListener(taskName) {
  return function() {
    let task = this.get(taskName);
    task._perform.apply(task, arguments);
  };
}

export function DidNotRunException() {
  this.success = false;
  this.reason = "unperformable";
}

let EventedObservable = Ember.Object.extend({
  obj: null,
  eventName: null,

  subscribe(onNext) {
    let obj = this.obj;
    let eventName = this.eventName;
    obj.on(eventName, onNext);

    let isDisposed = false;
    return {
      dispose: () => {
        if (isDisposed) { return; }
        isDisposed = true;
        obj.off(eventName, onNext);
      }
    };
  },
});

Ember.Evented.reopen({
  on() {
    if (arguments.length === 1) {
      return EventedObservable.create({ obj: this, eventName: arguments[0] });
    } else {
      return this._super.apply(this, arguments);
    }
  },
});

function cleanupOnDestroy(owner, object, cleanupMethodName) {
  // TODO: find a non-mutate-y, hacky way of doing this.
  if (!owner.willDestroy.__ember_processes_destroyers__) {
    let oldWillDestroy = owner.willDestroy;
    let disposers = [];

    owner.willDestroy = function() {
      for (let i = 0, l = disposers.length; i < l; i ++) {
        disposers[i]();
      }
      oldWillDestroy.apply(owner, arguments);
    };
    owner.willDestroy.__ember_processes_destroyers__ = disposers;
  }

  owner.willDestroy.__ember_processes_destroyers__.push(() => {
    object[cleanupMethodName]();
  });
}

export function createObservable(fn) {
  return {
    subscribe(onNext, onError, onCompleted) {
      let isDisposed = false;
      let publish = (v) => {
        if (isDisposed) { return; }
        joinAndSchedule(null, onNext, v);
      };
      publish.error = (e) => {
        if (isDisposed) { return; }
        joinAndSchedule(() => {
          if (onError) { onError(e); }
          if (onCompleted) { onCompleted(); }
        });
      };
      // TODO: publish.complete?

      let maybeDisposer = fn(publish);
      let disposer = typeof maybeDisposer === 'function' ? maybeDisposer : Ember.K;

      return {
        dispose() {
          if (isDisposed) { return; }
          isDisposed = true;
          disposer();
        },
      };
    },
  };
}

export let _numIntervals = 0;
export function interval(ms) {
  return createObservable(publish => {
    let intervalId = setInterval(publish, ms);
    _numIntervals++;
    return () => {
      clearInterval(intervalId);
      _numIntervals--;
    };
  });
}

export function sleep(ms) {
  return interval(ms);
}

export function timeout(ms) {
  return interval(ms);
}

function log() { }

export function forEach(iterable, fn, bufferPolicy) {
  let owner;
  Ember.run.schedule('actions', () => {
    if (!owner) {
      throw new Error("You must call forEach(...).attach(this) if you're using forEach outside of a generator function");
    }
  });

  return {
    attach(_owner) {
      owner = _owner;
      this.iteration = start(owner, iterable, fn, bufferPolicy);
      cleanupOnDestroy(owner, this, '_disposeIter');
    },
    _disposeIter() {
      log("HOST: host object destroyed, disposing of source iteration", this.iteration);
      this.iteration.break(-1);
    },
  };
}

const EMPTY_ARRAY = [];

function start(owner, sourceIterable, iterationHandlerFn, bufferPolicy) {
  log("SOURCE: Starting forEach with", owner, sourceIterable, iterationHandlerFn);

  let sourceIterator = _makeIterator(sourceIterable, owner, EMPTY_ARRAY);
  let sourceIteration = _makeIteration(sourceIterator, null, bufferPolicy, (si) => {
    log("SOURCE: next value ", si);

    if (si.done) {
      log("SOURCE: iteration done", si);
      return;
    }

    let opsIterator = _makeIterator(iterationHandlerFn, owner, [si.value /*, control */]);
    let opsIteration = _makeIteration(opsIterator, sourceIteration, bufferPolicy, oi => {
      let { value, done, index } = oi ;

      log("OPS: next value", oi);

      let observable = normalizeObservable(value);
      if (observable) {
        let disposable = observable.subscribe(v => {
          if (done) {
            maybeResolveInvocationPromise(si.value, v);
            sourceIteration.step(si.index);
          } else {
            opsIteration.step(index, v);
          }
        }, error => {
          maybeResolveInvocationPromise(si.value, Ember.RSVP.reject(error));
          sourceIteration.step(si.index); // throw? break? return?
        }, () => {
          // TODO: test me
          //opsIterator.proceed(index, NEXT, null); // replace with "no value" token?
        });
        opsIteration.registerDisposable(index, disposable);
      } else {
        if (done) {
          maybeResolveInvocationPromise(si.value, value);
          sourceIteration.step(si.index);
        } else {
          opsIteration.step(index, value);
        }
      }
    });

    sourceIteration.registerDisposable(si.index, {
      dispose() {
        // so this needs to be modified. it's a disposable that needs to be
        // disposed when t
        opsIteration.break(-1);
      },
    }, (sourceIterator.policy && sourceIterator.policy.concurrent));

    opsIteration.label = "ops";
    log("OPS: starting execution", opsIteration);

    opsIteration.step(0, undefined);
  });

  log("SOURCE: starting iteration", sourceIteration);
  sourceIteration.label = "source";
  sourceIteration.step(0, undefined);

  return sourceIteration;
}

function maybeResolveInvocationPromise(value, resolveValue) {
  if (value instanceof Arguments) {
    value.resolve(resolveValue);
  }
}

function normalizeObservable(value) {
  if (value && typeof value.then === 'function') {
    return createObservable(publish => {
      value.then(publish, publish.error);
    });
  } else if (value && typeof value.subscribe === 'function') {
    // TODO: check for scheduler interface for Rx rather than
    // creating another wrapping observable to schedule on run loop.
    return createObservable(publish => {
      return value.subscribe(publish, publish.error).dispose;
    });
  } else {
    return null;
  }
}

function joinAndSchedule(...args) {
  Ember.run.join(() => {
    Ember.run.schedule('actions', ...args);
  });
}

