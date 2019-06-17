import { TYPE_STARTED, TYPE_QUEUED, TYPE_CANCELLED } from "./policies/desired-states"
import RefreshStateSet from "./refresh-state-set";

class Refresh {
  constructor(schedulerPolicy, taskInstances) {
    this.taskStates = new RefreshStateSet();
    this.schedulerPolicy = schedulerPolicy;
    this.initialTaskInstances = taskInstances;
  }

  process() {
    let [taskInstances, numRunning, numQueued] = this.filterFinishedTaskInstances();
    let reducer = this.schedulerPolicy.makeReducer(numRunning, numQueued);

    let finalTaskInstances = taskInstances.filter(taskInstance => {
      return this.setTaskInstanceState(taskInstance, reducer.step());
    });

    this.taskStates.computeFinalStates(state => this.applyState(state));

    return finalTaskInstances;
  }

  filterFinishedTaskInstances() {
    let numRunning = 0, numQueued = 0;
    let taskInstances = this.initialTaskInstances.filter(taskInstance => {
      let taskState = this.taskStates.findOrInit(taskInstance.task);

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

  setTaskInstanceState(taskInstance, desiredState) {
    let taskState = this.taskStates.findOrInit(taskInstance.task);

    switch (desiredState.type) {
      case TYPE_CANCELLED:
        // this will cause a follow up flush which will detect and recompute cancellation state
        taskInstance.cancel(desiredState.reason);
        return false;
      case TYPE_STARTED:
        if (!taskInstance._counted) {
          taskInstance._counted = true;
          taskState.onPerformed(taskInstance);
        }
        if (!taskInstance.hasStarted) {
          taskInstance._start();
          taskState.onStart(taskInstance);
        }
        taskState.onRunning(taskInstance);
        return true;
      case TYPE_QUEUED:
        taskState.onQueued(taskInstance);
        // TODO: assert taskInstance hasn't started?
        // Or perhaps this can be a way to pause?
        return true;
    }
  }

  applyState(state) {
    let { taskOrGroup } = state;

    let props = Object.assign({
      numRunning: state.numRunning,
      numQueued: state.numQueued,
      performCount: taskOrGroup.performCount + state.numPerformedInc,
    }, state.attrs);

    taskOrGroup.setProperties(props);
  }
}

export default Refresh;
