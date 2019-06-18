import { assert } from '@ember/debug';

import UnboundedSchedulerPolicy from './scheduler/policies/unbounded-policy'
import EnqueueSchedulerPolicy from './scheduler/policies/enqueued-policy'
import DropSchedulerPolicy from './scheduler/policies/drop-policy'
import KeepLatestSchedulerPolicy from './scheduler/policies/keep-latest-policy'
import RestartableSchedulerPolicy from './scheduler/policies/restartable-policy'

export const propertyModifiers = {
  _schedulerPolicyClass: UnboundedSchedulerPolicy,
  _maxConcurrency: Infinity,
  _taskGroupPath: null,
  _hasUsedModifier: false,
  _hasSetBufferPolicy: false,
  _hasEnabledEvents: false,
  _onStateCallback: (taskOrGroup, state) => {
    taskOrGroup.setProperties(state);
  },

  restartable() {
    return setBufferPolicy(this, RestartableSchedulerPolicy);
  },

  enqueue() {
    return setBufferPolicy(this, EnqueueSchedulerPolicy);
  },

  drop() {
    return setBufferPolicy(this, DropSchedulerPolicy);
  },

  keepLatest() {
    return setBufferPolicy(this, KeepLatestSchedulerPolicy);
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

  onState(callback) {
    this._onStateCallback = callback;
    return this;
  }
};

function setBufferPolicy(obj, policy) {
  obj._hasSetBufferPolicy = true;
  obj._hasUsedModifier = true;
  obj._schedulerPolicyClass = policy;
  assertModifiersNotMixedWithGroup(obj);

  if (obj._maxConcurrency === Infinity) {
    obj._maxConcurrency = 1;
  }

  return obj;
}

function assertModifiersNotMixedWithGroup(obj) {
  assert(`ember-concurrency does not currently support using both .group() with other task modifiers (e.g. drop(), enqueue(), restartable())`, !obj._hasUsedModifier || !obj._taskGroupPath);
}
