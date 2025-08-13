import { isDestroying, registerDestructor } from '@ember/destroyable';
import { CANCEL_KIND_LIFESPAN_END } from './external/task-instance/cancelation';
import { Task as BaseTask } from './external/task/task';
import { TaskInstance } from './task-instance';
import { TASKABLE_MIXIN } from './taskable-mixin';
import { TRACKED_INITIAL_TASK_STATE } from './tracked-state';

/**
  The `Task` object lives on a host Ember object (e.g.
  a Component, Route, or Controller). You call the
  {@linkcode Task#perform .perform()} method on this object
  to create run individual {@linkcode TaskInstance}s,
  and at any point, you can call the {@linkcode Task#cancelAll .cancelAll()}
  method on this object to cancel all running or enqueued
  {@linkcode TaskInstance}s.

  <style>
    .ignore-this--this-is-here-to-hide-constructor,
    #Task { display: none }
  </style>

  @class Task
*/
export class Task extends BaseTask {
  /**
   * `true` if any current task instances are running.
   *
   * @memberof Task
   * @member {boolean} isRunning
   * @instance
   * @readOnly
   */
  /**
   * `true` if any future task instances are queued.
   *
   * @memberof Task
   * @member {boolean} isQueued
   * @instance
   * @readOnly
   */
  /**
   * `true` if the task is not in the running or queued state.
   *
   * @memberof Task
   * @member {boolean} isIdle
   * @instance
   * @readOnly
   */
  /**
   * The current state of the task: `"running"`, `"queued"` or `"idle"`.
   *
   * @memberof Task
   * @member {string} state
   * @instance
   * @readOnly
   */
  /**
   * The most recently started task instance.
   *
   * @memberof Task
   * @member {TaskInstance} last
   * @instance
   * @readOnly
   */
  /**
   * The most recent task instance that is currently running.
   *
   * @memberof Task
   * @member {TaskInstance} lastRunning
   * @instance
   * @readOnly
   */
  /**
   * The most recently performed task instance.
   *
   * @memberof Task
   * @member {TaskInstance} lastPerformed
   * @instance
   * @readOnly
   */
  /**
   * The most recent task instance that succeeded.
   *
   * @memberof Task
   * @member {TaskInstance} lastSuccessful
   * @instance
   * @readOnly
   */
  /**
   * The most recently completed task instance.
   *
   * @memberof Task
   * @member {TaskInstance} lastComplete
   * @instance
   * @readOnly
   */
  /**
   * The most recent task instance that errored.
   *
   * @memberof Task
   * @member {TaskInstance} lastErrored
   * @instance
   * @readOnly
   */
  /**
   * The most recently canceled task instance.
   *
   * @memberof Task
   * @member {TaskInstance} lastCanceled
   * @instance
   * @readOnly
   */
  /**
   * The most recent task instance that is incomplete.
   *
   * @memberof Task
   * @member {TaskInstance} lastIncomplete
   * @instance
   * @readOnly
   */
  /**
   * The number of times this task has been performed.
   *
   * @memberof Task
   * @member {number} performCount
   * @instance
   * @readOnly
   */

  constructor(options) {
    super(options);

    if (!isDestroying(this.context)) {
      registerDestructor(this.context, () => {
        this.cancelAll({
          reason: 'the object it lives on was destroyed or unrendered',
          cancelRequestKind: CANCEL_KIND_LIFESPAN_END,
        });
      });
    }
  }

  /**
   * Flags the task as linked to the parent task's lifetime. Must be called
   * within another task's perform function. The task will be cancelled if the
   * parent task is canceled as well.
   *
   * ember-concurrency will indicate when this may be needed.
   *
   * @method linked
   * @memberof Task
   * @instance
   *
   */

  /**
   * Flags the task as not linked to the parent task's lifetime. Must be called
   * within another task's perform function. The task will NOT be cancelled if the
   * parent task is canceled.
   *
   * This is useful for avoiding the so-called "self-cancel loop" for tasks.
   * ember-concurrency will indicate when this may be needed.
   *
   * @method unlinked
   * @memberof Task
   * @instance
   *
   */

  /**
   * Creates a new {@linkcode TaskInstance} and attempts to run it right away.
   * If running this task instance would increase the task's concurrency
   * to a number greater than the task's maxConcurrency, this task
   * instance might be immediately canceled (dropped), or enqueued
   * to run at later time, after the currently running task(s) have finished.
   *
   * @method perform
   * @memberof Task
   * @param {*} arg* - args to pass to the task function
   * @instance
   *
   * @fires TaskInstance#TASK_NAME:started
   * @fires TaskInstance#TASK_NAME:succeeded
   * @fires TaskInstance#TASK_NAME:errored
   * @fires TaskInstance#TASK_NAME:canceled
   *
   */

  /**
   * Cancels all running or queued `TaskInstance`s for this Task.
   * If you're trying to cancel a specific TaskInstance (rather
   * than all of the instances running under this task) call
   * `.cancel()` on the specific TaskInstance.
   *
   * @method cancelAll
   * @memberof Task
   * @param options.reason A descriptive reason the task was
   *   cancelled. Defaults to `".cancelAll() was explicitly called
   *   on the Task"`.
   * @param options.resetState If true, will clear the task state
   *   (`last*` and `performCount` properties will be set to initial
   *   values). Defaults to false.
   * @instance
   * @async
   *
   */

  get _isAlive() {
    return !isDestroying(this.context);
  }

  _taskInstanceFactory(args, performType, linkedObject) {
    let options = this._taskInstanceOptions(args, performType, linkedObject);
    options.task = this;
    let taskInstance = new TaskInstance(options);
    return taskInstance;
  }

  _clone() {
    return new Task({
      context: this.context,
      debug: this.debug,
      env: this.env,
      generatorFactory: this.generatorFactory,
      group: this.group,
      hasEnabledEvents: this.hasEnabledEvents,
      name: this.name,
      onStateCallback: this.onStateCallback,
      scheduler: this.scheduler,
    });
  }
}

if (TRACKED_INITIAL_TASK_STATE) {
  Object.defineProperties(Task.prototype, TRACKED_INITIAL_TASK_STATE);
}

Object.assign(Task.prototype, TASKABLE_MIXIN);
