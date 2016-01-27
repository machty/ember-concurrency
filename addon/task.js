import Ember from 'ember';

let { computed } = Ember;

let Task = Ember.Object.extend({
  perform: null,

  isRunnable: computed('_depTask.isRunnable', 'isRunning', function() {
    let depTask = this.get('_depTask');
    return !this.get('isRunning') &&
           (!depTask || depTask.get('isRunnable'));
  }),
  isPerformable: computed.alias('isRunnable'),

  _isRunningSem: 0,
  isRunning: computed.gt('_isRunningSem', 0),

  _depTask: false,

  _hostObject: null,
  _dispatcher: null,

  _prepareArgs(args) {
    return args;
  },

  init() {
    this._super();

    let self = this;
    let boundPerform = function(...args) {
      return self._perform(args);
    };

    this.perform = boundPerform;
    this.run = boundPerform;
  },

  _perform(args) {
    return this._dispatcher._tryPerform(this, args);
  },

  willDestroy() {
    if (this._proc) {
      this._proc.kill();
      this._proc = null;
    }
    //this._dispatcher._taskDestroyed(this);
    this._super();
  },
});

export default Task;

