import Ember from 'ember';

let { computed } = Ember;

let TaskProxy = Ember.Object.extend({
  _parentTask: null,
  _mapFn: null,

  isPerformable: computed.oneWay('_parentTask.isPerformable'),
  isRunning: computed.oneWay('_parentTask.isRunning'),

  init() {
    this._super();

    this.perform = (...args) => {
      return this._dispatcher._tryPerform(this, args);
    };
  },

  _prepareArgs(args) {
    let val = this._mapFn(...args);
    if (!val) { return null; }
    return this._parentTask._prepareArgs(Ember.makeArray(val));
  },

  _mapArgs(mapFn) {
    return TaskProxy.create({
      _mapFn: mapFn,
      _parentTask: this,
      _dispatcher: this._dispatcher,
    });
  },
});

let Task = Ember.Object.extend({
  perform: null,

  isPerformable: true,
  isRunning: false,

  _hostObject: null,
  _dispatcher: null,

  _prepareArgs(args) {
    return args;
  },

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

  _mapArgs(mapFn) {
    return TaskProxy.create({
      _mapFn: mapFn,
      _parentTask: this,
      _dispatcher: this._dispatcher,
    });
  },

  willDestroy() {
    this._dispatcher._taskDestroyed(this);
    this._super();
  },
});

export default Task;

