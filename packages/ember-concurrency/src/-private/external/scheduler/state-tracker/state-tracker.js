import RefreshState from './state';

const CURRENT_REFRESH_TAGS = new Map();

class StateTracker {
  constructor() {
    this.states = new Map();
  }

  stateFor(taskable) {
    let guid = taskable.guid;
    let taskState = this.states.get(guid);
    if (!taskState) {
      let currentTag = CURRENT_REFRESH_TAGS.has(guid)
        ? CURRENT_REFRESH_TAGS.get(guid)
        : 0;
      taskState = new RefreshState(taskable, ++currentTag);
      this.states.set(guid, taskState);
      CURRENT_REFRESH_TAGS.set(guid, currentTag);
    }
    return taskState;
  }

  // After cancelling/queueing task instances, we have to recompute the derived state
  // of all the tasks that had/have task instances in this scheduler. We do this by
  // looping through all the Tasks that we've accumulated state for, and then recursively
  // applying/adding to the state of any TaskGroups they belong to.
  computeFinalStates(callback) {
    this.computeRecursiveState();
    this.forEachState((state) => callback(state));
  }

  computeRecursiveState() {
    this.forEachState((taskState) => {
      let lastState = taskState;
      taskState.recurseTaskGroups((taskGroup) => {
        let state = this.stateFor(taskGroup);
        state.applyStateFrom(lastState);
        lastState = state;
      });
    });
  }

  forEachState(callback) {
    this.states.forEach((state) => callback(state));
  }
}

export default StateTracker;
