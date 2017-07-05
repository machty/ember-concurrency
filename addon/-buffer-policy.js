import {spliceTaskInstances} from './-scheduler';

const saturateActiveQueue = (maxConcurrency, queuedTaskInstances, activeTaskInstances) => {
  while (activeTaskInstances.length < maxConcurrency) {
    let taskInstance = queuedTaskInstances.shift();
    if (!taskInstance) { break; }
    activeTaskInstances.push(taskInstance);
  }
};

function numPerformSlots(maxConcurrency, queuedTaskInstances, activeTaskInstances) {
  return maxConcurrency -
    queuedTaskInstances.length -
    activeTaskInstances.length;
}

export const enqueueTasksPolicy = {
  requiresUnboundedConcurrency: true,
  schedule(maxConcurrency, queuedTaskInstances, activeTaskInstances) {
    // [a,b,_] [c,d,e,f] becomes
    // [a,b,c] [d,e,f]
    saturateActiveQueue(maxConcurrency, queuedTaskInstances, activeTaskInstances);
  },
  getNextPerformStatus(scheduler) {
    return numPerformSlots(scheduler) > 0 ? 'succeed' : 'enqueue';
  }
};

export const dropQueuedTasksPolicy = {
  cancelReason: `it belongs to a 'drop' Task that was already running`,
  schedule(maxConcurrency, queuedTaskInstances, activeTaskInstances) {
    // [a,b,_] [c,d,e,f] becomes
    // [a,b,c] []
    saturateActiveQueue(maxConcurrency, queuedTaskInstances, activeTaskInstances);
    spliceTaskInstances(this.cancelReason, queuedTaskInstances, 0, queuedTaskInstances.length);
  },
  getNextPerformStatus(scheduler) {
    return numPerformSlots(scheduler) > 0 ? 'succeed' : 'drop';
  }
};

export const cancelOngoingTasksPolicy = {
  cancelReason: `it belongs to a 'restartable' Task that was .perform()ed again`,
  schedule(maxConcurrency, queuedTaskInstances, activeTaskInstances) {
    // [a,b,_] [c,d,e,f] becomes
    // [d,e,f] []
    activeTaskInstances.push(...queuedTaskInstances);
    queuedTaskInstances.length = 0;

    let numToShift = Math.max(0, activeTaskInstances.length - maxConcurrency);
    spliceTaskInstances(this.cancelReason, activeTaskInstances, 0, numToShift);
  },
  getNextPerformStatus(scheduler) {
    return numPerformSlots(scheduler) > 0 ? 'succeed' : 'cancel_previous';
  }
};

export const dropButKeepLatestPolicy = {
  cancelReason: `it belongs to a 'keepLatest' Task that was already running`,
  schedule(maxConcurrency, queuedTaskInstances, activeTaskInstances) {
    // [a,b,_] [c,d,e,f] becomes
    // [d,e,f] []
    saturateActiveQueue(maxConcurrency, queuedTaskInstances, activeTaskInstances);
    spliceTaskInstances(this.cancelReason, queuedTaskInstances, 0, queuedTaskInstances.length - 1);
  }
};

