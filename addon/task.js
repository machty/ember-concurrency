import Ember from 'ember';

let { computed } = Ember;

let Task = Ember.Object.extend({
  //perform: null,
  //performOptional: null,


  isPerformable: true,
  isRunning: false,


  _hostObject: null,
  _dispatcher: null,

  //ready: Ember.computed.oneWay('channel.hasTakers'),

  init() {
    this._super();
    //this.performEnsure = (...args) => {
      //this._perform(false, args);
    //};

    this._dispatcher._registerTask(this);

    this.perform = (...args) => {
      // what does perform return?
      // a promise, why not.


      return this._dispatcher._tryPerform(this, args);
    };
  },

  _concurrencyGroupName: computed(function() {
    return "SHARED_GLOBAL_GROUP";
  }),
});

export default Task;

