import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
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

