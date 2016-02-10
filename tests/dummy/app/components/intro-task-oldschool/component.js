// BEGIN-SNIPPET intro-task-oldschool
import Ember from 'ember';

export default Ember.Component.extend({
  count: 0,

  startCounting() {
    this.cancelTimer();
    this.set('count', 0);
    this.step();
  },

  step() {
    if (this.count < 5) {
      this.incrementProperty('count');
      this.timerId = Ember.run.later(this, this.step, 300);
    } else {
      this.set('count', "DONE!");
    }
  },

  willDestroy() {
    this.cancelTimer();
  },

  cancelTimer() {
    if (this.timerId) {
      Ember.run.cancel(this.timerId);
      this.timerId = null;
    }
  },

  actions: {
    startCounting() {
      this.startCounting();
    }
  }
});
// END-SNIPPET

