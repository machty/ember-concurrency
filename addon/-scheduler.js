import Ember from 'ember';

const { get, set } = Ember;

let SEEN_INDEX = 0;

const groupBy = (xs, key) => {

};

export const spliceTaskInstances = (cancelReason, taskInstances, index, count, seen) => {
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
};

const Scheduler = Ember.Object.extend({
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
    spliceTaskInstances(reason, this.activeTaskInstances, 0, this.activeTaskInstances.length, seen);
    spliceTaskInstances(reason, this.queuedTaskInstances, 0, this.queuedTaskInstances.length, seen);
    flushTaskCounts(seen);
  },

  schedule(taskInstance, args) {
    set(this, 'lastPerformed', taskInstance);
    this.incrementProperty('performCount');
    taskInstance.task.incrementProperty('numQueued');
    this.queuedTaskInstances.push(taskInstance);
    set(taskInstance, 'channel', this.channelFunc(...args));
    this._flushQueues();
  },

  taskInstancesByChannel(){
    const prop = 'channel';

    let active_group = this.activeTaskInstances.reduce((groups, item) => {
      const val = item[prop],
        result = groups[val] || {active: [], queued: []};
      result.active.push(item);
      groups[val] = result;
      return groups;
    }, {});

    return this.queuedTaskInstances.reduce((groups, item) => {
      const val = item[prop],
        result = groups[val] || {active: [], queued: []};
      result.queued.push(item);
      groups[val] = result;
      return groups;
    }, active_group)
  },

  _flushQueues() {
    let seen = [];

    for (let i = 0; i < this.activeTaskInstances.length; ++i) {
      seen.push(this.activeTaskInstances[i].task);
    }

    this.activeTaskInstances = filterFinished(this.activeTaskInstances);

    const groupedInstances = this.taskInstancesByChannel();
    const result = {active: [], queued: []};

    Object.keys(groupedInstances).reduce((res, key)=>{
      const {queued, active} = groupedInstances[key];
      this.bufferPolicy.schedule(this.maxConcurrency, queued, active);
      res.queued = res.queued.concat(queued);
      res.active = res.active.concat(active);
      return res;
    }, result);

    this.activeTaskInstances = result.active;
    this.queuedTaskInstances = result.queued;

    let lastStarted = null;
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
      let state = taskInstance._completionState;
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
      Ember.run.once(this, this._flushQueues);
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
  return Ember.A(taskInstances).rejectBy('isFinished');
}

export default Scheduler;

