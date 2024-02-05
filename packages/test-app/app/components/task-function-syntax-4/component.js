import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';

export default class TaskFunctionSyntaxComponent4 extends Component {
  tagName = '';
  @tracked status = null;

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
}
