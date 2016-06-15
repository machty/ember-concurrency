import Ember from 'ember';
import { objectAssign, _ComputedProperty } from './utils';
import TaskStateMixin from './-task-state-mixin';
import { propertyModifiers, resolveScheduler } from './-property-modifiers-mixin';


export const TaskGroup = Ember.Object.extend(TaskStateMixin, {
  toString() {
    return `<TaskGroup:${this._propertyName}>`;
  },

  // FIXME: this is hacky and perhaps wrong
  isRunning: Ember.computed.or('numRunning', 'numQueued'),
  isQueued:  false,
});

export function TaskGroupProperty(...decorators) {
  let taskFn = decorators.pop();
  let tp = this;
  _ComputedProperty.call(this, function(_propertyName) {
    return TaskGroup.create({
      fn: taskFn,
      context: this,
      _origin: this,
      _taskGroupPath: tp._taskGroupPath,
      _scheduler: resolveScheduler(tp, this, TaskGroup),
      _propertyName,
      _debugCallback: tp._debugCallback,
    });
  });
}

TaskGroupProperty.prototype = Object.create(_ComputedProperty.prototype);
objectAssign(TaskGroupProperty.prototype, propertyModifiers, {
  constructor: TaskGroupProperty,
});

