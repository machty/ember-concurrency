import { on } from '@ember/modifier';
import { LinkTo } from '@ember/routing';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';
import CodeSnippet from '../../../components/code-snippet';
import LoadingSpinner from '../../../components/loading-spinner';

export default class LoadingUIRouteComponent extends Component {
  @tracked result = null;

  // BEGIN-SNIPPET loading-ui-ask-question-task
  askQuestion = task({ drop: true }, async () => {
    await timeout(1000);
    this.result = Math.random();
  });
  // END-SNIPPET

  <template>
    <h3>Loading UI While a Task is Running</h3>

    <p>
      Reining in undesired concurrency is partly what
      <strong>ember-concurrency</strong>
      has to offer. The other part is making it easy to build UI around
      asynchronous tasks.
    </p>

    <p>
      For simple cases where you just need to display a loading dialog or
      disable a button while a task is running, you can make use of the
      <code>.isIdle</code>
      property of a task. This property is false when the task is running, and
      true otherwise. This eliminates a lot of the boilerplate of setting a
      property at the beginning of some async operation, and unsetting when the
      operation completes. Also, because the task in the example below uses the
      <code>drop</code>
      modifier (see
      <LinkTo @route='docs.task-concurrency'>Task Modifiers</LinkTo>), there's
      no need to write a guard at the beginning of the task to return early if
      the task is already running.
    </p>

    <h3>Live Example</h3>

    <p>
      What is the meaning of life?
      {{#if this.result}} Answer: {{this.result}} {{/if}}
    </p>

    <p>
      {{! BEGIN-SNIPPET ask-button }}
      <button
        class={{if this.askQuestion.isIdle 'button-primary'}}
        {{on 'click' this.askQuestion.perform}}
        type='button'
      >
        {{#if this.askQuestion.isIdle}}
          Ask
        {{else}}
          Thinking...
          <LoadingSpinner />
        {{/if}}
      </button>
      {{! END-SNIPPET }}
    </p>

    <CodeSnippet @name='loading-ui-ask-question-task.gts' />

    <CodeSnippet @name='ask-button.gts' />
  </template>
}
