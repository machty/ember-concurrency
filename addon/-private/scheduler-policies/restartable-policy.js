import { TYPE_CANCELLED, STARTED, makeCancelState } from "./desired-states";

const CANCELLED = makeCancelState(
  `it belongs to a 'restartable' Task that was .perform()ed again`
);

class RestartableRefresh {
  constructor(numToCancel) {
    this.numToCancel = numToCancel;
  }

  step() {
    if (this.numToCancel > 0) {
      this.numToCancel--;
      return CANCELLED;
    } else {
      return STARTED;
    }
  }
}

class RestartablePolicy extends BoundedPolicy {
  prepareRefresh(numRunning, numQueued) {
    return new RestartableRefresh(numRunning + numQueued - this.maxConcurrency);
  }
}

export default RestartablePolicy;
