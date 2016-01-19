import Ember from 'ember';

let { computed } = Ember;

let Task = Ember.Object.extend({
  perform: null,

  isPerformable: computed('_depTask.isPerformable', 'isRunning', function() {
    let depTask = this.get('_depTask');
    return !this.get('isRunning') &&
           (!depTask || depTask.get('isPerformable'));
  }),

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

    this.perform = (...args) => {
      return this._dispatcher._tryPerform(this, args);
    };
  },

  willDestroy() {
    this._dispatcher._taskDestroyed(this);
    this._super();
  },
});

export default Task;

