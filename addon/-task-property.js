import Ember from 'ember';
import TaskInstance from './-task-instance';
import { _cleanupOnDestroy } from './utils';
import {
  enqueueTasksPolicy,
  dropQueuedTasksPolicy,
  cancelOngoingTasksPolicy,
  dropButKeepLatestPolicy
} from './-buffer-policy';

const ComputedProperty = Ember.__loader.require("ember-metal/computed").ComputedProperty;
const { computed } = Ember;

function isSuccess(nextPerformState) {
  return nextPerformState === 'succeed' || nextPerformState === 'cancel_previous';
}

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
export const Task = Ember.Object.extend({
  fn: null,
  context: null,
  bufferPolicy: null,

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
  isIdle: computed.equal('concurrency', 0),

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
  isRunning: Ember.computed.not('isIdle'),

  state: computed('isIdle', function() {
    return this.get('isIdle') ? 'idle' : 'running';
  }),
  _maxConcurrency: Infinity,
  _activeTaskInstances: null,
  _needsFlush: null,
  _propertyName: null,
  _origin: null,

  name: computed.oneWay('_propertyName'),

  _performsPath: null,
  _performs: computed('_performsPath', function() {
    let path = this.get('_performsPath');
    if (!path) { return; }

    let task = this.context.get(path);
    if (!(task instanceof Task)) {
      throw new Error(`You wrote .performs('${path}'), but the object at '${path}' is not a Task`);
    }
    return task;
  }),

  _performsState: computed('_performs.nextPerformState', function() {
    return this.get('_performs.nextPerformState') || 'succeed';
  }),

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
  nextPerformState: computed('_performsState', function() {
    let performsState = this.get('_performsState');
    return isSuccess(performsState) ?
      this.bufferPolicy.getNextPerformStatus(this) :
      performsState;
  }),

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
  performWillSucceed: computed('nextPerformState', function() {
    return isSuccess(this.get('nextPerformState'));
  }),

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
  performWillDrop: computed.equal('nextPerformState', 'drop'),

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
  performWillEnqueue: computed.equal('nextPerformState', 'enqueue'),

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
  performWillCancelPrevious: computed.equal('nextPerformState', 'cancel_previous'),

  init() {
    this._super(...arguments);
    this._activeTaskInstances = Ember.A();
    this._queuedTaskInstances = Ember.A();

    let self = this;
    this.perform = function(...args) {
      if (this !== self) {
        console.warn(`The use of ${self._propertyName}.perform within a template is deprecated and won't be supported in future versions of ember-concurrency. Please use the \`perform\` helper instead, e.g. {{perform ${self._propertyName}}}`);
      }
      return self._perform(...args);
    };

    this._needsFlush = Ember.run.bind(this, this._scheduleFlush);

    _cleanupOnDestroy(this.context, this, 'cancelAll');
  },

  /**
   * The current number of active running task instances. This
   * number will never exceed maxConcurrency.
   *
   * @memberof Task
   * @instance
   * @readOnly
   */
  concurrency: 0,

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
  perform: null,

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
  cancelAll() {
    this.spliceTaskInstances(this._activeTaskInstances, 0, this._activeTaskInstances.length);
    this.spliceTaskInstances(this._queuedTaskInstances, 0, this._queuedTaskInstances.length);
  },

  spliceTaskInstances(taskInstances, index, count) {
    for (let i = index; i < index + count; ++i) {
      taskInstances[i].cancel();
    }
    taskInstances.splice(index, count);
  },

  toString() {
    return `<Task:${this._propertyName}>`;
  },

  _perform(...args) {
    let taskInstance = TaskInstance.create({
      fn: this.fn,
      args,
      context: this.context,
      task: this,
      _origin: this,
      _debugCallback: this._debugCallback,
    });

    if (this._debugCallback) {
      this._debugCallback({
        type: 'perform',
        taskInstance,
        task: this,
      });
    }

    if (this.get('_performs') && !this.get('performWillSucceed')) {
      // tasks linked via .performs() should be immediately dropped
      // before they even have a chance to run if we know that
      // .performWillSucceed is false.
      taskInstance.cancel();
      return taskInstance;
    }

    this._queuedTaskInstances.push(taskInstance);
    this._needsFlush();
    this.notifyPropertyChange('nextPerformState');

    return taskInstance;
  },

  _flushScheduled: false,
  _scheduleFlush() {
    this._flushScheduled = true;
    Ember.run.once(this, this._flushQueues);
  },

  _flushQueues() {
    this._flushScheduled = false;
    this._activeTaskInstances = Ember.A(this._activeTaskInstances.filterBy('isFinished', false));

    this.bufferPolicy.schedule(this);

    for (let i = 0; i < this._activeTaskInstances.length; ++i) {
      let taskInstance = this._activeTaskInstances[i];
      if (!taskInstance.hasStarted) {
        // use internal promise so that it doesn't cancel error reporting
        taskInstance._start()._defer.promise.then(this._needsFlush, this._needsFlush);
      }
    }

    this.notifyPropertyChange('nextPerformState');

    let concurrency = this._activeTaskInstances.length;
    this.set('concurrency', concurrency);
    if (this._completionDefer && concurrency === 0) {
      this._completionDefer.resolve();
      this._completionDefer = null;
    }
  },

  _completionDefer: null,
  _getCompletionPromise() {
    return new Ember.RSVP.Promise(r => {
      Ember.run.schedule('actions', null, () => {
        let defer = Ember.RSVP.defer();
        if (!this._flushScheduled &&
            this._activeTaskInstances.length === 0 &&
            this._queuedTaskInstances.length === 0) {
          defer.resolve();
        } else {
          this._completionDefer = defer;
        }
        defer.promise.then(r);
      });
    });
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
export function TaskProperty(...decorators) {
  let taskFn = decorators.pop();

  let tp = this;
  ComputedProperty.call(this, function(_propertyName) {
    return Task.create({
      fn: taskFn,
      context: this,
      _origin: this,
      bufferPolicy: tp.bufferPolicy,
      _maxConcurrency: tp._maxConcurrency,
      _performsPath: tp._performsPath && tp._performsPath[0],
      _propertyName,
      _debugName: "",
      _debugCallback: tp._debugCallback,
    });
  });

  this.bufferPolicy = enqueueTasksPolicy;
  this._maxConcurrency = Infinity;
  this.eventNames = null;
  this.cancelEventNames = null;
  this._performsPath = null;
  this._debugCallback = null;

  for (let i = 0; i < decorators.length; ++i) {
    applyDecorator(this, decorators[i]);
  }
}

function applyDecorator(taskProperty, decorator) {
  let value = decorator(taskProperty);
  if (typeof value === 'function') {
    value(taskProperty);
  }
}

TaskProperty.prototype = Object.create(ComputedProperty.prototype);
TaskProperty.prototype.constructor = TaskProperty;
TaskProperty.prototype.setup = function(proto, keyname) {
  addListenersToPrototype(proto, this.eventNames, keyname, '_perform');
  addListenersToPrototype(proto, this.cancelEventNames, keyname, 'cancelAll');
};

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
TaskProperty.prototype.on = function() {
  this.eventNames = this.eventNames || [];
  this.eventNames.push.apply(this.eventNames, arguments);
  return this;
};

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
TaskProperty.prototype.cancelOn = function() {
  this.cancelEventNames = this.cancelEventNames || [];
  this.cancelEventNames.push.apply(this.cancelEventNames, arguments);
  return this;
};

/**
 * Configures the task to cancel old currently task instances
 * to make room for a new one to perform. Sets default
 * maxConcurrency to 1.
 *
 * [See the Live Example](/#/docs/examples/route-tasks/1)
 *
 * Another way to apply the `restartable` modifier is to import
 * it and pass it in as an argument to the {@linkcode task}
 * function. Writing it this way allows you to see a task's modifiers
 * up front, rather than having to look to the end of the
 * task function to see which modifiers have been applied.
 * For example:
 *
 *     import { task, restartable } from 'ember-concurrency';
 *     export default Component.extend({
 *       myTask: task(restartable, function * () {
 *         // ...
 *       }),
 *     });
 *
 * @method restartable
 * @memberof TaskProperty
 * @instance
 */
TaskProperty.prototype.restartable = function() {
  this.bufferPolicy = cancelOngoingTasksPolicy;
  this._setDefaultMaxConcurrency(1);
  return this;
};

/**
 * Configures the task to run task instances one-at-a-time in
 * the order they were `.perform()`ed. Sets default
 * maxConcurrency to 1.
 *
 * Another way to apply the `enqueue` modifier is to import
 * it and pass it in as an argument to the {@linkcode task}
 * function. Writing it this way allows you to see a task's modifiers
 * up front, rather than having to look to the end of the
 * task function to see which modifiers have been applied.
 * For example:
 *
 *     import { task, enqueue } from 'ember-concurrency';
 *     export default Component.extend({
 *       myTask: task(enqueue, function * () {
 *         // ...
 *       }),
 *     });
 *
 * @method enqueue
 * @memberof TaskProperty
 * @instance
 */
TaskProperty.prototype.enqueue = function() {
  this.bufferPolicy = enqueueTasksPolicy;
  this._setDefaultMaxConcurrency(1);
  return this;
};

/**
 * Configures the task to immediately cancel (i.e. drop) any
 * task instances performed when the task is already running
 * at maxConcurrency. Sets default maxConcurrency to 1.
 *
 * Another way to apply the `drop` modifier is to import
 * it and pass it in as an argument to the {@linkcode task}
 * function. Writing it this way allows you to see a task's modifiers
 * up front, rather than having to look to the end of the
 * task function to see which modifiers have been applied.
 * For example:
 *
 *     import { task, drop } from 'ember-concurrency';
 *     export default Component.extend({
 *       myTask: task(drop, function * () {
 *         // ...
 *       }),
 *     });
 *
 * @method drop
 * @memberof TaskProperty
 * @instance
 */
TaskProperty.prototype.drop = function() {
  this.bufferPolicy = dropQueuedTasksPolicy;
  this._setDefaultMaxConcurrency(1);
  return this;
};

/**
 * @private
 */
TaskProperty.prototype.keepLatest = function() {
  this.bufferPolicy = dropButKeepLatestPolicy;
  this._setDefaultMaxConcurrency(1);
  return this;
};

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
 * Another way to apply the `maxConcurrency` modifier is to import
 * it and pass it in as an argument to the {@linkcode task}
 * function. Writing it this way allows you to see a task's modifiers
 * up front, rather than having to look to the end of the
 * task function to see which modifiers have been applied.
 * For example:
 *
 *     import { task, maxConcurrency } from 'ember-concurrency';
 *     export default Component.extend({
 *       myTask: task(maxConcurrency(5), function * () {
 *         // ...
 *       }),
 *     });
 *
 * @method maxConcurrency
 * @memberof TaskProperty
 * @param {Number} n The maximum number of concurrently running tasks
 * @instance
 */
TaskProperty.prototype.maxConcurrency = function(n) {
  this._maxConcurrency = n;
  return this;
};

TaskProperty.prototype._setDefaultMaxConcurrency = function(n) {
  if (this._maxConcurrency === Infinity) {
    this._maxConcurrency = n;
  }
};

TaskProperty.prototype.performs = function() {
  this._performsPath = this._performsPath || [];
  this._performsPath.push.apply(this._performsPath, arguments);
  return this;
};

function defaultDebugCallback(payload) {
  console.log(payload);
}

TaskProperty.prototype._debug = function(cb) {
  this._debugCallback = cb || defaultDebugCallback;
  return this;
};

function addListenersToPrototype(proto, eventNames, taskName, taskMethod) {
  if (eventNames) {
    for (let i = 0; i < eventNames.length; ++i) {
      let eventName = eventNames[i];
      Ember.addListener(proto, eventName, null, makeListener(taskName, taskMethod));
    }
  }
}

function makeListener(taskName, method) {
  return function() {
    let task = this.get(taskName);
    task[method].apply(task, arguments);
  };
}

