import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
const { alias } = computed;

// this is a mixin of properties/methods shared between Tasks and TaskGroups
export default Mixin.create({
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

  cancelAll(reason = ".cancelAll() was explicitly called on the Task") {
    this._scheduler.cancelAll(reason);
  },

  group: computed(function() {
    return this._taskGroupPath && this.context.get(this._taskGroupPath);
  }),

  _scheduler: null,

});

