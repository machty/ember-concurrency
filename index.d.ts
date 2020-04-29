declare module 'ember-concurrency' {
  import Task from 'ember-concurrency/task';

  type TaskDecorator = PropertyDecorator & {
    drop(): TaskDecorator;
    keepLatest(): TaskDecorator;
    restartable(): TaskDecorator;
    maxConcurrency(num: number): TaskDecorator;
    enqueue(): TaskDecorator;
    withTestWaiter(): PropertyDecorator;
  };

  export function task(
    generator: Function
  ): PropertyDecorator & {
    drop(): TaskDecorator;
    keepLatest(): TaskDecorator;
    restartable(): TaskDecorator;
    maxConcurrency(num: number): TaskDecorator;
    enqueue(): TaskDecorator;
    withTestWaiter(): PropertyDecorator;
  };
  export function timeout(wait: number): Promise<void>;

  export function didCancel(error: Error): boolean;
}

declare module 'ember-concurrency/task' {
  import TaskInstance from 'ember-concurrency/task-instance';

  export enum TaskState {
    RUNNING = 'running',
    QUEUED = 'queued',
    IDLE = 'idle',
  }

  /**
   * The `Task` object lives on a host Ember object (e.g.
   * a Component, Route, or Controller). You call the
   * `.perform()` method on this object
   * to create run individual `TaskInstance`s,
   * and at any point, you can call the `.cancelAll()`
   * method on this object to cancel all running or enqueued
   * `TaskInstance`s.
   */
  export default class Task<PerformArgs extends any[] = any[], PerformReturn = void> {
    /**
     * `true` if any current task instances are running.
     */
    readonly isRunning: boolean;

    /**
     * `true` if any future task instances are queued.
     */
    readonly isQueued: boolean;

    /**
     * `true` if the task is not in the running or queued state.
     */
    readonly isIdle: boolean;

    /**
     * The current state of the task: `"running"`, `"queued"` or `"idle"`.
     */
    readonly state: TaskState;

    /**
     * The most recently started task instance.
     */
    readonly last: TaskInstance<PerformArgs, PerformReturn>;

    /**
     * The most recent task instance that is currently running.
     */
    readonly lastRunning: TaskInstance<PerformArgs, PerformReturn>;

    /**
     * The most recently performed task instance.
     */
    readonly lastPerformed: TaskInstance<PerformArgs, PerformReturn>;

    /**
     * The most recent task instance that succeeded.
     */
    readonly lastSuccessful: TaskInstance<PerformArgs, PerformReturn>;

    /**
     * The most recently completed task instance.
     */
    readonly lastComplete: TaskInstance<PerformArgs, PerformReturn>;

    /**
     * The most recent task instance that errored.
     */
    readonly lastErrored: TaskInstance<PerformArgs, PerformReturn>;

    /**
     * The most recently canceled task instance.
     */
    readonly lastCanceled: TaskInstance<PerformArgs, PerformReturn>;

    /**
     * The most recent task instance that is incomplete.
     */
    readonly lastIncompleted: TaskInstance<PerformArgs, PerformReturn>;

    /**
     * The number of times this task has been performed.
     */
    readonly performCount: number;

    readonly numRunning: number;
    readonly numQueued: number;

    /**
     * alias for `numRunning`
     */
    readonly concurrency: number;

    readonly context: any;

    readonly name: string;

    perform(...args: PerformArgs): TaskInstance<PerformArgs, PerformReturn>;

    /**
     * Cancels all running or queued `TaskInstance`s for this Task.
     * If you're trying to cancel a specific TaskInstance (rather
     * than all of the instances running under this task) call
     * `.cancel()` on the specific TaskInstance.
     */
    cancelAll(): void;
  }
}

declare module 'ember-concurrency/task-instance' {
  import Task from 'ember-concurrency/task';

  export enum TaskInstanceState {
    /** task instance was canceled before it started */
    DROPPED = 'dopped',

    /** task instance was canceled before it could finish */
    CANCELED = 'canceled',

    /** task instance ran to completion (even if an exception was thrown) */
    FINISHED = 'finished',

    /** task instance is currently running (returns true even if is paused on a yielded promise) */
    RUNNING = 'running',

    /** task instance hasn't begun running yet (usually because the task is using the `TaskProperty#enqueue` task modifier) */
    WAITING = 'waiting',
  }

  /**
   * A `TaskInstance` represent a single execution of a
   * `Task`. Every call to `Task#perform` returns
   * a `TaskInstance`. `TaskInstance`s are cancelable, either explicitly
   * via `TaskInstance#cancel` or `Task#cancelAll`,
   * or automatically due to the host object being destroyed, or
   * because concurrency policy enforced by a
   * `TaskProperty` Modifier canceled the task instance.
   */
  export default class TaskInstance<Args extends any[] = any[], Return = void> {
    /**
     * If this TaskInstance runs to completion by returning a property
     * other than a rejecting promise, this property will be set
     * with that value.
     */
    readonly value: Return;

    /**
     * If this TaskInstance is canceled or throws an error (or yields
     * a promise that rejects), this property will be set with that error.
     * Otherwise, it is null.
     */
    readonly error: any;

    /**
     * `true` if the task instance is fulfilled.
     */
    readonly isSuccessful: boolean;

    /**
     * `true` if the task instance resolves to a rejection.
     */
    readonly isError: boolean;

    /**
     * `true` if the task instance was canceled before it could run to completion.
     */
    readonly isCanceled: boolean;

    /**
     * `true` if the task instance is canceling.
     */
    readonly isCanceling: boolean;

    /**
     * `true` if the task instance has started, else false.
     */
    readonly hasStarted: boolean;

    /**
     * `true` if the task has run to completion.
     */
    readonly isFinished: boolean;

    /**
     * `true` if the task is still running.
     */
    readonly isRunning: boolean;

    /**
     * Describes the state that the task instance is in. Can be used for debugging,
     * or potentially driving some UI state. Possible values are:
     *
     * - `"dropped"`: task instance was canceled before it started
     * - `"canceled"`: task instance was canceled before it could finish
     * - `"finished"`: task instance ran to completion (even if an exception was thrown)
     * - `"running"`: task instance is currently running (returns true even if is paused on a yielded promise)
     * - `"waiting"`: task instance hasn't begun running yet (usually because the task is using the `TaskProperty#enqueue` task modifier)
     *
     * The animated timeline examples on the [Task Concurrency](http://ember-concurrency.com/docs/task-concurrency)
     * docs page make use of this property.
     */
    readonly state: TaskInstanceState;

    task: Task<Args, Return>;

    cancel(reason?: string): void;

    /**
     * Returns a promise that resolves with the value returned
     * from the task's (generator) function, or rejects with
     * either the exception thrown from the task function, or
     * an error with a `.name` property with value `"TaskCancelation"`.
     */
    then<ThenReturn = void, ErrorReturn = void>(
      cb?: (result: Return) => ThenReturn,
      error?: (value: Error) => ErrorReturn
    ): Promise<ThenReturn>;

    catch(cb?: (value: Error) => void): Promise<void>;

    finally(cb?: () => void): Promise<void>;
  }
}
