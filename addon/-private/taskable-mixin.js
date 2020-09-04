import { set, get, setProperties } from '@ember/object';
import { USE_TRACKED } from './tracked-state';

export const TASKABLE_MIXIN = {
  _performCount: 0,

  setState(state) {
    this._performCount = this._performCount + (state.numPerformedInc || 0);

    let isRunning = state.numRunning > 0;
    let isQueued = state.numQueued > 0;
    let derivedState = Object.assign({}, state, {
      performCount: this._performCount,
      isRunning,
      isQueued,
      isIdle: !isRunning && !isQueued,
      state: isRunning ? "running" : "idle",
    });
    this.setProperties(derivedState);
  },

  get(key) {
    return get(this, key);
  },

  set(key, value) {
    return set(this, key, value);
  },

  setProperties(props) {
    if (USE_TRACKED) {
      Object.assign(this, props);
    } else {
      setProperties(this, props);
    }
  },

  onState(state, task) {
    if (task.onStateCallback) {
      task.onStateCallback(state, task);
    }
  },
};
