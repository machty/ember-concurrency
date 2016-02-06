import Ember from 'ember';
import { isGeneratorIterator, Arguments } from 'ember-concurrency/utils';
import {
  _makeIteration,
  dropIntermediateValues,
  keepFirstIntermediateValue,
  keepLastIntermediateValue,
  restartable,
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

export function task(func) {
  let cp = Ember.computed(function() {
    let publish;

    // TODO: we really need a subject/buffer primitive
    let obs = createObservable(_publish => {
      publish = _publish;
    });

    forEach(obs, func).attach(this);
    let task = {
      perform(...args) {
        publish(new Arguments(args));
      },
      _perform(...args) {
        publish(new Arguments(args));
      },
    };

    return task;
  });

  let eventNames;
  cp.setup = function(obj, keyname) {
    if (eventNames) {
      for (let i = 0; i < eventNames.length; ++i) {
        let eventName = eventNames[i];
        Ember.addListener(obj, eventName, null, makeListener(keyname));
      }
    }
  };

  cp.on = function() {
    eventNames = eventNames || [];
    eventNames.push.apply(eventNames, arguments);
    return this;
  };

  return cp;
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
    subscribe(onNext) {
      let isDisposed = false;
      let publish = (v) => {
        if (isDisposed) { return; }
        onNext(v);
      };
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

function log(...args) {
  //console.log(...args);
}

export function forEach(iterable, fn) {
  let owner;
  Ember.run.schedule('actions', () => {
    if (!owner) {
      throw new Error("You must call forEach(...).attach(this) if you're using forEach outside of a generator function");
    }
  });

  return {
    attach(_owner) {
      owner = _owner;
      this.iteration = start(owner, iterable, fn);
      cleanupOnDestroy(owner, this, '_disposeIter');
    },
    _disposeIter() {
      log("HOST: host object destroyed, disposing of source iteration", this.iteration);
      this.iteration.break(-1);
    },
  };
}

const EMPTY_ARRAY = [];

function start(owner, sourceIterable, iterationHandlerFn) {
  log("SOURCE: Starting forEach with", owner, sourceIterable, iterationHandlerFn);

  let sourceIterator = _makeIterator(sourceIterable, owner, EMPTY_ARRAY);
  let sourceIteration = _makeIteration(sourceIterator, null, (si) => {
    log("SOURCE: next value ", si);

    if (si.done) {
      log("SOURCE: iteration done", si);
      return;
    }

    let opsIterator = _makeIterator(iterationHandlerFn, owner, [si.value /*, control */]);
    let opsIteration = _makeIteration(opsIterator, sourceIteration, oi => {
      let { value, done, index } = oi ;
      let disposable;

      log("OPS: next value", oi);

      if (done) {
        // unlike array iterators, "process" iterators can "return" values,
        // and we still want to block on those values before full returning.
        if (!value) {
          sourceIteration.step(si.index);
          return;
        }
      }

      if (value && typeof value.then === 'function') {
        value.then(v => {
          joinAndSchedule(opsIteration, 'step', index, v);
        }, error => {
          //opsIterator.proceed(index, THROW, error);
        });
      } else if (value && typeof value.subscribe === 'function') {
        disposable = value.subscribe(v => {
          joinAndSchedule(opsIteration, 'step', index, v);
        }, error => {
          //opsIterator.proceed(index, THROW, error);
        }, () => {
          //opsIterator.proceed(index, NEXT, null); // replace with "no value" token?
        });
        opsIteration.registerDisposable(index, disposable);
      } else {
        opsIteration.step(index, value);
      }
    });

    sourceIteration.registerDisposable(si.index, {
      dispose() {
        opsIteration.break(-1);
      },
    });

    opsIteration.label = "ops";
    log("OPS: starting execution", opsIteration);

    //sourceIterator.registerDisposable(sourceIteration.index, opsIterator);
    opsIteration.step(0, undefined);
  });

  log("SOURCE: starting iteration", sourceIteration);
  sourceIteration.label = "source";
  sourceIteration.step(0, undefined);

  return sourceIteration;
}

function joinAndSchedule(...args) {
  Ember.run.join(() => {
    Ember.run.schedule('actions', ...args);
  });
}

