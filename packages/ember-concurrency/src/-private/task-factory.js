import { assert } from '@ember/debug';
import { get } from '@ember/object';
import { addListener } from '@ember/object/events';
import { addObserver } from '@ember/object/observers';
import { scheduleOnce } from '@ember/runloop';
import {
  TaskFactory as BaseTaskFactory,
  registerModifier,
} from './external/task-factory';

import { EMBER_ENVIRONMENT } from './ember-environment';
import EmberScheduler from './scheduler/ember-scheduler';
import { Task } from './task';

let handlerCounter = 0;

function registerOnPrototype(
  addListenerOrObserver,
  proto,
  names,
  taskName,
  taskMethod,
  once,
) {
  if (names && names.length > 0) {
    for (let i = 0; i < names.length; ++i) {
      let name = names[i];

      let handlerName = `__ember_concurrency_handler_${handlerCounter++}`;
      proto[handlerName] = makeTaskCallback(taskName, taskMethod, once);
      addListenerOrObserver(proto, name, null, handlerName);
    }
  }
}

function makeTaskCallback(taskName, method, once) {
  return function () {
    let task = get(this, taskName);

    if (once) {
      scheduleOnce('actions', task, method, ...arguments);
    } else {
      task[method].apply(task, arguments);
    }
  };
}

const ensureArray = (possibleArr) =>
  Array.isArray(possibleArr) ? possibleArr : [possibleArr];

registerModifier('cancelOn', (factory, eventNames) =>
  factory.addCancelEvents(...ensureArray(eventNames)),
);
registerModifier('observes', (factory, propertyPaths) =>
  factory.addObserverKeys(...ensureArray(propertyPaths)),
);
registerModifier('on', (factory, eventNames) =>
  factory.addPerformEvents(...ensureArray(eventNames)),
);

export class TaskFactory extends BaseTaskFactory {
  env = EMBER_ENVIRONMENT;

  createTask(context) {
    assert(
      `Cannot create task if a task definition is not provided as generator function`,
      this.taskDefinition,
    );

    let options = this.getTaskOptions(context);

    return new Task(
      Object.assign(
        {
          generatorFactory: (args) => this.taskDefinition.apply(context, args),
        },
        options,
      ),
    );
  }

  addCancelEvents(...cancelEventNames) {
    this._cancelEventNames = this._cancelEventNames || [];
    this._cancelEventNames.push(...cancelEventNames);
    return this;
  }

  addObserverKeys(...keys) {
    this._observes = this._observes || [];
    this._observes.push(...keys);
    return this;
  }

  addPerformEvents(...eventNames) {
    this._eventNames = this._eventNames || [];
    this._eventNames.push(...eventNames);
    return this;
  }

  getModifier(name) {
    let modifier = super.getModifier(name);

    assert(
      `Task option '${name}' is not recognized as a supported option.`,
      modifier,
    );

    return modifier;
  }

  getScheduler(schedulerPolicy, stateTrackingEnabled) {
    return new EmberScheduler(schedulerPolicy, stateTrackingEnabled);
  }

  _setupEmberKVO(proto) {
    // TODO: Does this make sense in a post-Ember object world?

    registerOnPrototype(
      addListener,
      proto,
      this._eventNames,
      this.name,
      'perform',
      false,
    );
    registerOnPrototype(
      addListener,
      proto,
      this._cancelEventNames,
      this.name,
      'cancelAll',
      false,
    );
    registerOnPrototype(
      addObserver,
      proto,
      this._observes,
      this.name,
      'perform',
      true,
    );
  }

  // Provided for compatibility with the now-removed ember-concurrency TaskProperty extension
  // methods. TODO: delete this?
  get taskFn() {
    return this.taskDefinition;
  }

  set taskFn(fn) {
    this.setTaskDefinition(fn);
  }
}
