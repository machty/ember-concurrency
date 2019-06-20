import { not } from '@ember/object/computed';
import EmberObject, { computed, get } from '@ember/object';
import { yieldableSymbol } from './external/yieldables';

import { TaskInstanceState, PERFORM_TYPE_DEFAULT } from './external/task-instance/state';
import { INITIAL_STATE } from './external/task-instance/initial-state';
import { EmberTaskInstanceDelegate } from './ember-task-instance-delegate';
import { EmberEnvironment } from './ember-environment';
import { CancelRequest, CANCEL_KIND_EXPLICIT } from './external/task-instance/cancel-request';

const EXPLICIT_CANCEL_REASON = ".cancel() was explicitly called";
const EMBER_ENVIRONMENT = new EmberEnvironment();

/**
  A `TaskInstance` represent a single execution of a
  {@linkcode Task}. Every call to {@linkcode Task#perform} returns
  a `TaskInstance`.

  `TaskInstance`s are cancelable, either explicitly
  via {@linkcode TaskInstance#cancel} or {@linkcode Task#cancelAll},
  or automatically due to the host object being destroyed, or
  because concurrency policy enforced by a
  {@linkcode TaskProperty Task Modifier} canceled the task instance.

  <style>
    .ignore-this--this-is-here-to-hide-constructor,
    #TaskInstance { display: none }
  </style>

  @class TaskInstance
*/
const TaskInstance = EmberObject.extend(Object.assign({}, INITIAL_STATE, {
  task: null,
  args: [],
  _debug: false,
  _hasEnabledEvents: false,
  _expectsLinkedYield: false,
  _tags: null,
  _counted: false,
  _performType: PERFORM_TYPE_DEFAULT,

  init(...args) {
    this._super(...args);
    this._state = new TaskInstanceState({
      generatorFactory: this._generatorBuilder(),
      delegate: new EmberTaskInstanceDelegate(this),
      env: EMBER_ENVIRONMENT,
      debug: this._debug,
      performType: this._performType,
    });
  },

  /**
   * Describes the state that the task instance is in. Can be used for debugging,
   * or potentially driving some UI state. Possible values are:
   *
   * - `"dropped"`: task instance was canceled before it started
   * - `"canceled"`: task instance was canceled before it could finish
   * - `"finished"`: task instance ran to completion (even if an exception was thrown)
   * - `"running"`: task instance is currently running (returns true even if
   *     is paused on a yielded promise)
   * - `"waiting"`: task instance hasn't begun running yet (usually
   *     because the task is using the {@linkcode TaskProperty#enqueue .enqueue()}
   *     task modifier)
   *
   * The animated timeline examples on the [Task Concurrency](/#/docs/task-concurrency)
   * docs page make use of this property.
   *
   * @memberof TaskInstance
   * @instance
   * @readOnly
   */
  state: computed('isDropped', 'isCanceled', 'hasStarted', 'isFinished', function() {
    if (get(this, 'isDropped')) {
      return 'dropped';
    } else if (get(this, 'isCanceled')) {
      return 'canceled';
    } else if (get(this, 'isFinished')) {
      return 'finished';
    } else if (get(this, 'hasStarted')) {
      return 'running';
    } else {
      return 'waiting';
    }
  }),

  /**
   * True if the TaskInstance was canceled before it could
   * ever start running. For example, calling
   * {@linkcode Task#perform .perform()} twice on a
   * task with the {@linkcode TaskProperty#drop .drop()} modifier applied
   * will result in the second task instance being dropped.
   *
   * @memberof TaskInstance
   * @instance
   * @readOnly
   */
  isDropped: computed('isCanceled', 'hasStarted', function() {
    return get(this, 'isCanceled') && !get(this, 'hasStarted');
  }),

  /**
   * True if the task is still running.
   *
   * @memberof TaskInstance
   * @instance
   * @readOnly
   */
  isRunning: not('isFinished'),

  /**
   * Event emitted when a new {@linkcode TaskInstance} starts executing.
   *
   * `on` from `@ember/object/evented` may be used to create a binding on the host object to the event.
   *
   * ```js
   * export default Ember.Component.extend({
   *   doSomething: task(function * () {
   *     // ... does something
   *   }),
   *
   *   onDoSomethingStarted: on('doSomething:started', function (taskInstance) {
   *     // ...
   *   })
   * });
   * ```
   *
   * @event TaskInstance#TASK_NAME:started
   * @param {TaskInstance} taskInstance - Task instance that was started
   */

  /**
   * Event emitted when a {@linkcode TaskInstance} succeeds.
   *
   * `on` from `@ember/object/evented` may be used to create a binding on the host object to the event.
   *
   * ```js
   * export default Ember.Component.extend({
   *   doSomething: task(function * () {
   *     // ... does something
   *   }),
   *
   *   onDoSomethingSucceeded: on('doSomething:succeeded', function (taskInstance) {
   *     // ...
   *   })
   * });
   * ```
   *
   * @event TaskInstance#TASK_NAME:succeeded
   * @param {TaskInstance} taskInstance - Task instance that was succeeded
   */

  /**
   * Event emitted when a {@linkcode TaskInstance} throws an an error that is
   * not handled within the task itself.
   *
   * `on` from `@ember/object/evented` may be used to create a binding on the host object to the event.
   *
   * ```js
   * export default Ember.Component.extend({
   *   doSomething: task(function * () {
   *     // ... does something
   *   }),
   *
   *   onDoSomethingErrored: on('doSomething:errored', function (taskInstance, error) {
   *     // ...
   *   })
   * });
   * ```
   *
   * @event TaskInstance#TASK_NAME:errored
   * @param {TaskInstance} taskInstance - Task instance that was started
   * @param {Error} error - Error that was thrown by the task instance
   */

  /**
   * Event emitted when a {@linkcode TaskInstance} is canceled.
   *
   * `on` from `@ember/object/evented` may be used to create a binding on the host object to the event.
   *
   * ```js
   * export default Ember.Component.extend({
   *   doSomething: task(function * () {
   *     // ... does something
   *   }),
   *
   *   onDoSomethingCanceled: on('doSomething:canceled', function (taskInstance, cancelationReason) {
   *     // ...
   *   })
   * });
   * ```
   *
   * @event TaskInstance#TASK_NAME:canceled
   * @param {TaskInstance} taskInstance - Task instance that was started
   * @param {string} cancelationReason - Cancelation reason that was was provided to {@linkcode TaskInstance#cancel}
   */

  _start() {
    this._state.start();
    return this;
  },

  toString() {
    return `${this.task} TaskInstance`;
  },

  /**
   * Cancels the task instance. Has no effect if the task instance has
   * already been canceled or has already finished running.
   *
   * @method cancel
   * @memberof TaskInstance
   * @instance
   */
  cancel(cancelReason = EXPLICIT_CANCEL_REASON) {
    this._state.cancel(new CancelRequest(CANCEL_KIND_EXPLICIT, cancelReason));
  },

  /**
   * Returns a promise that resolves with the value returned
   * from the task's (generator) function, or rejects with
   * either the exception thrown from the task function, or
   * an error with a `.name` property with value `"TaskCancelation"`.
   *
   * @method then
   * @memberof TaskInstance
   * @instance
   * @return {Promise}
   */
  then(...args) {
    return this._state.promise().then(...args);
  },

  /**
   * @method catch
   * @memberof TaskInstance
   * @instance
   * @return {Promise}
   */
  catch(...args) {
    return this._state.promise().catch(...args);
  },

  /**
   * @method finally
   * @memberof TaskInstance
   * @instance
   * @return {Promise}
   */
  finally(...args) {
    return this._state.promise().finally(...args);
  },

  _onFinalize(callback) {
    this._state.onFinalize(callback);
  },

  /**
   * Returns a generator function iterator (the object with
   * .next()/.throw()/.return() methods) using the task function
   * supplied to `task(...)`. It uses `apply` so that the `this`
   * context is the host object the task lives on, and passes
   * the args passed to `perform(...args)` through to the generator
   * function.
   *
   * `_generatorBuilder` is overridden in EncapsulatedTask to produce
   * an iterator based on the `*perform()` function on the
   * EncapsulatedTask definition.
   *
   * @private
   */
  _generatorBuilder() {
    return () => this.fn.apply(this.context, this.args);
  },

  // this is the "public" API for how yieldables resume TaskInstances;
  // this should probably be cleanup / generalized, but until then,
  // we can't change the name.
  proceed(index, yieldResumeType, value) {
    this._state.proceedChecked(index, yieldResumeType, value);
  },

  [yieldableSymbol](parentTaskInstance, resumeIndex) {
    return this._state.onYielded(parentTaskInstance._state, resumeIndex);
  },
}));

export function go(args, fn, attrs = {}) {
  return TaskInstance.create(
    Object.assign({ args, fn, context: this }, attrs)
  )._start();
}

export function wrap(fn, attrs = {}) {
  return function wrappedRunnerFunction(...args) {
    return go.call(this, args, fn, attrs);
  };
}

export default TaskInstance;
