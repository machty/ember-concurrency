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
    this.tags = {};
  }
}

class CountData {
  constructor(taskOrGroup) {
    this.taskOrGroup = taskOrGroup;
    this.numRunning = 0;
    this.numQueued = 0;
    this.attrs = {};
  }

  finalize(seen) {
    let taskGroup = this.taskOrGroup.group;
    let lastCount = this;

    while (taskGroup) {
      let newCount = CountData.for(seen, taskGroup);
      Object.assign(newCount.attrs, lastCount.attrs);
      newCount.numRunning += lastCount.numRunning;
      newCount.numQueued += lastCount.numQueued;
      taskGroup = taskGroup.group;
      lastCount = newCount;
    }
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
}

CountData.for = function(seen, taskOrGroup) {
  let guid = taskOrGroup.guid;
  let countData = seen[guid];
  if (!countData) {
    countData = seen[guid] = new CountData();
  }
  return countData;
}

class ProxyScheduler {
  // schedulers maintain state.
  // they are bags of state.
  // that's the whole reason we have this.
  //
  constructor(scheduler) {
    this.scheduler = scheduler;
  }

  schedule(taskInstance) {
    taskInstance.tags[this.guid] = true;
    this.scheduler.schedule(taskInstance);

    set(this, 'lastScheduled', taskInstance);
    this.incrementProperty('scheduleCount');
  }
}

// this is just state.
// each Task should have a different one.
const Scheduler = EmberObject.extend({
  lastScheduled:  null, // every scheduler
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
    if (this.proxyScheduler) {
      let workUnit = new WorkUnit(taskInstance);
    } else {
    }

    taskInstance._onFinalize(() => this._taskInstanceDidFinalize(taskInstance));
    this.taskInstances.push(taskInstance);
    this._reschedule();
  },

  // _reschedule runs:
  // 1. When a new TaskInstance is scheduled (so that the new TaskInstance
  //    can start executing, be enqueued, or be cancelled depending on the buffer policy).
  // 2. When a prior task instance finalizes.
  _reschedule() {
    let [unfinishedTaskInstances, numRunning, numQueued] = this._filterAndCount(this.taskInstances);
    let refreshState = this.schedulerPolicy.prepareRefresh(numRunning, numQueued);

    unfinishedTaskInstances.forEach(taskInstance => {
      let desiredState = refreshState.step(taskInstance, numRunning, numQueued);
      return this._handleDesiredState(taskInstance, desiredState);
    });



    let result = this.schedulerPolicy.refresh(this.taskInstances);

    this.bufferPolicy.schedule(activeTaskInstances, queuedTaskInstances, this.maxConcurrency);


    // Filter out task instances that are finished (including those cancelled while enqueued)
    this.taskInstances = this.taskInstances.filter(taskInstance => !get(taskInstance, 'isFinished'));

    // Delegate to buffer policy to cancel / start task instances
    

    if (lastStarted) {
      set(this, 'lastStarted', lastStarted);
    }
    set(this, 'lastRunning', lastStarted);

    this.updateCounts();

    set(this, 'concurrency', this.activeTaskInstances.length);
  },

  _handleDesiredState(taskInstance, desiredState) {
    switch(desiredState.type) {
      case CANCELLED:
        // how to prevent this from unnecessarily flushing twice?
        // maybe we want it to, depending on whether it's a slow cancel?
        taskInstance.cancel(desiredState.reason);
        return false;
      case STARTED:
        if (!taskInstance.hasStarted) {
          this.startTaskInstance(taskInstance);
        }
        return true;
      case QUEUED:
        // TODO: assert taskInstance hasn't started?
        // Or perhaps this can be a way to pause?
        return true;
    }
  },

  _filterAndCount(taskInstances) {
    let numRunning = 0, numQueued = 0;

    let unfinishedTaskInstances = taskInstances.filter(taskInstance => {
      CountData.for(this.counts, taskInstance.task);
      if (taskInstance.isFinished) {
        return false;
      }

      if (taskInstance.hasStarted) {
        numRunning += 1;
      } else {
        numQueued += 1;
      }

      return true;
    });

    return [unfinishedTaskInstances, numRunning, numQueued];
  },

  updateCounts() {
    // TODO: ensure we update counts of tasks no longer in here.
    // Maybe we can initialize this running/queued count objects earlier and pass em in.

    let seen = {};

    const EMPTY_ATTRS = {};

    this.taskInstances.forEach(taskInstance => {
      // taskInstance/workUnit.origin
      // origin either points to a task or a taskGroup.
      // we basically need to count all the tags...

      let task = taskInstance.task;
      let count = seen[task.guid];
      if (!count) {
        count = seen[task.guid] = {
          task,
          numRunning: 0,
          numQueued: 0,

        };
      }

      if (taskInstance.isRunning) {
        count.numRunning += 1;
      } else {
        count.numQueued += 1;
      }
    });
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
    // TODO these might be updated elsewhere
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

