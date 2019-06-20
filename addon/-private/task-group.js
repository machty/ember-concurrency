import EmberObject from '@ember/object';
import { _ComputedProperty } from './utils';
import TaskStateMixin from './task-state-mixin';
import { propertyModifiers } from './property-modifiers-mixin';
import { gte } from 'ember-compatibility-helpers';

export const TaskGroup = EmberObject.extend(TaskStateMixin, {
  toString() {
    return `<TaskGroup:${this._propertyName}>`;
  },
});

export let TaskGroupProperty;

if (gte('3.10.0-alpha.1')) {
  TaskGroupProperty = class {};
} else {
  TaskGroupProperty = class extends _ComputedProperty {};
}

Object.assign(TaskGroupProperty.prototype, propertyModifiers);
