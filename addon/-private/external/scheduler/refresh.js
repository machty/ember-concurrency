import { TYPE_STARTED, TYPE_QUEUED, TYPE_CANCELLED } from "./policies/execution-states"

class Refresh {
  constructor(schedulerPolicy, stateTracker, taskInstances) {
    this.stateTracker = stateTracker;
    this.schedulerPolicy = schedulerPolicy;
    this.initialTaskInstances = taskInstances;
    this.startingInstances = [];
  }

  process() {
    let [taskInstances, numRunning, numQueued] = this.filterFinishedTaskInstances();
    let reducer = this.schedulerPolicy.makeReducer(numRunning, numQueued);

    let finalTaskInstances = taskInstances.filter(taskInstance => {
      return this.setTaskInstanceExecutionState(taskInstance, reducer.step());
    });

    this.stateTracker.computeFinalStates(state => this.applyState(state));
    this.startingInstances.forEach(taskInstance => taskInstance._start());

    return finalTaskInstances;
  }

  filterFinishedTaskInstances() {
    let numRunning = 0, numQueued = 0;
    let taskInstances = this.initialTaskInstances.filter(taskInstance => {
      let taskState = this.stateTracker.stateFor(taskInstance.task);

      if (taskInstance.isFinished) {
        taskState.onCompletion(taskInstance);
        return false;
      }

      if (taskInstance.hasStarted) {
        numRunning += 1;
      } else {
        numQueued += 1;
      }

      return true;
    });
    return [taskInstances, numRunning, numQueued];
  }

  setTaskInstanceExecutionState(taskInstance, desiredState) {
    let taskState = this.stateTracker.stateFor(taskInstance.task);

    if (!taskInstance._counted) {
      taskInstance._counted = true;
      taskState.onPerformed(taskInstance);
    }

    switch (desiredState.type) {
      case TYPE_CANCELLED:
        // this will cause a follow up flush which will detect and recompute cancellation state
        taskInstance.cancel(desiredState.reason);
        return false;
      case TYPE_STARTED:
        if (!taskInstance.hasStarted) {
          this.startingInstances.push(taskInstance);
          taskState.onStart(taskInstance);
        }
        taskState.onRunning(taskInstance);
        return true;
      case TYPE_QUEUED:
        taskState.onQueued(taskInstance);
        // TODO: assert taskInstance hasn't started?
        // Or perhaps this can be a way to pause a task?
        return true;
    }
  }

  applyState(state) {
    let { taskOrGroup } = state;

    if (!taskOrGroup._onStateCallback) {
      return;
    }

    let props = Object.assign({
      numRunning: state.numRunning,
      numQueued: state.numQueued,
      numPerformedInc: state.numPerformedInc,
    }, state.attrs);

    taskOrGroup._onStateCallback(taskOrGroup, props);
  }
}

export default Refresh;
