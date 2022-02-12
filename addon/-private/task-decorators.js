import { computed, get } from '@ember/object';
import {
  decoratorWithParams,
  createTaskDecorator,
  createTaskGroupDecorator,
  lastValue as nativeLastValue,
} from './external/task-decorators';
import { TaskFactory as EmberTaskFactory } from './task-factory';
import { USE_TRACKED } from './utils';

const computedLastValue = decoratorWithParams(
  (target, key, descriptor, [taskName] = []) => {
    const { initializer } = descriptor;
    delete descriptor.initializer;

    let cp = computed(`${taskName}.lastSuccessful`, function () {
      let lastInstance = get(this, `${taskName}.lastSuccessful`);

      if (lastInstance) {
        // eslint-disable-next-line ember/no-get
        return get(lastInstance, 'value');
      }

      if (initializer) {
        return initializer.call(this);
      }

      return undefined;
    });

    return cp(target, key, descriptor);
  }
);

export const lastValue = USE_TRACKED ? nativeLastValue : computedLastValue;

/**
 * A Task is a cancelable, restartable, asynchronous operation that
 * is driven by a generator function. Tasks are automatically canceled
 * when the object they live on is destroyed (e.g. a Component
 * is unrendered).
 *
 * Turns the decorated generator function into a task.
 *
 * Optionally takes a hash of options that will be applied as modifiers to the
 * task. For instance `maxConcurrency`, `on`, `group` or `keepLatest`.
 *
 * By default, tasks have no concurrency constraints
 * (multiple instances of a task can be running at the same time)
 * but much of a power of tasks lies in proper usage of Task Modifiers
 * that you can apply to a task.
 *
 * You can also define an
 * <a href="/docs/advanced/encapsulated-task">Encapsulated Task</a>
 * by decorating an object that defines a `perform` generator
 * method.
 *
 * ```js
 * import Component from '@ember/component';
 * import { task } from 'ember-concurrency';
 *
 * class MyComponent extends Component {
 *   &#64;task
 *   *plainTask() {}
 *
 *   &#64;task({ maxConcurrency: 5, keepLatest: true, cancelOn: 'click' })
 *   *taskWithModifiers() {}
 * }
 * ```
 *
 * @function
 * @param {object?} [options={}] Task modifier options
 * @param {string|string[]} [options.cancelOn] Events to cancel task on. Applies only to `&#64;ember/component`
 * @param {boolean} [options.enqueue] Sets `enqueue` modifier on task if `true`
 * @param {boolean} [options.evented] Enables [task lifecycle events](/docs/advanced/lifecycle-events) for this Task, if `true`
 * @param {boolean} [options.debug] Enables task debugging if `true`
 * @param {boolean} [options.drop] Sets `drop` modifier on task if `true`
 * @param {string} [options.group] Associates task with the group specified
 * @param {boolean} [options.keepLatest] Sets `keepLatest` modifier on task if `true`
 * @param {number} [options.maxConcurrency] Sets the maximum number of running task instances for the task
 * @param {string|string[]} [options.observes] Properties to watch and cause task to be performed when they change
 * @param {string|string[]} [options.on] Events to perform task on. Applies only to `&#64;ember/component`
 * @param {function?} [options.onState] Callback to use for state tracking. May be set to `null` to disable state tracking.
 * @param {boolean} [options.restartable] Sets `restartable` modifier on task if `true`
 * @return {Task}
 */
export const task = createTaskDecorator({}, EmberTaskFactory);

/**
 * Turns the decorated generator function into a task and applies the
 * `drop` modifier.
 *
 * Optionally takes a hash of options that will be applied as modifiers to the
 * task. For instance `maxConcurrency`, `on`, or `group`.
 *
 * You can also define an
 * <a href="/docs/advanced/encapsulated-task">Encapsulated Task</a>
 * by decorating an object that defines a `perform` generator
 * method.
 *
 * ```js
 * import Component from '@ember/component';
 * import { task, dropTask } from 'ember-concurrency';
 *
 * class MyComponent extends Component {
 *   &#64;task
 *   *plainTask() {}
 *
 *   &#64;dropTask({ cancelOn: 'click' })
 *   *myDropTask() {}
 * }
 * ```
 *
 * @function
 * @param {object?} [options={}] Task modifier options. See {@link task} for list.
 * @return {Task}
 */
export const dropTask = createTaskDecorator({ drop: true }, EmberTaskFactory);

/**
 * Turns the decorated generator function into a task and applies the
 * `enqueue` modifier.
 *
 * Optionally takes a hash of options that will be applied as modifiers to the
 * task. For instance `maxConcurrency`, `on`, or `group`.
 *
 * You can also define an
 * <a href="/docs/advanced/encapsulated-task">Encapsulated Task</a>
 * by decorating an object that defines a `perform` generator
 * method.
 *
 * ```js
 * import Component from '@ember/component';
 * import { task, enqueueTask } from 'ember-concurrency';
 *
 * class MyComponent extends Component {
 *   &#64;task
 *   *plainTask() {}
 *
 *   &#64;enqueueTask({ cancelOn: 'click' })
 *   *myEnqueueTask() {}
 * }
 * ```
 *
 * @function
 * @param {object?} [options={}] Task modifier options. See {@link task} for list.
 * @return {Task}
 */
export const enqueueTask = createTaskDecorator(
  {
    enqueue: true,
  },
  EmberTaskFactory
);

/**
 * Turns the decorated generator function into a task and applies the
 * `keepLatest` modifier.
 *
 * Optionally takes a hash of options that will be applied as modifiers to the
 * task. For instance `maxConcurrency`, `on`, or `group`.
 *
 * You can also define an
 * <a href="/docs/advanced/encapsulated-task">Encapsulated Task</a>
 * by decorating an object that defines a `perform` generator
 * method.
 *
 * ```js
 * import Component from '@ember/component';
 * import { task, keepLatestTask } from 'ember-concurrency';
 *
 * class MyComponent extends Component {
 *   &#64;task
 *   *plainTask() {}
 *
 *   &#64;keepLatestTask({ cancelOn: 'click' })
 *   *myKeepLatestTask() {}
 * }
 * ```
 *
 * @function
 * @param {object?} [options={}] Task modifier options. See {@link task} for list.
 * @return {Task}
 */
export const keepLatestTask = createTaskDecorator(
  {
    keepLatest: true,
  },
  EmberTaskFactory
);

/**
 * Turns the decorated generator function into a task and applies the
 * `restartable` modifier.
 *
 * Optionally takes a hash of options that will be applied as modifiers to the
 * task. For instance `maxConcurrency`, `on`, or `group`.
 *
 * You can also define an
 * <a href="/docs/advanced/encapsulated-task">Encapsulated Task</a>
 * by decorating an object that defines a `perform` generator
 * method.
 *
 * ```js
 * import Component from '@ember/component';
 * import { task, restartableTask } from 'ember-concurrency';
 *
 * class MyComponent extends Component {
 *   &#64;task
 *   *plainTask() {}
 *
 *   &#64;restartableTask({ cancelOn: 'click' })
 *   *myRestartableTask() {}
 * }
 * ```
 *
 * @function
 * @param {object?} [options={}] Task modifier options. See {@link task} for list.
 * @return {Task}
 */
export const restartableTask = createTaskDecorator(
  {
    restartable: true,
  },
  EmberTaskFactory
);

/**
 * "Task Groups" provide a means for applying
 * task modifiers to groups of tasks. Once a {@linkcode Task} is declared
 * as part of a group task, modifiers like `drop` or `restartable`
 * will no longer affect the individual `Task`. Instead those
 * modifiers can be applied to the entire group.
 *
 * Turns the decorated property into a task group.
 *
 * Optionally takes a hash of options that will be applied as modifiers to the
 * task group. For instance `maxConcurrency` or `keepLatest`.
 *
 * ```js
 * import Component from '@glimmer/component';
 * import { task, taskGroup } from 'ember-concurrency';
 *
 * class MyComponent extends Component {
 *   &#64;taskGroup({ maxConcurrency: 5 }) chores;
 *
 *   &#64;task({ group: 'chores' })
 *   *mowLawn() {}
 *
 *   &#64;task({ group: 'chores' })
 *   *doDishes() {}
 * }
 * ```
 *
 * @function
 * @param {object?} [options={}] Task group modifier options. See {@link task} for list.
 * @return {TaskGroup}
 */
export const taskGroup = createTaskGroupDecorator({}, EmberTaskFactory);

/**
 * Turns the decorated property into a task group and applies the
 * `drop` modifier.
 *
 * Optionally takes a hash of further options that will be applied as modifiers
 * to the task group.
 *
 * @function
 * @param {object?} [options={}] Task group modifier options. See {@link task} for list.
 * @return {TaskGroup}
 */
export const dropTaskGroup = createTaskGroupDecorator(
  {
    drop: true,
  },
  EmberTaskFactory
);

/**
 * Turns the decorated property into a task group and applies the
 * `enqueue` modifier.
 *
 * Optionally takes a hash of further options that will be applied as modifiers
 * to the task group.
 *
 * @function
 * @param {object?} [options={}] Task group modifier options. See {@link task} for list.
 * @return {TaskGroup}
 */
export const enqueueTaskGroup = createTaskGroupDecorator(
  {
    enqueue: true,
  },
  EmberTaskFactory
);

/**
 * Turns the decorated property into a task group and applies the
 * `keepLatest` modifier.
 *
 * Optionally takes a hash of further options that will be applied as modifiers
 * to the task group.
 *
 * @function
 * @param {object?} [options={}] Task group modifier options. See {@link task} for list.
 * @return {TaskGroup}
 */
export const keepLatestTaskGroup = createTaskGroupDecorator(
  { keepLatest: true },
  EmberTaskFactory
);

/**
 * Turns the decorated property into a task group and applies the
 * `restartable` modifier.
 *
 * Optionally takes a hash of further options that will be applied as modifiers
 * to the task group.
 *
 * @function
 * @param {object?} [options={}] Task group modifier options. See {@link task} for list.
 * @return {TaskGroup}
 */
export const restartableTaskGroup = createTaskGroupDecorator(
  { restartable: true },
  EmberTaskFactory
);
