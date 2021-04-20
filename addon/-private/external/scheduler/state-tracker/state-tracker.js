import RefreshState from "./state";

let CURRENT_TAG = 0;

class StateTracker {
  constructor() {
    this.states = new Map();
  }

  stateFor(taskable) {
    let guid = taskable.guid;
    let taskState = this.states.get(guid);
    if (!taskState) {
      taskState = new RefreshState(taskable, ++CURRENT_TAG);
      this.states.set(guid, taskState);
    }
    return taskState;
  }

  // After cancelling/queueing task instances, we have to recompute the derived state
  // of all the tasks that had/have task instances in this scheduler. We do this by
  // looping through all the Tasks that we've accumulated state for, and then recursively
  // applying/adding to the state of any TaskGroups they belong to.
  computeFinalStates(callback) {
    this.computeRecursiveState();
    this.forEachState(state => callback(state));
  }

  computeRecursiveState() {
    this.forEachState(taskState => {
      let lastState = taskState;
      taskState.recurseTaskGroups(taskGroup => {
        let state = this.stateFor(taskGroup);
        state.applyStateFrom(lastState);
        lastState = state;
      });
    });
  }

  forEachState(callback) {
    this.states.forEach(state => callback(state));
  }
}

export default StateTracker;
