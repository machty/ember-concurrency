import { assert } from '@ember/debug';
import ComputedProperty from '@ember/object/computed';
import {
  enqueueTasksPolicy,
  dropQueuedTasksPolicy,
  cancelOngoingTasksPolicy,
  dropButKeepLatestPolicy
} from './-buffer-policy';
import Scheduler from './-scheduler';
import { ANONYMOUS_TASK_NAME } from './-task-property';

// this is mixed into TaskProperties and TaskGroup properties, i.e.
// the Computed Propertys that ultimately produce Tasks and TaskGroups.
// Hence they both have all the task modifiers like enqueue/restartable.
export const taskModifiers = {
  // default _bufferPolicy is arbitrary when maxConcurrency is infinity;
  // enqueue/drop/restartable all behave the same when there's no concurrency limit
  _bufferPolicy: enqueueTasksPolicy,
  _maxConcurrency: Infinity,
  _taskGroupPath: null,
  _hasUsedModifier: false,
  _hasSetBufferPolicy: false,
  _hasEnabledEvents: false,

  restartable() {
    return setBufferPolicy(this, cancelOngoingTasksPolicy);
  },

  enqueue() {
    return setBufferPolicy(this, enqueueTasksPolicy);
  },

  drop() {
    return setBufferPolicy(this, dropQueuedTasksPolicy);
  },

  keepLatest() {
    return setBufferPolicy(this, dropButKeepLatestPolicy);
  },

  maxConcurrency(n) {
    this._hasUsedModifier = true;
    this._maxConcurrency = n;
    assertModifiersNotMixedWithGroup(this);
    return this;
  },

  group(taskGroupPath) {
    this._taskGroupPath = taskGroupPath;
    assertModifiersNotMixedWithGroup(this);
    return this;
  },

  evented() {
    this._hasEnabledEvents = true;
    return this;
  },

  debug() {
    this._debug = true;
    return this;
  },

  _sharedConstructor(taskFn) {
    let tp = this;
    tp.taskFn = taskFn;
    ComputedProperty.call(this, function(_propertyName) {
      if (taskFn) {
        taskFn.displayName = `${_propertyName} (task)`;
      }
      return tp._createTask(this, _propertyName);
    });
  },

  _createTask(context, _propertyName) {
    let _taskState = getInitialTaskState();
    let isAnonymous = ANONYMOUS_TASK_NAME === _propertyName;
    let _hasEnabledEvents = isAnonymous ? false : this._hasEnabledEvents;

    return this._TaskConstructor.create({
      fn: this.taskFn,
      context,
      _origin: context,
      _taskGroupPath: this._taskGroupPath,
      _propertyName,
      _scheduler: makeScheduler(this, context, _taskState),
      _debug: this._debug,
      _hasEnabledEvents,
      _taskState
    });
  },

  _TaskConstructor: null,
};

function makeScheduler(taskProperty, context, _taskState) {
  let taskGroupPath = taskProperty._taskGroupPath;
  if (taskGroupPath) {
    let taskGroup = context.get(taskGroupPath);
    assert(`Expected path '${taskGroupPath}' to resolve to a TaskGroup object, but instead was ${taskGroup}`, taskGroup.isTaskGroup);
    return taskGroup._scheduler;
  } else {
    return Scheduler.create({
      bufferPolicy: taskProperty._bufferPolicy,
      maxConcurrency: taskProperty._maxConcurrency,
      _taskState,
    });
  }
}

function getInitialTaskState() {
  return {
    lastPerformed:  null,
    lastStarted:    null,
    lastRunning:    null,
    lastSuccessful: null,
    lastComplete:   null,
    lastErrored:    null,
    lastCanceled:   null,
    lastIncomplete: null,
    performCount:   0
  };
}

function setBufferPolicy(obj, policy) {
  obj._hasSetBufferPolicy = true;
  obj._hasUsedModifier = true;
  obj._bufferPolicy = policy;
  assertModifiersNotMixedWithGroup(obj);

  if (obj._maxConcurrency === Infinity) {
    obj._maxConcurrency = 1;
  }

  return obj;
}

function assertModifiersNotMixedWithGroup(obj) {
  assert(`ember-concurrency does not currently support using both .group() with other task modifiers (e.g. drop(), enqueue(), restartable())`, !obj._hasUsedModifier || !obj._taskGroupPath);
}

