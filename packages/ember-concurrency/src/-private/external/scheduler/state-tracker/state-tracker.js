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

  forEachState(callback) {
    this.states.forEach((state) => callback(state));
  }
}

export default StateTracker;
