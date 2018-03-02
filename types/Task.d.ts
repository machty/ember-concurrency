import RSVP from "rsvp";
import ComputedProperty from '@ember/object/computed'

export class TaskProperty<T> extends ComputedProperty<T>{
    /**
     * This behaves like the {@linkcode TaskProperty#on task(...).on() modifier},
     * but instead will cause the task to be canceled if any of the
     * specified events fire on the parent object.
     *
     * [See the Live Example](/#/docs/examples/route-tasks/1)
     *
     */
    cancelOn(...eventNames: string[]): this;

    /**
     * Logs lifecycle events to aid in debugging unexpected
     * Task behavior. Presently only logs cancelation events
     * and the reason for the cancelation, e.g. "TaskInstance
     * 'doStuff' was canceled because the object it lives on
     * was destroyed or unrendered"
     */
    debug(): this;
    drop(): this;
    enqueue(): this;
    group(groupPath: any): this;
    keepLatest(): this;
    maxConcurrency(n: number): this;
    on(...eventNames: string[]): this;
    restartable(): this;
}
export type TaskState = 'dropped' | 'cancelled' | 'finished' | 'running' | 'waiting';
export class TaskInstance<T> extends RSVP.Promise<T> {
    /** If this TaskInstance is canceled or throws an error (or yields a promise that rejects), this property will be set with that error. Otherwise, it is null. */
    readonly error?: Error;

    /** True if the task instance has started, else false. */
    readonly hasStarted: ComputedProperty<boolean>;

    /** True if the task instance was canceled before it could run to completion. */
    readonly isCancelled: ComputedProperty<boolean>;

    /** True if the TaskInstance was canceled before it could ever start running.
     * For example, calling .perform() twice on a task with the .drop() modifier
     * applied will result in the second task instance being dropped.
     */
    readonly isDropped?: ComputedProperty<boolean>;

    /** True if the task instance resolves to a rejection. */
    readonly isError?: ComputedProperty<boolean>;

    /** True if the task has run to completion. */
    readonly isFinished: ComputedProperty<boolean>;

    /** True if the task is still running. */
    readonly isRunning: ComputedProperty<boolean>;

    /** True if the task instance is fulfilled. */
    readonly isSuccessful: boolean;

    /** Describes the state that the task instance is in. Can be used for debugging, or potentially driving some UI state. */
    readonly state: TaskState;

    /** If this TaskInstance runs to completion by returning a property other than a rejecting promise, this property will be set with that value. */
    readonly value: T;

    /** Cancels the task instance. Has no effect if the task instance has already been canceled or has already finished running. */
    cancel(): void;
}

export class Task<T, P> extends TaskProperty<T> {
    /** true if the task is not in the running or queued state. */
    readonly isIdle: boolean;
    /** true if any future task instances are queued. */
    readonly isQueued: boolean;
    /** true if any current task instances are running. */
    readonly isRunning: boolean;

    /** The most recently started task instance. */
    readonly last?: TaskInstance<T>;

    /** The most recently canceled task instance. */
    readonly lastCancelled?: TaskInstance<T>;

    /** The most recently completed task instance. */
    readonly lastComplete?: TaskInstance<T>;

    /** The most recent task instance that errored. */
    readonly lastErrored?: TaskInstance<T>;

    /** The most recent task instance that is incomplete. */
    readonly lastIncomplete?: TaskInstance<T>;

    /** The most recently performed task instance. */
    readonly lastPerformed?: TaskInstance<T>;

    /** The most recent task instance that is currently running. */
    readonly lastRunning?: TaskInstance<T>;

    /** The most recent task instance that succeeded. */
    readonly lastSucessful?: TaskInstance<T>;

    /** The number of times this task has been performed. */
    readonly performCount: number;

    /** The current state of the task: "running", "queued" or "idle". */
    readonly state: 'running' | 'queued' | 'idle';

    /**
     * Cancels all running or queued TaskInstances for this Task.
     * If you're trying to cancel a specific TaskInstance (rather than all of
     * the instances running under this task) call .cancel() on the specific
     * TaskInstance.
     */
    cancelAll(): void;

    /**
     * Creates a new TaskInstance and attempts to run it right away.
     * If running this task instance would increase the task's concurrency
     * to a number greater than the task's maxConcurrency, this task instance
     * might be immediately canceled (dropped), or enqueued to run at later
     * time, after the currently running task(s) have finished.
     * @param arg args to pass to the task function
     */
    perform(...arg: any[]): void;
}
