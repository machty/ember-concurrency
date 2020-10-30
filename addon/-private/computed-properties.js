import Ember from 'ember';
import { get, computed } from '@ember/object';
import ComputedProperty from '@ember/object/computed';
import { assert, deprecate } from '@ember/debug';
import { gte } from 'ember-compatibility-helpers';
import UnboundedSchedulerPolicy from './external/scheduler/policies/unbounded-policy'
import EnqueueSchedulerPolicy from './external/scheduler/policies/enqueued-policy'
import DropSchedulerPolicy from './external/scheduler/policies/drop-policy'
import KeepLatestSchedulerPolicy from './external/scheduler/policies/keep-latest-policy'
import RestartableSchedulerPolicy from './external/scheduler/policies/restartable-policy'
import EmberScheduler from './scheduler/ember-scheduler';
import { addListener } from '@ember/object/events';
import { addObserver } from '@ember/object/observers';
import { Task, EncapsulatedTask } from './task';
import { TaskGroup } from './task-group';
import { scheduleOnce } from '@ember/runloop';

let handlerCounter = 0;

export const propertyModifiers = {
  _schedulerPolicyClass: UnboundedSchedulerPolicy,
  _maxConcurrency: null,
  _taskGroupPath: null,
  _hasUsedModifier: false,
  _hasSetBufferPolicy: false,
  _hasEnabledEvents: false,

  restartable() {
    return setBufferPolicy(this, RestartableSchedulerPolicy);
  },

  enqueue() {
    return setBufferPolicy(this, EnqueueSchedulerPolicy);
  },

  drop() {
    return setBufferPolicy(this, DropSchedulerPolicy);
  },

  keepLatest() {
    return setBufferPolicy(this, KeepLatestSchedulerPolicy);
  },

  maxConcurrency(n) {
    this._hasUsedModifier = true;
    this._maxConcurrency = n;
    assertModifiersNotMixedWithGroup(this);
    return this;
  },

  group(taskGroupPath) {
    this._taskGroupPath = taskGroupPath;
    assertModifiersNotMixedWithGroup(this);
    return this;
  },

  evented() {
    this._hasEnabledEvents = true;
    return this;
  },

  debug() {
    this._debug = true;
    return this;
  },

  onState(callback) {
    this._onStateCallback = callback;
    return this;
  },

  _onStateCallback: (state, taskable) => taskable.setState(state),
};

function setBufferPolicy(obj, policy) {
  obj._hasSetBufferPolicy = true;
  obj._hasUsedModifier = true;
  obj._schedulerPolicyClass = policy;
  assertModifiersNotMixedWithGroup(obj);

  return obj;
}

function assertModifiersNotMixedWithGroup(obj) {
  assert(`ember-concurrency does not currently support using both .group() with other task modifiers (e.g. drop(), enqueue(), restartable())`, !obj._hasUsedModifier || !obj._taskGroupPath);
}

/**
  A {@link TaskProperty} is the Computed Property-like object returned
  from the {@linkcode task} function. You can call Task Modifier methods
  on this object to configure the behavior of the {@link Task}.

  See [Managing Task Concurrency](/#/docs/task-concurrency) for an
  overview of all the different task modifiers you can use and how
  they impact automatic cancelation / enqueueing of task instances.

  <style>
    .ignore-this--this-is-here-to-hide-constructor,
    #TaskProperty { display: none }
  </style>

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
  setup(proto, taskName) {
    if (this.callSuperSetup) {
      this.callSuperSetup(...arguments);
    }

    registerOnPrototype(
      addListener,
      proto,
      this.eventNames,
      taskName,
      'perform',
      false
    );
    registerOnPrototype(
      addListener,
      proto,
      this.cancelEventNames,
      taskName,
      'cancelAll',
      false
    );
    registerOnPrototype(
      addObserver,
      proto,
      this._observes,
      taskName,
      'perform',
      true
    );
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
   * export default Ember.Component.extend({
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
   * [See the Writing Tasks Docs for more info](/#/docs/writing-tasks)
   *
   * @method on
   * @memberof TaskProperty
   * @param {String} eventNames*
   * @instance
   */
  on() {
    this.eventNames = this.eventNames || [];
    this.eventNames.push.apply(this.eventNames, arguments);
    return this;
  },

  /**
   * This behaves like the {@linkcode TaskProperty#on task(...).on() modifier},
   * but instead will cause the task to be canceled if any of the
   * specified events fire on the parent object.
   *
   * [See the Live Example](/#/docs/examples/route-tasks/1)
   *
   * @method cancelOn
   * @memberof TaskProperty
   * @param {String} eventNames*
   * @instance
   */
  cancelOn() {
    this.cancelEventNames = this.cancelEventNames || [];
    this.cancelEventNames.push.apply(this.cancelEventNames, arguments);
    return this;
  },

  observes(...properties) {
    this._observes = properties;
    return this;
  },

  /**
   * Configures the task to cancel old currently task instances
   * to make room for a new one to perform. Sets default
   * maxConcurrency to 1.
   *
   * [See the Live Example](/#/docs/examples/route-tasks/1)
   *
   * @method restartable
   * @memberof TaskProperty
   * @instance
   */

  /**
   * Configures the task to run task instances one-at-a-time in
   * the order they were `.perform()`ed. Sets default
   * maxConcurrency to 1.
   *
   * @method enqueue
   * @memberof TaskProperty
   * @instance
   */

  /**
   * Configures the task to immediately cancel (i.e. drop) any
   * task instances performed when the task is already running
   * at maxConcurrency. Sets default maxConcurrency to 1.
   *
   * @method drop
   * @memberof TaskProperty
   * @instance
   */

  /**
   * Configures the task to drop all but the most recently
   * performed {@linkcode TaskInstance }.
   *
   * @method keepLatest
   * @memberof TaskProperty
   * @instance
   */

  /**
   * Sets the maximum number of task instances that are allowed
   * to run at the same time. By default, with no task modifiers
   * applied, this number is Infinity (there is no limit
   * to the number of tasks that can run at the same time).
   * {@linkcode TaskProperty#restartable .restartable()},
   * {@linkcode TaskProperty#enqueue .enqueue()}, and
   * {@linkcode TaskProperty#drop .drop()} set the default
   * maxConcurrency to 1, but you can override this value
   * to set the maximum number of concurrently running tasks
   * to a number greater than 1.
   *
   * [See the AJAX Throttling example](/#/docs/examples/ajax-throttling)
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

  /**
   * Adds this task to a TaskGroup so that concurrency constraints
   * can be shared between multiple tasks.
   *
   * [See the Task Group docs for more information](/#/docs/task-groups)
   *
   * @method group
   * @memberof TaskProperty
   * @param {String} groupPath A path to the TaskGroup property
   * @instance
   */

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

  /**
   * Logs lifecycle events to aid in debugging unexpected Task behavior.
   * Presently only logs cancelation events and the reason for the cancelation,
   * e.g. "TaskInstance 'doStuff' was canceled because the object it lives on was destroyed or unrendered"
   *
   * @method debug
   * @memberof TaskProperty
   * @instance
   */

  perform() {
    deprecate(
      `[DEPRECATED] An ember-concurrency task property was not set on its object via 'defineProperty'.
              You probably used 'set(obj, "myTask", task(function* () { ... }) )'.
              Unfortunately due to this we can't tell you the name of the task.`,
      false,
      {
        id: 'ember-meta.descriptor-on-object',
        until: '3.5.0',
        url:
          'https://emberjs.com/deprecations/v3.x#toc_use-defineProperty-to-define-computed-properties',
      }
    );
    throw new Error(
      "An ember-concurrency task property was not set on its object via 'defineProperty'. See deprecation warning for details."
    );
  },
});
function registerOnPrototype(
  addListenerOrObserver,
  proto,
  names,
  taskName,
  taskMethod,
  once
) {
  if (names) {
    for (let i = 0; i < names.length; ++i) {
      let name = names[i];

      let handlerName = `__ember_concurrency_handler_${handlerCounter++}`;
      proto[handlerName] = makeTaskCallback(taskName, taskMethod, once);
      addListenerOrObserver(proto, name, null, handlerName);
    }
  }
}

function makeTaskCallback(taskName, method, once) {
  return function() {
    let task = get(this, taskName);

    if (once) {
      scheduleOnce('actions', task, method, ...arguments);
    } else {
      task[method].apply(task, arguments);
    }
  };
}

const setDecorator = Ember._setClassicDecorator || Ember._setComputedDecorator;
export function taskComputed(fn) {
  if (gte('3.10.0')) {
    let cp = function(proto, key) {
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
 * <a href="/#/docs/encapsulated-task">Encapsulated Task</a>
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
export function task(originalTaskFn) {
  let tp = taskComputed(function(key) {
    tp.taskFn.displayName = `${key} (task)`;

    let options = sharedTaskProperties(tp, this, key);
    if (typeof tp.taskFn === 'object') {
      return buildEncapsulatedTask(tp.taskFn, options);
    } else {
      return buildRegularTask(tp.taskFn, options);
    }
  });

  tp.taskFn = originalTaskFn;

  Object.setPrototypeOf(tp, TaskProperty.prototype);

  return tp;
}

function buildRegularTask(taskFn, options) {
  return new Task(
    Object.assign({
      generatorFactory: (args) => taskFn.apply(options.context, args),
    }, options)
  );
}

function buildEncapsulatedTask(taskObj, options) {
  return new EncapsulatedTask(Object.assign({ taskObj }, options));
}

/**
 * "Task Groups" provide a means for applying
 * task modifiers to groups of tasks. Once a {@linkcode Task} is declared
 * as part of a group task, modifiers like `drop()` or `restartable()`
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
 * @returns {TaskGroup}
 */
export function taskGroup() {
  let tp = taskComputed(function(key) {
    return new TaskGroup(sharedTaskProperties(tp, this, key));
  });

  Object.setPrototypeOf(tp, TaskGroupProperty.prototype);

  return tp;
}

function sharedTaskProperties(taskProperty, context, key) {
  let group, scheduler;
  let onStateCallback = taskProperty._onStateCallback;

  if (taskProperty._taskGroupPath) {
    group = get(context, taskProperty._taskGroupPath);
    scheduler = group.scheduler;
  } else {
    let schedulerPolicy = new taskProperty._schedulerPolicyClass(taskProperty._maxConcurrency);
    scheduler = new EmberScheduler(schedulerPolicy, onStateCallback);
  }

  return {
    context,
    debug: taskProperty._debug,
    _propertyName: key,
    name: key,
    group,
    scheduler,
    hasEnabledEvents: taskProperty._hasEnabledEvents,
    onStateCallback,
  };
}
