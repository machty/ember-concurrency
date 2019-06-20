import { set, get, setProperties } from '@ember/object';

export const TASKABLE_MIXIN = {
  setState(state) {
    this.setProperties(state);
    let isRunning = this.numRunning > 0;
    let isQueued = this.numQueued > 0;
    let derivedState = {
      performCount: this.performCount + (state.numPerformedInc || 0),
      isRunning,
      isQueued,
      isIdle: !isRunning && !isQueued,
      state: isRunning ? "running" : "idle",
    };
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
};
