import { set, get, setProperties } from '@ember/object';
import { yieldableSymbol } from './external/yieldables';

import { INITIAL_STATE } from './external/task-instance/initial-state';
import { CancelRequest, CANCEL_KIND_EXPLICIT } from './external/task-instance/cancel-request';
import { BaseTaskInstance } from './external/task-instance/base';

const EXPLICIT_CANCEL_REASON = ".cancel() was explicitly called";

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

class TaskInstance extends BaseTaskInstance {
  constructor(task) {
    this._setState(INITIAL_STATE);
  }

  setState(props) {
    setProperties(this, props);
    let state = this._recomputeState();
    setProperties(this, {
      isRunning: !this.isFinished,
      isDropped: state === 'dropped',
      state,
    });
  }

  _recomputeState() {
    if (this.isDropped) {
      return 'dropped';
    } else
    if (this.isCanceled) {
      if (this.hasStarted) {
        return 'canceled';
      } else {
        return 'dropped';
      }
    } else if (this.isFinished) {
      return 'finished';
    } else if (this.hasStarted) {
      return 'running';
    } else {
      return 'waiting';
    }
  }

  onStarted() {
    this.triggerEvent("started", this);
  }

  onSuccess() {
    this.triggerEvent("succeeded", this);
  }

  onError(error) {
    this.triggerEvent("errored", this, error);
  }

  onCancel(cancelReason) {
    this.triggerEvent("canceled", this, cancelReason);
  }

  formatCancelReason(reason) {
    return `TaskInstance '${this.getName()}' was canceled because ${reason}. For more information, see: http://ember-concurrency.com/docs/task-cancelation-help`;
  }

  getName() {
    if (!this.name) {
      this.name = this.get("task._propertyName") || "<unknown>";
    }
    return this.name;
  }

  selfCancelLoopWarning(parent) {
    let parentName = `\`${parent.getName()}\``;
    let childName = `\`${this.getName()}\``;
    // eslint-disable-next-line no-console
    console.warn(
      `ember-concurrency detected a potentially hazardous "self-cancel loop" between parent task ${parentName} and child task ${childName}. If you want child task ${childName} to be canceled when parent task ${parentName} is canceled, please change \`.perform()\` to \`.linked().perform()\`. If you want child task ${childName} to keep running after parent task ${parentName} is canceled, change it to \`.unlinked().perform()\``
    );
  }

  triggerEvent(...allArgs) {
    if (!this.eventsEnabled) {
      return;
    }

    let taskInstance = this;
    let task = taskInstance.task;
    let host = task.context;
    let eventNamespace = task && task._propertyName;

    if (host && host.trigger && eventNamespace) {
      let [eventType, ...args] = allArgs;
      host.trigger(`${eventNamespace}:${eventType}`, ...args);
    }
  }

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
   * @name state
   * @memberof TaskInstance
   * @instance
   * @readOnly
   */

  /**
   * True if the TaskInstance was canceled before it could
   * ever start running. For example, calling
   * {@linkcode Task#perform .perform()} twice on a
   * task with the {@linkcode TaskProperty#drop .drop()} modifier applied
   * will result in the second task instance being dropped.
   *
   * @name isDropped
   * @memberof TaskInstance
   * @instance
   * @readOnly
   */

  /**
   * True if the task is still running.
   *
   * @name isRunning
   * @memberof TaskInstance
   * @instance
   * @readOnly
   */

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
  toString() {
    return `${this.task} TaskInstance`;
  }

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
  }

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
  }

  /**
   * @method catch
   * @memberof TaskInstance
   * @instance
   * @return {Promise}
   */
  catch(...args) {
    return this._state.promise().catch(...args);
  }

  /**
   * @method finally
   * @memberof TaskInstance
   * @instance
   * @return {Promise}
   */
  finally(...args) {
    return this._state.promise().finally(...args);
  }

  // this is the "public" API for how yieldables resume TaskInstances;
  // this should probably be cleanup / generalized, but until then,
  // we can't change the name.
  proceed(index, yieldResumeType, value) {
    this._state.proceedChecked(index, yieldResumeType, value);
  }

  [yieldableSymbol](parentTaskInstance, resumeIndex) {
    return this._state.onYielded(parentTaskInstance._state, resumeIndex);
  }

  get(key) {
    return get(this, key);
  }

  set(key, value) {
    return set(this, key, value);
  }
}

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
