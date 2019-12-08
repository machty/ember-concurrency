import { getOwner, setOwner } from '@ember/application';
import { Task as BaseTask } from "./external/task/task";
import { INVOKE } from "./utils";
import { TaskInstance } from './task-instance';
import { PERFORM_TYPE_DEFAULT, TaskInstanceExecutor, PERFORM_TYPE_LINKED } from "./external/task-instance/executor";
import { EMBER_ENVIRONMENT } from "./ember-environment";
import { TASKABLE_MIXIN } from "./taskable-mixin";
import { CANCEL_KIND_LIFESPAN_END } from "./external/task-instance/cancelation";
import { cleanupOnDestroy } from "./external/lifespan";

export class Task extends BaseTask {
  constructor(options) {
    super(options);
    this.setState({}); // TODO: double check this is necessary

    cleanupOnDestroy(this.context, this, 'willDestroy', 'cancelAll', {
      reason: 'the object it lives on was destroyed or unrendered',
      cancelRequestKind: CANCEL_KIND_LIFESPAN_END,
    });
  }

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

  _perform(...args) {
    return this._performShared(args, PERFORM_TYPE_DEFAULT, null);
  }

  _performShared(args, performType, linkedObject) {
    let fullArgs = this._curryArgs ? [...this._curryArgs, ...args] : args;
    let generatorFactory = () => this.generatorFactory(fullArgs);

    let taskInstance = new TaskInstance({
      task: this,
      args: fullArgs,
      executor: new TaskInstanceExecutor({
        generatorFactory,
        env: EMBER_ENVIRONMENT,
        debug: this.debug,
      }),
      performType,
      hasEnabledEvents: this.hasEnabledEvents,
    });

    setOwner(taskInstance, getOwner(this.context));

    if (performType === PERFORM_TYPE_LINKED) {
      linkedObject._expectsLinkedYield = true;
    }

    if (this.context.isDestroying) {
      // TODO: express this in terms of lifetimes; a task linked to
      // a dead lifetime should immediately cancel.
      taskInstance.cancel();
    }

    this.scheduler.perform(taskInstance);
    return taskInstance;
  }

  _curry(...args) {
    let task = this._clone();
    task._curryArgs = [...(this._curryArgs || []), ...args];
    return task;
  }

  _clone() {
    return new Task(this.options);
  }

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

  [INVOKE](...args) {
    return this.perform(...args);
  }
}

Object.assign(Task.prototype, TASKABLE_MIXIN);

export class EncapsulatedTask extends Task {}
