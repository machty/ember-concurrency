import Ember from 'ember';
import { computed } from '@ember/object';
import ComputedProperty from '@ember/object/computed';
import { gte } from 'ember-compatibility-helpers';
import EnqueueSchedulerPolicy from './external/scheduler/policies/enqueued-policy';
import DropSchedulerPolicy from './external/scheduler/policies/drop-policy';
import KeepLatestSchedulerPolicy from './external/scheduler/policies/keep-latest-policy';
import RestartableSchedulerPolicy from './external/scheduler/policies/restartable-policy';
import {
  task as taskDecorator,
  taskGroup as taskGroupDecorator,
} from './task-decorators';
import { TaskFactory } from './task-factory';

let taskFactorySymbol = '__ec_task_factory';

export const propertyModifiers = {
  /**
   * Configures the task to cancel old currently task instances
   * to make room for a new one to perform. Sets default
   * maxConcurrency to 1.
   *
   * [See the Live Example](/docs/examples/route-tasks/1)
   *
   * @method restartable
   * @memberof TaskProperty
   * @instance
   */
  restartable() {
    this[taskFactorySymbol].setBufferPolicy(RestartableSchedulerPolicy);
    return this;
  },

  /**
   * Configures the task to run task instances one-at-a-time in
   * the order they were `.perform()`ed. Sets default
   * maxConcurrency to 1.
   *
   * @method enqueue
   * @memberof TaskProperty
   * @instance
   */
  enqueue() {
    this[taskFactorySymbol].setBufferPolicy(EnqueueSchedulerPolicy);
    return this;
  },

  /**
   * Configures the task to immediately cancel (i.e. drop) any
   * task instances performed when the task is already running
   * at maxConcurrency. Sets default maxConcurrency to 1.
   *
   * @method drop
   * @memberof TaskProperty
   * @instance
   */
  drop() {
    this[taskFactorySymbol].setBufferPolicy(DropSchedulerPolicy);
    return this;
  },

  /**
   * Configures the task to drop all but the most recently
   * performed {@linkcode TaskInstance }.
   *
   * @method keepLatest
   * @memberof TaskProperty
   * @instance
   */
  keepLatest() {
    this[taskFactorySymbol].setBufferPolicy(KeepLatestSchedulerPolicy);
    return this;
  },

  /**
   * Sets the maximum number of task instances that are allowed
   * to run at the same time. By default, with no task modifiers
   * applied, this number is Infinity (there is no limit
   * to the number of tasks that can run at the same time).
   * {@linkcode TaskProperty#restartable .restartable},
   * {@linkcode TaskProperty#enqueue .enqueue}, and
   * {@linkcode TaskProperty#drop .drop} set the default
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
   *   this.doSomeAjax.perform("http://www.example.com/json");
   * },
   * ```
   *
   * @method maxConcurrency
   * @memberof TaskProperty
   * @param {Number} n The maximum number of concurrently running tasks
   * @instance
   */
  maxConcurrency(n) {
    this[taskFactorySymbol].setMaxConcurrency(n);
    return this;
  },

  /**
   * Adds this task to a TaskGroup so that concurrency constraints
   * can be shared between multiple tasks.
   *
   * [See the Task Group docs for more information](/docs/task-groups)
   *
   * @method group
   * @memberof TaskProperty
   * @param {String} groupPath A path to the TaskGroup property
   * @instance
   */
  group(taskGroupPath) {
    this[taskFactorySymbol].setGroup(taskGroupPath);
    return this;
  },

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
   *
   * @method evented
   * @memberof TaskProperty
   * @instance
   */
  evented() {
    this[taskFactorySymbol].setEvented(true);
    return this;
  },

  /**
   * Logs lifecycle events to aid in debugging unexpected Task behavior.
   * Presently only logs cancelation events and the reason for the cancelation,
   * e.g. "TaskInstance 'doStuff' was canceled because the object it lives on was destroyed or unrendered"
   *
   * @method debug
   * @memberof TaskProperty
   * @instance
   */
  debug() {
    this[taskFactorySymbol].setDebug(true);
    return this;
  },

  /**
   * Configures the task to call the passed in callback for derived state updates,
   * overriding the default derived state tracking. You may call with `null` to
   * completely opt-out of derived state tracking.
   *
   * @method onState
   * @memberof TaskProperty
   * @param {function?} callback Callback to be called. Receives an object argument with the new state.
   * @instance
   */
  onState(callback) {
    this[taskFactorySymbol].setOnState(callback);
    return this;
  },
};

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

/**
  A {@link TaskProperty} is the Computed Property-like object returned
  from the {@linkcode task} function. You can call Task Modifier methods
  on this object to configure the behavior of the {@link Task}.

  See [Managing Task Concurrency](/docs/task-concurrency) for an
  overview of all the different task modifiers you can use and how
  they impact automatic cancelation / enqueueing of task instances.

  {@link TaskProperty} is only used for supporting "classic" Ember objects.
  When using Native JavaScript or TypeScript classes, you will use [task decorators](/docs/task-decorators)
  on methods instead.

  @class TaskProperty
*/
export let TaskProperty;
export let TaskGroupProperty;

if (gte('3.10.0')) {
  TaskProperty = class {};
  TaskGroupProperty = class {};
} else {
  // Prior to the 3.10.0 refactors, we had to extend the _ComputedProperty class
  // for a classic decorator/descriptor to run correctly.
  TaskProperty = class extends ComputedProperty {
    callSuperSetup() {
      if (super.setup) {
        super.setup(...arguments);
      }
    }
  };
  TaskGroupProperty = class extends ComputedProperty {};
}

Object.assign(TaskGroupProperty.prototype, propertyModifiers);
Object.assign(TaskProperty.prototype, propertyModifiers, {
  setup(proto, key) {
    if (this.callSuperSetup) {
      this.callSuperSetup(...arguments);
    }

    this[taskFactorySymbol].setName(key);
    this[taskFactorySymbol]._setupEmberKVO(proto);
  },

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
   * [See the Writing Tasks Docs for more info](/docs/writing-tasks)
   *
   * @method on
   * @memberof TaskProperty
   * @param {String} eventNames*
   * @instance
   */
  on() {
    this[taskFactorySymbol].addPerformEvents(...arguments);
    return this;
  },

  /**
   * This behaves like the {@linkcode TaskProperty#on task(...).on() modifier},
   * but instead will cause the task to be canceled if any of the
   * specified events fire on the parent object.
   *
   * [See the Live Example](/docs/examples/route-tasks/1)
   *
   * @method cancelOn
   * @memberof TaskProperty
   * @param {String} eventNames*
   * @instance
   */
  cancelOn() {
    this[taskFactorySymbol].addCancelEvents(...arguments);
    return this;
  },

  /**
   * This behaves like the {@linkcode TaskProperty#on task(...).on() modifier},
   * but instead will cause the task to be performed if any of the
   * specified properties on the parent object change.
   *
   * @method observes
   * @memberof TaskProperty
   * @param {String} keys*
   * @instance
   */
  observes() {
    this[taskFactorySymbol].addObserverKeys(...arguments);
    return this;
  },
});

const setDecorator = Ember._setClassicDecorator || Ember._setComputedDecorator;
export function taskComputed(fn) {
  if (gte('3.10.0')) {
    let cp = function (proto, key) {
      if (cp.setup !== undefined) {
        cp.setup(proto, key);
      }

      return computed(fn)(...arguments);
    };

    setDecorator(cp);

    return cp;
  } else {
    return computed(fn);
  }
}

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
  if (
    isDecoratorOptions(taskFnOrProtoOrDecoratorOptions) ||
    (key && descriptor)
  ) {
    return taskDecorator(...arguments);
  } else {
    let tp = taskComputed(function () {
      tp[taskFactorySymbol].setTaskDefinition(tp.taskFn);
      return tp[taskFactorySymbol].createTask(this);
    });

    tp.taskFn = taskFnOrProtoOrDecoratorOptions;
    tp[taskFactorySymbol] = new TaskFactory();

    Object.setPrototypeOf(tp, TaskProperty.prototype);

    return tp;
  }
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
