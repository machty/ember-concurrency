import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

export default class TaskFunctionSyntaxComponent1 extends Component {
  tagName = '';
  status = null;

  // BEGIN-SNIPPET task-function-syntax-1
  waitAFewSeconds = task(this, async () => {
    this.set('status', 'Gimme one second...');
    await timeout(1000);
    this.set('status', 'Gimme one more second...');
    await timeout(1000);
    this.set('status', "OK, I'm done.");
  });
  // END-SNIPPET
}
