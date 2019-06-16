class RefreshTaskState {
  constructor(taskOrGroup) {
    this.taskOrGroup = taskOrGroup;
    this.numRunning = 0;
    this.numQueued = 0;
    this.attrs = {};
  }

  finalize(seen) {
    let taskGroup = this.taskOrGroup.group;
    let lastCount = this;

    while (taskGroup) {
      let newCount = RefreshTaskState.for(seen, taskGroup);
      Object.assign(newCount.attrs, lastCount.attrs);
      newCount.numRunning += lastCount.numRunning;
      newCount.numQueued += lastCount.numQueued;
      taskGroup = taskGroup.group;
      lastCount = newCount;
    }
  }

  onCompletion(taskInstance) {
    // TODO: when is this called?
    let state = taskInstance._completionState;
    this.attrs.lastComplete = taskInstance;

    if (state === COMPLETION_SUCCESS) {
      this.attrs.lastSuccessful = taskInstance;
    } else {
      if (state === COMPLETION_ERROR) {
        this.attrs.lastErrored = taskInstance;
      } else if (state === COMPLETION_CANCEL) {
        this.attrs.lastCanceled = taskInstance;
      }
      this.attrs.lastIncomplete = taskInstance;
    }
  }
}

class RefreshState {
  constructor() {
    this.map = {};
  }

  findOrInit(taskOrGroup) {
    let guid = taskOrGroup.guid;
    let RefreshTaskState = this.map[guid];
    if (!RefreshTaskState) {
      RefreshTaskState = this.map[guid] = new RefreshTaskState();
    }
    return RefreshTaskState;
  }
}

class SchedulerRefresh {
  constructor() {
    this.numQueued = 0;
    this.numRunning = 0;
    this.refreshState = new RefreshState();
  }

  process(scheduler) {
    let unfinishedTaskInstances = scheduler.taskInstances.filter(taskInstance => {
      this.refreshState.findOrInit(taskInstance.task);

      if (taskInstance.isFinished) {
        return false;
      }

      if (taskInstance.hasStarted) {
        numRunning += 1;
      } else {
        numQueued += 1;
      }

      return true;
    });

    let schedulerRefresh = this.makeRefresh(numRunning, numQueued);

    unfinishedTaskInstances.forEach(taskInstance => {
      return scheduler._setTaskInstanceState(taskInstance, schedulerRefresh.step());
    });


    // return [unfinishedTaskInstances, numRunning, numQueued];

  }
}