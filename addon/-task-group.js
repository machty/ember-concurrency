import { or, bool } from '@ember/object/computed';
import EmberObject from '@ember/object';
import { objectAssign, _ComputedProperty } from './utils';
import TaskStateMixin from './-task-state-mixin';
import {
  propertyModifiers,
  resolveScheduler
} from './-property-modifiers-mixin';


export const TaskGroup = EmberObject.extend(TaskStateMixin, {
  isTaskGroup: true,

  toString() {
    return `<TaskGroup:${this._propertyName}>`;
  },

  _numRunningOrNumQueued: or('numRunning', 'numQueued'),
  isRunning: bool('_numRunningOrNumQueued'),
  isQueued:  false
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
    });
  });
}

TaskGroupProperty.prototype = Object.create(_ComputedProperty.prototype);
objectAssign(TaskGroupProperty.prototype, propertyModifiers, {
  constructor: TaskGroupProperty,
});
