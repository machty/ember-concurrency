import BoundedPolicy from './bounded-policy';
import { STARTED, QUEUED, makeCancelState } from './execution-states';

const CANCELLED = makeCancelState(
  `it belongs to a 'keepLatest' Task that was already running`
);

// Given:
// - started tasks: [a,b,_]
// - queued tasks:  [c,d,e,f]
// KeepLatest will cancel all but the last queued task instance, producing:
// - started tasks: [a,b,c]
// - queued tasks: [f]

// TODO: perhaps we should expose another config for the number to keep enqueued.
//       this would also make sense for enqueued, e.g. perform a max of maxConcurrency
//       concurrent task instances, but after a number of queued instances has been
//       reached, they should be cancelled.

class KeepLatestReducer {
  constructor(remainingSlots, numToCancel) {
    this.remainingSlots = remainingSlots;
    this.numToCancel = numToCancel;
  }

  step() {
    if (this.remainingSlots > 0) {
      this.remainingSlots--;
      return STARTED;
    } else {
      if (this.numToCancel > 0) {
        this.numToCancel--;
        return CANCELLED;
      } else {
        return QUEUED;
      }
    }
  }
}

class KeepLatestPolicy extends BoundedPolicy {
  makeReducer(numRunning, numQueued) {
    let maxEnqueued = 1;
    let totalRunning = numRunning + numQueued;
    return new KeepLatestReducer(
      this.maxConcurrency,
      totalRunning - this.maxConcurrency - maxEnqueued
    );
  }
}

export default KeepLatestPolicy;
