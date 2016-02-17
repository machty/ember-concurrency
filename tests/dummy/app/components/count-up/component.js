import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Component.extend({
  tagName: '',
  count: 0,
// BEGIN-SNIPPET count-up
  countUp: task(function * () {
    while (true) {
      this.incrementProperty('count');
      yield timeout(100);
    }
  }).on('init'),
// END-SNIPPET
});

