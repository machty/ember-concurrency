import { TYPE_STARTED, TYPE_QUEUED, TYPE_CANCELLED } from "./policies/desired-states"
import { RefreshTaskState } from "./refresh-state";

class RefreshStateSet {
  constructor() {
    this.states = {};
  }

  findOrInit(taskOrGroup) {
    let guid = taskOrGroup._guid;
    let taskState = this.states[guid];
    if (!taskState) {
      taskState = this.states[guid] = new RefreshTaskState(taskOrGroup);
    }
    return taskState;
  }

  // After cancelling/queueing task instances, we have to recompute the derived state
  // of all the tasks that had/have task instances in this scheduler. We do this by
  // looping through all the Tasks that we've accumulated state for, and then recursively
  // applying/adding to the state of any TaskGroups they belong to.
  computeFinalStates(callback) {
    this.computeRecursiveState();
    this.forEachState(state => callback(state.taskOrGroup, state.computeState()));
  }

  computeRecursiveState() {
    this.forEachState(taskState => {
      let lastState = taskState;
      taskState.recurseTaskGroups(taskGroup => {
        let state = this.findOrInit(taskGroup);
        state.applyStateFrom(lastState);
        lastState = state;
      });
    });
  }

  forEachState(callback) {
    Object.keys(this.states).forEach(k => callback(this.states[k]));
  }
}

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

    this.taskStates.computeFinalStates((taskOrGroup, props) => taskOrGroup.setProperties(props));

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
}

export default Refresh;
