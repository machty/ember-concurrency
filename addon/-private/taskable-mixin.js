import { set, get, setProperties } from '@ember/object';

export const TASKABLE_MIXIN = {
  setState(state) {
    let isRunning = state.numRunning > 0;
    let isQueued = state.numQueued > 0;
    let derivedState = Object.assign(state, {
      performCount: this.performCount + (state.numPerformedInc || 0),
      isRunning,
      isQueued,
      isIdle: !isRunning && !isQueued,
      state: isRunning ? "running" : "idle",
    });
    setProperties(this, derivedState);
  },

  get(key) {
    return get(this, key);
  },

  set(key, value) {
    return set(this, key, value);
  },

  setProperties(props) {
    return setProperties(this, props);
  },

  onState(state, task) {
    if (task.onStateCallback) {
      task.onStateCallback(state, task);
    }
  },
};
