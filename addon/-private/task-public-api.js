import { TaskFactory } from './task-factory';
import {
  TaskProperty,
  TaskGroupProperty,
  taskComputed,
  taskFactorySymbol,
} from './task-properties';
import {
  task as taskDecorator,
  taskGroup as taskGroupDecorator,
} from './task-decorators';
import { assert } from '@ember/debug';

/**
 * TODO: update docs to reflect both old and new ES6 styles
 *
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
 * function property.
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
export function task(taskFnOrProtoOrDecoratorOptions, key, descriptor) {
  assert(
    `It appears you're attempting to use the new task(async () => { ... }) syntax, but the async arrow task function you've provided is not being properly compiled by Babel.\n\nPossible causes / remedies:\n\n1. You must pass the async function expression directly to the task() function (it is not currently supported to pass in a variable containing the async arrow fn, or any other kind of indirection)\n2. The new task syntax is only supported by native classes. Ensure that this is one.\n3. If this code is in an addon, please ensure the addon specifies ember-concurrency "2.3.0" or higher in "dependencies" (not "devDependencies")\n4. Ensure that there is only one version of ember-concurrency v2.3.0+ being used in your project (including nested dependencies) and consider using npm/yarn/pnpm resolutions to enforce a single version is used`,
    !isUntranspiledAsyncFn(arguments[arguments.length - 1])
  );

  if (
    isDecoratorOptions(taskFnOrProtoOrDecoratorOptions) ||
    (key && descriptor)
  ) {
    return taskDecorator(...arguments);
  } else {
    return buildClassicTaskProperty(taskFnOrProtoOrDecoratorOptions);
  }
}

function isUntranspiledAsyncFn(obj) {
  return obj && obj.constructor && obj.constructor.name === 'AsyncFunction';
}

/**
 * Build and return a "classic" TaskProperty, which is essentially a subclass of a Computed Property
 * descriptor that can be used to define Tasks on classic Ember.Objects.
 *
 * @private
 */
function buildClassicTaskProperty(taskFn) {
  const taskProperty = taskComputed(function () {
    taskProperty[taskFactorySymbol].setTaskDefinition(taskProperty.taskFn);
    return taskProperty[taskFactorySymbol].createTask(this);
  });

  taskProperty.taskFn = taskFn;

  taskProperty[taskFactorySymbol] = new TaskFactory();

  Object.setPrototypeOf(taskProperty, TaskProperty.prototype);

  return taskProperty;
}

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
 *   &#64;taskGroup({ drop: true }) chores;
 *
 *   &#64;task({ group: 'chores' }) mowLawn = taskFn;
 *   &#64;task({ group: 'chores' }) doDishes = taskFn;
 *   &#64;task({ group: 'chores' }) changeDiapers = taskFn;
 * }
 * ```
 *
 * @returns {TaskGroup}
 */
export function taskGroup(possibleDecoratorOptions, key, descriptor) {
  if (isDecoratorOptions(possibleDecoratorOptions) || (key && descriptor)) {
    return taskGroupDecorator(...arguments);
  } else {
    let tp = taskComputed(function (key) {
      tp[taskFactorySymbol].setName(key);
      return tp[taskFactorySymbol].createTaskGroup(this);
    });

    tp[taskFactorySymbol] = new TaskFactory();

    Object.setPrototypeOf(tp, TaskGroupProperty.prototype);

    return tp;
  }
}

function isDecoratorOptions(possibleOptions) {
  if (!possibleOptions) {
    return false;
  }
  if (typeof possibleOptions === 'function') {
    return false;
  }

  if (
    typeof possibleOptions === 'object' &&
    'perform' in possibleOptions &&
    typeof possibleOptions.perform === 'function'
  ) {
    return false;
  }

  return Object.getPrototypeOf(possibleOptions) === Object.prototype;
}
