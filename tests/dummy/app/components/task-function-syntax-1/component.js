import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

export default class TaskFunctionSyntaxComponent1 extends Component {
  tagName = '';
  status = null;

  // BEGIN-SNIPPET task-function-syntax-1
  @task *waitAFewSeconds() {
    this.set('status', 'Gimme one second...');
    yield timeout(1000);
    this.set('status', 'Gimme one more second...');
    yield timeout(1000);
    this.set('status', "OK, I'm done.");
  }
  // END-SNIPPET
}
