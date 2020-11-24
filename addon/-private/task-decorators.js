import { computed, get } from '@ember/object';
import { TaskFactory, TaskGroupFactory } from './task-factory';
import { USE_TRACKED } from './utils';

function taskFromPropertyDescriptor(target, key, descriptor, params = []) {
  let { initializer, get, value } = descriptor;
  let taskFn;

  if (initializer) {
    taskFn = initializer.call(undefined);
  } else if (get) {
    taskFn = get.call(undefined);
  } else if (value) {
    taskFn = value;
  }

  taskFn.displayName = `${key} (task)`;

  let tasks = new WeakMap();
  let options = params[0] || {};
  let factory = new TaskFactory(key, taskFn, options);
  factory._setupEmberKVO(target);

  return {
    get() {
      let task = tasks.get(this);

      if (!task) {
        task = factory.createTask(this);
        tasks.set(this, task);
      }

      return task;
    }
  }
}

function taskGroupPropertyDescriptor(target, key, _descriptor, params = []) {
  let taskGroups = new WeakMap();
  let options = params[0] || {};
  let factory = new TaskGroupFactory(key, null, options);

  return {
    get() {
      let task = taskGroups.get(this);

      if (!task) {
        task = factory.createTaskGroup(this);
        taskGroups.set(this, task);
      }

      return task;
    }
  }
}

// Cribbed from @ember-decorators/utils
function isFieldDescriptor(possibleDesc) {
  let [target, key, desc] = possibleDesc;

  return (
    possibleDesc.length === 3 &&
    typeof target === 'object' &&
    target !== null &&
    typeof key === 'string' &&
    ((typeof desc === 'object' &&
      desc !== null &&
      'enumerable' in desc &&
      'configurable' in desc) ||
      desc === undefined) // TS compatibility ???
  );
}

function decoratorWithParams(descriptorFn) {
  return function(...params) {
    if (isFieldDescriptor(params)) {
      return descriptorFn(...params);
    } else {
      return (...desc) => descriptorFn(...desc, params);
    }
  }
}

function createDecorator(fn, baseOptions = {}) {
  return decoratorWithParams((target, key, descriptor, [userOptions] = []) => {
    let mergedOptions = Object.assign({}, { ...baseOptions, ...userOptions });

    return fn(target, key, descriptor, [mergedOptions]);
  });
}

export const lastValue = decoratorWithParams((target, key, descriptor, [taskName] = []) => {
  const { initializer } = descriptor;
  delete descriptor.initializer;

  if (USE_TRACKED) {
    return {
      get() {
        let lastInstance = this[taskName].lastSuccessful;

        if (lastInstance) {
          return lastInstance.value;
        }

        if (initializer) {
          return initializer.call(this);
        }

        return undefined;
      }
    };
  } else {
    let cp = computed(`${taskName}.lastSuccessful`, function() {
      let lastInstance = get(this, `${taskName}.lastSuccessful`);

      if (lastInstance) {
        return get(lastInstance, 'value');
      }

      if (initializer) {
        return initializer.call(this);
      }

      return undefined;
    });

    return cp(target, key, descriptor);
  }
});

export const task = createDecorator(taskFromPropertyDescriptor);
export const dropTask = createDecorator(
  taskFromPropertyDescriptor,
  { drop: true }
);
export const enqueueTask = createDecorator(
  taskFromPropertyDescriptor,
  { enqueue: true }
);
export const keepLatestTask = createDecorator(
  taskFromPropertyDescriptor,
  { keepLatest: true }
);
export const restartableTask = createDecorator(
  taskFromPropertyDescriptor,
  { restartable: true }
);

export const taskGroup = createDecorator(taskGroupPropertyDescriptor);
export const dropTaskGroup = createDecorator(
  taskGroupPropertyDescriptor,
  { drop: true }
);
export const enqueueTaskGroup = createDecorator(
  taskGroupPropertyDescriptor,
  { enqueue: true }
);
export const keepLatestTaskGroup = createDecorator(
  taskGroupPropertyDescriptor,
  { keepLatest: true }
);
export const restartableTaskGroup = createDecorator(
  taskGroupPropertyDescriptor,
  { restartable: true }
);
