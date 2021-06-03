// BEGIN-SNIPPET task-function-syntax-5
import Component from '@ember/component';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency';

export default Component.extend({
  status: null,

  favoriteNumbers: computed('pickRandomNumbers.last.value', function () {
    return this.get('pickRandomNumbers.last.value') || [];
  }),

  pickRandomNumbers: task(function () {
    let nums = [];
    for (let i = 0; i < 3; i++) {
      nums.push(Math.floor(Math.random() * 10));
    }

    this.set('status', `My favorite numbers: ${nums.join(', ')}`);

    return nums;
  }).restartable(),
});
// END-SNIPPET
