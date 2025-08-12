import NullState from './null-state';

const NULL_STATE = new NullState();

class NullStateTracker {
  stateFor() {
    return NULL_STATE;
  }

  computeFinalStates() {}
}

export default NullStateTracker;
