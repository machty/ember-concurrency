import Component from '@ember/component';
import { task } from 'ember-concurrency';

export default Component.extend({
  status: null,

// BEGIN-SNIPPET task-function-syntax-2
  pickRandomNumbers: task(function * () {
    let nums = [];
    for (let i = 0; i < 3; i++) {
      nums.push(Math.floor(Math.random() * 10));
    }

    this.set('status', `My favorite numbers: ${nums.join(', ')}`);
  }),
// END-SNIPPET
});

