import { TYPE_STARTED, TYPE_QUEUED, TYPE_CANCELLED } from "./scheduler/policies/desired-states"
import {
  COMPLETION_SUCCESS,
  COMPLETION_ERROR,
  COMPLETION_CANCEL
} from "./completion-states";

// TODO: figure these out; might need to use TaskInstance as a scratch pad.
// lastPerformed:  alias('_scheduler.lastScheduled'),
// performCount:   alias('_scheduler.scheduleCount'),

class RefreshTaskState {
  constructor(taskOrGroup) {
    this.taskOrGroup = taskOrGroup;
    this.numRunning = 0;
    this.numQueued = 0;
    this.attrs = {};
  }

  onCompletion(taskInstance) {
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

  onStart(taskInstance) {
    // a.k.a. lastStarted
    this.attrs.last = taskInstance;
  }

  onRunning(taskInstance) {
    this.attrs.lastRunning = taskInstance;
    this.numRunning += 1;
  }

  onQueued(_taskInstance) {
    this.numQueued += 1;
  }

  recurseTaskGroups(callback) {
    let taskGroup = this.taskOrGroup.group;
    while (taskGroup) {
      callback(taskGroup);
      taskGroup = taskGroup.group;
    }
  }

  applyState() {
    let props = Object.assign(
      {
        numRunning: this.numRunning,
        numQueued: this.numQueued
      },
      this.attrs
    );
    this.taskOrGroup.setProperties(props);
  }
}

class TaskStates {
  constructor() {
    this.states = {};
  }

  findOrInit(taskOrGroup) {
    let guid = taskOrGroup.guid;
    let taskState = this.states[guid];
    if (!taskState) {
      taskState = this.states[guid] = new RefreshTaskState(taskOrGroup);
    }
    return taskState;
  }

  // After cancelling/queueing task instances, we have to recompute the derived state
  // of all the tasks that had/have task instances in this scheduler. We do this by
  // looping through all the Tasks that we've accumulated state for, and then recursively
  // applying/adding them to any TaskGroups they belong to, and then finally we loop
  // through each Task/TaskGroup state and write it to the Task/TaskGroup objects themselves.
  flush() {
    this.calculateRecursiveState();
    this.forEachState(state => state.applyState());
  }

  calculateRecursiveState() {
    this.forEachState(taskState => {
      let lastState = taskState;
      taskState.recurseTaskGroups(taskGroup => {
        let newState = this.findOrInit(taskGroup);
        Object.assign(newState.attrs, lastState.attrs);
        newState.numRunning += lastState.numRunning;
        newState.numQueued += lastState.numQueued;
        taskGroup = taskGroup.group;
        lastState = newState;
      });
    });
  }

  forEachState(callback) {
    Object.keys(this.states).forEach(k => callback(this.states[k]));
  }
}

class SchedulerRefresh {
  constructor() {
    this.numQueued = 0;
    this.numRunning = 0;
    this.taskStates = new TaskStates();
  }

  process(schedulerPolicy, taskInstances) {
    let unfinishedTaskInstances = this.filterFinishedTaskInstances(taskInstances);
    let reducer = schedulerPolicy.makeReducer(this.numRunning, this.numQueued);

    let finalTaskInstances = unfinishedTaskInstances.filter(taskInstance => {
      return this._setTaskInstanceState(taskInstance, reducer.step());
    });

    this.taskStates.flush();

    return finalTaskInstances;
  }

  filterFinishedTaskInstances(taskInstances) {
    return taskInstances.filter(taskInstance => {
      let taskState = this.taskStates.findOrInit(taskInstance.task);

      if (taskInstance.isFinished) {
        taskState.onCompletion(taskInstance);
        return false;
      }

      if (taskInstance.hasStarted) {
        this.numRunning += 1;
      } else {
        this.numQueued += 1;
      }

      return true;
    });
  }

  _setTaskInstanceState(taskInstance, desiredState) {
    let taskState = this.taskStates.findOrInit(taskInstance.task);

    switch (desiredState.type) {
      case TYPE_CANCELLED:
        // this will cause a follow up flush which will detect and recompute cancellation state
        taskInstance.cancel(desiredState.reason);
        return false;
      case TYPE_STARTED:
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

export default SchedulerRefresh;
