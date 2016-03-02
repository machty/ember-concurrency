// BEGIN-SNIPPET intro-task
import Ember from 'ember';
import { task, timeout, restartable } from 'ember-concurrency';

export default Ember.Component.extend({
  count: 0,

  countingTask: task(restartable, function * () {
    this.set('count', 0);
    while (this.count < 5) {
      this.incrementProperty('count');
      yield timeout(300);
    }
    this.set('count', "DONE!");
  }),
});
// END-SNIPPET

