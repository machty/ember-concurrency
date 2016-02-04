import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';
import Task from 'ember-concurrency/task';
import AsyncIterator from 'ember-concurrency/async-iterator';
import { isGeneratorIterator } from 'ember-concurrency/utils';
import { _makeIteration, dropIntermediateValues, keepFirstIntermediateValue, keepLastIntermediateValue } from 'ember-concurrency/iteration';
import { _makeIterator } from 'ember-concurrency/iterators';

export {
  dropIntermediateValues,
  keepFirstIntermediateValue,
  keepLastIntermediateValue
};

let testGenFn = function * () {};
let testIter = testGenFn();
Ember.assert(`ember-concurrency requires that you set babel.includePolyfill to true in your ember-cli-build.js (or Brocfile.js) to ensure that the generator function* syntax is properly transpiled, e.g.:

  var app = new EmberApp({
    babel: {
      includePolyfill: true,
    }
  });`, isGeneratorIterator(testIter));

export function DidNotRunException() {
  this.success = false;
  this.reason = "unperformable";
}

export let csp = window.csp;

csp.set_queue_delayer(function(f, delay) {
  Ember.run.later(f, delay);
});

csp.set_queue_dispatcher(function(f) {
	Ember.run.join(this, function() {
		Ember.run.schedule('actions', f);
	});
});

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

export let Process = Ember.Object.extend({
  owner: null,
  generatorFunction: null,

  _currentProcess: null,

  isRunning: false,

  start(args, completionHandler) {
    if (this._currentProcess) {
      // already running; use restart() to restart.
      // NOTE: what if arguments have changed?
      // it seems like we want something that says "make sure
      // this process is running, with these args, but don't
      // restart unless the args have changed". Lowest level of
      // allowing this would be saving the current args in an externally
      // inspectable way.
      return;
    }

    this.set('isRunning', true);

    let owner = this.owner;
    let iter = this.generatorFunction.apply(owner, args);
    this._currentProcess = csp.spawn(iter);
    this._currentProcess.process._emberProcess = this;

    csp.takeAsync(this._currentProcess, returnValue => {
      if (completionHandler) {
        completionHandler(returnValue);
      }
      this.kill();
    });
  },

  stop() {
    this.kill();
  },

  kill() {
    if (this._currentProcess) {
      this.set('isRunning', false);
      let processChannel = this._currentProcess;
      processChannel.close();
      processChannel.process.close();
      this._currentProcess = null;
    }
  },

  restart(...args) {
    this.kill();
    this.start(args);
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

function liveComputed(...args) {
  let cp = Ember.computed(...args);
  cp.setup = function(obj, keyname) {
    Ember.addListener(obj, 'init', null, function() {
      this.get(keyname);
    });
  };
  return cp;
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

sleep.untilEvent = function(obj, eventName) {
  let chan = csp.chan();
  Ember.addListener(obj, eventName, null, event => {
    csp.putAsync(chan, event);
    // need to close chan? does it matter if it's anonymous?
  }, true);
  return chan;
};

let chan = csp.chan();
let RawChannel = chan.constructor;
chan.close();

RawChannel.prototype.hasTakers = false;

let oldTake = RawChannel.prototype._take;
let oldPut = RawChannel.prototype._put;

RawChannel.prototype._take = function() {
  let ret = oldTake.apply(this, arguments);
  this.refreshBlockingState();
  return ret;
};

RawChannel.prototype._put= function() {
  let ret = oldPut.apply(this, arguments);
  this.refreshBlockingState();
  return ret;
};

RawChannel.prototype.refreshBlockingState = function () {
  Ember.set(this, 'hasTakers', this.takes.length > 0);
};

export function channel(...args) {
  let bufferConstructor = args[0];
  return liveComputed(function() {
    let chan;
    if (typeof bufferConstructor === 'function') {
      chan = csp.chan(bufferConstructor(args[1]));
    } else if (args.length === 1) {
      chan = csp.chan(args[0]);
    } else {
      chan = csp.chan();
    }
    cleanupOnDestroy(this, chan, 'close');
    return chan;
  });
}

export function task(...args) {
  let _genFn;
  if (typeof args[args.length - 1] === 'function') {
    _genFn = args.pop();
  }

  let autoStart = false;

  let desc = liveComputed(function(key) {
    let _dispatcher = getOwner(this).lookup('service:ember-concurrency-dispatcher');
    Ember.assert(`You can only use task() on Ember Objects instantiated from a container`, _dispatcher);

    Ember.assert(`Task '${key}' specifies more than one dependent task, which is not presently supported`, args.length <= 1);

    let _depTasks = args.map(path => {
      let depTask = this.get(path);
      if (depTask instanceof Task) {
        return depTask;
      } else {
        // TODO: log this? better API than quietly failing?
        return null;
      }
    });

    let _depTask = _depTasks[0];

    if (!_genFn) {
      _genFn = function * (...args) {
        if (_depTask) {
          let value = yield _depTask.perform(...args);
          return value;
        }
      };
    }

    let task = Task.create({
      _dispatcher,
      _hostObject: this,
      _genFn,
      _depTask,
    });

    cleanupOnDestroy(this, task, 'destroy');

    if (autoStart) {
      task.perform();
    }

    return task;
  });

  desc.autoStart = () => {
    autoStart = true;
    return desc;
  };

  return desc;
}

export function asyncIterator(obs) {
  return AsyncIterator.create({
    _observable: obs,
  });
}

asyncIterator.fromEvent = function(obj, eventName) {
  return AsyncIterator.create({
    _observable: EventedObservable.create({ obj, eventName })
  });
};

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






