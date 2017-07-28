import { scheduleOnce } from '@ember/runloop';
import { addObserver } from '@ember/object/observers';
import { addListener } from '@ember/object/events';
import EmberObject from '@ember/object';
import { getOwner } from '@ember/application';
import Ember from 'ember';
import TaskInstance from './-task-instance';
import TaskStateMixin from './-task-state-mixin';
import { TaskGroup } from './-task-group';
import { propertyModifiers, resolveScheduler } from './-property-modifiers-mixin';
import { objectAssign, INVOKE, _cleanupOnDestroy, _ComputedProperty } from './utils';
import EncapsulatedTask from './-encapsulated-task';

/**
  The `Task` object lives on a host Ember object (e.g.
  a Component, Route, or Controller). You call the
  {@linkcode Task#perform .perform()} method on this object
  to create run individual {@linkcode TaskInstance}s,
  and at any point, you can call the {@linkcode Task#cancelAll .cancelAll()}
  method on this object to cancel all running or enqueued
  {@linkcode TaskInstance}s.


  <style>
    .ignore-this--this-is-here-to-hide-constructor,
    #Task{ display: none }
  </style>

  @class Task
*/
export const Task = EmberObject.extend(TaskStateMixin, {
  /**
   * `true` if any current task instances are running.
   *
   * @memberof Task
   * @member {boolean} isRunning
   * @instance
   * @readOnly
   */

  /**
   * `true` if any future task instances are queued.
   *
   * @memberof Task
   * @member {boolean} isQueued
   * @instance
   * @readOnly
   */

  /**
   * `true` if the task is not in the running or queued state.
   *
   * @memberof Task
   * @member {boolean} isIdle
   * @instance
   * @readOnly
   */

  /**
   * The current state of the task: `"running"`, `"queued"` or `"idle"`.
   *
   * @memberof Task
   * @member {string} state
   * @instance
   * @readOnly
   */

  /**
   * The most recently started task instance.
   *
   * @memberof Task
   * @member {TaskInstance} last
   * @instance
   * @readOnly
   */

  /**
   * The most recent task instance that is currently running.
   *
   * @memberof Task
   * @member {TaskInstance} lastRunning
   * @instance
   * @readOnly
   */

  /**
   * The most recently performed task instance.
   *
   * @memberof Task
   * @member {TaskInstance} lastPerformed
   * @instance
   * @readOnly
   */

  /**
   * The most recent task instance that succeeded.
   *
   * @memberof Task
   * @member {TaskInstance} lastSuccessful
   * @instance
   * @readOnly
   */

  /**
   * The most recently completed task instance.
   *
   * @memberof Task
   * @member {TaskInstance} lastComplete
   * @instance
   * @readOnly
   */

  /**
   * The most recent task instance that errored.
   *
   * @memberof Task
   * @member {TaskInstance} lastErrored
   * @instance
   * @readOnly
   */

  /**
   * The most recently canceled task instance.
   *
   * @memberof Task
   * @member {TaskInstance} lastCanceled
   * @instance
   * @readOnly
   */

  /**
   * The most recent task instance that is incomplete.
   *
   * @memberof Task
   * @member {TaskInstance} lastIncomplete
   * @instance
   * @readOnly
   */

  /**
   * The number of times this task has been performed.
   *
   * @memberof Task
   * @member {number} performCount
   * @instance
   * @readOnly
   */

  fn: null,
  context: null,
  _observes: null,
  _curryArgs: null,

  init() {
    this._super(...arguments);

    if (typeof this.fn === 'object') {
      let owner = getOwner(this.context);
      let ownerInjection = owner ? owner.ownerInjection() : {};
      this._taskInstanceFactory = EncapsulatedTask.extend(ownerInjection, this.fn);
    }

    _cleanupOnDestroy(this.context, this, 'cancelAll', 'the object it lives on was destroyed or unrendered');
  },

  _curry(...args) {
    let task = this._clone();
    task._curryArgs = [...(this._curryArgs || []), ...args];
    return task;
  },

  _clone() {
    return Task.create({
      fn: this.fn,
      context: this.context,
      _origin: this._origin,
      _taskGroupPath: this._taskGroupPath,
      _scheduler: this._scheduler,
      _propertyName: this._propertyName,
    });
  },

  /**
   * This property is true if this task is NOT running, i.e. the number
   * of currently running TaskInstances is zero.
   *
   * This property is useful for driving the state/style of buttons
   * and loading UI, among other things.
   *
   * @memberof Task
   * @instance
   * @readOnly
   */

  /**
   * This property is true if this task is running, i.e. the number
   * of currently running TaskInstances is greater than zero.
   *
   * This property is useful for driving the state/style of buttons
   * and loading UI, among other things.
   *
   * @memberof Task
   * @instance
   * @readOnly
   */

  /**
   * EXPERIMENTAL
   *
   * This value describes what would happen to the TaskInstance returned
   * from .perform() if .perform() were called right now.  Returns one of
   * the following values:
   *
   * - `succeed`: new TaskInstance will start running immediately
   * - `drop`: new TaskInstance will be dropped
   * - `enqueue`: new TaskInstance will be enqueued for later execution
   *
   * @memberof Task
   * @instance
   * @private
   * @readOnly
   */

  /**
   * EXPERIMENTAL
   *
   * Returns true if calling .perform() right now would immediately start running
   * the returned TaskInstance.
   *
   * @memberof Task
   * @instance
   * @private
   * @readOnly
   */

  /**
   * EXPERIMENTAL
   *
   * Returns true if calling .perform() right now would immediately cancel (drop)
   * the returned TaskInstance.
   *
   * @memberof Task
   * @instance
   * @private
   * @readOnly
   */

  /**
   * EXPERIMENTAL
   *
   * Returns true if calling .perform() right now would enqueue the TaskInstance
   * rather than execute immediately.
   *
   * @memberof Task
   * @instance
   * @private
   * @readOnly
   */

  /**
   * EXPERIMENTAL
   *
   * Returns true if calling .perform() right now would cause a previous task to be canceled
   *
   * @memberof Task
   * @instance
   * @private
   * @readOnly
   */


  /**
   * The current number of active running task instances. This
   * number will never exceed maxConcurrency.
   *
   * @memberof Task
   * @instance
   * @readOnly
   */

  /**
   * Cancels all running or queued `TaskInstance`s for this Task.
   * If you're trying to cancel a specific TaskInstance (rather
   * than all of the instances running under this task) call
   * `.cancel()` on the specific TaskInstance.
   *
   * @method cancelAll
   * @memberof Task
   * @instance
   */

  toString() {
    return `<Task:${this._propertyName}>`;
  },

  _taskInstanceFactory: TaskInstance,

  /**
   * Creates a new {@linkcode TaskInstance} and attempts to run it right away.
   * If running this task instance would increase the task's concurrency
   * to a number greater than the task's maxConcurrency, this task
   * instance might be immediately canceled (dropped), or enqueued
   * to run at later time, after the currently running task(s) have finished.
   *
   * @method perform
   * @memberof Task
   * @param {*} arg* - args to pass to the task function
   * @instance
   */
  perform(...args) {
    let fullArgs = this._curryArgs ? [...this._curryArgs, ...args] : args;
    let taskInstance = this._taskInstanceFactory.create({
      fn: this.fn,
      args: fullArgs,
      context: this.context,
      owner: this.context,
      task: this,
      _debug: this._debug,
      _origin: this,
    });

    if (this.context.isDestroying) {
      taskInstance.cancel();
    }

    this._scheduler.schedule(taskInstance);
    return taskInstance;
  },

  [INVOKE](...args) {
    return this.perform(...args);
  },
});

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
export function TaskProperty(taskFn) {
  let tp = this;
  _ComputedProperty.call(this, function(_propertyName) {
    taskFn.displayName = `${_propertyName} (task)`;
    return Task.create({
      fn: tp.taskFn,
      context: this,
      _origin: this,
      _taskGroupPath: tp._taskGroupPath,
      _scheduler: resolveScheduler(tp, this, TaskGroup),
      _propertyName,
      _debug: tp._debug,
    });
  });

  this.taskFn = taskFn;
  this.eventNames = null;
  this.cancelEventNames = null;
  this._observes = null;
}

TaskProperty.prototype = Object.create(_ComputedProperty.prototype);
objectAssign(TaskProperty.prototype, propertyModifiers, {
  constructor: TaskProperty,

  setup(proto, taskName) {
    if (this._maxConcurrency !== Infinity && !this._hasSetBufferPolicy) {
      Ember.Logger.warn(`The use of maxConcurrency() without a specified task modifier is deprecated and won't be supported in future versions of ember-concurrency. Please specify a task modifier instead, e.g. \`${taskName}: task(...).enqueue().maxConcurrency(${this._maxConcurrency})\``);
    }

    registerOnPrototype(addListener, proto, this.eventNames, taskName, 'perform', false);
    registerOnPrototype(addListener, proto, this.cancelEventNames, taskName, 'cancelAll', false);
    registerOnPrototype(addObserver, proto, this._observes, taskName, 'perform', true);
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
   *   return Ember.$.getJSON(url).promise();
   * }).maxConcurrency(3),
   *
   * elsewhere() {
   *   this.get('doSomeAjax').perform("http://www.example.com/json");
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
   * Logs lifecycle events to aid in debugging unexpected Task behavior.
   * Presently only logs cancelation events and the reason for the cancelation,
   * e.g. "TaskInstance 'doStuff' was canceled because the object it lives on was destroyed or unrendered"
   *
   * @method debug
   * @memberof TaskProperty
   * @instance
   */

  perform() {
    throw new Error("It looks like you tried to perform a task via `this.nameOfTask.perform()`, which isn't supported. Use `this.get('nameOfTask').perform()` instead.");
  },
});

function registerOnPrototype(addListenerOrObserver, proto, names, taskName, taskMethod, once) {
  if (names) {
    for (let i = 0; i < names.length; ++i) {
      let name = names[i];
      addListenerOrObserver(proto, name, null, makeTaskCallback(taskName, taskMethod, once));
    }
  }
}

function makeTaskCallback(taskName, method, once) {
  return function() {
    let task = this.get(taskName);

    if (once) {
      scheduleOnce('actions', task, method, ...arguments);
    } else {
      task[method].apply(task, arguments);
    }
  };
}
