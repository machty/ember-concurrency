import { set, get, setProperties } from '@ember/object';

export const TASKABLE_MIXIN = {
  _performCount: 0,

  setState(state) {
    this._performCount = this._performCount + (state.numPerformedInc || 0);

    let isRunning = state.numRunning > 0;
    let isQueued = state.numQueued > 0;
    let derivedState = Object.assign(state, {
      performCount: this._performCount,
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
