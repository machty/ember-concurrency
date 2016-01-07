import Ember from 'ember';

export let csp = window.csp;

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

export function process(...args) {
  let generatorFunction = args.pop();
  let deps = args;

  return Ember.computed(...deps, function(key) {

    let owner = this;
    let wrapper = Process.create({ owner, generatorFunction, propertyName: key });

    // TODO: clean up this mutate-y stuff
    if (!owner.willDestroy.__generator_wrapper_disposers__) {
      let oldWillDestroy = owner.willDestroy;
      let disposers = [];

      owner.willDestroy = function() {
        for (let i = 0, l = disposers.length; i < l; i ++) {
          disposers[i]();
        }
        oldWillDestroy.apply(owner, arguments);
      };
      owner.willDestroy.__generator_wrapper_disposers__ = disposers;
    }

    owner.willDestroy.__generator_wrapper_disposers__.push(() => {
      wrapper.kill();
    });

    return wrapper;
  });
}

export function sleep(ms) {
  return csp.timeout(ms);
}

