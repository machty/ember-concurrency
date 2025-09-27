import { assert } from '@ember/debug';

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
 * <button {{on "click" myTask.perform}}>Perform Task</button>
 * ```
 *
 * By default, tasks have no concurrency constraints
 * (multiple instances of a task can be running at the same time)
 * but much of a power of tasks lies in proper usage of Task Modifiers
 * that you can apply to a task.
 *
 * @param {function} taskFunction the async function backing the task.
 * @returns {TaskProperty}
 */
export function task() {
  assert(
    `It appears you're attempting to use the new task(async () => { ... }) syntax, but the async arrow task function you've provided is not being properly compiled by Babel.\n\nPossible causes / remedies:\n\n1. You must pass the async function expression directly to the task() function (it is not currently supported to pass in a variable containing the async arrow fn, or any other kind of indirection)\n2. The new task syntax is only supported by native classes. Ensure that this is one.\n3. If this code is in an addon, please ensure the addon specifies ember-concurrency "2.3.0" or higher in "dependencies" (not "devDependencies")\n4. Ensure that there is only one version of ember-concurrency v2.3.0+ being used in your project (including nested dependencies) and consider using npm/yarn/pnpm resolutions to enforce a single version is used\n5. Ensure that you have registered the Babel transform that Ember Concurrency uses to transform tasks in the "async-arrow" notation, see https://ember-concurrency.com/docs/v4-upgrade`,
    !isUntranspiledAsyncFn(arguments[arguments.length - 1]),
  );

  assert(
    `Using task(...) in any form other than \`task(async () => {})\` is no longer supported since ember-concurrency v5. Please use the modern syntax instead (and consider using one of ember-concurrency's codemods).`,
    false,
  );
}

function isUntranspiledAsyncFn(obj) {
  return obj && obj.constructor && obj.constructor.name === 'AsyncFunction';
}
