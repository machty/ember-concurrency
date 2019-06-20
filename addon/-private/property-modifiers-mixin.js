import { assert } from '@ember/debug';

import UnboundedSchedulerPolicy from './external/scheduler/policies/unbounded-policy'
import EnqueueSchedulerPolicy from './external/scheduler/policies/enqueued-policy'
import DropSchedulerPolicy from './external/scheduler/policies/drop-policy'
import KeepLatestSchedulerPolicy from './external/scheduler/policies/keep-latest-policy'
import RestartableSchedulerPolicy from './external/scheduler/policies/restartable-policy'

export const propertyModifiers = {
  _schedulerPolicyClass: UnboundedSchedulerPolicy,
  _maxConcurrency: null,
  _taskGroupPath: null,
  _hasUsedModifier: false,
  _hasSetBufferPolicy: false,
  _hasEnabledEvents: false,
  _onStateCallback: (taskOrGroup, state) => {
    taskOrGroup.applyState(state);
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

  return obj;
}

function assertModifiersNotMixedWithGroup(obj) {
  assert(`ember-concurrency does not currently support using both .group() with other task modifiers (e.g. drop(), enqueue(), restartable())`, !obj._hasUsedModifier || !obj._taskGroupPath);
}
