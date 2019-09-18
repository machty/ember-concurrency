import EmberObject from '@ember/object';
import {
  UnwrapComputedPropertyGetter,
  UnwrapComputedPropertyGetters
} from '@ember/object/-private/types';

import RSVP from 'rsvp';

// Lifted from @types/ember__object/observable.d.ts
interface Getter {
  /**
   * Retrieves the value of a property from the object.
   */
  get<K extends keyof this>(key: K): UnwrapComputedPropertyGetter<this[K]>;
  /**
   * To get the values of multiple properties at once, call `getProperties`
   * with a list of strings or an array:
   */
  getProperties<K extends keyof this>(
    list: K[]
  ): Pick<UnwrapComputedPropertyGetters<this>, K>;
  getProperties<K extends keyof this>(
    ...list: K[]
  ): Pick<UnwrapComputedPropertyGetters<this>, K>;
}

export type GeneratorFn<T, Args extends any[] = any[], R = any> = (
  this: T,
  ...args: Args
) => IterableIterator<R>;

export const all: typeof Promise.all;
export const allSettled: typeof RSVP.allSettled;
export const hash: typeof RSVP.hash;
export const race: typeof Promise.race;

export function timeout(ms: number): Promise<void>;

/**
 * Use `waitForEvent` to pause the task until an event is fired.
 * The event can either be a jQuery event or an `Ember.Evented` event, or any
 * event system where the object supports `.on()`, `.one()` and `.off()`.
 */
export function waitForEvent(
  object: EmberObject | EventTarget,
  eventName: string
): Promise<Event>;

/**
 * Use `waitForProperty` to pause the task until a property on an object
 * changes to some expected value.
 *
 * This can be used for a variety of use cases, including synchronizing with
 * another task by waiting for it to become idle, or change state in some
 * other way.
 *
 * If you omit the callback, `waitForProperty` will resume execution when the
 * observed property becomes truthy. If you provide a callback, it'll be
 * called immediately with the observed property's current value, and multiple
 * times thereafter whenever the property changes, until you return a truthy
 * value from the callback, or the current task is canceled.
 *
 * You can also pass in a non-`function` value in place of the callback, in
 * which case the task will continue executing when the property's value
 * becomes the value that you passed in.
 */
export function waitForProperty<T extends object, K extends keyof T>(
  object: T,
  key: K,
  callbackOrValue?: (value: T[K]) => boolean | any
): Promise<void>;

/**
 * Use `waitForQueue` to pause the task until a certain run loop queue is
 * reached.
 */
export function waitForQueue(queueName: string): Promise<void>;

export function task<Args extends any[], R>(
  taskFn: GeneratorFn<unknown, Args, R>
): Task<Args, Exclude<R, Promise<any>>>;
export function task<Args extends any[], R>(encapsulatedTask: {
  perform: GeneratorFn<unknown, Args, R>;
}): Task<Args, Exclude<R, Promise<any>>>;

export function taskGroup(): TaskGroupProperty;

interface CommonTaskProperty {
  restartable: () => TaskProperty;
  drop: () => TaskProperty;
  keepLatest: () => TaskProperty;
  enqueue: () => TaskProperty;
  maxConcurrency: (n: number) => TaskProperty;
  cancelOn: (eventName: string) => TaskProperty;
  group: (groupName: string) => TaskProperty;
}

export interface TaskProperty extends CommonTaskProperty {
  evented: () => TaskProperty;
  debug: () => TaskProperty;
  on: (eventName: string) => TaskProperty;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TaskGroupProperty extends CommonTaskProperty {}

// Based on https://github.com/CenterForOpenScience/ember-osf-web/blob/7933316efae805e00723789809bdeb58a96a286a/types/ember-concurrency/index.d.ts

/**
 * Describes the state that the task instance is in.
 * Can be used for debugging, or potentially driving some UI state.
 */
export enum TaskInstanceState {
  /**
   * Task instance was canceled before it started.
   */
  Dropped = 'dropped',

  /**
   * Task instance was canceled before it could finish.
   */
  Canceled = 'canceled',

  /**
   * Task instance ran to completion, even if an exception was thrown.
   */
  Finished = 'finished',

  /**
   * Task instance is currently running. Returns `true`, even if it is paused
   * on a yielded promise.
   */
  Running = 'running',

  /**
   * Task instance hasn't begun running yet. Usually because the task is using
   * the `.enqueue()` task modifier.
   */
  Waiting = 'waiting'
}

/**
 * A `TaskInstance` represents a single execution of a `Task`. Every call to
 * `Task#perform` returns a `TaskInstance`.
 *
 * `TaskInstance`s are cancelable, either explicitly via `TaskInstance#cancel`
 * or `Task#cancelAll`, or automatically due to the host object being
 * destroyed, or because concurrency policy enforced by a Task Modifier
 * canceled the task instance.
 */
interface TaskInstanceBase<T> extends PromiseLike<T>, Getter {
  /**
   * Describes the state that the task instance is in.
   * Can be used for debugging, or potentially driving some UI state.
   */
  // readonly state: TaskInstanceState;

  /**
   * `true` if the task instance has started, else `false`.
   */
  readonly hasStarted: boolean;

  /**
   * `true` if the task instance was canceled before it could run to
   * completion.
   */
  readonly isCanceled: boolean;

  /**
   * `true` if the `TaskInstance` was canceled before it could ever start
   * running.
   *
   * For example, calling `.perform()` twice on a task with the `.drop()`
   * modifier applied will result in the second task instance being dropped.
   */
  readonly isDropped: boolean;

  /**
   * `true` if the task has run to completion.
   */
  readonly isFinished: boolean;

  /**
   * `true` if the task is still running.
   */
  readonly isRunning: boolean;

  /**
   * `true` if the task instance is fulfilled.
   */
  readonly isSuccessful: boolean;

  /**
   * If this `TaskInstance` runs to completion by returning a value other than
   * a rejecting promise, this property will be set with that value.
   */
  readonly value?: T;

  /**
   * If this `TaskInstance` is canceled or throws an error (or yields a
   * promise that rejects), this property will be set with that error.
   *
   * Otherwise, it is `null`.
   */
  readonly error?: Error;

  /**
   * Cancels the task instance. Has no effect if the task instance has already
   * been canceled or has already finished running.
   */
  cancel(): void;

  catch(): RSVP.Promise<unknown>;
  finally(): RSVP.Promise<unknown>;
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | RSVP.Promise<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | undefined
      | null
  ): RSVP.Promise<TResult1 | TResult2>;
}

/**
 * Task instance was canceled before it started.
 */
interface InstanceDropped {
  readonly state: TaskInstanceState.Dropped;
  readonly hasStarted: false;
  readonly isCanceled: true;
  readonly isDropped: true;
  readonly isFinished: false;
  readonly isRunning: false;
  readonly isSuccessful: false;
  readonly value: undefined;
  readonly error: Error;
}

/**
 * Task instance was canceled before it could finish.
 */
interface InstanceCanceled {
  readonly state: TaskInstanceState.Canceled;
  readonly hasStarted: true;
  readonly isCanceled: true;
  readonly isDropped: false;
  readonly isFinished: false;
  readonly isRunning: false;
  readonly isSuccessful: false;
  readonly value: undefined;
  readonly error: Error;
}

/**
 * Task instance is currently running, even if it is paused on a yielded
 * promise.
 */
interface InstanceRunning {
  readonly state: TaskInstanceState.Running;
  readonly hasStarted: true;
  readonly isCanceled: false;
  readonly isDropped: false;
  readonly isFinished: false;
  readonly isRunning: true;
  readonly isSuccessful: false;
  readonly value: undefined;
  readonly error: null;
}

/**
 * Task instance hasn't begun running yet. Usually because the task is using
 * the `.enqueue()` task modifier.
 */
interface InstanceWaiting {
  readonly state: TaskInstanceState.Waiting;
  readonly hasStarted: false;
  readonly isCanceled: false;
  readonly isDropped: false;
  readonly isFinished: false;
  readonly isRunning: false;
  readonly isSuccessful: false;
  readonly value: undefined;
  readonly error: null;
}

/**
 * Task instance ran to completion, but an exception was thrown.
 */
interface InstanceError {
  readonly state: TaskInstanceState.Finished;
  readonly hasStarted: true;
  readonly isCanceled: false;
  readonly isDropped: false;
  readonly isFinished: true;
  readonly isRunning: false;
  readonly isSuccessful: false;
  readonly value: undefined;
  readonly error: Error;
}

/**
 * Task instance ran to completion successfully, without any exception being
 * thrown.
 */
interface InstanceSuccess {
  readonly state: TaskInstanceState.Finished;
  readonly hasStarted: true;
  readonly isCanceled: false;
  readonly isDropped: false;
  readonly isFinished: true;
  readonly isRunning: false;
  readonly isSuccessful: true;
  readonly value: any;
  readonly error: null;
}

export type TaskInstance<T> = TaskInstanceBase<T> &
  (
    | InstanceDropped
    | InstanceCanceled
    | InstanceRunning
    | InstanceWaiting
    | InstanceError
    | InstanceSuccess);

/**
 * The current state of the task.
 */
export enum TaskState {
  Running = 'running',
  Queued = 'queued',
  Idle = 'idle'
}

/**
 * The `Task` object lives on a host Ember object (e.g. a `Component`,
 * `Route`, or `Controller`).
 *
 * You call the `.perform()` method on this object to run individual
 * `TaskInstances`, and at any point, you can call the `.cancelAll()` method
 * on this object to cancel all running or enqueued `TaskInstance`s.
 */
export interface Task<Args extends any[], T> extends Getter {
  /**
   * `true` if the task is not in the `running` or `queued` state.
   */
  readonly isIdle: boolean;

  /**
   * `true` if any future task instances are queued.
   */
  readonly isQueued: boolean;

  /**
   * `true` if any current task instances are running.
   */
  readonly isRunning: boolean;

  /**
   * The most recently started task instance.
   */
  readonly last?: TaskInstance<T>;

  /**
   * The most recently canceled task instance.
   */
  readonly lastCanceled?: TaskInstance<T>;

  /**
   * The most recently completed task instance.
   *
   * This can be a successful task instance or a task instance that threw an
   * error, but was *not* canceled.
   */
  readonly lastComplete?: TaskInstance<T>;

  /**
   * The most recent task instance that errored.
   */
  readonly lastErrored?: TaskInstance<T>;

  /**
   * The most recent task instance that is incomplete.
   *
   * @TODO: difference between `last`, `lastPerformed`, `lastIncomplete`?
   */
  readonly lastIncomplete?: TaskInstance<T>;

  /**
   * The most recently performed task instance.
   */
  readonly lastPerformed?: TaskInstance<T>;

  /**
   * The most recent task instance that is currently running.
   */
  readonly lastRunning?: TaskInstance<T>;

  /**
   * The most recent task instance that succeeded.
   */
  readonly lastSuccessful?: TaskInstance<T>;

  /**
   * The number of times this task has been performed.
   */
  readonly performCount: number;

  /**
   * The current state of the task.
   *
   * @TODO: what is the state when `.enqueue()` is used and one `TaskInstance`
   * is running, while the next is queued?
   */
  readonly state: TaskState;

  /**
   * Creates a new `TaskInstance` and attempts to run it right away.
   *
   * If running this task instance would increase the task's concurrency to a
   * number greater than the task's `maxConcurrency`, this task instance might
   * be immediately canceled (dropped), or enqueued to run at a later time,
   * after the currently running task(s) have finished.
   */
  perform(...args: Args): TaskInstance<T>;

  /**
   * Cancels all running or queued `TaskInstance`s for this `Task`.
   *
   * If you're trying to cancel a specific `TaskInstance` (rather than all of
   * the instances running under this task) call `.cancel()` on the specific
   * `TaskInstance`.
   */
  cancelAll(): void;
}
