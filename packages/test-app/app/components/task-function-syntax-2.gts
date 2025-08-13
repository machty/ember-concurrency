import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';

interface TaskFunctionSyntax2Signature {
  Args: {};
}

export default class TaskFunctionSyntaxComponent2 extends Component<TaskFunctionSyntax2Signature> {
  @tracked status: string | null = null;

  // BEGIN-SNIPPET task-function-syntax-2
  pickRandomNumbers = task(async () => {
    let nums = [];
    for (let i = 0; i < 3; i++) {
      nums.push(Math.floor(Math.random() * 10));
    }

    this.status = `My favorite numbers: ${nums.join(', ')}`;
  });
  // END-SNIPPET

  <template>
    <p>
      <button {{on 'click' this.pickRandomNumbers.perform}} type='button'>Pick
        Random Number</button>
      {{this.status}}
    </p>
  </template>
}
