import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';

interface TaskFunctionSyntax1Signature {
  Args: {};
}

export default class TaskFunctionSyntaxComponent1 extends Component<TaskFunctionSyntax1Signature> {
  @tracked status: string | null = null;

  // BEGIN-SNIPPET task-function-syntax-1
  waitAFewSeconds = task(async () => {
    this.status = 'Gimme one second...';
    await timeout(1000);
    this.status = 'Gimme one more second...';
    await timeout(1000);
    this.status = "OK, I'm done.";
  });
  // END-SNIPPET

  <template>
    <p>
      <button {{on 'click' this.waitAFewSeconds.perform}} type='button'>Perform
        Task</button>
      {{this.status}}
    </p>
  </template>
}
