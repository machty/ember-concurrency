import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';
import cancelAll from 'ember-concurrency/helpers/cancel-all';
import { randomWord } from '../../utils';

let i = 0;

export default class DerivedStateRouteComponent extends Component {
  doStuff = task(async (shouldError) => {
    i++;

    await timeout(1000);

    let words = [randomWord(), randomWord(), randomWord()];
    let wordsString = `${i}: ${words}`;

    if (shouldError) {
      throw new Error(wordsString);
    } else {
      return wordsString;
    }
  });

  doStuffDrop = task({ drop: true }, async (shouldError) => {
    return this.doStuff.perform(shouldError);
  });

  doStuffEnqueued = task({ enqueue: true }, async (shouldError) => {
    return this.doStuff.perform(shouldError);
  });

  doStuffRestartable = task({ restartable: true }, async (shouldError) => {
    return this.doStuff.perform(shouldError);
  });

  @tracked
  showLessCommon = false;

  @action
  setShowLessCommon(event) {
    this.showLessCommon = event.target.checked;
  }

  get taskData() {
    const tasks = [
      this.doStuff,
      this.doStuffDrop,
      this.doStuffEnqueued,
      this.doStuffRestartable,
    ];

    return tasks.map((task) => {
      return {
        task,
        last: task.last,
        lastSuccessful: task.lastSuccessful,
        lastErrored: task.lastErrored,
      };
    });
  }

  @action
  taskPropertiesFor(task) {
    return [
      ...this.commonTaskProperties,
      ...(this.showLessCommon ? this.lessCommonTaskProperties : []),
    ].map((tp) => {
      return {
        name: tp,
        value: task[tp]?.value,
        error: task[tp]?.error,
      };
    });
  }

  commonTaskProperties = ['last', 'lastSuccessful', 'lastErrored'];

  lessCommonTaskProperties = [
    'lastComplete',
    'lastPerformed',
    'lastIncomplete',
    'lastCanceled',
  ];

  @action
  performAll() {}

  <template>
    <h3>Derived State</h3>

    <p>
      One of the core goals of ember-concurrency is to provide as much
      <strong>Derived State</strong>
      as possible; for example, instead of requiring you to set and then later
      unset your own
      <code>isRunning</code>
      flag at the beginning and end of a task, ember-concurrency gives you an
      <code>.isRunning</code>
      (and
      <code>.isIdle</code>) property for free so that you don't have to manage
      your own state (which is a common source of bugs and boilerplate).
    </p>

    <p>
      ember-concurrency gives you the concept of
      <strong>Tasks</strong>, and when you
      <code>perform</code>
      a Task, it produces a
      <strong>Task Instance</strong>, which represents a single execution of
      that task. Both of these objects expose a lot of derived state, which is
      described below.
    </p>

    <p>
      Less commonly-used properties are
      <em>italicized</em>. Also, keep in mind that there are
      <a href='/api'>API docs</a>
      for everything described below.
    </p>

    <h4>Properties on <a href='/api/Task.html'>Task</a> objects</h4>

    <ul>
      <li>
        <code>isRunning</code>: true when there is at least one instance of the
        task running, false otherwise.
      </li>
      <li>
        <code>isIdle</code>: the opposite of
        <code>isRunning</code>
      </li>
      <li>
        <code>performCount</code>: The number of times the task has been
        performed
      </li>
      <li>
        <code>numRunning</code>: an integer representing the number of currently
        running task instances. If you're using a task modifier like
        <code>drop/enqueue/restartable</code>
        (without specifying
        <code>maxConcurrency</code>) this number will never be greater than 1.
        This property is mostly useful for debugging.
      </li>
      <li>
        <code>state</code>: a string description of the task's state; can either
        by "running" or "idle". Useful for debugging.
      </li>
    </ul>

    <h5>Accessing Task Instances from the Task object</h5>

    <p>
      Tasks also expose properties for accessing specific Task Instances (which
      are created every time you call
      <code>.perform()</code>
      on a task).
    </p>

    <ul>
      <li>
        <code>last</code>: the last Task Instance that started executing. This
        property will never point to a
        <code>drop</code>ped Task Instance,
      </li>
      <li>
        <code>lastSuccessful</code>: the last Task Instance that ran to
        completion (it returned a value that wasn't a rejecting promise).
      </li>
    </ul>

    <p>
      In addition to these properties, keep in mind that at any point you can
      also just save the TaskInstance returned from
      <code>.perform()</code>
      to some property for later access in case the above properties don't hit
      your use cases (but please open a GitHub issue if you find yourself doing
      this often because this might suggest room for improvement in
      ember-concurrency's API).
    </p>

    <h4>Properties on <a href='/api/TaskInstance.html'>Task Instances</a></h4>

    <ul>
      <li>
        <code>isSuccessful</code>: true if the Task Instance ran to completion
      </li>

      <li>
        <code>isError</code>: true if Task Instance failed to run to completion
        due to an exception
      </li>

      <li>
        <code>value</code>: the value returned from the task function. Is
        <code>null</code>
        before a value is returned, and remains null if the task never completes
        (throws an error or is canceled).
      </li>

      <li>
        <code>error</code>: the error/exception thrown from the task function
        (might also be the value of a rejected promise that was yielded).
        <em>
          Note: until
          <a href='https://github.com/machty/ember-concurrency/issues/40'>this
            issue</a>
          is resolved, unless you write code to explicitly
          <code>.catch()</code>
          an error thrown from a performed task, this error will bubble to the
          browser (so error reporters like Bugsnag will see it).
        </em>
      </li>
    </ul>

    <h4>Put the two together...</h4>

    {{! template-lint-disable no-unbalanced-curlies }}
    <p>
      Given a task named
      <code>myTask</code>, if you need to display a success banner with the
      value returned from the most recent execution of
      <code>myTask</code>, you can simply reference
      <code>\{{myTask.last.value}}</code>. If want this banner to persist until
      the next time the task runs to completion, you can just change it to
      <code>\{{myTask.lastSuccessful.value}}</code>. There are other
      combinations as well that might better suit your UI needs.
    </p>
    {{! template-lint-enable no-unbalanced-curlies }}

    <h3>Live Example</h3>

    <p>
      <label>
        <input
          type='checkbox'
          checked={{this.showLessCommon}}
          {{on 'change' this.setShowLessCommon}}
        />
        Show less common properties
      </label>
    </p>

    {{#each this.taskData as |taskData|}}
      <h5>{{taskData.task.name}}
        (performCount={{taskData.task.performCount}}
        numRunning={{taskData.task.numRunning}})</h5>

      <p>
        <button
          {{on 'click' (fn taskData.task.perform false)}}
          class={{if taskData.task.isIdle 'button-primary'}}
          type='button'
        >
          Run to Completion
        </button>
        <button
          {{on 'click' (fn taskData.task.perform true)}}
          class={{if taskData.task.isIdle 'button-primary'}}
          type='button'
        >
          Run until Error
        </button>
        <button
          {{on 'click' (cancelAll taskData.task)}}
          class={{if taskData.task.isRunning 'button-primary'}}
          type='button'
        >
          Cancel
        </button>
      </p>

      <table class='u-full-width completion-state-table'>
        <thead>
          <tr>
            <th>Completion Property</th>
            <th>.value</th>
            <th>.error</th>
            <th>.isSuccessful</th>
            <th>.isError</th>
          </tr>
        </thead>
        <tbody>
          {{#each (this.taskPropertiesFor taskData.task) as |tp|}}
            <tr>
              <td>
                <strong>{{taskData.task.name}}.{{tp.name}}</strong>
              </td>
              <td>
                <div
                  class='completion-status completion-success'
                >{{tp.value}}</div>
              </td>
              <td>
                <div
                  class='completion-status completion-error'
                >{{tp.error}}</div>
              </td>
              <td>
                <div
                  class='completion-status completion-success'
                >{{tp.isSuccessful}}</div>
              </td>
              <td>
                <div
                  class='completion-status completion-error'
                >{{tp.isError}}</div>
              </td>
            </tr>
          {{/each}}
        </tbody>
      </table>
      <br />
    {{/each}}
  </template>
}
