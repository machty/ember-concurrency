import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';

export default class TaskFunctionSyntaxComponent2 extends Component {
  tagName = '';
  @tracked status = null;

  // BEGIN-SNIPPET task-function-syntax-2
  pickRandomNumbers = task(async () => {
    let nums = [];
    for (let i = 0; i < 3; i++) {
      nums.push(Math.floor(Math.random() * 10));
    }

    this.status = `My favorite numbers: ${nums.join(', ')}`;
  });
  // END-SNIPPET
}
