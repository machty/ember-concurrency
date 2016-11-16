import { gt } from '@ember/object/computed';
import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
const { alias } = computed;

// this is a mixin of properties/methods shared between Tasks and TaskGroups
export default Mixin.create({
  isRunning: gt('numRunning', 0),
  isQueued:  gt('numQueued',  0),
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

  _taskState: null,
  last:           alias('_taskState.lastStarted'),
  lastRunning:    alias('_taskState.lastRunning'),
  lastPerformed:  alias('_taskState.lastPerformed'),
  lastSuccessful: alias('_taskState.lastSuccessful'),
  lastComplete:   alias('_taskState.lastComplete'),
  lastErrored:    alias('_taskState.lastErrored'),
  lastCanceled:   alias('_taskState.lastCanceled'),
  lastIncomplete: alias('_taskState.lastIncomplete'),
  performCount:   alias('_taskState.performCount'),

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

