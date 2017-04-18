import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

// BEGIN-SNIPPET wait-hover-task
export default Ember.Controller.extend({
  active: false,

  setActivate() {
    this.set('active', true);
  },

  activate: task(function * () {
    let speed = 600;
    yield timeout(speed);

    this.setActivate();
  }),

  actions: {
    reset() {
      this.set('active', false);
    },
  },
});
// END-SNIPPET
