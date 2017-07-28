import { timeout } from './utils';
import { TaskProperty } from './-task-property';
import { didCancel } from './-task-instance';
import { TaskGroupProperty } from './-task-group';
import EventedObservable from './-evented-observable';
import { all, allSettled, hash, race } from './-cancelable-promise-helpers';
import { waitForQueue, waitForEvent } from './-wait-for';

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
 * @param {function} generatorFunction the generator function backing the task.
 * @returns {TaskProperty}
 */
export function task(...args) {
  return new TaskProperty(...args);
}

export function taskGroup(...args) {
  return new TaskGroupProperty(...args);
}

export function events(obj, eventName) {
  return EventedObservable.create({ obj, eventName });
}

export {
  all,
  allSettled,
  hash,
  race,
  didCancel,
  timeout,
  waitForQueue,
  waitForEvent
};
