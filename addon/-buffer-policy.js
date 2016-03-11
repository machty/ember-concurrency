const saturateActiveQueue = (scheduler) => {
  while (scheduler.activeTaskInstances.length < scheduler.maxConcurrency) {
    let taskInstance = scheduler.queuedTaskInstances.shift();
    if (!taskInstance) { break; }
    scheduler.activeTaskInstances.push(taskInstance);
  }
};

function numPerformSlots(scheduler) {
  return scheduler.maxConcurrency -
    scheduler.queuedTaskInstances.length -
    scheduler.activeTaskInstances.length;
}

export const enqueueTasksPolicy = {
  requiresUnboundedConcurrency: true,
  schedule(scheduler) {
    // [a,b,_] [c,d,e,f] becomes
    // [a,b,c] [d,e,f]
    saturateActiveQueue(scheduler);
  },
  getNextPerformStatus(scheduler) {
    return numPerformSlots(scheduler) > 0 ? 'succeed' : 'enqueue';
  }
};

export const dropQueuedTasksPolicy = {
  schedule(scheduler) {
    // [a,b,_] [c,d,e,f] becomes
    // [a,b,c] []
    saturateActiveQueue(scheduler);
    scheduler.spliceTaskInstances(scheduler.queuedTaskInstances, 0, scheduler.queuedTaskInstances.length);
  },
  getNextPerformStatus(scheduler) {
    return numPerformSlots(scheduler) > 0 ? 'succeed' : 'drop';
  }
};

export const cancelOngoingTasksPolicy = {
  schedule(scheduler) {
    // [a,b,_] [c,d,e,f] becomes
    // [d,e,f] []
    let activeTaskInstances = scheduler.activeTaskInstances;
    let queuedTaskInstances = scheduler.queuedTaskInstances;
    activeTaskInstances.push(...queuedTaskInstances);
    queuedTaskInstances.length = 0;

    let numToShift = Math.max(0, activeTaskInstances.length - scheduler.maxConcurrency);
    scheduler.spliceTaskInstances(activeTaskInstances, 0, numToShift);
  },
  getNextPerformStatus(scheduler) {
    return numPerformSlots(scheduler) > 0 ? 'succeed' : 'cancel_previous';
  }
};

export const dropButKeepLatestPolicy = {
  schedule(scheduler) {
    // [a,b,_] [c,d,e,f] becomes
    // [d,e,f] []
    saturateActiveQueue(scheduler);
    scheduler.spliceTaskInstances(scheduler.queuedTaskInstances, 0, scheduler.queuedTaskInstances.length - 1);
  }
};

