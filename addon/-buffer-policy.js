const saturateActiveQueue = (task) => {
  while (task._activeTaskInstances.length < task._maxConcurrency) {
    let taskInstance = task._queuedTaskInstances.shift();
    if (!taskInstance) { break; }
    task._activeTaskInstances.push(taskInstance);
  }
};

function numPerformSlots(task) {
  return task._maxConcurrency -
    task._queuedTaskInstances.length -
    task._activeTaskInstances.length;
}

export const enqueueTasksPolicy = {
  requiresUnboundedConcurrency: true,
  schedule(task) {
    // [a,b,_] [c,d,e,f] becomes
    // [a,b,c] [d,e,f]
    saturateActiveQueue(task);
  },
  getNextPerformStatus(task) {
    return numPerformSlots(task) > 0 ? 'succeed' : 'enqueue';
  }
};

export const dropQueuedTasksPolicy = {
  schedule(task) {
    // [a,b,_] [c,d,e,f] becomes
    // [a,b,c] []
    saturateActiveQueue(task);
    task.spliceTaskInstances(task._queuedTaskInstances, 0, task._queuedTaskInstances.length);
  },
  getNextPerformStatus(task) {
    return numPerformSlots(task) > 0 ? 'succeed' : 'drop';
  }
};

export const cancelOngoingTasksPolicy = {
  schedule(task) {
    // [a,b,_] [c,d,e,f] becomes
    // [d,e,f] []
    let activeTaskInstances = task._activeTaskInstances;
    let queuedTaskInstances = task._queuedTaskInstances;
    activeTaskInstances.push(...queuedTaskInstances);
    queuedTaskInstances.length = 0;

    let numToShift = Math.max(0, activeTaskInstances.length - task._maxConcurrency);
    task.spliceTaskInstances(activeTaskInstances, 0, numToShift);
  },
  getNextPerformStatus(task) {
    return numPerformSlots(task) > 0 ? 'succeed' : 'cancel_previous';
  }
};

export const dropButKeepLatestPolicy = {
  schedule(task) {
    // [a,b,_] [c,d,e,f] becomes
    // [d,e,f] []
    saturateActiveQueue(task);
    task.spliceTaskInstances(task._queuedTaskInstances, 0, task._queuedTaskInstances.length - 1);
  }
};

