import BoundedPolicy from './bounded-policy';
import { STARTED, makeCancelState } from './execution-states';

const CANCELLED = makeCancelState(
  `it belongs to a 'restartable' Task that was .perform()ed again`
);

class RestartableReducer {
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
  makeReducer(numRunning, numQueued) {
    return new RestartableReducer(numRunning + numQueued - this.maxConcurrency);
  }
}

export default RestartablePolicy;
