import { timeout } from './-private/utils';
import {
  TaskProperty,
  TaskGroupProperty,
  task,
  taskGroup
} from './-private/task-properties';
import { default as TaskInstance } from './-private/task-instance';
import {
  all,
  allSettled,
  hash,
  hashSettled,
  race
} from './-private/cancelable-promise-helpers';
import {
  waitForQueue,
  waitForEvent,
  waitForProperty
} from './-private/wait-for';
import { didCancel } from "./-private/external/task-instance/cancelation";
import {
  animationFrame,
  forever,
  rawTimeout
} from './-private/external/yieldables';
import { Task } from './-private/task';
import { TaskGroup } from './-private/task-group';

// Re-export e-c-d, until we merge it.
export {
  restartableTask,
  dropTask,
  keepLatestTask,
  enqueueTask,
  restartableTaskGroup,
  dropTaskGroup,
  keepLatestTaskGroup,
  enqueueTaskGroup
} from 'ember-concurrency-decorators';

export {
  task,
  taskGroup,
  all,
  allSettled,
  animationFrame,
  didCancel,
  hash,
  hashSettled,
  race,
  timeout,
  rawTimeout,
  waitForQueue,
  waitForEvent,
  waitForProperty,
  forever,
  Task,
  TaskProperty,
  TaskInstance,
  TaskGroup,
  TaskGroupProperty
};
