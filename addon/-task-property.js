import Ember from 'ember';

import {
  _makeIteration,
  _dropIntermediateValues,
  _keepLastIntermediateValue,
  _restartable,
  _enqueue,
} from './iteration';
import { _makeIterator } from './iterators';
import { Arguments, createObservable } from './utils';

const ComputedProperty = Ember.__loader.require("ember-metal/computed").ComputedProperty;
const { computed } = Ember;

const TaskHandle = Ember.Object.extend({
  loopHandle: null,
  concurrency: computed.oneWay('loopHandle.concurrency'),
  isIdle: computed.equal('concurrency', 0),
});

export function TaskProperty(taskFunc) {
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
      if (!presubscribeQueue) { return; }
      for (let i = 0; i < presubscribeQueue.length; i++) {
        _publish(presubscribeQueue[i]);
      }
    });

    let loopHandle = forEach(obs, taskFunc, tp.bufferPolicy).attach(this);

    let perform = function(...args) {
      let argsObject = new Arguments(args);
      argsObject.defer = Ember.RSVP.defer();
      publish(argsObject);
      return argsObject.defer.promise;
    };

    return TaskHandle.create({
      perform: perform,
      _perform(...args) {
        publish(new Arguments(args));
      },
      loopHandle,
    });
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

function makeListener(taskName) {
  return function() {
    let task = this.get(taskName);
    task._perform.apply(task, arguments);
  };
}

function log() { }

let LoopHandle = Ember.Object.extend({
  init() {
    this._super();

    Ember.run.schedule('actions', () => {
      if (!this.owner) {
        throw new Error("You must call forEach(...).attach(this) if you're using forEach outside of a generator function");
      }
    });
  },

  owner: null,
  iteration: null,
  iterable: null,
  fn: null,
  bufferPolicy: null,

  concurrency: 0,

  attach(owner) {
    this.owner = owner;
    this.set('iteration', start(owner, this, this.iterable, this.fn, this.bufferPolicy));
    cleanupOnDestroy(owner, this, '_disposeIter');
    return this;
  },

  _disposeIter() {
    log("HOST: host object destroyed, disposing of source iteration", this.iteration);
    this.iteration.break(-1);
  },
});

export function forEach(iterable, fn, bufferPolicy) {
  return LoopHandle.create({
    iterable, fn, bufferPolicy
  });
}

const EMPTY_ARRAY = [];

function start(owner, loopHandle, sourceIterable, iterationHandlerFn, bufferPolicy) {
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

          // this seems weird. if you have a concurrent task...
          // what are you doing telling the source "iterator" to
          // step? do we want to tell it to step or just that it's ready for more?
          // i am so confused.
          sourceIteration.step(si.index);
        } else {
          opsIteration.step(index, value);
        }
      }
    });

    loopHandle.incrementProperty('concurrency', 1);
    sourceIteration.registerDisposable(si.index, {
      dispose() {
        loopHandle.incrementProperty('concurrency', -1);
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


