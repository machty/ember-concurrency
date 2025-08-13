import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';

interface TaskFunctionSyntax3Signature {
  Args: {};
}

export default class TaskFunctionSyntaxComponent3 extends Component<TaskFunctionSyntax3Signature> {
  @tracked status: string | null = null;

  // BEGIN-SNIPPET task-function-syntax-3
  myTask = task(async () => {
    this.status = `Thinking...`;
    let promise = timeout(1000).then(() => 123);
    let resolvedValue = await promise;
    this.status = `The value is ${resolvedValue}`;
  });
  // END-SNIPPET

  <template>
    <p>
      <button {{on 'click' this.myTask.perform}} type='button'>Perform Task</button>
      {{this.status}}
    </p>
  </template>
}
