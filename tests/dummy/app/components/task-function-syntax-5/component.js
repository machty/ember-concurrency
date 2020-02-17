// BEGIN-SNIPPET task-function-syntax-5
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency';

export default class MyOctaneComponent extends Component {
  @tracked status = null

  @computed('pickRandomNumbers.last.value')
  get favoriteNumbers() {
    if (this.pickRandomNumbers.last) {
      return this.pickRandomNumbers.last.value
    }

    return [];
  }

  @(task(function * () {
    let nums = [];
    for (let i = 0; i < 3; i++) {
      nums.push(Math.floor(Math.random() * 10));
    }

    this.status = `My favorite numbers: ${nums.join(', ')}`;

    return nums;
  })) pickRandomNumbers;
}
// END-SNIPPET
