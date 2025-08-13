import DropSchedulerPolicy from './external/scheduler/policies/drop-policy';
import EnqueueSchedulerPolicy from './external/scheduler/policies/enqueued-policy';
import KeepLatestSchedulerPolicy from './external/scheduler/policies/keep-latest-policy';
import RestartableSchedulerPolicy from './external/scheduler/policies/restartable-policy';

export let taskFactorySymbol = '__ec_task_factory';

export const propertyModifiers = {
  /**
   * Configures the task to cancel old currently task instances
   * to make room for a new one to perform. Sets default
   * maxConcurrency to 1.
   *
   * [See the Live Example](/docs/examples/route-tasks/1)
   *
   * @method restartable
   * @memberof TaskProperty
   * @instance
   */
  restartable() {
    this[taskFactorySymbol].setBufferPolicy(RestartableSchedulerPolicy);
    return this;
  },

  /**
   * Configures the task to run task instances one-at-a-time in
   * the order they were `.perform()`ed. Sets default
   * maxConcurrency to 1.
   *
   * @method enqueue
   * @memberof TaskProperty
   * @instance
   */
  enqueue() {
    this[taskFactorySymbol].setBufferPolicy(EnqueueSchedulerPolicy);
    return this;
  },

  /**
   * Configures the task to immediately cancel (i.e. drop) any
   * task instances performed when the task is already running
   * at maxConcurrency. Sets default maxConcurrency to 1.
   *
   * @method drop
   * @memberof TaskProperty
   * @instance
   */
  drop() {
    this[taskFactorySymbol].setBufferPolicy(DropSchedulerPolicy);
    return this;
  },

  /**
   * Configures the task to drop all but the most recently
   * performed {@linkcode TaskInstance }.
   *
   * @method keepLatest
   * @memberof TaskProperty
   * @instance
   */
  keepLatest() {
    this[taskFactorySymbol].setBufferPolicy(KeepLatestSchedulerPolicy);
    return this;
  },

  /**
   * Sets the maximum number of task instances that are allowed
   * to run at the same time. By default, with no task modifiers
   * applied, this number is Infinity (there is no limit
   * to the number of tasks that can run at the same time).
   * {@linkcode TaskProperty#restartable .restartable},
   * {@linkcode TaskProperty#enqueue .enqueue}, and
   * {@linkcode TaskProperty#drop .drop} set the default
   * maxConcurrency to 1, but you can override this value
   * to set the maximum number of concurrently running tasks
   * to a number greater than 1.
   *
   * [See the AJAX Throttling example](/docs/examples/ajax-throttling)
   *
   * The example below uses a task with `maxConcurrency(3)` to limit
   * the number of concurrent AJAX requests (for anyone using this task)
   * to 3.
   *
   * ```js
   * doSomeAjax = task(async (url) => {
   *   return fetch(url);
   * }).maxConcurrency(3);
   *
   * elsewhere() {
   *   this.doSomeAjax.perform("http://www.example.com/json");
   * }
   * ```
   *
   * @method maxConcurrency
   * @memberof TaskProperty
   * @param {Number} n The maximum number of concurrently running tasks
   * @instance
   */
  maxConcurrency(n) {
    this[taskFactorySymbol].setMaxConcurrency(n);
    return this;
  },

  /**
   * Activates lifecycle events, allowing Evented host objects to react to task state
   * changes.
   *
   * ```js
   * import Component from '@glimmer/component';
   * import { task } from 'ember-concurrency';
   * import { on } from '@ember/object/evented';
   *
   * export default class MyComponent extends Component {
   *   uploadTask = task(async (file) => {
   *     // ... file upload stuff
   *   }).evented();
   *
   *   @on('uploadTask:started')
   *   uploadedStarted(taskInstance) {
   *     this.analytics.track("User Photo: upload started");
   *   }
   * }
   * ```
   *
   * @method evented
   * @memberof TaskProperty
   * @instance
   */
  evented() {
    this[taskFactorySymbol].setEvented(true);
    return this;
  },

  /**
   * Logs lifecycle events to aid in debugging unexpected Task behavior.
   * Presently only logs cancelation events and the reason for the cancelation,
   * e.g. "TaskInstance 'doStuff' was canceled because the object it lives on was destroyed or unrendered"
   *
   * @method debug
   * @memberof TaskProperty
   * @instance
   */
  debug() {
    this[taskFactorySymbol].setDebug(true);
    return this;
  },

  /**
   * Configures the task to call the passed in callback for derived state updates,
   * overriding the default derived state tracking. You may call with `null` to
   * completely opt-out of derived state tracking.
   *
   * @method onState
   * @memberof TaskProperty
   * @param {function?} callback Callback to be called. Receives an object argument with the new state.
   * @instance
   */
  onState(callback) {
    this[taskFactorySymbol].setOnState(callback);
    return this;
  },
};

export class TaskProperty {}

Object.assign(TaskProperty.prototype, propertyModifiers, {
  setup(proto, key) {
    if (this.callSuperSetup) {
      this.callSuperSetup(...arguments);
    }

    this[taskFactorySymbol].setName(key);
  },
});
