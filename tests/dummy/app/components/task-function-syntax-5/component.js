// BEGIN-SNIPPET task-function-syntax-5
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';

export default class MyOctaneComponent extends Component {
  @tracked status = null

  @(task(function * () {
    let nums = [];
    for (let i = 0; i < 3; i++) {
      nums.push(Math.floor(Math.random() * 10));
    }

    this.status = `My favorite numbers: ${nums.join(', ')}`;
  })) pickRandomNumbers;
}
// END-SNIPPET
