import Ember from 'ember';

let { computed } = Ember;

let Task = Ember.Object.extend({
  perform: null,

  isPerformable: true,
  isRunning: false,

  _hostObject: null,
  _dispatcher: null,

  init() {
    this._super();
    this._dispatcher._registerTask(this);

    this.perform = (...args) => {
      return this._dispatcher._tryPerform(this, args);
    };
  },

  _concurrencyGroupName: computed(function() {
    return this.get('_hostObject.concurrencyGroup') || "SHARED_GLOBAL_GROUP";
  }),

  willDestroy() {
    this._dispatcher._taskDestroyed(this);
    this._super();
  },
});

export default Task;

