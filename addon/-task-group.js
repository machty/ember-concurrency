import Ember from 'ember';
import { _ComputedProperty } from './utils';
import TaskStateMixin from './-task-state-mixin';
import { propertyModifiers, resolveScheduler } from './-property-modifiers-mixin';

export const TaskGroup = Ember.Object.extend(TaskStateMixin, {
});

export function TaskGroupProperty(...decorators) {
  let taskFn = decorators.pop();
  let tp = this;
  _ComputedProperty.call(this, function(_propertyName) {
    return TaskGroup.create({
      fn: taskFn,
      context: this,
      _origin: this,
      _scheduler: resolveScheduler(tp, this, TaskGroup),
      _propertyName,
      _debugCallback: tp._debugCallback,
    });
  });
}

TaskGroupProperty.prototype = Object.create(_ComputedProperty.prototype);
Object.assign(TaskGroupProperty.prototype, propertyModifiers, {
  constructor: TaskGroupProperty,

  _maxConcurrency: 1,
});

