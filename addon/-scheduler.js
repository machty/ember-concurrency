import Ember from 'ember';

const Scheduler = Ember.Object.extend({
  lastPerformed:  null,
  lastStarted:    null,
  lastRunning:    null,
  lastSuccessful: null,
  lastComplete:   null,
  lastErrored:    null,
  lastCanceled:   null,
  lastIncomplete: null,

  boundHandleFulfill: null,
  boundHandleReject: null,

  init() {
    this._super(...arguments);
    this.activeTaskInstances = Ember.A();
    this.queuedTaskInstances = Ember.A();
  },

  cancelAll() {
    let seen = {};
    this.spliceTaskInstances(this.activeTaskInstances, 0, this.activeTaskInstances.length, seen);
    this.spliceTaskInstances(this.queuedTaskInstances, 0, this.queuedTaskInstances.length, seen);
    flushTaskCounts(seen);
  },

  spliceTaskInstances(taskInstances, index, count, seen) {
    for (let i = index; i < index + count; ++i) {
      let taskInstance = taskInstances[i];
      taskInstance.cancel();
      if (seen) {
        seen[Ember.guidFor(taskInstance)] = taskInstance.task;
      }
    }
    taskInstances.splice(index, count);
  },

  schedule(taskInstance) {
    this.set('lastPerformed', taskInstance);
    this.queuedTaskInstances.push(taskInstance);
    this._scheduleFlush();
    //this.notifyPropertyChange('nextPerformState');
  },

  _flushScheduled: false,
  _scheduleFlush() {
    this._flushScheduled = true;
    Ember.run.once(this, this._flushQueues);
  },

  _flushQueues() {
    this._flushScheduled = false;
    let seen = {};

    for (let i = 0; i < this.activeTaskInstances.length; ++i) {
      let task = this.activeTaskInstances[i].task;
      seen[Ember.guidFor(task)] = task;
    }

    this.activeTaskInstances = Ember.A(this.activeTaskInstances.filterBy('isFinished', false));
    this.bufferPolicy.schedule(this);

    let lastStarted = null;
    for (let i = 0; i < this.activeTaskInstances.length; ++i) {

      let taskInstance = this.activeTaskInstances[i];
      if (!taskInstance.hasStarted) {
        // use internal promise so that it doesn't cancel error reporting
        taskInstance._start()._defer.promise.then(() => {
          this.set('lastSuccessful', taskInstance);
          this.set('lastComplete', taskInstance);
          this._scheduleFlush();
        }, error => {
          if (error && error.name === 'TaskCancelation') {
            this.set('lastCanceled', taskInstance);
          } else {
            this.set('lastErrored', taskInstance);
          }
          this.set('lastComplete', taskInstance);
          this.set('lastIncomplete', taskInstance);
          this._scheduleFlush();
        });
        this.set('lastStarted', taskInstance);
        lastStarted = taskInstance;
      }
      let task = taskInstance.task;
      seen[Ember.guidFor(task)] = task;
      task._numRunning++;
    }

    if (lastStarted) {
      this.set('lastStarted', lastStarted);
    }
    this.set('lastRunning', lastStarted);

    for (let i = 0; i < this.queuedTaskInstances.length; ++i) {
      let task = this.queuedTaskInstances[i].task;
      seen[Ember.guidFor(task)] = task;
      task._numQueued++;
    }

    flushTaskCounts(seen);

    let concurrency = this.activeTaskInstances.length;
    this.set('concurrency', concurrency);
    if (this.completionDefer && concurrency === 0) {
      this.completionDefer.resolve();
      this.completionDefer = null;
    }
  },

  completionDefer: null,
  getCompletionPromise() {
    return new Ember.RSVP.Promise(r => {
      Ember.run.schedule('actions', null, () => {
        let defer = Ember.RSVP.defer();
        if (!this._flushScheduled &&
            this.activeTaskInstances.length === 0 &&
            this.queuedTaskInstances.length === 0) {
          defer.resolve();
        } else {
          this.completionDefer = defer;
        }
        defer.promise.then(r);
      });
    });
  },
});

function flushTaskCounts(tasks) {
  for (let guid in tasks) {
    updateTaskChainCounts(tasks[guid]);
  }
}

function updateTaskChainCounts(_task) {
  let task = _task;
  let numRunning = task._numRunning;
  let numQueued  = task._numQueued;
  while (task) {
    task.set('numRunning', numRunning);
    task.set('numQueued', numQueued);
    task._numRunning = task._numQueued = 0;
    task = task.get('group');
  }
}

export default Scheduler;


