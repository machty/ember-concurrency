import Ember from 'ember';

const Scheduler = Ember.Object.extend({
  concurrency: 0,

  init() {
    this._super(...arguments);
    this.activeTaskInstances = Ember.A();
    this.queuedTaskInstances = Ember.A();
    this._needsFlush = Ember.run.bind(this, this._scheduleFlush);
  },

  cancelAll() {
    this.spliceTaskInstances(this.activeTaskInstances, 0, this.activeTaskInstances.length);
    this.spliceTaskInstances(this.queuedTaskInstances, 0, this.queuedTaskInstances.length);
  },

  spliceTaskInstances(taskInstances, index, count) {
    for (let i = index; i < index + count; ++i) {
      taskInstances[i].cancel();
    }
    taskInstances.splice(index, count);
  },

  schedule(taskInstance) {
    this.queuedTaskInstances.push(taskInstance);
    this._needsFlush();
    this.notifyPropertyChange('nextPerformState');
  },

  _needsFlush: null,

  _flushScheduled: false,
  _scheduleFlush() {
    this._flushScheduled = true;
    Ember.run.once(this, this._flushQueues);
  },

  _flushQueues() {
    this._flushScheduled = false;
    this.activeTaskInstances = Ember.A(this.activeTaskInstances.filterBy('isFinished', false));

    this.bufferPolicy.schedule(this);

    for (let i = 0; i < this.activeTaskInstances.length; ++i) {
      let taskInstance = this.activeTaskInstances[i];
      if (!taskInstance.hasStarted) {
        // use internal promise so that it doesn't cancel error reporting
        taskInstance._start()._defer.promise.then(this._needsFlush, this._needsFlush);
      }
    }

    this.notifyPropertyChange('nextPerformState');

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

export default Scheduler;


