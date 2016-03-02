// BEGIN-SNIPPET intro-task
import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Component.extend({
  count: 0,

  countingTask: task(function * () {
    this.set('count', 0);
    while (this.count < 5) {
      this.incrementProperty('count');
      yield timeout(300);
    }
    this.set('count', "DONE!");
  }).restartable()
});
// END-SNIPPET

