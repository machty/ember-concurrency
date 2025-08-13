export type AsyncArrowTaskFunction<HostObject, T, Args extends any[]> = (
  this: HostObject,
  ...args: Args
) => Promise<T>;

export type AsyncTaskArrowFunctionArgs<
  HostObject,
  T extends AsyncArrowTaskFunction<HostObject, any, any[]>,
> = T extends (...args: infer A) => Promise<any> ? A : [];

export type AsyncTaskArrowFunctionReturnType<
  HostObject,
  T extends AsyncArrowTaskFunction<HostObject, any, any[]>,
> = T extends (...args: any[]) => Promise<infer R> ? R : unknown;

export type TaskForAsyncTaskFunction<
  HostObject,
  T extends AsyncArrowTaskFunction<HostObject, any, any[]>,
> = Task<
  AsyncTaskArrowFunctionReturnType<HostObject, T>,
  AsyncTaskArrowFunctionArgs<HostObject, T>
>;

export type TaskInstanceForAsyncTaskFunction<
  HostObject,
  T extends AsyncArrowTaskFunction<HostObject, any, any[]>,
> = TaskInstance<AsyncTaskArrowFunctionReturnType<HostObject, T>>;

interface TaskState<T extends TaskInstance<any>> {
  /**
   * `true` if any current task instances are running.
   */
  readonly isRunning: boolean;

  /**
   * `true` if any future task instances are queued.
   */
  readonly isQueued: boolean;

  /**
   * `true` if the task or task group is not in the running or queued state.
   */
  readonly isIdle: boolean;

  /**
   * The current state of the task or task group: `"running"`, `"queued"` or `"idle"`.
   */
  readonly state: 'running' | 'queued' | 'idle';

  /**
   * The most recently started task instance.
   */
  readonly last: T | null;

  /**
   * The most recent task instance that is currently running.
   */
  readonly lastRunning: T | null;

  /**
   * The most recently performed task instance.
   */
  readonly lastPerformed: T | null;

  /**
   * The most recent task instance that succeeded.
   */
  readonly lastSuccessful: T | null;

  /**
   * The most recently completed task instance.
   */
  readonly lastComplete: T | null;

  /**
   * The most recent task instance that errored.
   */
  readonly lastErrored: T | null;

  /**
   * The most recently canceled task instance.
   */
  readonly lastCanceled: T | null;

  /**
   * The most recent task instance that is incomplete.
   */
  readonly lastIncomplete: T | null;

  /**
   * The number of times this task or task group has been performed.
   */
  readonly performCount: number;
}

interface AbstractTask<Args extends any[], T extends TaskInstance<any>>
  extends TaskState<T> {
  /**
   * Cancels all running or queued `TaskInstance`s for this Task.
   * If you're trying to cancel a specific TaskInstance (rather
   * than all of the instances running under this task) call
   * `.cancel()` on the specific TaskInstance.
   *
   * @param options.reason A descriptive reason the task was
   *   cancelled. Defaults to `".cancelAll() was explicitly called
   *   on the Task"`.
   * @param options.resetState If true, will clear the task state
   *   (`last*` and `performCount` properties will be set to initial
   *   values). Defaults to false.
   */
  cancelAll(options?: { reason?: string; resetState?: boolean }): Promise<void>;

  /**
   * Creates a new {@linkcode TaskInstance} and attempts to run it right away.
   * If running this task instance would increase the task's concurrency
   * to a number greater than the task's maxConcurrency, this task
   * instance might be immediately canceled (dropped), or enqueued
   * to run at later time, after the currently running task(s) have finished.
   *
   * @param args Arguments to pass to the task function.
   */
  perform(...args: Args): T;

  /**
   * Flags the task as linked to the parent task's lifetime. Must be called
   * within another task's perform function. The task will be cancelled if the
   * parent task is canceled as well.
   *
   * ember-concurrency will indicate when this may be needed.
   */
  linked(): this;

  /**
   * Flags the task as not linked to the parent task's lifetime. Must be called
   * within another task's perform function. The task will NOT be cancelled if the
   * parent task is canceled.
   *
   * This is useful for avoiding the so-called "self-cancel loop" for tasks.
   * ember-concurrency will indicate when this may be needed.
   */
  unlinked(): this;
}

/**
 * The `Task` object lives on a host Ember object (e.g.
 * a Component, Route, or Controller). You call the
 * {@linkcode Task#perform .perform()} method on this object
 * to create run individual {@linkcode TaskInstance}s,
 * and at any point, you can call the {@linkcode Task#cancelAll .cancelAll()}
 * method on this object to cancel all running or enqueued
 * {@linkcode TaskInstance}s.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Task<T, Args extends any[]>
  extends AbstractTask<Args, TaskInstance<T>> {}

/**
 * A `TaskInstance` represent a single execution of a
 * {@linkcode Task}. Every call to {@linkcode Task#perform} returns
 * a `TaskInstance`.
 *
 * `TaskInstance`s are cancelable, either explicitly
 * via {@linkcode TaskInstance#cancel} or {@linkcode Task#cancelAll},
 * or automatically due to the host object being destroyed, or
 * because concurrency policy enforced by a
 * {@linkcode TaskProperty Task Modifier} canceled the task instance.
 */
export interface TaskInstance<T> extends Promise<T> {
  /**
   * If this TaskInstance runs to completion by returning a property
   * other than a rejecting promise, this property will be set
   * with that value.
   */
  readonly value: T | null;

  /**
   * If this TaskInstance is canceled or throws an error (or yields
   * a promise that rejects), this property will be set with that error.
   * Otherwise, it is null.
   */
  readonly error: unknown;

  /**
   * True if the task instance is fulfilled.
   */
  readonly isSuccessful: boolean;

  /**
   * True if the task instance resolves to a rejection.
   */
  readonly isError: boolean;

  /**
   * True if the task instance was canceled before it could run to completion.
   */
  readonly isCanceled: boolean;

  /**
   * True if the task instance has started, else false.
   */
  readonly hasStarted: boolean;

  /**
   * True if the task has run to completion.
   */
  readonly isFinished: boolean;

  /**
   * True if the task is still running.
   */
  readonly isRunning: boolean;

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
   *     because the task is using the {@linkcode TaskProperty#enqueue enqueue}
   *     task modifier)
   *
   * The animated timeline examples on the [Task Concurrency](/docs/task-concurrency)
   * docs page make use of this property.
   */
  readonly state: 'dropped' | 'canceled' | 'finished' | 'running' | 'waiting';

  /**
   * True if the TaskInstance was canceled before it could
   * ever start running. For example, calling
   * {@linkcode Task#perform .perform()} twice on a
   * task with the {@linkcode TaskProperty#drop .drop} modifier applied
   * will result in the second task instance being dropped.
   */
  readonly isDropped: boolean;

  /**
   * Cancels the task instance. Has no effect if the task instance has
   * already been canceled or has already finished running.
   *
   * @param cancelReason Defaults to `".cancel() was explicitly called"`.
   */
  cancel(cancelReason?: string): Promise<void>;

  /**
   * Returns a promise that resolves with the value returned
   * from the task's function, or rejects with
   * either the exception thrown from the task function, or
   * an error with a `.name` property with value `"TaskCancelation"`.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null,
  ): Promise<TResult1 | TResult2>;

  catch<TResult = never>(
    onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null,
  ): Promise<T | TResult>;

  finally(onfinally?: (() => void) | null): Promise<T>;
}

interface OnStateCallback<T> {
  (state: TaskState<TaskInstance<any>>, taskable: T): void;
}

// This intermediate interface is necessary because
// `interface MyThing<T> extends T {}` is not allowed
interface _AbstractTaskProperty<T extends Task<any, any[]>> {
  /**
   * Calling `task(...).on(eventName)` configures the task to be
   * automatically performed when the specified events fire. In
   * this way, it behaves like
   * [Ember.on](http://emberjs.com/api/classes/Ember.html#method_on).
   *
   * You can use `task(...).on('init')` to perform the task
   * when the host object is initialized.
   *
   * ```js
   * export default class MyComponent extends Component {
   *   pollForUpdates = task(async () => {
   *     // ... this runs when the Component is first created
   *     // because we specified .on('init')
   *   }).on('init');
   *
   *   handleFoo = task(async (a, b, c) => {
   *     // this gets performed automatically if the 'foo'
   *     // event fires on this Component,
   *     // e.g., if someone called component.trigger('foo')
   *   }).on('foo');
   * }
   * ```
   *
   */
  on(...eventNames: string[]): this;

  /**
   * This behaves like the {@linkcode TaskProperty#on task(...).on() modifier},
   * but instead will cause the task to be canceled if any of the
   * specified events fire on the parent object.
   *
   * [See the Live Example](/docs/examples/route-tasks/1)
   */
  cancelOn(...eventNames: string[]): this;

  /**
   * This behaves like the {@linkcode TaskProperty#on task(...).on() modifier},
   * but instead will cause the task to be performed if any of the
   * specified properties on the parent object change.
   */
  observes(...keys: string[]): this;

  /**
   * Configures the task to cancel old currently task instances
   * to make room for a new one to perform. Sets default
   * maxConcurrency to 1.
   *
   * [See the Live Example](/docs/examples/route-tasks/1)
   */
  restartable(): this;

  /**
   * Configures the task to run task instances one-at-a-time in
   * the order they were `.perform()`ed. Sets default
   * maxConcurrency to 1.
   */
  enqueue(): this;

  /**
   * Configures the task to immediately cancel (i.e. drop) any
   * task instances performed when the task is already running
   * at maxConcurrency. Sets default maxConcurrency to 1.
   */
  drop(): this;

  /**
   * Configures the task to drop all but the most recently
   * performed {@linkcode TaskInstance}.
   */
  keepLatest(): this;

  /**
   * Sets the maximum number of task instances that are allowed
   * to run at the same time. By default, with no task modifiers
   * applied, this number is Infinity (there is no limit
   * to the number of tasks that can run at the same time).
   * {@linkcode TaskProperty#restartable restartable},
   * {@linkcode TaskProperty#enqueue enqueue}, and
   * {@linkcode TaskProperty#drop drop} set the default
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
   *   this.get('doSomeAjax').perform("http://www.example.com/json");
   * },
   * ```
   *
   * @param n The maximum number of concurrently running tasks.
   */
  maxConcurrency(n: number): this;

  /**
   * Logs lifecycle events to aid in debugging unexpected Task behavior.
   * Presently only logs cancelation events and the reason for the cancelation,
   * e.g. "TaskInstance 'doStuff' was canceled because the object it lives on was destroyed or unrendered"
   */
  debug(): this;

  /**
   * Configures the task to call the passed in callback for derived state updates,
   * overriding the default derived state tracking. You may call with `null` to
   * completely opt-out of derived state tracking.
   *
   * @param {function?} callback Callback to be called. Receives an object argument with the new state.
   * @instance
   */
  onState(callback: OnStateCallback<T> | null): this;
}

type AbstractTaskProperty<T extends Task<any, any[]>> = T &
  _AbstractTaskProperty<T>;

/**
 * A {@link TaskProperty} is the Computed Property-like object returned
 * from the {@linkcode task} function. You can call Task Modifier methods
 * on this object to configure the behavior of the {@link Task}.
 *
 * See [Managing Task Concurrency](/docs/task-concurrency) for an
 * overview of all the different task modifiers you can use and how
 * they impact automatic cancelation / enqueueing of task instances.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TaskProperty<T, Args extends any[]>
  extends AbstractTaskProperty<Task<T, Args>> {}

export type TaskCancelation = Error & { name: 'TaskCancelation' };

/**
 * Registers a new modifier with the modifier registry
 */
export function registerModifier(
  name: string,
  definition: TaskModifier<any, any[]>,
): void;

/**
 * Returns a specified modifier, if it exists in the registry
 */
export function getModifier(
  name: string,
): TaskModifier<unknown, unknown[]> | null;

/**
 * Returns whether a specified modifier exists in the registry
 */
export function hasModifier(name: string): boolean;

export interface YieldableState {
  /**
   * Return yielded TaskInstance. Useful for introspection on instance state.
   * @method getTaskInstance
   * @memberof YieldableState
   */
  getTaskInstance(): TaskInstance<any>;

  /**
   * Cancel the yielded TaskInstance.
   * @method cancel
   * @memberof YieldableState
   */
  cancel(): void;

  /**
   * Cause the TaskInstance to return from its yield with an optional value,
   * and continue executing.
   * @method next
   * @param value
   */
  next(value: any): void;

  /**
   * Short-circuit TaskInstance execution and have it return with an optional
   * value.
   * @param value
   */
  return(value: any): void;

  /**
   * Raise a given error within the given task instance and halt execution
   * @param error
   */
  throw(error: any): void;
}

export abstract class Yieldable<T> implements PromiseLike<T> {
  /**
   * Defines what happens when the task encounters `yield myYieldable` and returns
   * a disposer function that handles any cleanup.
   *
   * The state parameter is provided by the runtime, and provides operations for
   * interacting with the yielding task instance and advancing, returning,
   * throwing, or canceling its execution.
   *
   * @param {YieldableState} state
   */
  abstract onYield(state: YieldableState): () => void;

  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null,
  ): Promise<TResult1 | TResult2>;

  catch<TResult = never>(
    onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null,
  ): Promise<T | TResult>;

  finally(onfinally?: (() => void) | null): Promise<T>;
}

type Evented =
  | {
      on(event: string, callback: (...args: any[]) => void): void;
      off(event: string, callback: (...args: any[]) => void): void;
    }
  | {
      one(event: string, callback: (...args: any[]) => void): void;
    }
  | {
      addEventListener(event: string, callback: (...args: any[]) => void): void;
      removeEventListener(
        event: string,
        callback: (...args: any[]) => void,
      ): void;
    };

type Resolved<T> = T extends PromiseLike<infer R> ? R : T;

type Settlement<T> =
  | { state: 'fulfilled'; value: T }
  | { state: 'rejected'; reason: any };

type Settled<T> = Settlement<Resolved<T>>;

// Decorator option types from ember-concurrency-decorators
// eslint-disable-next-line @typescript-eslint/ban-types
type OptionsFor<T extends object> = {
  [K in OptionKeysFor<T>]?: OptionTypeFor<T, T[K]>;
};

// eslint-disable-next-line @typescript-eslint/ban-types
type OptionKeysFor<T extends object> = {
  [K in keyof T]: OptionKeyFor<T, K, T[K]>;
}[keyof T];

type OptionKeyFor<T, K, F> = F extends (...args: any[]) => T ? K : never;

type OptionTypeFor<T, F> = F extends (...args: infer Args) => T
  ? Args[0] extends undefined
    ? true
    : Args[0]
  : never;

type TaskOptions = OptionsFor<TaskProperty<unknown, unknown[]>>;

/**
 * A Task is a cancelable, restartable, asynchronous operation that
 * is driven by an async function. Tasks are automatically canceled
 * when the object they live on is destroyed (e.g. a Component
 * is unrendered).
 *
 * To define a task, use the `task(...)` function, and pass in
 * an async arrow function, which will be invoked when the task
 * is performed. Async functions with the await keyword can
 * be used to elegantly express asynchronous, cancelable
 * operations.
 *
 * The following Component defines a task called `myTask` that,
 * when performed, prints a message to the console, sleeps for 1 second,
 * prints a final message to the console, and then completes.
 *
 * ```js
 * import Component from '@glimmer/component';
 * import { task, timeout } from 'ember-concurrency';
 *
 * export default class MyComponent extends Component {
 *   myTask = task(async () => {
 *     console.log("Pausing for a second...");
 *     await timeout(1000);
 *     console.log("Done!");
 *   });
 * }
 * ```
 *
 * ```hbs
 * <button {{action myTask.perform}}>Perform Task</button>
 * ```
 *
 * By default, tasks have no concurrency constraints
 * (multiple instances of a task can be running at the same time)
 * but much of a power of tasks lies in proper usage of Task Modifiers
 * that you can apply to a task.
 *
 * @param taskFn An async arrow function backing the task.
 */

export function task<
  HostObject,
  T extends AsyncArrowTaskFunction<HostObject, any, any[]>,
>(
  hostObject: HostObject,
  asyncArrowTaskFn: T,
): TaskForAsyncTaskFunction<HostObject, T>;

export function task<
  HostObject,
  T extends AsyncArrowTaskFunction<HostObject, any, any[]>,
>(asyncArrowTaskFn: T): TaskForAsyncTaskFunction<HostObject, T>;

export function task<
  HostObject,
  O extends TaskOptions,
  T extends AsyncArrowTaskFunction<HostObject, any, any[]>,
>(
  hostObject: HostObject,
  baseOptions: O,
  asyncArrowTaskFn: T,
): TaskForAsyncTaskFunction<HostObject, T>;

export function task<
  HostObject,
  O extends TaskOptions,
  T extends AsyncArrowTaskFunction<HostObject, any, any[]>,
>(baseOptions: O, asyncArrowTaskFn: T): TaskForAsyncTaskFunction<HostObject, T>;

export type AsyncTaskFunction<T, Args extends any[]> = (
  ...args: Args
) => Promise<T>;

/**
 * Creates a task with the `drop` modifier applied.
 */
export function dropTask<
  HostObject,
  T extends AsyncArrowTaskFunction<HostObject, any, any[]>,
>(asyncArrowTaskFn: T): TaskForAsyncTaskFunction<HostObject, T>;
export function dropTask<
  HostObject,
  O extends TaskOptions,
  T extends AsyncArrowTaskFunction<HostObject, any, any[]>,
>(baseOptions: O, asyncArrowTaskFn: T): TaskForAsyncTaskFunction<HostObject, T>;

/**
 * Creates a task with the `enqueue` modifier applied.
 */
export function enqueueTask<
  HostObject,
  T extends AsyncArrowTaskFunction<HostObject, any, any[]>,
>(asyncArrowTaskFn: T): TaskForAsyncTaskFunction<HostObject, T>;
export function enqueueTask<
  HostObject,
  O extends TaskOptions,
  T extends AsyncArrowTaskFunction<HostObject, any, any[]>,
>(baseOptions: O, asyncArrowTaskFn: T): TaskForAsyncTaskFunction<HostObject, T>;

/**
 * Creates a task with the `keepLatest` modifier applied.
 */
export function keepLatestTask<
  HostObject,
  T extends AsyncArrowTaskFunction<HostObject, any, any[]>,
>(asyncArrowTaskFn: T): TaskForAsyncTaskFunction<HostObject, T>;
export function keepLatestTask<
  HostObject,
  O extends TaskOptions,
  T extends AsyncArrowTaskFunction<HostObject, any, any[]>,
>(baseOptions: O, asyncArrowTaskFn: T): TaskForAsyncTaskFunction<HostObject, T>;

/**
 * Creates a task with the `restartable` modifier applied.
 */
export function restartableTask<
  HostObject,
  T extends AsyncArrowTaskFunction<HostObject, any, any[]>,
>(asyncArrowTaskFn: T): TaskForAsyncTaskFunction<HostObject, T>;
export function restartableTask<
  HostObject,
  O extends TaskOptions,
  T extends AsyncArrowTaskFunction<HostObject, any, any[]>,
>(baseOptions: O, asyncArrowTaskFn: T): TaskForAsyncTaskFunction<HostObject, T>;

/**
 * A cancelation-aware variant of [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all).
 * The normal version of a `Promise.all` just returns a regular, uncancelable
 * Promise. The `ember-concurrency` variant of `all()` has the following
 * additional behavior:
 *
 * - if the task that `yield`ed `all()` is canceled, any of the
 *   {@linkcode TaskInstance}s passed in to `all` will be canceled
 * - if any of the {@linkcode TaskInstance}s (or regular promises) passed in reject (or
 *   are canceled), all of the other unfinished `TaskInstance`s will
 *   be automatically canceled.
 *
 * [Check out the "Awaiting Multiple Child Tasks example"](/docs/examples/joining-tasks)
 */
export function all<T extends readonly unknown[] | readonly [unknown]>(
  values: T,
): Promise<{ -readonly [K in keyof T]: Resolved<T[K]> }>;
export function all<T>(values: Iterable<T>): Promise<Array<Resolved<T>>>;

/**
 * A cancelation-aware variant of [RSVP.allSettled](https://api.emberjs.com/ember/release/functions/rsvp/allSettled).
 * The normal version of a `RSVP.allSettled` just returns a regular, uncancelable
 * Promise. The `ember-concurrency` variant of `allSettled()` has the following
 * additional behavior:
 *
 * - if the task that `yield`ed `allSettled()` is canceled, any of the
 *   {@linkcode TaskInstance}s passed in to `allSettled` will be canceled
 */
export function allSettled<T extends readonly unknown[] | readonly [unknown]>(
  values: T,
): Promise<{ -readonly [K in keyof T]: Settled<T[K]> }>;
export function allSettled<T>(values: Iterable<T>): Promise<Array<Settled<T>>>;

/**
 * Yielding `animationFrame()` will pause a task until after the next animation
 * frame using the native `requestAnimationFrame()` browser API.
 *
 * The task below, when performed, will print the time since the last loop run
 * for every animation frame.
 *
 * ```js
 * export default class MyComponent extends Component {
 *   myTask = task(async () => {
 *     let lastNow = performance.now();
 *     while (true) {
 *       await animationFrame();
 *
 *       let now = performance.now();
 *       let dt = now - lastNow;
 *       lastNow = now;
 *
 *       console.log(dt);
 *     }
 *   });
 * }
 * ```
 */
export function animationFrame(): Yieldable<void>;

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
 * @param error The caught error, which might be a TaskCancelation.
 */
export function didCancel(error: unknown): error is TaskCancelation;

/**
 * A cancelation-aware variant of [RSVP.hash](https://api.emberjs.com/ember/release/functions/rsvp/hash).
 * The normal version of a `RSVP.hash` just returns a regular, uncancelable
 * Promise. The `ember-concurrency` variant of `hash()` has the following
 * additional behavior:
 *
 * - if the task that `yield`ed `hash()` is canceled, any of the
 *   {@linkcode TaskInstance}s passed in to `hash` will be canceled
 * - if any of the items rejects/cancels, all other cancelable items
 *   (e.g. {@linkcode TaskInstance}s) will be canceled
 */
export function hash<T extends Record<string, unknown>>(
  values: T,
): Promise<{ [K in keyof T]: Resolved<T[K]> }>;
export function hash<T>(
  values: Record<string, T>,
): Promise<Record<string, Resolved<T>>>;

/**
 * A cancelation-aware variant of [RSVP.hashSettled](https://api.emberjs.com/ember/release/functions/rsvp/hashSettled).
 * The normal version of a `RSVP.hashSettled` just returns a regular, uncancelable
 * Promise. The `ember-concurrency` variant of `hashSettled()` has the following
 * additional behavior:
 *
 * - if the task that `yield`ed `hashSettled()` is canceled, any of the
 *   {@linkcode TaskInstance}s passed in to `hashSettled` will be canceled
 */
export function hashSettled<T extends Record<string, unknown>>(
  values: T,
): Promise<{ [K in keyof T]: Settled<T[K]> }>;
export function hashSettled<T>(
  values: Record<string, T>,
): Promise<Record<string, Settled<T>>>;

/**
 * A cancelation-aware variant of [Promise.race](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race).
 * The normal version of a `Promise.race` just returns a regular, uncancelable
 * Promise. The `ember-concurrency` variant of `race()` has the following
 * additional behavior:
 *
 * - if the task that `yield`ed `race()` is canceled, any of the
 *   {@linkcode TaskInstance}s passed in to `race` will be canceled
 * - once any of the tasks/promises passed in complete (either success, failure,
 *   or cancelation), any of the {@linkcode TaskInstance}s passed in will be canceled
 *
 * [Check out the "Awaiting Multiple Child Tasks example"](/docs/examples/joining-tasks)
 */
export function race<T>(values: readonly T[]): Promise<Resolved<T>>;
export function race<T>(values: Iterable<T>): Promise<Resolved<T>>;

/**
 * Yielding `timeout(ms)` will pause a task for the duration
 * of time passed in, in milliseconds.
 *
 * This timeout will be scheduled on the Ember runloop, which
 * means that test helpers will wait for it to complete before
 * continuing with the test. See `rawTimeout()` if you need
 * different behavior.
 *
 * The task below, when performed, will print a message to the
 * console every second.
 *
 * ```js
 * export default class MyComponent extends Component {
 *   myTask = task(async () => {
 *     while (true) {
 *       console.log("Hello!");
 *       await timeout(1000);
 *     }
 *   });
 * }
 * ```
 *
 * @param ms The amount of time to sleep before resuming
 *   the task, in milliseconds.
 */
export function timeout(ms: number): Yieldable<void>;

/**
 * Yielding `rawTimeout(ms)` will pause a task for the duration
 * of time passed in, in milliseconds.
 *
 * The timeout will use the native `setTimeout()` browser API,
 * instead of the Ember runloop, which means that test helpers
 * will *not* wait for it to complete.
 *
 * The task below, when performed, will print a message to the
 * console every second.
 *
 * ```js
 * export default class MyComponent extends Component {
 *   myTask = task(async () => {
 *     while (true) {
 *       console.log("Hello!");
 *       await rawTimeout(1000);
 *     }
 *   });
 * }
 * ```
 *
 * @param ms The amount of time to sleep before resuming
 *   the task, in milliseconds.
 */
export function rawTimeout(ms: number): Yieldable<void>;

/**
 * Use `waitForQueue` to pause the task until a certain run loop queue is reached.
 *
 * ```js
 * import Component from '@glimmer/component';
 * import { task, waitForQueue } from 'ember-concurrency';
 *
 * export default class MyComponent extends Component {
 *   myTask = task(async () => {
 *     await waitForQueue('afterRender');
 *     console.log("now we're in the afterRender queue");
 *   });
 * }
 * ```
 *
 * @param queueName The name of the Ember run loop queue.
 */
export function waitForQueue(queueName: string): Yieldable<void>;

/**
 * Use `waitForEvent` to pause the task until an event is fired. The event
 * can either be a jQuery event or an Ember.Evented event (or any event system
 * where the object supports `.on()` `.one()` and `.off()`).
 *
 * ```js
 * import Component from '@glimmer/component';
 * import { task, waitForEvent } from 'ember-concurrency';
 *
 * export default class MyComponent extends Component {
 *   myTask = task(async () => {
 *     console.log("Please click anywhere..");
 *     let clickEvent = await waitForEvent($('body'), 'click');
 *     console.log("Got event", clickEvent);
 *
 *     let emberEvent = await waitForEvent(this, 'foo');
 *     console.log("Got foo event", emberEvent);
 *
 *     // somewhere else: component.trigger('foo', { value: 123 });
 *   });
 * }
 * ```
 *
 * @param object The Ember Object, jQuery element, or other object with .on() and .off() APIs
 *   that the event fires from.
 * @param eventName The name of the event to wait for.
 */
export function waitForEvent(
  object: Evented,
  eventName: string,
): Yieldable<void>;

/**
 * Use `waitForProperty` to pause the task until a property on an object
 * changes to some expected value. This can be used for a variety of use
 * cases, including synchronizing with another task by waiting for it
 * to become idle, or change state in some other way. If you omit the
 * callback, `waitForProperty` will resume execution when the observed
 * property becomes truthy. If you provide a callback, it'll be called
 * immediately with the observed property's current value, and multiple
 * times thereafter whenever the property changes, until you return
 * a truthy value from the callback, or the current task is canceled.
 * You can also pass in a non-Function value in place of the callback,
 * in which case the task will continue executing when the property's
 * value becomes the value that you passed in.
 *
 * ```js
 * import Component from '@glimmer/component';
 * import { tracked } from '@glimmer/tracking';
 * import { task, waitForProperty } from 'ember-concurrency';
 *
 * export default class MyComponent extends Component {
 *   @tracked foo = 0;
 *
 *   myTask = task(async () => {
 *     console.log("Waiting for `foo` to become 5");
 *
 *     await waitForProperty(this, 'foo', v => v === 5);
 *     // alternatively: await waitForProperty(this, 'foo', 5);
 *
 *     // somewhere else: this.foo = 5;
 *
 *     console.log("`foo` is 5!");
 *
 *     // wait for another task to be idle before running:
 *     yield waitForProperty(this, 'otherTask.isIdle');
 *     console.log("otherTask is idle!");
 *   })
 * });
 * ```
 *
 * @param object An object (most likely an Ember Object).
 * @param key The property name that is observed for changes.
 * @param callbackOrValue a Function that should return a truthy value
 *   when the task should continue executing, or
 *   a non-Function value that the watched property
 *   needs to equal before the task will continue running.
 * @deprecated Use a polling alternative instead.
 */
export function waitForProperty<O extends object, K extends keyof O>(
  object: O,
  key: K,
  callbackOrValue: (value: O[K]) => boolean,
): Yieldable<void>;
export function waitForProperty(
  object: object,
  key: string,
  callbackOrValue: (value: unknown) => boolean,
): Yieldable<void>;
export function waitForProperty<O extends object, K extends keyof O>(
  object: O,
  key: K,
  callbackOrValue: O[K],
): Yieldable<void>;

/**
 *
 * Yielding `forever` will pause a task indefinitely until
 * it is cancelled (i.e. via host object destruction, the restartable modifier,
 * or manual cancellation).
 *
 * This is often useful in cases involving animation: if you're
 * using Liquid Fire, or some other animation scheme, sometimes you'll
 * notice buttons visibly reverting to their inactive states during
 * a route transition. By yielding `forever` in a Component task that drives a
 * button's active state, you can keep a task indefinitely running
 * until the animation runs to completion.
 *
 * NOTE: Liquid Fire also includes a useful `waitUntilIdle()` method
 * on the `liquid-fire-transitions` service that you can use in a lot
 * of these cases, but it won't cover cases of asynchrony that are
 * unrelated to animation, in which case `forever` might be better suited
 * to your needs.
 *
 * ```js
 * import { task, forever } from 'ember-concurrency';
 *
 * export default class MyComponent extends Component {
 *   @service myService;
 *
 *   myTask = task(async () => {
 *     await this.myService.doSomethingThatCausesATransition();
 *     await forever();
 *   });
 * }
 * ```
 */
export function forever(): Yieldable<never>;
