import { once } from '@ember/runloop';
import EmberObject, { set, get, setProperties } from '@ember/object';
import {
  COMPLETION_SUCCESS,
  COMPLETION_ERROR,
  COMPLETION_CANCEL,
} from "./-private/completion-states"

class WorkUnit {
  constructor(taskInstance, origin) {
    this.taskInstance = taskInstance;
    this.origin = origin;
  }
}

const Scheduler = EmberObject.extend({
  lastScheduled:  null,
  lastStarted:    null,
  lastRunning:    null,
  lastSuccessful: null,
  lastComplete:   null,
  lastErrored:    null,
  lastCanceled:   null,
  lastIncomplete: null,
  scheduleCount: 0,

  init(...args) {
    this._super(...args);
    this.taskInstances = [];
  },

  cancelAll(reason) {
    this.taskInstances.forEach(taskInstance => taskInstance.cancel());
    this.taskInstances = [];
  },

  // schedule(taskInstance) {
  schedule(workUnit) {
    set(this, 'lastScheduled', taskInstance);
    this.incrementProperty('scheduleCount');
    taskInstance._onFinalize(() => this._taskInstanceDidFinalize(taskInstance));
    this.taskInstances.push(taskInstance);
    this._reschedule();
  },

  // _reschedule runs:
  // 1. When a new TaskInstance is scheduled (so that the new TaskInstance
  //    can start executing, be enqueued, or be cancelled depending on the buffer policy).
  // 2. When a prior task instance finalizes.
  _reschedule() {
    // Filter out task instances that are finished (including those cancelled while enqueued)
    this.taskInstances = this.taskInstances.filter(taskInstance => !get(taskInstance, 'isFinished'));

    // Delegate to buffer policy to cancel / start task instances
    this.bufferPolicy.schedule(this);
    
    // at this point, bufferPolicy has cancelled some policies and run others
    this.taskInstances = this.taskInstances.filter(taskInstance => {
      // origin points to either task or taskGroup.
      // There should be a work unit that knows which task/taskGroup it originated from.
      // Because Scheduler could be deeply nested.
      // When a task is done, we don't know shit.

      return !get(taskInstance, 'isFinished');
    });

    if (lastStarted) {
      set(this, 'lastStarted', lastStarted);
    }
    set(this, 'lastRunning', lastStarted);

    set(this, 'concurrency', this.activeTaskInstances.length);
  },

  _startTaskInstance(taskInstance) {
    taskInstance._start();
    set(this, 'lastStarted', taskInstance);
  },

  _increment(numRunningInc, numQueuedInc) {
    task.incrementProperty('numQueued', numQueuedInc);
    task.incrementProperty('numRunning', numRunningInc);
  },

  _taskInstanceDidFinalize(taskInstance) {
    let { task } = taskInstance;
    task.decrementProperty('numRunning');
    setProperties(this, this._updatesForTaskInstance(taskInstance));
    once(this, this._reschedule);
  },

  _updatesForTaskInstance(taskInstance) {
    let state = taskInstance._completionState;
    let updates = { lastComplete: taskInstance };
    if (state === COMPLETION_SUCCESS) {
      updates.lastSuccessful = taskInstance;
    } else {
      if (state === COMPLETION_ERROR) {
        updates.lastErrored = taskInstance;
      } else if (state === COMPLETION_CANCEL) {
        updates.lastCanceled = taskInstance;
      }
      updates.lastIncomplete = taskInstance;
    }
    return updates;
  },
});

function updateTaskChainCounts(task) {
  let numRunning = task.numRunning;
  let numQueued  = task.numQueued;
  let taskGroup = task.get('group');

  while (taskGroup) {
    set(taskGroup, 'numRunning', numRunning);
    set(taskGroup, 'numQueued', numQueued);
    taskGroup = taskGroup.get('group');
  }
}

export default Scheduler;

