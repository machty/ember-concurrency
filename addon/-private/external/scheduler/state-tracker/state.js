import { COMPLETION_SUCCESS, COMPLETION_ERROR, COMPLETION_CANCEL } from "../../../task-instance-completion-states";

class RefreshState {
  constructor(taskOrGroup) {
    this.taskOrGroup = taskOrGroup;
    this.numRunning = 0;
    this.numQueued = 0;
    this.numPerformedInc = 0;
    this.attrs = {};
  }

  onCompletion(taskInstance) {
    let state = taskInstance.completionState;
    this.attrs.lastComplete = taskInstance;
    if (state === COMPLETION_SUCCESS) {
      this.attrs.lastSuccessful = taskInstance;
    }
    else {
      if (state === COMPLETION_ERROR) {
        this.attrs.lastErrored = taskInstance;
      }
      else if (state === COMPLETION_CANCEL) {
        this.attrs.lastCanceled = taskInstance;
      }
      this.attrs.lastIncomplete = taskInstance;
    }
  }

  onPerformed(taskInstance) {
    this.numPerformedInc += 1;
    this.attrs.lastPerformed = taskInstance;
  }

  onStart(taskInstance) {
    // a.k.a. lastStarted
    this.attrs.last = taskInstance;
  }

  onRunning(taskInstance) {
    this.attrs.lastRunning = taskInstance;
    this.numRunning += 1;
  }

  onQueued() {
    this.numQueued += 1;
  }

  recurseTaskGroups(callback) {
    let taskGroup = this.taskOrGroup.group;
    while (taskGroup) {
      callback(taskGroup);
      taskGroup = taskGroup.group;
    }
  }

  applyStateFrom(other) {
    Object.assign(this.attrs, other.attrs);
    this.numRunning += other.numRunning;
    this.numQueued += other.numQueued;
    this.numPerformedInc += other.numPerformedInc;
  }
}

export default RefreshState;