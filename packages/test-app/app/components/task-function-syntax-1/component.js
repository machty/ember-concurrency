import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';

export default class TaskFunctionSyntaxComponent1 extends Component {
  tagName = '';
  @tracked status = null;

  // BEGIN-SNIPPET task-function-syntax-1
  waitAFewSeconds = task(async () => {
    this.status = 'Gimme one second...';
    await timeout(1000);
    this.status = 'Gimme one more second...';
    await timeout(1000);
    this.status = "OK, I'm done.";
  });
  // END-SNIPPET
}
