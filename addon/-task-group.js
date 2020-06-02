import { or, bool } from '@ember/object/computed';
import EmberObject from '@ember/object';
import { objectAssign, _ComputedProperty } from './utils';
import TaskStateMixin from './-task-state-mixin';
import { propertyModifiers } from './-property-modifiers-mixin';
import { gte } from 'ember-compatibility-helpers';

/**
 * "Task Groups" provide a means for applying
 * task modifiers to groups of tasks. Once a {@linkcode Task} is declared
 * as part of a group task, modifiers like `drop()` or `restartable()`
 * will no longer affect the individual `Task`. Instead those
 * modifiers can be applied to the entire group.
 *
 * ```js
 * import { task, taskGroup } from 'ember-concurrency';
 *
 * export default Controller.extend({
 *   chores: taskGroup().drop(),
 *
 *   mowLawn:       task(taskFn).group('chores'),
 *   doDishes:      task(taskFn).group('chores'),
 *   changeDiapers: task(taskFn).group('chores')
 * });
 * ```
 *
 *
 * <style>
 *   .ignore-this--this-is-here-to-hide-constructor,
 *   #TaskGroup{ display: none }
 * </style>
 *
 * @class TaskGroup
 */
export const TaskGroup = EmberObject.extend(TaskStateMixin, {
  /**
   * `true` if any current task instances are running.
   *
   * @memberof TaskGroup
   * @member {boolean} isRunning
   * @instance
   * @readOnly
   */

  /**
   * `true` if any future task instances are queued.
   *
   * @memberof TaskGroup
   * @member {boolean} isQueued
   * @instance
   * @readOnly
   */

  /**
   * `true` if the task group is not in the running or queued state.
   *
   * @memberof TaskGroup
   * @member {boolean} isIdle
   * @instance
   * @readOnly
   */

  /**
   * The current state of the task group: `"running"`, `"queued"` or `"idle"`.
   *
   * @memberof TaskGroup
   * @member {string} state
   * @instance
   * @readOnly
   */

  /**
   * The most recently started task instance.
   *
   * @memberof TaskGroup
   * @member {TaskInstance} last
   * @instance
   * @readOnly
   */

  /**
   * The most recent task instance that is currently running.
   *
   * @memberof TaskGroup
   * @member {TaskInstance} lastRunning
   * @instance
   * @readOnly
   */

  /**
   * The most recently performed task instance.
   *
   * @memberof TaskGroup
   * @member {TaskInstance} lastPerformed
   * @instance
   * @readOnly
   */

  /**
   * The most recent task instance that succeeded.
   *
   * @memberof TaskGroup
   * @member {TaskInstance} lastSuccessful
   * @instance
   * @readOnly
   */

  /**
   * The most recently completed task instance.
   *
   * @memberof TaskGroup
   * @member {TaskInstance} lastComplete
   * @instance
   * @readOnly
   */

  /**
   * The most recent task instance that errored.
   *
   * @memberof TaskGroup
   * @member {TaskInstance} lastErrored
   * @instance
   * @readOnly
   */

  /**
   * The most recently canceled task instance.
   *
   * @memberof TaskGroup
   * @member {TaskInstance} lastCanceled
   * @instance
   * @readOnly
   */

  /**
   * The most recent task instance that is incomplete.
   *
   * @memberof TaskGroup
   * @member {TaskInstance} lastIncomplete
   * @instance
   * @readOnly
   */

  /**
   * The number of times this task group has been performed.
   *
   * @memberof TaskGroup
   * @member {number} performCount
   * @instance
   * @readOnly
   */

  /**
   * Cancels all running or queued `TaskInstance`s for this task group.
   * If you're trying to cancel a specific TaskInstance (rather
   * than all of the instances running under this task group) call
   * `.cancel()` on the specific TaskInstance.
   *
   * @method cancelAll
   * @memberof TaskGroup
   * @param {Object} [options]
   * @param {string} [options.reason=.cancelAll() was explicitly called on the Task] - a descriptive reason the task group was cancelled
   * @param {boolean} [options.resetState] - if true, will clear the task group state (`last*` and `performCount` properties will be set to initial values)
   * @instance
   */

  isTaskGroup: true,

  toString() {
    return `<TaskGroup:${this._propertyName}>`;
  },

  _numRunningOrNumQueued: or('numRunning', 'numQueued'),
  isRunning: bool('_numRunningOrNumQueued'),
  isQueued: false,
});

/**
 * "Task Groups" provide a means for applying
 * task modifiers to groups of tasks. Once a {@linkcode Task} is declared
 * as part of a group task, modifiers like `drop()` or `restartable()`
 * will no longer affect the individual `Task`. Instead those
 * modifiers can be applied to the entire group.
 *
 * ```js
 * import { task, taskGroup } from 'ember-concurrency';
 *
 * export default Controller.extend({
 *   chores: taskGroup().drop(),
 *
 *   mowLawn:       task(taskFn).group('chores'),
 *   doDishes:      task(taskFn).group('chores'),
 *   changeDiapers: task(taskFn).group('chores')
 * });
 * ```
 *
 *
 * <style>
 *   .ignore-this--this-is-here-to-hide-constructor,
 *   #TaskGroupProperty{ display: none }
 * </style>
 *
 * @class TaskGroupProperty
 */
export let TaskGroupProperty;

if (gte('3.10.0-alpha.1')) {
  TaskGroupProperty = class {};
} else {
  TaskGroupProperty = class extends _ComputedProperty {};
}

/**
 * Configures the task group to cancel old currently task
 * instances to make room for a new one to perform. Sets
 * default maxConcurrency to 1.
 *
 * [See the Live Example](/#/docs/examples/route-tasks/1)
 *
 * @method restartable
 * @memberof TaskGroupProperty
 * @instance
 */

/**
 * Configures the task group to run task instances
 * one-at-a-time in the order they were `.perform()`ed.
 * Sets default maxConcurrency to 1.
 *
 * @method enqueue
 * @memberof TaskGroupProperty
 * @instance
 */

/**
 * Configures the task group to immediately cancel (i.e.
 * drop) any task instances performed when the task group
 * is already running at maxConcurrency. Sets default
 * maxConcurrency to 1.
 *
 * @method drop
 * @memberof TaskGroupProperty
 * @instance
 */

/**
 * Configures the task group to drop all but the most
 * recently performed {@linkcode TaskInstance }.
 *
 * @method keepLatest
 * @memberof TaskGroupProperty
 * @instance
 */

/**
 * Sets the maximum number of task instances that are
 * allowed to run in this task group at the same time.
 * By default, with no task modifiers applied, this number
 * is Infinity (there is no limit to the number of tasks
 * that can run at the same time).
 * {@linkcode TaskGroupProperty#restartable .restartable()},
 * {@linkcode TaskGroupProperty#enqueue .enqueue()}, and
 * {@linkcode TaskGroupProperty#drop .drop()} set the
 * default maxConcurrency to 1, but you can override this
 * value to set the maximum number of concurrently running
 * tasks to a number greater than 1.
 *
 * [See the AJAX Throttling example](/#/docs/examples/ajax-throttling)
 *
 * The example below uses a task group with `maxConcurrency(3)`
 * to limit the number of concurrent AJAX requests (for anyone
 * using tasks in this group) to 3.
 *
 * ```js
 * ajax: taskGroup().maxConcurrency(3),
 *
 * doSomeAjax: task(function * (url) {
 *   return Ember.$.getJSON(url).promise();
 * }).group('ajax'),
 *
 * doSomeAjax: task(function * (url) {
 *   return Ember.$.getJSON(url).promise();
 * }).group('ajax'),
 *
 * elsewhere() {
 *   this.get('doSomeAjax').perform("http://www.example.com/json");
 * },
 * ```
 *
 * @method maxConcurrency
 * @memberof TaskGroupProperty
 * @param {Number} n The maximum number of concurrently running tasks
 * @instance
 */


objectAssign(TaskGroupProperty.prototype, propertyModifiers);
