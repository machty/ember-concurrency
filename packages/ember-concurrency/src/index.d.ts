export type TaskGenerator<T> = Generator<any, T, any>;

export type TaskFunction<T, Args extends any[]> = (
  ...args: Args
) => TaskGenerator<T>;

export type TaskFunctionArgs<T extends TaskFunction<any, any[]>> = T extends (
  ...args: infer A
) => TaskGenerator<any>
  ? A
  : [];

export type TaskFunctionReturnType<T extends TaskFunction<any, any[]>> =
  T extends (...args: any[]) => TaskGenerator<infer R> ? R : unknown;

export type TaskForTaskFunction<T extends TaskFunction<any, any[]>> = Task<
  TaskFunctionReturnType<T>,
  TaskFunctionArgs<T>
>;

export type TaskInstanceForTaskFunction<T extends TaskFunction<any, any[]>> =
  TaskInstance<TaskFunctionReturnType<T>>;

export interface EncapsulatedTaskDescriptor<T, Args extends any[]> {
  perform(...args: Args): TaskGenerator<T>;
}

export type EncapsulatedTaskDescriptorArgs<
  T extends EncapsulatedTaskDescriptor<any, any[]>,
> = T extends { perform(...args: infer A): TaskGenerator<any> } ? A : [];

export type EncapsulatedTaskDescriptorReturnType<
  T extends EncapsulatedTaskDescriptor<any, any[]>,
> = T extends { perform(...args: any[]): TaskGenerator<infer R> } ? R : unknown;

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

// eslint-disable-next-line @typescript-eslint/ban-types
export type EncapsulatedTaskState<T extends object> = Omit<
  T,
  'perform' | keyof TaskInstance<any>
>;

export type TaskForEncapsulatedTaskDescriptor<
  T extends EncapsulatedTaskDescriptor<any, any[]>,
> = EncapsulatedTask<
  EncapsulatedTaskDescriptorReturnType<T>,
  EncapsulatedTaskDescriptorArgs<T>,
  EncapsulatedTaskState<T>
>;

export type TaskInstanceForEncapsulatedTaskDescriptor<
  T extends EncapsulatedTaskDescriptor<any, any[]>,
> = EncapsulatedTaskInstance<
  EncapsulatedTaskDescriptorReturnType<T>,
  EncapsulatedTaskState<T>
>;

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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EncapsulatedTask<
  T,
  Args extends any[],
  // eslint-disable-next-line @typescript-eslint/ban-types
  State extends object,
> extends AbstractTask<Args, EncapsulatedTaskInstance<T, State>> {}

/**
 * "Task Groups" provide a means for applying
 * task modifiers to groups of tasks. Once a {@linkcode Task} is declared
 * as part of a group task, modifiers like `drop` or `restartable`
 * will no longer affect the individual `Task`. Instead those
 * modifiers can be applied to the entire group.
 *
 * ```js
 * import { task, taskGroup } from 'ember-concurrency';
 *
 * export default class MyController extends Controller {
 *   @taskGroup({ drop: true }) chores;
 *
 *   @task({ group: 'chores' }) mowLawn = taskFn;
 *   @task({ group: 'chores' }) doDishes = taskFn;
 *   @task({ group: 'chores' }) changeDiapers = taskFn;
 * }
 * ```
 */
export interface TaskGroup<T> extends TaskState<TaskInstance<T>> {
  /**
   * Cancels all running or queued `TaskInstance`s for this task group.
   * If you're trying to cancel a specific TaskInstance (rather
   * than all of the instances running under this task group) call
   * `.cancel()` on the specific TaskInstance.
   *
   * @param options.reason A descriptive reason the task group was
   *   cancelled. Defaults to `".cancelAll() was explicitly called
   *   on the Task"`.
   * @param options.resetState If true, will clear the task group state
   *   (`last*` and `performCount` properties will be set to initial
   *   values). Defaults to false.
   */
  cancelAll(options?: { reason?: string; resetState?: boolean }): Promise<void>;
}

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
   * from the task's (generator) function, or rejects with
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

// eslint-disable-next-line @typescript-eslint/ban-types
type EncapsulatedTaskInstance<T, State extends object> = TaskInstance<T> &
  EncapsulatedTaskState<State>;

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
   * export default Component.extend({
   *   pollForUpdates: task(function * () {
   *     // ... this runs when the Component is first created
   *     // because we specified .on('init')
   *   }).on('init'),
   *
   *   handleFoo: task(function * (a, b, c) {
   *     // this gets performed automatically if the 'foo'
   *     // event fires on this Component,
   *     // e.g., if someone called component.trigger('foo')
   *   }).on('foo'),
   * });
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
   * doSomeAjax: task(function * (url) {
   *   return fetch(url);
   * }).maxConcurrency(3),
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
   * Adds this task to a TaskGroup so that concurrency constraints
   * can be shared between multiple tasks.
   *
   * [See the Task Group docs for more information](/docs/task-groups)
   *
   * @param groupPath A path to the TaskGroup property.
   */
  group(groupPath: string): this;

  /**
   * Activates lifecycle events, allowing Evented host objects to react to task state
   * changes.
   *
   * ```js
   *
   * export default Component.extend({
   *   uploadTask: task(function* (file) {
   *     // ... file upload stuff
   *   }).evented(),
   *
   *   uploadedStarted: on('uploadTask:started', function(taskInstance) {
   *     this.analytics.track("User Photo: upload started");
   *   }),
   * });
   * ```
   */
  evented(): this;

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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EncapsulatedTaskProperty<
  T,
  Args extends any[],
  // eslint-disable-next-line @typescript-eslint/ban-types
  State extends object,
> extends AbstractTaskProperty<EncapsulatedTask<T, Args, State>> {}

export interface TaskGroupProperty<T> extends TaskGroup<T> {
  /**
   * Configures the task group to cancel old currently task
   * instances to make room for a new one to perform. Sets
   * default maxConcurrency to 1.
   *
   * [See the Live Example](/docs/examples/route-tasks/1)
   *
   * @method restartable
   * @memberof TaskGroupProperty
   * @instance
   */
  restartable(): this;

  /**
   * Configures the task group to run task instances
   * one-at-a-time in the order they were `.perform()`ed.
   * Sets default maxConcurrency to 1.
   *
   * @method enqueue
   * @memberof TaskGroupProperty
   * @instance
   */
  enqueue(): this;

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
  drop(): this;

  /**
   * Configures the task group to drop all but the most
   * recently performed {@linkcode TaskInstance }.
   *
   * @method keepLatest
   * @memberof TaskGroupProperty
   * @instance
   */
  keepLatest(): this;

  /**
   * Sets the maximum number of task instances that are
   * allowed to run in this task group at the same time.
   * By default, with no task modifiers applied, this number
   * is Infinity (there is no limit to the number of tasks
   * that can run at the same time).
   * {@linkcode TaskGroupProperty#restartable .restartable},
   * {@linkcode TaskGroupProperty#enqueue .enqueue}, and
   * {@linkcode TaskGroupProperty#drop .drop} set the
   * default maxConcurrency to 1, but you can override this
   * value to set the maximum number of concurrently running
   * tasks to a number greater than 1.
   *
   * [See the AJAX Throttling example](/docs/examples/ajax-throttling)
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
  maxConcurrency(n: number): this;
}

export type TaskCancelation = Error & { name: 'TaskCancelation' };

export type TaskDefinition<T, Args extends any[]> =
  | TaskFunction<T, Args>
  | EncapsulatedTaskDescriptor<T, Args>;

export interface TaskModifier<T, Args extends any[]> {
  (factory: AbstractTaskFactory<T, Args>, taskModifierOption: any): void;
}

interface AbstractTaskFactory<T, Args extends any[]> {
  readonly name: string;
  readonly taskDefinition: TaskDefinition<T, Args>;

  getOptions(): Record<string, any>;
  setDebug(isDebug: boolean): this;
  setEvented(isEvented: boolean): this;
  setGroup(groupName: string): this;
  setMaxConcurrency(maxConcurrency: number): this;
  setName(name: string): this;
  setOnState(onStateCallback: OnStateCallback<T> | null): this;
  setTaskDefinition(taskDefinition: TaskDefinition<T, Args>): this;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TaskFactory<T, Args extends any[]>
  extends AbstractTaskFactory<T, Args> {}

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
type TaskGroupOptions = OptionsFor<TaskGroupProperty<unknown>>;

type MethodOrPropertyDecoratorWithParams<Params extends unknown[]> =
  MethodDecorator &
    PropertyDecorator &
    ((...params: Params) => MethodDecorator & PropertyDecorator);

/**
 * A Task is a cancelable, restartable, asynchronous operation that
 * is driven by a generator function. Tasks are automatically canceled
 * when the object they live on is destroyed (e.g. a Component
 * is unrendered).
 *
 * Turns the decorated generator function into a task.
 *
 * Optionally takes a hash of options that will be applied as modifiers to the
 * task. For instance `maxConcurrency`, `on`, `group` or `keepLatest`.
 *
 * By default, tasks have no concurrency constraints
 * (multiple instances of a task can be running at the same time)
 * but much of a power of tasks lies in proper usage of Task Modifiers
 * that you can apply to a task.
 *
 * You can also define an
 * <a href="/docs/advanced/encapsulated-task">Encapsulated Task</a>
 * by decorating an object that defines a `perform` generator
 * method.
 *
 * ```js
 * import Component from '@glimmer/component';
 * import { task } from 'ember-concurrency';
 *
 * class MyComponent extends Component {
 *   @task
 *   *plainTask() {}
 *
 *   @task({ maxConcurrency: 5, keepLatest: true, cancelOn: 'click' })
 *   *taskWithModifiers() {}
 * }
 * ```
 *
 * @function
 * @param {object?} [options={}]
 * @return {Task}
 */
export function task<T extends TaskOptions>(
  baseOptions?: T,
): MethodOrPropertyDecoratorWithParams<[T]>;
export function task<T>(
  target: Object,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<T>,
): TypedPropertyDescriptor<T>;
export function task(target: Object, propertyKey: string): void;

/**
 * A Task is a cancelable, restartable, asynchronous operation that
 * is driven by a generator function. Tasks are automatically canceled
 * when the object they live on is destroyed (e.g. a Component
 * is unrendered).
 *
 * To define a task, use the `task(...)` function, and pass in
 * a generator function, which will be invoked when the task
 * is performed. The reason generator functions are used is
 * that they (like the proposed ES7 async-await syntax) can
 * be used to elegantly express asynchronous, cancelable
 * operations.
 *
 * You can also define an
 * <a href="/docs/advanced/encapsulated-task">Encapsulated Task</a>
 * by passing in an object that defined a `perform` generator
 * method.
 *
 * The following Component defines a task called `myTask` that,
 * when performed, prints a message to the console, sleeps for 1 second,
 * prints a final message to the console, and then completes.
 *
 * ```js
 * import { task, timeout } from 'ember-concurrency';
 * export default Component.extend({
 *   myTask: task(function * () {
 *     console.log("Pausing for a second...");
 *     yield timeout(1000);
 *     console.log("Done!");
 *   })
 * });
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
 * @param taskFn A generator function backing the task or an encapsulated task descriptor object with a `perform` generator method.
 */
export function task<T extends TaskFunction<any, any[]>>(
  taskFn: T,
): TaskProperty<TaskFunctionReturnType<T>, TaskFunctionArgs<T>>;
export function task<T extends EncapsulatedTaskDescriptor<any, any[]>>(
  taskFn: T,
): EncapsulatedTaskProperty<
  EncapsulatedTaskDescriptorReturnType<T>,
  EncapsulatedTaskDescriptorArgs<T>,
  EncapsulatedTaskState<T>
>;

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
 * Turns the decorated generator function into a task and applies the
 * `drop` modifier.
 *
 * Optionally takes a hash of options that will be applied as modifiers to the
 * task. For instance `maxConcurrency`, `on`, or `group`.
 *
 * You can also define an
 * <a href="/docs/advanced/encapsulated-task">Encapsulated Task</a>
 * by decorating an object that defines a `perform` generator
 * method.
 *
 * ```js
 * import Component from '@ember/component';
 * import { task, dropTask } from 'ember-concurrency';
 *
 * class MyComponent extends Component {
 *   @task
 *   *plainTask() {}
 *
 *   @dropTask({ cancelOn: 'click' })
 *   *myDropTask() {}
 * }
 * ```
 *
 * @function
 * @param {object?} [options={}]
 * @return {Task}
 */
export function dropTask<T extends TaskOptions>(
  baseOptions?: T,
): MethodOrPropertyDecoratorWithParams<[T]>;
export function dropTask<T>(
  target: Object,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<T>,
): TypedPropertyDescriptor<T>;
export function dropTask(target: Object, propertyKey: string): void;
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
 * Turns the decorated generator function into a task and applies the
 * `enqueue` modifier.
 *
 * Optionally takes a hash of options that will be applied as modifiers to the
 * task. For instance `maxConcurrency`, `on`, or `group`.
 *
 * You can also define an
 * <a href="/docs/advanced/encapsulated-task">Encapsulated Task</a>
 * by decorating an object that defines a `perform` generator
 * method.
 *
 * ```js
 * import Component from '@ember/component';
 * import { task, enqueueTask } from 'ember-concurrency';
 *
 * class MyComponent extends Component {
 *   @task
 *   *plainTask() {}
 *
 *   @enqueueTask({ cancelOn: 'click' })
 *   *myEnqueueTask() {}
 * }
 * ```
 *
 * @function
 * @param {object?} [options={}]
 * @return {Task}
 */
export function enqueueTask<T extends TaskOptions>(
  baseOptions?: T,
): MethodOrPropertyDecoratorWithParams<[T]>;
export function enqueueTask<T>(
  target: Object,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<T>,
): TypedPropertyDescriptor<T>;
export function enqueueTask(target: Object, propertyKey: string): void;
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
 * Turns the decorated generator function into a task and applies the
 * `keepLatest` modifier.
 *
 * Optionally takes a hash of options that will be applied as modifiers to the
 * task. For instance `maxConcurrency`, `on`, or `group`.
 *
 * You can also define an
 * <a href="/docs/advanced/encapsulated-task">Encapsulated Task</a>
 * by decorating an object that defines a `perform` generator
 * method.
 *
 * ```js
 * import Component from '@ember/component';
 * import { task, keepLatestTask } from 'ember-concurrency';
 *
 * class MyComponent extends Component {
 *   @task
 *   *plainTask() {}
 *
 *   @keepLatestTask({ cancelOn: 'click' })
 *   *myKeepLatestTask() {}
 * }
 * ```
 *
 * @function
 * @param {object?} [options={}]
 * @return {Task}
 */
export function keepLatestTask<T extends TaskOptions>(
  baseOptions?: T,
): MethodOrPropertyDecoratorWithParams<[T]>;
export function keepLatestTask<T>(
  target: Object,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<T>,
): TypedPropertyDescriptor<T>;
export function keepLatestTask(target: Object, propertyKey: string): void;
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
 * Turns the decorated generator function into a task and applies the
 * `restartable` modifier.
 *
 * Optionally takes a hash of options that will be applied as modifiers to the
 * task. For instance `maxConcurrency`, `on`, or `group`.
 *
 * You can also define an
 * <a href="/docs/advanced/encapsulated-task">Encapsulated Task</a>
 * by decorating an object that defines a `perform` generator
 * method.
 *
 * ```js
 * import Component from '@ember/component';
 * import { task, restartableTask } from 'ember-concurrency';
 *
 * class MyComponent extends Component {
 *   @task
 *   *plainTask() {}
 *
 *   @restartableTask({ cancelOn: 'click' })
 *   *myRestartableTask() {}
 * }
 * ```
 *
 * @function
 * @param {object?} [options={}]
 * @return {Task}
 */
export function restartableTask<T extends TaskOptions>(
  baseOptions?: T,
): MethodOrPropertyDecoratorWithParams<[T]>;
export function restartableTask<T>(
  target: Object,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<T>,
): TypedPropertyDescriptor<T>;
export function restartableTask(target: Object, propertyKey: string): void;
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
 *   @taskGroup({ maxConcurrency: 5 }) chores;
 *
 *   @task({ group: 'chores' })
 *   *mowLawn() {}
 *
 *   @task({ group: 'chores' })
 *   *doDishes() {}
 * }
 * ```
 *
 * @function
 * @param {object?} [options={}]
 * @return {TaskGroup}
 */
export function taskGroup<T extends TaskGroupOptions>(
  baseOptions: T,
): PropertyDecorator;
export function taskGroup(target: Object, propertyKey: string): void;

/**
 * "Task Groups" provide a means for applying
 * task modifiers to groups of tasks. Once a {@linkcode Task} is declared
 * as part of a group task, modifiers like `drop` or `restartable`
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
 * @returns {TaskGroupProperty}
 */
export function taskGroup<T>(): TaskGroupProperty<T>;

/**
 * Turns the decorated property into a task group and applies the
 * `drop` modifier.
 *
 * Optionally takes a hash of further options that will be applied as modifiers
 * to the task group.
 *
 * @function
 * @param {object?} [options={}]
 * @return {TaskGroup}
 */
export function dropTaskGroup<T extends TaskGroupOptions>(
  baseOptions: T,
): PropertyDecorator;
export function dropTaskGroup(target: Object, propertyKey: string): void;

/**
 * Turns the decorated property into a task group and applies the
 * `enqueue` modifier.
 *
 * Optionally takes a hash of further options that will be applied as modifiers
 * to the task group.
 *
 * @function
 * @param {object?} [options={}]
 * @return {TaskGroup}
 */
export function enqueueTaskGroup<T extends TaskGroupOptions>(
  baseOptions: T,
): PropertyDecorator;
export function enqueueTaskGroup(target: Object, propertyKey: string): void;

/**
 * Turns the decorated property into a task group and applies the
 * `keepLatest` modifier.
 *
 * Optionally takes a hash of further options that will be applied as modifiers
 * to the task group.
 *
 * @function
 * @param {object?} [options={}]
 * @return {TaskGroup}
 */
export function keepLatestTaskGroup<T extends TaskGroupOptions>(
  baseOptions: T,
): PropertyDecorator;
export function keepLatestGroup(target: Object, propertyKey: string): void;

/**
 * Turns the decorated property into a task group and applies the
 * `restartable` modifier.
 *
 * Optionally takes a hash of further options that will be applied as modifiers
 * to the task group.
 *
 * @function
 * @param {object?} [options={}]
 * @return {TaskGroup}
 */
export function restartableTaskGroup<T extends TaskGroupOptions>(
  baseOptions: T,
): PropertyDecorator;
export function restartableTaskGroup(target: Object, propertyKey: string): void;

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
 *   @task *myTask() {
 *     let lastNow = performance.now();
 *     while (true) {
 *       yield animationFrame();
 *
 *       let now = performance.now();
 *       let dt = now - lastNow;
 *       lastNow = now;
 *
 *       console.log(dt);
 *     }
 *   }
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
 *   @task *myTask() {
 *     while (true) {
 *       console.log("Hello!");
 *       yield timeout(1000);
 *     }
 *   }
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
 *   @task *myTask() {
 *     while (true) {
 *       console.log("Hello!");
 *       yield rawTimeout(1000);
 *     }
 *   }
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
 * import { task, waitForQueue } from 'ember-concurrency';
 * export default Component.extend({
 *   myTask: task(function * () {
 *     yield waitForQueue('afterRender');
 *     console.log("now we're in the afterRender queue");
 *   })
 * });
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
 * import { task, waitForEvent } from 'ember-concurrency';
 * export default Component.extend({
 *   myTask: task(function * () {
 *     console.log("Please click anywhere..");
 *     let clickEvent = yield waitForEvent($('body'), 'click');
 *     console.log("Got event", clickEvent);
 *
 *     let emberEvent = yield waitForEvent(this, 'foo');
 *     console.log("Got foo event", emberEvent);
 *
 *     // somewhere else: component.trigger('foo', { value: 123 });
 *   })
 * });
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
 * import { task, waitForProperty } from 'ember-concurrency';
 * export default Component.extend({
 *   foo: 0,
 *
 *   myTask: task(function * () {
 *     console.log("Waiting for `foo` to become 5");
 *
 *     yield waitForProperty(this, 'foo', v => v === 5);
 *     // alternatively: yield waitForProperty(this, 'foo', 5);
 *
 *     // somewhere else: this.set('foo', 5)
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
 *   @task *myTask() {
 *     yield this.myService.doSomethingThatCausesATransition();
 *     yield forever;
 *   }
 * }
 * ```
 */
export function forever(): Yieldable<never>;

/**
 * This decorator allows you to alias a property to the result of a task.
 * You can also provide a default value to use before the task has completed.
 *
 * ```js
 * import Component from '@glimmer/component';
 * import { task, lastValue } from 'ember-concurrency';
 *
 * export default class ExampleComponent extends Component {
 *   @task
 *   someTask = function*() {
 *     // ...
 *   };
 *
 *   @lastValue('someTask')
 *   someTaskValue;
 *
 *   @lastValue('someTask')
 *   someTaskValueWithDefault = 'A default value';
 * }
 * ```
 *
 * @function
 * @param {string} taskName the name of the task to read a value from
 */
export function lastValue(taskName: string): PropertyDecorator;
