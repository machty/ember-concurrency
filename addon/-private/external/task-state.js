import { TaskInstanceState } from "./task-instance/state";

let guidId = 0;
function makeGuid() {
  return `ec_${guidId++}`;
}

export class TaskState {
  constructor({ scheduler, groupState, hasEnabledEvents, debug }) {
    this.scheduler = scheduler;
    this.debug = debug;
    this.groupState = groupState;
    this.hasEnabledEvents = hasEnabledEvents;
    this.guid = makeGuid();
    this.guids = {};
    this.guids[this.guid] = true;
    if (this.groupState) {
      Object.assign(this.guids, this.groupState.guids);
    }
  }

  cancelAll(cancelRequest) {
    this.scheduler.cancelAll(this.guid, cancelRequest);
  }

  makeTaskInstanceState(delegate, performType, generatorFactory, env) {
    return new TaskInstanceState({
      generatorFactory,
      delegate,
      env,
      debug: this.debug,
      performType,
      taskState: this,
    });
  }
}
