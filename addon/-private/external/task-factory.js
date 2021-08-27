import Scheduler from './scheduler/scheduler';
import UnboundedSchedulerPolicy from './scheduler/policies/unbounded-policy';
import EnqueueSchedulerPolicy from './scheduler/policies/enqueued-policy';
import DropSchedulerPolicy from './scheduler/policies/drop-policy';
import KeepLatestSchedulerPolicy from './scheduler/policies/keep-latest-policy';
import RestartableSchedulerPolicy from './scheduler/policies/restartable-policy';
import { Task } from './task/task';
import { TaskGroup } from './task/task-group';

function assertModifiersNotMixedWithGroup(obj) {
  if (obj._hasSetConcurrencyConstraint && obj._taskGroupPath) {
    throw new Error(
      `Cannot use both 'group' and other concurrency-constraining task modifiers (e.g. 'drop', 'enqueue', 'restartable')`
    );
  }
}

function assertUnsetBufferPolicy(obj) {
  if (obj._hasSetBufferPolicy) {
    throw new Error(
      `Cannot set multiple buffer policies on a task or task group. ${obj._schedulerPolicyClass} has already been set for task or task group '${obj.name}'`
    );
  }
}

const MODIFIER_REGISTRY = {
  enqueue: (factory, value) =>
    value && factory.setBufferPolicy(EnqueueSchedulerPolicy),
  evented: (factory, value) => value && factory.setEvented(value),
  debug: (factory, value) => value && factory.setDebug(value),
  drop: (factory, value) =>
    value && factory.setBufferPolicy(DropSchedulerPolicy),
  group: (factory, groupName) => factory.setGroup(groupName),
  keepLatest: (factory, value) =>
    value && factory.setBufferPolicy(KeepLatestSchedulerPolicy),
  maxConcurrency: (factory, maxConcurrency) =>
    factory.setMaxConcurrency(maxConcurrency),
  onState: (factory, onStateCallback) => factory.setOnState(onStateCallback),
  restartable: (factory, value) =>
    value && factory.setBufferPolicy(RestartableSchedulerPolicy),
};

export function defineModifier(name, callback) {
  if (MODIFIER_REGISTRY[name]) {
    throw new Error(
      `A modifier with the name '${name}' has already been defined.`
    );
  }

  MODIFIER_REGISTRY[name] = callback;
}

export class TaskFactory {
  _cancelEventNames = [];
  _debug = null;
  _eventNames = [];
  _hasSetConcurrencyConstraint = false;
  _hasSetBufferPolicy = false;
  _hasEnabledEvents = false;
  _maxConcurrency = null;
  _onStateCallback = (state, taskable) => taskable.setState(state);
  _schedulerPolicyClass = UnboundedSchedulerPolicy;
  _taskGroupPath = null;

  constructor(name = '<unknown>', taskDefinition = null, options = {}) {
    this.name = name;
    this.taskDefinition = taskDefinition;

    this._processModifierOptions(options);
  }

  createTask(context) {
    let options = this.getTaskOptions(context);

    return new Task(
      Object.assign(
        {
          generatorFactory: (args) => this.taskDefinition.apply(context, args),
        },
        options
      )
    );
  }

  createTaskGroup(context) {
    let options = this.getTaskOptions(context);

    return new TaskGroup(options);
  }

  getModifier(name) {
    if (MODIFIER_REGISTRY[name]) {
      return MODIFIER_REGISTRY[name].bind(null, this);
    }
  }

  getScheduler(schedulerPolicy, onStateCallback) {
    return new Scheduler(schedulerPolicy, onStateCallback);
  }

  getTaskOptions(context) {
    let group, scheduler;
    let onStateCallback = this._onStateCallback;

    if (this._taskGroupPath) {
      group = context[this._taskGroupPath];
      if (!(group instanceof TaskGroup)) {
        throw new Error(
          `Expected group '${this._taskGroupPath}' to be defined but was not found.`
        );
      }

      scheduler = group.scheduler;
    } else {
      let schedulerPolicy = new this._schedulerPolicyClass(
        this._maxConcurrency
      );
      scheduler = this.getScheduler(schedulerPolicy, onStateCallback);
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

  setBufferPolicy(policy) {
    assertUnsetBufferPolicy(this);
    this._hasSetBufferPolicy = true;
    this._hasSetConcurrencyConstraint = true;
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
    this._hasSetConcurrencyConstraint = true;
    this._maxConcurrency = maxConcurrency;
    return this;
  }

  setGroup(group) {
    this._taskGroupPath = group;
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
    this.taskDefinition = taskDefinition;
    return this;
  }

  _processModifierOptions(options) {
    for (let key of Object.keys(options)) {
      let value = options[key];
      let modifier = this.getModifier(key);
      if (modifier) {
        modifier(value);
      }
    }
  }
}
