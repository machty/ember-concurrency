import Ember from 'ember';
import Scheduler from './-scheduler';
import {
  enqueueTasksPolicy,
  dropQueuedTasksPolicy,
  cancelOngoingTasksPolicy,
  dropButKeepLatestPolicy
} from './-buffer-policy';

export const propertyModifiers = {
  // by default, task(...) expands to task(...).enqueue().maxConcurrency(Infinity)
  _bufferPolicy: enqueueTasksPolicy,
  _maxConcurrency: Infinity,

  restartable() {
    this._bufferPolicy = cancelOngoingTasksPolicy;
    this._setDefaultMaxConcurrency(1);
    return this;
  },

  enqueue() {
    this._bufferPolicy = enqueueTasksPolicy;
    this._setDefaultMaxConcurrency(1);
    return this;
  },

  drop() {
    this._bufferPolicy = dropQueuedTasksPolicy;
    this._setDefaultMaxConcurrency(1);
    return this;
  },

  keepLatest() {
    this._bufferPolicy = dropButKeepLatestPolicy;
    this._setDefaultMaxConcurrency(1);
    return this;
  },

  maxConcurrency(n) {
    this._maxConcurrency = n;
    return this;
  },

  _setDefaultMaxConcurrency(n) {
    if (this._maxConcurrency === Infinity) {
      this._maxConcurrency = n;
    }
  },
};

export function resolveScheduler(propertyObj, obj, TaskGroup) {
  if (propertyObj._taskGroupPath) {
    let taskGroup = obj.get(propertyObj._taskGroupPath);
    Ember.assert(`Expected path '${propertyObj._taskGroupPath}' to resolve to a TaskGroup object, but instead was ${taskGroup}`, taskGroup instanceof TaskGroup);
    return taskGroup._scheduler;
  } else {
    return Scheduler.create({
      bufferPolicy: propertyObj._bufferPolicy,
      maxConcurrency: propertyObj._maxConcurrency
    });
  }
}

