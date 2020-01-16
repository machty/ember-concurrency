import { once } from '@ember/runloop';
import EmberObject, { set, get } from '@ember/object';

let SEEN_INDEX = 0;

const Scheduler = EmberObject.extend({
  lastPerformed:  null,
  lastStarted:    null,
  lastRunning:    null,
  lastSuccessful: null,
  lastComplete:   null,
  lastErrored:    null,
  lastCanceled:   null,
  lastIncomplete: null,
  performCount: 0,

  boundHandleFulfill: null,
  boundHandleReject: null,

  init() {
    this._super(...arguments);
    this.activeTaskInstances = [];
    this.queuedTaskInstances = [];
  },

  cancelAll(reason) {
    let seen = [];
    this.spliceTaskInstances(reason, this.activeTaskInstances, 0, this.activeTaskInstances.length, seen);
    this.spliceTaskInstances(reason, this.queuedTaskInstances, 0, this.queuedTaskInstances.length, seen);
    flushTaskCounts(seen);
  },

  spliceTaskInstances(cancelReason, taskInstances, index, count, seen) {
    for (let i = index; i < index + count; ++i) {
      let taskInstance = taskInstances[i];

      if (!taskInstance.hasStarted) {
        // This tracking logic is kinda spread all over the place...
        // maybe TaskInstances themselves could notify
        // some delegate of queued state changes upon cancelation?
        set(taskInstance.task, 'numQueued', taskInstance.task.numQueued - 1);
      }

      taskInstance.cancel(cancelReason);
      if (seen) {
        seen.push(taskInstance.task);
      }
    }
    taskInstances.splice(index, count);
  },

  schedule(taskInstance) {
    set(this, 'lastPerformed', taskInstance);
    set(this, 'performCount', this.performCount + 1);
    set(taskInstance.task, 'numQueued', taskInstance.task.numQueued + 1);
    this.queuedTaskInstances.push(taskInstance);
    this._flushQueues();
  },

  _flushQueues() {
    let seen = [];

    for (let i = 0; i < this.activeTaskInstances.length; ++i) {
      seen.push(this.activeTaskInstances[i].task);
    }

    this.activeTaskInstances = filterFinished(this.activeTaskInstances);

    this.bufferPolicy.schedule(this);

    var lastStarted = null;
    for (let i = 0; i < this.activeTaskInstances.length; ++i) {
      let taskInstance = this.activeTaskInstances[i];
      if (!taskInstance.hasStarted) {
        this._startTaskInstance(taskInstance);
        lastStarted = taskInstance;
      }
      seen.push(taskInstance.task);
    }

    if (lastStarted) {
      set(this, 'lastStarted', lastStarted);
    }
    set(this, 'lastRunning', lastStarted);

    for (let i = 0; i < this.queuedTaskInstances.length; ++i) {
      seen.push(this.queuedTaskInstances[i].task);
    }

    flushTaskCounts(seen);
    set(this, 'concurrency', this.activeTaskInstances.length);
  },

  _startTaskInstance(taskInstance) {
    let task = taskInstance.task;
    set(task, 'numQueued', task.numQueued - 1);
    set(task, 'numRunning', task.numRunning + 1);

    taskInstance._start()._onFinalize(() => {
      set(task, 'numRunning', task.numRunning - 1);
      var state = taskInstance._completionState;
      set(this, 'lastComplete', taskInstance);
      if (state === 1) {
        set(this, 'lastSuccessful', taskInstance);
      } else {
        if (state === 2) {
          set(this, 'lastErrored', taskInstance);
        } else if (state === 3) {
          set(this, 'lastCanceled', taskInstance);
        }
        set(this, 'lastIncomplete', taskInstance);
      }
      once(this, this._flushQueues);
    });
  }
});

function flushTaskCounts(tasks) {
  SEEN_INDEX++;
  for (let i = 0, l = tasks.length; i < l; ++i) {
    let task = tasks[i];
    if (task._seenIndex < SEEN_INDEX) {
      task._seenIndex = SEEN_INDEX;
      updateTaskChainCounts(task);
    }
  }
}

function updateTaskChainCounts(task) {
  let numRunning = task.numRunning;
  let numQueued  = task.numQueued;
  let taskGroup = get(task, 'group');

  while (taskGroup) {
    set(taskGroup, 'numRunning', numRunning);
    set(taskGroup, 'numQueued', numQueued);
    taskGroup = get(taskGroup, 'group');
  }
}

function filterFinished(taskInstances) {
  let ret = [];
  for (let i = 0, l = taskInstances.length; i < l; ++i) {
    let taskInstance = taskInstances[i];
    if (taskInstance.isFinished === false) {
      ret.push(taskInstance);
    }
  }
  return ret;
}

export default Scheduler;
