import { once } from '@ember/runloop';
import EmberObject, { set, get, setProperties } from '@ember/object';

import SchedulerRefresh from "./-private/scheduler-refresh"

// import {
//   COMPLETION_SUCCESS,
//   COMPLETION_ERROR,
//   COMPLETION_CANCEL,
// } from "./-private/completion-states"

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

    taskInstance._onFinalize(() => once(this, this._reschedule));

    this.taskInstances.push(taskInstance);
    this._reschedule();
  },

  // _reschedule runs:
  // 1. When a new TaskInstance is scheduled (so that the new TaskInstance
  //    can start executing, be enqueued, or be cancelled depending on the SchedulerPolicy).
  // 2. When a prior task instance finalizes.
  _reschedule() {
    let refresh = new SchedulerRefresh();
    this.taskInstances = refresh.process(self);

    // if (lastStarted) {
    //   set(this, 'lastStarted', lastStarted);
    // }
    // set(this, 'lastRunning', lastStarted);

    // this.updateCounts();

    set(this, 'concurrency', this.activeTaskInstances.length);
  },

  _setTaskInstanceState(taskInstance, desiredState) {
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

