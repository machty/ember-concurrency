import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

export default class TaskFunctionSyntaxComponent3 extends Component {
  tagName = '';
  status = null;

  // BEGIN-SNIPPET task-function-syntax-3
  myTask = task(this, async () => {
    this.set('status', `Thinking...`);
    let promise = timeout(1000).then(() => 123);
    let resolvedValue = await promise;
    this.set('status', `The value is ${resolvedValue}`);
  });
  // END-SNIPPET
}
