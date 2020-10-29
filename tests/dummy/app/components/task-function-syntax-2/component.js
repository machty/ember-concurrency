import Component from '@ember/component';
import { task } from 'ember-concurrency';

export default class TaskFunctionSyntaxComponent2 extends Component {
  status = null;

// BEGIN-SNIPPET task-function-syntax-2
  @task *pickRandomNumbers() {
    let nums = [];
    for (let i = 0; i < 3; i++) {
      nums.push(Math.floor(Math.random() * 10));
    }

    this.set('status', `My favorite numbers: ${nums.join(', ')}`);
  }
// END-SNIPPET
}
