import BoundedPolicy from "./bounded-policy";
import { STARTED, QUEUED } from "./desired-states";

class EnqueuedReducer {
  constructor(remainingSlots) {
    this.remainingSlots = remainingSlots;
  }

  step() {
    if (this.remainingSlots > 0) {
      this.remainingSlots--;
      return STARTED;
    } else {
      return QUEUED;
    }
  }
}

class EnqueuedPolicy extends BoundedPolicy {
  makeReducer(_numRunning, _numQueued) {
    return new EnqueuedReducer(this.maxConcurrency);
  }
}

export default EnqueuedPolicy;
