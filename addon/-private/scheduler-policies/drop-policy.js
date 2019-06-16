import { makeCancelState, STARTED } from "./desired-states";

const CANCELLED = makeCancelState(`it belongs to a 'drop' Task that was already running`);

class DropRefresh {
  constructor(remainingSlots) {
    this.remainingSlots = remainingSlots;
  }

  step() {
    if (this.remainingSlots > 0) {
      return CANCELLED;
    }

    this.remainingSlots--;
    return STARTED;
  }
}

class DropPolicy extends BoundedPolicy {
  prepareRefresh(_numRunning, _numQueued) {
    return new DropRefresh(this.maxConcurrency);
  }
}

export default DropPolicy;
