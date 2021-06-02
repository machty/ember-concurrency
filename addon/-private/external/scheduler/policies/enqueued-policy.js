import BoundedPolicy from './bounded-policy';
import { STARTED, QUEUED } from './execution-states';

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
  makeReducer() {
    return new EnqueuedReducer(this.maxConcurrency);
  }
}

export default EnqueuedPolicy;
