import { setOwner, getOwner } from '@ember/application';
import EmberObject, { get, set } from '@ember/object';
import { isDestroying, registerDestructor } from '@ember/destroyable';
import { Task as BaseTask } from './external/task/task';
import { TaskInstance } from './task-instance';
import { TaskInstanceExecutor } from './external/task-instance/executor';
import { TASKABLE_MIXIN } from './taskable-mixin';
import { TRACKED_INITIAL_TASK_STATE } from './tracked-state';
import { CANCEL_KIND_LIFESPAN_END } from './external/task-instance/cancelation';

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
    #Task { display: none }
  </style>

  @class Task
*/
export class Task extends BaseTask {
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

  constructor(options) {
    super(options);

    if (!isDestroying(this.context)) {
      registerDestructor(this.context, () => {
        this.cancelAll({
          reason: 'the object it lives on was destroyed or unrendered',
          cancelRequestKind: CANCEL_KIND_LIFESPAN_END,
        });
      });
    }
  }

  /**
   * Flags the task as linked to the parent task's lifetime. Must be called
   * within another task's perform function. The task will be cancelled if the
   * parent task is canceled as well.
   *
   * ember-concurrency will indicate when this may be needed.
   *
   * @method linked
   * @memberof Task
   * @instance
   *
   */

  /**
   * Flags the task as not linked to the parent task's lifetime. Must be called
   * within another task's perform function. The task will NOT be cancelled if the
   * parent task is canceled.
   *
   * This is useful for avoiding the so-called "self-cancel loop" for tasks.
   * ember-concurrency will indicate when this may be needed.
   *
   * @method unlinked
   * @memberof Task
   * @instance
   *
   */

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
   *
   * @fires TaskInstance#TASK_NAME:started
   * @fires TaskInstance#TASK_NAME:succeeded
   * @fires TaskInstance#TASK_NAME:errored
   * @fires TaskInstance#TASK_NAME:canceled
   *
   */

  /**
   * Cancels all running or queued `TaskInstance`s for this Task.
   * If you're trying to cancel a specific TaskInstance (rather
   * than all of the instances running under this task) call
   * `.cancel()` on the specific TaskInstance.
   *
   * @method cancelAll
   * @memberof Task
   * @param options.reason A descriptive reason the task was
   *   cancelled. Defaults to `".cancelAll() was explicitly called
   *   on the Task"`.
   * @param options.resetState If true, will clear the task state
   *   (`last*` and `performCount` properties will be set to initial
   *   values). Defaults to false.
   * @instance
   * @async
   *
   */

  get _isAlive() {
    return !isDestroying(this.context);
  }

  _taskInstanceFactory(args, performType, linkedObject) {
    let options = this._taskInstanceOptions(args, performType, linkedObject);
    let taskInstance = new TaskInstance(options);
    return taskInstance;
  }

  _clone() {
    return new Task({
      context: this.context,
      debug: this.debug,
      env: this.env,
      generatorFactory: this.generatorFactory,
      group: this.group,
      hasEnabledEvents: this.hasEnabledEvents,
      name: this.name,
      onStateCallback: this.onStateCallback,
      scheduler: this.scheduler,
    });
  }
}

if (TRACKED_INITIAL_TASK_STATE) {
  Object.defineProperties(Task.prototype, TRACKED_INITIAL_TASK_STATE);
}

Object.assign(Task.prototype, TASKABLE_MIXIN);

const currentTaskInstanceSymbol = '__ec__encap_current_ti';
export class EncapsulatedTask extends Task {
  constructor(options) {
    super(options);
    this.taskObj = options.taskObj;
    this._encapsulatedTaskStates = new WeakMap();
    this._encapsulatedTaskInstanceProxies = new WeakMap();
  }

  _getEncapsulatedTaskClass() {
    let encapsulatedTaskImplClass = this._encapsulatedTaskImplClass;

    if (!encapsulatedTaskImplClass) {
      // eslint-disable-next-line ember/no-classic-classes
      encapsulatedTaskImplClass = EmberObject.extend(this.taskObj, {
        unknownProperty(key) {
          let currentInstance = this[currentTaskInstanceSymbol];
          return currentInstance ? currentInstance[key] : undefined;
        },
      });
    }

    return encapsulatedTaskImplClass;
  }

  _taskInstanceFactory(args, performType) {
    let owner = getOwner(this.context);
    let taskInstanceProxy;
    let encapsulatedTaskImpl = this._getEncapsulatedTaskClass().create({
      context: this.context,
    });
    setOwner(encapsulatedTaskImpl, owner);

    let generatorFactory = () =>
      encapsulatedTaskImpl.perform.apply(taskInstanceProxy, args);
    let taskInstance = new TaskInstance({
      task: this,
      args,
      executor: new TaskInstanceExecutor({
        generatorFactory,
        env: this.env,
        debug: this.debug,
      }),
      performType,
      hasEnabledEvents: this.hasEnabledEvents,
    });
    encapsulatedTaskImpl[currentTaskInstanceSymbol] = taskInstance;

    this._encapsulatedTaskStates.set(taskInstance, encapsulatedTaskImpl);

    taskInstanceProxy = this._wrappedEncapsulatedTaskInstance(taskInstance);

    return taskInstanceProxy;
  }

  _wrappedEncapsulatedTaskInstance(taskInstance) {
    if (!taskInstance) {
      return null;
    }

    let _encapsulatedTaskInstanceProxies =
      this._encapsulatedTaskInstanceProxies;
    let proxy = _encapsulatedTaskInstanceProxies.get(taskInstance);

    if (!proxy) {
      let encapsulatedTaskImpl = this._encapsulatedTaskStates.get(taskInstance);

      proxy = new Proxy(taskInstance, {
        get(obj, prop) {
          return prop in obj
            ? obj[prop]
            : get(encapsulatedTaskImpl, prop.toString());
        },
        set(obj, prop, value) {
          if (prop in obj) {
            obj[prop] = value;
          } else {
            set(encapsulatedTaskImpl, prop.toString(), value);
          }
          return true;
        },
        has(obj, prop) {
          return prop in obj || prop in encapsulatedTaskImpl;
        },
        ownKeys(obj) {
          return Reflect.ownKeys(obj).concat(
            Reflect.ownKeys(encapsulatedTaskImpl)
          );
        },
        defineProperty(obj, prop, descriptor) {
          // Ember < 3.16 uses a WeakMap for value storage, keyed to the proxy.
          // We need to ensure that when we use setProperties to update it, and
          // it creates Meta, that it uses the proxy to key, otherwise we'll
          // have two different values stores in Meta, one which won't render.
          let proxy = _encapsulatedTaskInstanceProxies.get(taskInstance);
          if (proxy) {
            if (descriptor.get) {
              descriptor.get = descriptor.get.bind(proxy);
            } else if (proxy && descriptor.set) {
              descriptor.set = descriptor.set.bind(proxy);
            }
          }

          return Reflect.defineProperty(encapsulatedTaskImpl, prop, descriptor);
        },
        getOwnPropertyDescriptor(obj, prop) {
          return prop in obj
            ? Reflect.getOwnPropertyDescriptor(obj, prop)
            : Reflect.getOwnPropertyDescriptor(encapsulatedTaskImpl, prop);
        },
      });

      _encapsulatedTaskInstanceProxies.set(taskInstance, proxy);
    }

    return proxy;
  }
}
