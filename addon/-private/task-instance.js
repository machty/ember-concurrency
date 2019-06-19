import { not, and } from '@ember/object/computed';
import EmberObject, { computed, get, set } from '@ember/object';
import { yieldableSymbol, RawValue } from './utils';

import { TaskInstanceState, TASK_CANCELATION_NAME } from './external/task-instance-state';
import { INITIAL_STATE } from './task-instance-initial-state';
import { EmberTaskInstanceListener } from './ember-task-instance-listener';

const EXPLICIT_CANCEL_REASON = ".cancel() was explicitly called";

export const PERFORM_TYPE_DEFAULT  = "PERFORM_TYPE_DEFAULT";
export const PERFORM_TYPE_UNLINKED = "PERFORM_TYPE_UNLINKED";
export const PERFORM_TYPE_LINKED   = "PERFORM_TYPE_LINKED";

let TASK_INSTANCE_STACK = [];

export function getRunningInstance() {
  return TASK_INSTANCE_STACK[TASK_INSTANCE_STACK.length - 1];
}

/**
 * Returns true if the object passed to it is a TaskCancelation error.
 * If you call `someTask.perform().catch(...)` or otherwise treat
 * a {@linkcode TaskInstance} like a promise, you may need to
 * handle the cancelation of a TaskInstance differently from
 * other kinds of errors it might throw, and you can use this
 * convenience function to distinguish cancelation from errors.
 *
 * ```js
 * click() {
 *   this.get('myTask').perform().catch(e => {
 *     if (!didCancel(e)) { throw e; }
 *   });
 * }
 * ```
 *
 * @param {Object} error the caught error, which might be a TaskCancelation
 * @returns {Boolean}
 */
export function didCancel(e) {
  return e && e.name === TASK_CANCELATION_NAME;
}

function forwardToInternalPromise(method) {
  return function(...args) {
    this._hasSubscribed = true;
    return this.get('_promise')[method](...args);
  };
}

function spliceSlice(str, index, count, add) {
  return str.slice(0, index) + (add || "") + str.slice(index + count);
}

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
  iterator: null,
  task: null,
  args: [],
  _hasSubscribed: false,
  _debug: false,
  _hasEnabledEvents: false,
  cancelReason: null,
  _performType: PERFORM_TYPE_DEFAULT,
  _expectsLinkedYield: false,
  _tags: null,
  _counted: false,

  init(...args) {
    this._super(...args);
    let listener = new EmberTaskInstanceListener(this);
    let name = get(this, 'task._propertyName') || "<unknown>";
    this._state = new TaskInstanceState(this._generatorBuilder(), name, listener);
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
  state: computed('isDropped', 'isCanceling', 'hasStarted', 'isFinished', function() {
    if (get(this, 'isDropped')) {
      return 'dropped';
    } else if (get(this, 'isCanceling')) {
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
  isDropped: computed('isCanceling', 'hasStarted', function() {
    return get(this, 'isCanceling') && !get(this, 'hasStarted');
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
    let taskString = ""+this.task;
    return spliceSlice(taskString, -1, 0, `.perform()`);
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
    this._state.cancel(cancelReason);
  },

  _promise: computed(function() {
    return this._state.getPromise();
  }),

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
  then: forwardToInternalPromise('then'),

  /**
   * @method catch
   * @memberof TaskInstance
   * @instance
   * @return {Promise}
   */
  catch: forwardToInternalPromise('catch'),

  /**
   * @method finally
   * @memberof TaskInstance
   * @instance
   * @return {Promise}
   */
  finally: forwardToInternalPromise('finally'),

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
    this._state.proceedSafe(index, yieldResumeType, value);
  },

  [yieldableSymbol]: function handleYieldedTaskInstance(parentTaskInstance, resumeIndex) {
    // TODO
    let yieldedTaskInstance = this;
    yieldedTaskInstance._hasSubscribed = true;

    yieldedTaskInstance._onFinalize(() => {
      let state = yieldedTaskInstance._completionState;
      if (state === COMPLETION_SUCCESS) {
        parentTaskInstance.proceed(resumeIndex, YIELDABLE_CONTINUE, yieldedTaskInstance.value);
      } else if (state === COMPLETION_ERROR) {
        parentTaskInstance.proceed(resumeIndex, YIELDABLE_THROW, yieldedTaskInstance.error);
      } else if (state === COMPLETION_CANCEL) {
        parentTaskInstance.proceed(resumeIndex, YIELDABLE_CANCEL, null);
      }
    });

    return function disposeYieldedTaskInstance() {
      if (yieldedTaskInstance._performType !== PERFORM_TYPE_UNLINKED) {
        if (yieldedTaskInstance._performType === PERFORM_TYPE_DEFAULT) {
          let parentObj = get(parentTaskInstance, 'task.context');
          let childObj = get(yieldedTaskInstance, 'task.context');
          if (parentObj && childObj &&
              parentObj !== childObj &&
              parentObj.isDestroying &&
              get(yieldedTaskInstance, 'isRunning')) {
            let parentName = `\`${parentTaskInstance.task._propertyName}\``;
            let childName = `\`${yieldedTaskInstance.task._propertyName}\``;
            // eslint-disable-next-line no-console
            console.warn(`ember-concurrency detected a potentially hazardous "self-cancel loop" between parent task ${parentName} and child task ${childName}. If you want child task ${childName} to be canceled when parent task ${parentName} is canceled, please change \`.perform()\` to \`.linked().perform()\`. If you want child task ${childName} to keep running after parent task ${parentName} is canceled, change it to \`.unlinked().perform()\``);
          }
        }
        yieldedTaskInstance.cancel();
      }
    };
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
