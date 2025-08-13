import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';

interface TaskFunctionSyntax4Signature {
  Args: {};
}

export default class TaskFunctionSyntaxComponent4 extends Component<TaskFunctionSyntax4Signature> {
  @tracked status: string | null = null;

  // BEGIN-SNIPPET task-function-syntax-4
  myTask = task(async () => {
    this.status = `Thinking...`;
    try {
      await timeout(1000).then(() => {
        throw 'Ahhhhh!!!!';
      });
      this.status = `This does not get used!`;
    } catch (e) {
      this.status = `Caught value: ${e}`;
    }
  });
  // END-SNIPPET

  <template>
    <p>
      <button {{on 'click' this.myTask.perform}} type='button'>Perform Task</button>
      {{this.status}}
    </p>
  </template>
}
