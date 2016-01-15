import Ember from 'ember';

export let csp = window.csp;

csp.set_queue_delayer(function(f, delay) {
  Ember.run.later(f, delay);
});

csp.set_queue_dispatcher(function(f) {
	Ember.run.join(this, function() {
		Ember.run.schedule('actions', f);
	});
});

let Process = Ember.Object.extend({
  owner: null,
  generatorFunction: null,

  _currentProcess: null,

  isRunning: false,

  start(...args) {
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
    csp.takeAsync(this._currentProcess, () => {
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
    this.start(...args);
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

export function looper() {
  let channelName, fnOrGenFn;
  if (arguments.length === 2) {
    channelName = arguments[0];
    fnOrGenFn = arguments[1];
  } else {
    fnOrGenFn = arguments[0];
  }

  let cp = liveComputed(function(key) {
    let owner = this;
    channelName = channelName || key;
    let channel = resolveChannel(owner, channelName);
    let proc = Process.create({
      owner,
      generatorFunction: function * () {
        for (;;) {
          let value = yield channel;
          if (value === csp.CLOSED) {
            break;
          }
          yield * fnOrGenFn.call(owner, value);
        }
      },
      propertyName: key
    });
    proc.start();

    cleanupOnDestroy(owner, proc, 'kill');

    return proc;
  });

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

function resolveChannel(hostObject, channelPath) {
  let charCode = channelPath.charCodeAt(0);
  let startsWithUppercase = (charCode >= 65 && charCode <= 90);
  if (startsWithUppercase) {
    // assume it's a global action. return the implicit channel.
    let owner = Ember.getOwner(hostObject);
    let channelService = owner.lookup(`service:ember-processes-dispatcher`);
    return channelService._globalChannelFor(channelPath);
  } else {
    return hostObject.get(channelPath);
  }
}


// TODO: move this to ember-processes ?
let ChannelAction = Ember.Object.extend({
  perform: null,
  hostObject: null,
  channelPath: null,
  channel: Ember.computed('channelPath', function() {
    return resolveChannel(this.get('hostObject'), this.get('channelPath'));
  }),

  ready: Ember.computed.oneWay('channel.hasTakers'),

  init() {
    this._super();
    this.perform = (...args) => {
      if (!this.get('ready')) { return; }

      let mapFn = this.mapFn;
      let value = mapFn ? mapFn.apply(this.hostObject, args) : args[0] || {};
      if (value) {
        value._sourceAction = this;
      } else {
        return;
      }
      csp.putAsync(this.get('channel'), value);
    };
  },
});

export function channelAction(channelPath, mapFn) {
  return Ember.computed(function() {
    return ChannelAction.create({
      hostObject: this,
      channelPath,
      mapFn,
    });
  });
}

