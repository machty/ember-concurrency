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
    this.allTaskInstances = [];
  },

  lastWithArguments() {
    return this._lastWithArgumentsHelper(() => true, arguments);
  },

  lastStartedWithArguments() {
    return this._lastWithArgumentsHelper((taskInstance) => taskInstance.get('hasStarted'), arguments);
  },

  lastRunningWithArguments() {
    return this._lastWithArgumentsHelper((taskInstance) => taskInstance.get('isRunning'), arguments);
  },

  lastSuccessfulWithArguments() {
    return this._lastWithArgumentsHelper((taskInstance) => taskInstance.get('isSuccessful'), arguments);
  },

  lastCompleteWithArguments() {
    return this._lastWithArgumentsHelper((taskInstance) => taskInstance.get('isFinished'), arguments);
  },

  lastErroredWithArguments() {
    return this._lastWithArgumentsHelper((taskInstance) => taskInstance.get('isError'), arguments);
  },

  lastCanceledWithArguments() {
    return this._lastWithArgumentsHelper((taskInstance) => taskInstance.get('isCanceled'), arguments);
  },

  lastIncompleteWithArguments() {
    return this._lastWithArgumentsHelper((taskInstance) => taskInstance.get('isCanceled') || taskInstance.get('isError'), arguments);
  },

  _lastWithArgumentsHelper(matchFunction, argumentsList) {
    if (!this.trackAllTaskInstances) {
      console.warn('Task instance tracking must be enabled with the .trackAllTaskInstances() modifier to access previous task instances by their arguments.');
    }

    for (let i = this.allTaskInstances.length - 1; i >= 0; i -= 1) {
      let taskInstance = this.allTaskInstances[i];

      if (this._argumentsAreEqual(taskInstance.args, argumentsList) && matchFunction(taskInstance)) {
        return taskInstance;
      }
    }

    return null;
  },

  _argumentsAreEqual(args1, args2) {
    let argsLength = Math.max(args1.length, args2.length);

    // Considers implicit and explicit undefined to be equal
    for (let i = 0; i <= argsLength; i += 1) {
      if (args1[i] !== args2[i]) {
        return false;
      }
    }

    return true;
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
        taskInstance.task.decrementProperty('numQueued');
      }

      taskInstance.cancel(cancelReason);
      if (seen) {
        seen.push(taskInstance.task);
      }
    }
    taskInstances.splice(index, count);
  },

  schedule(taskInstance) {
    if (this.trackAllTaskInstances) {
      this.allTaskInstances.push(taskInstance);
    }

    set(this, 'lastPerformed', taskInstance);
    this.incrementProperty('performCount');
    taskInstance.task.incrementProperty('numQueued');
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
    task.decrementProperty('numQueued');
    task.incrementProperty('numRunning');

    taskInstance._start()._onFinalize(() => {
      task.decrementProperty('numRunning');
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
  let taskGroup = task.get('group');

  while (taskGroup) {
    set(taskGroup, 'numRunning', numRunning);
    set(taskGroup, 'numQueued', numQueued);
    taskGroup = taskGroup.get('group');
  }
}

function filterFinished(taskInstances) {
  let ret = [];
  for (let i = 0, l = taskInstances.length; i < l; ++i) {
    let taskInstance = taskInstances[i];
    if (get(taskInstance, 'isFinished') === false) {
      ret.push(taskInstance);
    }
  }
  return ret;
}

export default Scheduler;

