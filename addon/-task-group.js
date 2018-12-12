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

export class TaskGroupProperty extends _ComputedProperty {
  constructor(taskFn) {
    let tp;
    super(function(_propertyName) {
      return TaskGroup.create({
        fn: taskFn,
        context: this,
        _origin: this,
        _taskGroupPath: tp._taskGroupPath,
        _scheduler: resolveScheduler(tp, this, TaskGroup),
        _propertyName,
      });
    });
    tp = this;
  }
}

objectAssign(TaskGroupProperty.prototype, propertyModifiers);
