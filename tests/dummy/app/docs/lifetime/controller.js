import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

// BEGIN-SNIPPET lifetime
export default Ember.Controller.extend({
  isDisplaying: false,

  togglingLoop: task(function * () {
    while (true) {
      this.toggleProperty('isDisplaying');
      yield timeout(1500);
    }
  }).on('init'),
});
// END-SNIPPET

