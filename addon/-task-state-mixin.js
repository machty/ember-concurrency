import Ember from 'ember';

const { computed } = Ember;
const { alias } = computed;

// this is a mixin of properties/methods shared between Tasks and TaskGroups
export default Ember.Mixin.create({
  isRunning: computed.gt('numRunning', 0),
  isQueued:  computed.gt('numQueued',  0),
  isIdle:    computed('isRunning', 'isQueued', function() {
    return !this.get('isRunning') && !this.get('isQueued');
  }),

  state: computed('isRunning', 'isQueued', function() {
    if (this.get('isRunning')) {
      return 'running';
    } else if (this.get('isQueued')) {
      return 'queued';
    } else {
      return 'idle';
    }
  }),

  _propertyName: null,
  _origin: null,
  name: alias('_propertyName'),

  concurrency:    alias('numRunning'),
  last:           alias('_scheduler.lastStarted'),
  lastRunning:    alias('_scheduler.lastRunning'),
  lastPerformed:  alias('_scheduler.lastPerformed'),
  lastSuccessful: alias('_scheduler.lastSuccessful'),
  lastComplete:   alias('_scheduler.lastComplete'),
  lastErrored:    alias('_scheduler.lastErrored'),
  lastCanceled:   alias('_scheduler.lastCanceled'),
  lastIncomplete: alias('_scheduler.lastIncomplete'),
  performCount: alias('_scheduler.performCount'),

  numRunning: 0,
  numQueued: 0,
  _seenIndex: 0,

  cancelAll() {
    this._scheduler.cancelAll();
  },

  group: computed(function() {
    return this._taskGroupPath && this.context.get(this._taskGroupPath);
  }),

  resetPerformCount() {
    this.set('performCount', 0);
  },

  _scheduler: null,

});

