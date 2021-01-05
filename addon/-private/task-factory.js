import UnboundedSchedulerPolicy from "./external/scheduler/policies/unbounded-policy";
import EnqueueSchedulerPolicy from "./external/scheduler/policies/enqueued-policy";
import DropSchedulerPolicy from "./external/scheduler/policies/drop-policy";
import KeepLatestSchedulerPolicy from "./external/scheduler/policies/keep-latest-policy";
import RestartableSchedulerPolicy from "./external/scheduler/policies/restartable-policy";

import { assert } from "@ember/debug";
import { get } from "@ember/object";
import { addListener } from "@ember/object/events";
import { addObserver } from "@ember/object/observers";
import { scheduleOnce } from "@ember/runloop";
import { Task, EncapsulatedTask } from "./task";
import { TaskProperty } from "./task-properties";
import { TaskGroup } from "./task-group";
import EmberScheduler from "./scheduler/ember-scheduler";

let handlerCounter = 0;

function assertModifiersNotMixedWithGroup(obj) {
  assert(
    `ember-concurrency does not currently support using both 'group' with other task modifiers (e.g. 'drop', 'enqueue', 'restartable')`,
    !obj._hasUsedModifier || !obj._taskGroupPath
  );
}

function assertUnsetBufferPolicy(obj) {
  assert(
    `Cannot set multiple buffer policies on a task or task group. ${obj._schedulerPolicyClass} has already been set for task or task group '${obj.name}'`,
    !obj._hasSetBufferPolicy
  );
}

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
  return function () {
    let task = get(this, taskName);

    if (once) {
      scheduleOnce("actions", task, method, ...arguments);
    } else {
      task[method].apply(task, arguments);
    }
  };
}

const ensureArray = (possibleArr) =>
  Array.isArray(possibleArr) ? possibleArr : [possibleArr];

const optionRegistry = {
  cancelOn: (factory, eventNames) =>
    factory.addCancelEvents(...ensureArray(eventNames)),
  enqueue: (factory) => factory.setBufferPolicy(EnqueueSchedulerPolicy),
  evented: (factory) => factory.setEvented(true),
  debug: (factory) => factory.setDebug(true),
  drop: (factory) => factory.setBufferPolicy(DropSchedulerPolicy),
  group: (factory, groupName) => factory.setGroup(groupName),
  keepLatest: (factory) => factory.setBufferPolicy(KeepLatestSchedulerPolicy),
  maxConcurrency: (factory, maxConcurrency) =>
    factory.setMaxConcurrency(maxConcurrency),
  observes: (factory, propertyPaths) =>
    factory.addObserverKeys(...ensureArray(propertyPaths)),
  on: (factory, eventNames) =>
    factory.addPerformEvents(...ensureArray(eventNames)),
  onState: (factory, onStateCallback) => factory.setOnState(onStateCallback),
  restartable: (factory) => factory.setBufferPolicy(RestartableSchedulerPolicy),
};

export class TaskFactory {
  _cancelEventNames = [];
  _debug = null;
  _eventNames = [];
  _hasUsedModifier = false;
  _hasSetBufferPolicy = false;
  _hasEnabledEvents = false;
  _maxConcurrency = null;
  _observes = [];
  _onStateCallback = (state, taskable) => taskable.setState(state);
  _schedulerPolicyClass = UnboundedSchedulerPolicy;
  _taskGroupPath = null;

  constructor(name = "<unknown>", taskDefinition = null, options = {}) {
    this.name = name;
    this.taskDefinition = taskDefinition;

    this._processOptions(options);
  }

  createTask(context) {
    assert(
      `Cannot create task if a task definition is not provided as generator function or encapsulated task.`,
      this.taskDefinition
    );
    let options = this._sharedTaskProperties(context);

    if (typeof this.taskDefinition === "object") {
      return new EncapsulatedTask(
        Object.assign({ taskObj: this.taskDefinition }, options)
      );
    } else {
      return new Task(
        Object.assign(
          {
            generatorFactory: (args) =>
              this.taskDefinition.apply(context, args),
          },
          options
        )
      );
    }
  }

  addCancelEvents(...cancelEventNames) {
    this._cancelEventNames.push(...cancelEventNames);
    return this;
  }

  addObserverKeys(...keys) {
    this._observes.push(...keys);
    return this;
  }

  addPerformEvents(...eventNames) {
    this._eventNames.push(...eventNames);
    return this;
  }

  setBufferPolicy(policy) {
    assertUnsetBufferPolicy(this);
    this._hasSetBufferPolicy = true;
    this._hasUsedModifier = true;
    this._schedulerPolicyClass = policy;
    assertModifiersNotMixedWithGroup(this);

    return this;
  }

  setDebug(debug) {
    this._debug = debug;
    return this;
  }

  setEvented(evented) {
    this._hasEnabledEvents = evented;
    return this;
  }

  setMaxConcurrency(maxConcurrency) {
    assert(
      `maxConcurrency must be an integer (Task '${this.name}')`,
      Number.isInteger(maxConcurrency)
    );
    this._hasUsedModifier = true;
    this._maxConcurrency = maxConcurrency;
    assertModifiersNotMixedWithGroup(this);
    return this;
  }

  setGroup(group) {
    this._taskGroupPath = group;
    assertModifiersNotMixedWithGroup(this);
    return this;
  }

  setName(name) {
    this.name = name;
    return this;
  }

  setOnState(onStateCallback) {
    this._onStateCallback = onStateCallback;
    return this;
  }

  setTaskDefinition(taskDefinition) {
    assert(
      `Task definition must be a generator function or encapsulated task.`,
      typeof taskDefinition === "function" ||
        (typeof taskDefinition === "object" &&
          typeof taskDefinition.perform === "function")
    );
    this.taskDefinition = taskDefinition;
    return this;
  }

  _processOptions(options) {
    for (let key of Object.keys(options)) {
      let value = options[key];
      if (optionRegistry[key]) {
        optionRegistry[key].call(null, this, value);
      } else if (typeof TaskProperty.prototype[key] === "function") {
        // Shim for compatibility with user-defined TaskProperty prototype
        // extensions. To be removed when replaced with proper public API.
        TaskProperty.prototype[key].call(this, value);
      } else {
        assert(`Task option '${key}' is not recognized as a supported option.`, false);
      }
    }
  }

  _setupEmberKVO(proto) {
    // TODO: Does this make sense in a post-Ember object world?

    registerOnPrototype(
      addListener,
      proto,
      this._eventNames,
      this.name,
      "perform",
      false
    );
    registerOnPrototype(
      addListener,
      proto,
      this._cancelEventNames,
      this.name,
      "cancelAll",
      false
    );
    registerOnPrototype(
      addObserver,
      proto,
      this._observes,
      this.name,
      "perform",
      true
    );
  }

  _sharedTaskProperties(context) {
    let group, scheduler;
    let onStateCallback = this._onStateCallback;

    if (this._taskGroupPath) {
      group = context[this._taskGroupPath];
      assert(
        `ember-concurrency: Expected group '${this._taskGroupPath}' to be defined but was not found.`,
        group instanceof TaskGroup
      );
      scheduler = group.scheduler;
    } else {
      let schedulerPolicy = new this._schedulerPolicyClass(
        this._maxConcurrency
      );
      scheduler = new EmberScheduler(schedulerPolicy, onStateCallback);
    }

    return {
      context,
      debug: this._debug,
      name: this.name,
      group,
      scheduler,
      hasEnabledEvents: this._hasEnabledEvents,
      onStateCallback,
    };
  }

  // Provided for compatibility with ember-concurrency TaskProperty extension
  // methods
  get taskFn() {
    return this.taskDefinition;
  }

  set taskFn(fn) {
    this.setTaskDefinition(fn);
  }
}

export class TaskGroupFactory extends TaskFactory {
  createTaskGroup(context) {
    assert(
      `A task definition is not expected for a task group.`,
      !this.taskDefinition
    );
    let options = this._sharedTaskProperties(context);

    return new TaskGroup(options);
  }
}
