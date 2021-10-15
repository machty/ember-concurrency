import { TaskGroup as TaskGroupBase } from './external/task/task-group';
import { TASKABLE_MIXIN } from './taskable-mixin';
import { TRACKED_INITIAL_TASK_STATE } from './tracked-state';

/**
 * "Task Groups" provide a means for applying
 * task modifiers to groups of tasks. Once a {@linkcode Task} is declared
 * as part of a group task, modifiers like `drop` or `restartable`
 * will no longer affect the individual `Task`. Instead those
 * modifiers can be applied to the entire group.
 *
 * Turns the decorated property into a task group.
 *
 * Optionally takes a hash of options that will be applied as modifiers to the
 * task group. For instance `maxConcurrency` or `keepLatest`.
 *
 * ```js
 * import Component from '@glimmer/component';
 * import { task, taskGroup } from 'ember-concurrency';
 *
 * class MyComponent extends Component {
 *   &#64;taskGroup({ maxConcurrency: 5 }) chores;
 *
 *   &#64;task({ group: 'chores' })
 *   *mowLawn() {}
 *
 *   &#64;task({ group: 'chores' })
 *   *doDishes() {}
 * }
 * ```
 *
 * <style>
 *  .ignore-this--this-is-here-to-hide-constructor,
 *  #TaskGroup { display: none }
 * </style>
 *
 * @class TaskGroup
 */
export class TaskGroup extends TaskGroupBase {
  /**
   * Cancels all running or queued `TaskInstance`s for this task group.
   * If you're trying to cancel a specific TaskInstance (rather
   * than all of the instances running under this task group) call
   * `.cancel()` on the specific TaskInstance.
   *
   * @method cancelAll
   * @memberof TaskGroup
   * @param options.reason A descriptive reason the task group was
   *   cancelled. Defaults to `".cancelAll() was explicitly called
   *   on the Task"`.
   * @param options.resetState If true, will clear the task group state
   *   (`last*` and `performCount` properties will be set to initial
   *   values). Defaults to false.
   * @instance
   * @async
   *
   */
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
   * `true` if the task is not in the running or queued state.
   *
   * @memberof TaskGroup
   * @member {boolean} isIdle
   * @instance
   * @readOnly
   */
  /**
   * The current state of the task: `"running"`, `"queued"` or `"idle"`.
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
   * The number of times this task has been performed.
   *
   * @memberof TaskGroup
   * @member {number} performCount
   * @instance
   * @readOnly
   */
}

if (TRACKED_INITIAL_TASK_STATE) {
  Object.defineProperties(TaskGroup.prototype, TRACKED_INITIAL_TASK_STATE);
}

Object.assign(TaskGroup.prototype, TASKABLE_MIXIN);
