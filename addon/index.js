import Ember from 'ember';
import { computed } from '@ember/object';
import { timeout, forever, makeGuid } from './-private/utils';
import { Task, TaskProperty } from './-private/task-property';
import { default as TaskInstance, didCancel } from './-private/task-instance';
import { TaskGroup, TaskGroupProperty } from './-private/task-group';
import { all, allSettled, hash, race } from './-private/cancelable-promise-helpers';
import { waitForQueue, waitForEvent, waitForProperty } from './-private/wait-for';
import { gte } from 'ember-compatibility-helpers';
import EmberScheduler from './-private/scheduler/ember-scheduler';
const setDecorator = Ember._setClassicDecorator || Ember._setComputedDecorator;

function _computed(fn) {
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
export function task(taskFn) {
  let tp = _computed(function(key) {
    tp.taskFn.displayName = `${key} (task)`;
    return Task.create(
      sharedTaskProperties(tp, this, key)
    );
  });

  tp.taskFn = taskFn;

  Object.setPrototypeOf(tp, TaskProperty.prototype);

  return tp;
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
export function taskGroup(taskFn) {
  let tp = _computed(function(key) {
    return TaskGroup.create(
      sharedTaskProperties(tp, this, key)
    );
  });

  tp.taskFn = taskFn;

  Object.setPrototypeOf(tp, TaskGroupProperty.prototype);

  return tp;
}

function sharedTaskProperties(taskProperty, context, _propertyName) {
  let props = {
    fn: taskProperty.taskFn,
    context,
    _origin: context,
    _propertyName,
    _debug: taskProperty._debug,
    _hasEnabledEvents: taskProperty._hasEnabledEvents,
    _guid: makeGuid(),
  };

  if (taskProperty._taskGroupPath) {
    let group = context.get(taskProperty._taskGroupPath)
    props.group = group;
    props._scheduler = group._scheduler;
  } else {
    let schedulerPolicy = new taskProperty._schedulerPolicyClass(taskProperty._maxConcurrency);
    props._scheduler = new EmberScheduler(schedulerPolicy);
  }

  return props;
}

export {
  all,
  allSettled,
  didCancel,
  hash,
  race,
  timeout,
  waitForQueue,
  waitForEvent,
  waitForProperty,
  forever,
  Task,
  TaskProperty,
  TaskInstance,
  TaskGroup,
  TaskGroupProperty
};
