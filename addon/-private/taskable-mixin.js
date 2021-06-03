import { assignProperties } from './utils';

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
      state: isRunning ? 'running' : 'idle',
    });
    assignProperties(this, derivedState);
  },

  onState(state, task) {
    if (task.onStateCallback) {
      task.onStateCallback(state, task);
    }
  },
};
