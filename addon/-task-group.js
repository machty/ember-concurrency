import ComputedProperty, { or, bool } from '@ember/object/computed';
import EmberObject from '@ember/object';
import { objectAssign } from './utils';
import TaskStateMixin from './-task-state-mixin';
import { taskModifiers } from './-task-modifiers-mixin';

export const TaskGroup = EmberObject.extend(TaskStateMixin, {
  isTaskGroup: true,

  toString() {
    return `<TaskGroup:${this._propertyName}>`;
  },

  _numRunningOrNumQueued: or('numRunning', 'numQueued'),
  isRunning: bool('_numRunningOrNumQueued'),
  isQueued:  false
});

export function TaskGroupProperty(taskFn) {
  this._sharedConstructor(taskFn);
}

TaskGroupProperty.prototype = Object.create(ComputedProperty.prototype);
objectAssign(TaskGroupProperty.prototype, taskModifiers, {
  constructor: TaskGroupProperty,
  _TaskConstructor: TaskGroup,
});
