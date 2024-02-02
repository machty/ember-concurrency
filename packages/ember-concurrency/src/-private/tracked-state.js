import { tracked } from '@glimmer/tracking';
import { DEFAULT_STATE as INITIAL_TASK_STATE } from './external/task/default-state';
import { INITIAL_STATE as INITIAL_INSTANCE_STATE } from './external/task-instance/initial-state';
import { USE_TRACKED } from './utils';

function trackMixin(proto, obj, key) {
  const propDesc = Object.getOwnPropertyDescriptor(proto, key);
  propDesc.initializer = propDesc.initializer || (() => proto[key]);
  delete propDesc.value;
  const desc = tracked(obj, key, propDesc);
  obj[key] = desc;
  return obj;
}

function applyTracked(proto, initial) {
  return Object.keys(proto).reduce((acc, key) => {
    return trackMixin(proto, acc, key);
  }, initial);
}

export let TRACKED_INITIAL_TASK_STATE;
export let TRACKED_INITIAL_INSTANCE_STATE;

if (USE_TRACKED) {
  TRACKED_INITIAL_TASK_STATE = applyTracked(INITIAL_TASK_STATE, {});
  TRACKED_INITIAL_TASK_STATE = applyTracked(
    {
      numRunning: 0,
      numQueued: 0,
      isRunning: false,
      isQueued: false,
      isIdle: true,
      state: 'idle',
    },
    TRACKED_INITIAL_TASK_STATE
  );

  TRACKED_INITIAL_INSTANCE_STATE = applyTracked(INITIAL_INSTANCE_STATE, {});
  TRACKED_INITIAL_INSTANCE_STATE = applyTracked(
    {
      state: 'waiting',
      isDropped: false,
      isRunning: false,
    },
    TRACKED_INITIAL_INSTANCE_STATE
  );

  Object.freeze(TRACKED_INITIAL_TASK_STATE);
  Object.freeze(TRACKED_INITIAL_INSTANCE_STATE);
}
