import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';
import Task from 'ember-concurrency/task';
import AsyncIterator from 'ember-concurrency/async-iterator';

let testGenFn = function * () {};
let testIter = testGenFn();
Ember.assert(`ember-concurrency requires that you set babel.includePolyfill to true in your ember-cli-build.js (or Brocfile.js) to ensure that the generator function* syntax is properly transpiled, e.g.:

  var app = new EmberApp({
    babel: {
      includePolyfill: true,
    }
  });`,
  (typeof testIter.next      === 'function' &&
   typeof testIter['return'] === 'function' &&
   typeof testIter['throw']  === 'function'));

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
      this._currentProcess.close();
      this._currentProcess.process.close();
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

export function process(...args) {
  let generatorFunction = args.pop();
  let deps = args;
  let autoStart = false;

  let cp = liveComputed(...deps, function(key) {
    let owner = this;
    let proc = Process.create({ owner, generatorFunction, propertyName: key });
    cleanupOnDestroy(owner, proc, 'kill');
    if (autoStart) {
      proc.start();
    }

    return proc;
  });
  cp.autoStart = () => {
    autoStart = true;
    return cp;
  };

  return cp;
}

export function sleep(ms) {
  return csp.timeout(ms);
}

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

export function makePublisher(pubConstructor) {
  // 20 is arbitrary, but probably an OK default?
  // The reason we need it is that if you have
  // pending putAsyncs and you close the channel,
  // the close cancels those putAsyncs, which is
  // probably undesirable for the pattern where a
  // producer generates a bunch of values and closes.
  //
  // See here: https://github.com/ubolonton/js-csp/issues/63
  //
  // TODO: we should probably devise a better system
  // for integrating with Observables that are backpressure
  // aware
  let chan = csp.chan(20);

  let disposer = Ember.K;

  let hasClosed = false;
  let oldClose = chan.close;
  chan.close = () => {
    if (hasClosed) { return; }
    hasClosed = true;
    oldClose.call(chan);
    disposer();
  };

  let publishHandle = (v) => {
    if (hasClosed) {
      return;
    }
    csp.putAsync(chan, v);
  };
  publishHandle.close = () => {
    chan.close();
  };

  let maybeDisposer = pubConstructor(publishHandle);
  if (typeof maybeDisposer === 'function') {
    disposer = maybeDisposer;
  }

  return chan;
}

export function task(...args) {
  let _genFn;
  if (typeof args[args.length - 1] === 'function') {
    _genFn = args.pop();
  }

  let desc = Ember.computed(function(key) {
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
    return task;
  });

  return desc;
}

export function asyncIterator(obs) {
  return AsyncIterator.create({
    _observable: obs,
  });
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

asyncIterator.fromEvent = function(obj, eventName) {
  return AsyncIterator.create({
    _observable: EventedObservable.create({ obj, eventName })
  });
};

