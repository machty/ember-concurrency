// BEGIN-SNIPPET start-task-example
import Component from '@ember/component';
import { action } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

export default class StartTaskExampleComponent extends Component {
  tagName = '';

  status = null;

  myTask = task({ on: ['init', 'foo'] }, async (msg = 'init') => {
    let status = `myTask.perform(${msg})...`;
    this.set('status', status);

    await timeout(500);
    this.set('status', `${status} Done`);
  });

  @action
  performTask(msg) {
    // This demonstrates how you can .get() a reference
    // to a task and then run it with .perform(), but
    // ideally you should just invoke myTask directly
    // from the template using the `perform` helper.
    this.myTask.perform(msg);
  }

  @action
  triggerFoo(msg) {
    this.trigger('foo', msg);
  }
}
// END-SNIPPET
