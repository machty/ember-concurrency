import Ember from 'ember';
import { computed } from '@ember/object';
import { timeout, forever, rawTimeout, animationFrame } from './utils';
import { Task, TaskProperty } from './-task-property';
import { didCancel } from './-task-instance';
import { TaskGroup, TaskGroupProperty } from './-task-group';
import { all, allSettled, hash, hashSettled, race } from './-cancelable-promise-helpers';
import { waitForQueue, waitForEvent, waitForProperty } from './-wait-for';
import { resolveScheduler } from './-property-modifiers-mixin';
import { gte } from 'ember-compatibility-helpers';

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
 * <a href="/docs/encapsulated-task">Encapsulated Task</a>
 * by passing in an object that defined a `perform` generator
 * method.
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
 * @param {function | object} taskFn A generator function backing the task or an encapsulated task descriptor object with a `perform` generator method.
 * @returns {TaskProperty}
 */
export function task(taskFn) {
  let tp = _computed(function(_propertyName) {
    tp.taskFn.displayName = `${_propertyName} (task)`;
    return Task.create({
      fn: tp.taskFn,
      context: this,
      _origin: this,
      _taskGroupPath: tp._taskGroupPath,
      _scheduler: resolveScheduler(tp, this, TaskGroup),
      _propertyName,
      _debug: tp._debug,
      _hasEnabledEvents: tp._hasEnabledEvents,
    });
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
 * @returns {TaskGroupProperty}
 */
export function taskGroup() {
  let tp = _computed(function(_propertyName) {
    return TaskGroup.create({
      context: this,
      _origin: this,
      _taskGroupPath: tp._taskGroupPath,
      _scheduler: resolveScheduler(tp, this, TaskGroup),
      _propertyName,
    });
  });

  Object.setPrototypeOf(tp, TaskGroupProperty.prototype);

  return tp;
}

export {
  all,
  allSettled,
  animationFrame,
  didCancel,
  hash,
  hashSettled,
  race,
  timeout,
  rawTimeout,
  waitForQueue,
  waitForEvent,
  waitForProperty,
  forever,
};
