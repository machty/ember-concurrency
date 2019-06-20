import { TYPE_STARTED, TYPE_QUEUED, TYPE_CANCELLED } from "./policies/execution-states"

class Refresh {
  constructor(schedulerPolicy, stateTracker, taskInstanceStates) {
    this.stateTracker = stateTracker;
    this.schedulerPolicy = schedulerPolicy;
    this.initialTaskInstances = taskInstanceStates;
    this.startingInstances = [];
  }

  process() {
    let [taskInstanceStates, numRunning, numQueued] = this.filterFinishedTaskInstances();
    let reducer = this.schedulerPolicy.makeReducer(numRunning, numQueued);

    let finalTaskInstances = taskInstanceStates.filter(taskInstanceState => {
      return this.setTaskInstanceExecutionState(taskInstanceState, reducer.step());
    });

    this.stateTracker.computeFinalStates(state => this.applyState(state));
    this.startingInstances.forEach(taskInstanceState => taskInstanceState.start());

    return finalTaskInstances;
  }

  filterFinishedTaskInstances() {
    let numRunning = 0, numQueued = 0;
    let taskInstanceStates = this.initialTaskInstances.filter(taskInstanceState => {
      let taskState = this.stateTracker.stateFor(taskInstanceState.taskState);

      if (taskInstanceState.isFinished) {
        taskState.onCompletion(taskInstanceState);
        return false;
      }

      if (taskInstanceState.hasStarted) {
        numRunning += 1;
      } else {
        numQueued += 1;
      }

      return true;
    });
    return [taskInstanceStates, numRunning, numQueued];
  }

  setTaskInstanceExecutionState(taskInstanceState, desiredState) {
    let taskState = this.stateTracker.stateFor(taskInstanceState.taskState);

    if (!taskInstanceState._counted) {
      taskInstanceState._counted = true;
      taskState.onPerformed(taskInstanceState);
    }

    switch (desiredState.type) {
      case TYPE_CANCELLED:
        // this will cause a follow up flush which will detect and recompute cancellation state
        taskInstanceState.cancel(desiredState.reason);
        return false;
      case TYPE_STARTED:
        if (!taskInstanceState.hasStarted) {
          this.startingInstances.push(taskInstanceState);
          taskState.onStart(taskInstanceState);
        }
        taskState.onRunning(taskInstanceState);
        return true;
      case TYPE_QUEUED:
        taskState.onQueued(taskInstanceState);
        // TODO: assert taskInstanceState hasn't started?
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
