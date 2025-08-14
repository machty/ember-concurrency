import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { restartableTask, task, timeout } from 'ember-concurrency';
import CodeSnippet from '../../components/code-snippet';

export default class ChildTasksRouteComponent extends Component {
  @tracked status = 'Waiting to start';

  // BEGIN-SNIPPET child-tasks
  parentTask = restartableTask(async () => {
    this.status = '1. Parent: one moment...';
    await timeout(1000);
    let value = await this.childTask.perform();
    this.status = `5. Parent: child says "${value}"`;
    await timeout(1000);
    this.status = '6. Done!';
  });

  childTask = task(async () => {
    this.status = '2. Child: one moment...';
    await timeout(1000);
    let value = await this.grandchildTask.perform();
    this.status = `4. Child: grandchild says "${value}"`;
    await timeout(1000);
    return "What's up";
  });

  grandchildTask = task(async () => {
    this.status = '3. Grandchild: one moment...';
    await timeout(1000);
    return 'Hello';
  });
  // END-SNIPPET

  <template>
    <h3>Child Tasks</h3>

    <p>
      Tasks can call other tasks by
      <code>await</code>ing the result of
      <code>anotherTask.perform()</code>. When this happens, the Parent task
      will wait for the Child task to complete before proceeding. If the Parent
      task is canceled, the Child task will automatically be canceled as well.
    </p>

    <h4>Example</h4>

    {{! BEGIN-SNIPPET child-tasks-template }}
    <h5>{{this.status}}</h5>

    <ul>
      <li>Parent Task: {{this.parentTask.state}}</li>
      <li>Child Task: {{this.childTask.state}}</li>
      <li>Grandchild Task: {{this.grandchildTask.state}}</li>
    </ul>

    <button {{on 'click' this.parentTask.perform}} type='button'>
      {{#if this.parentTask.isRunning}}
        Restart Parent Task
      {{else}}
        Perform Parent Task
      {{/if}}
    </button>
    {{! END-SNIPPET }}

    <CodeSnippet @name='child-tasks.gts' />
    <CodeSnippet @name='child-tasks-template.gts' />
  </template>
}
