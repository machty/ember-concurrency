import Ember from 'ember';

let Task = Ember.Object.extend({
  //perform: null,
  //performOptional: null,


  isPerformable: true,


  _hostObject: null,
  _dispatcher: null,

  //ready: Ember.computed.oneWay('channel.hasTakers'),

  init() {
    this._super();
    //this.performEnsure = (...args) => {
      //this._perform(false, args);
    //};

    this.perform = (...args) => {
      // what does perform return?
      // a promise, why not.


      return this._dispatcher._tryPerform(this, args);
    };
  },

  _concurrencyConstraints: null,
});

export default Task;

