import Ember from 'ember';

const { computed } = Ember;

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
  name: computed.alias('_propertyName'),

  concurrency: computed.alias('numRunning'),

  numRunning: 0,
  numQueued: 0,

  // used as a scratchpad
  _numRunning: 0,
  _numQueued: 0,

  cancelAll() {
    this._scheduler.cancelAll();
  },

  group: computed(function() {
    return this._taskGroupPath && this.context.get(this._taskGroupPath);
  }),

  _scheduler: null,

  /* TODO: re-add this to work w task groups... right now it's coupled to .performs

  _performs: computed('_performsPath', function() {
    let path = this.get('_performsPath');
    if (!path) { return; }

    let task = this.context.get(path);
    if (!(task instanceof Task)) {
      throw new Error(`You wrote .performs('${path}'), but the object at '${path}' is not a Task`);
    }
    return task;
  }),

  _performsState: computed('_performs.nextPerformState', function() {
    return this.get('_performs.nextPerformState') || 'succeed';
  }),

  nextPerformState: computed('_performsState', function() {
    let performsState = this.get('_performsState');
    return isSuccess(performsState) ?
      this._bufferPolicy.getNextPerformStatus(this) :
      performsState;
  }),

  performWillSucceed: computed('nextPerformState', function() {
    return isSuccess(this.get('nextPerformState'));
  }),

  performWillDrop: computed.equal('nextPerformState', 'drop'),

  performWillEnqueue: computed.equal('nextPerformState', 'enqueue'),

  performWillCancelPrevious: computed.equal('nextPerformState', 'cancel_previous'),
  */

});

//function isSuccess(nextPerformState) {
  //return nextPerformState === 'succeed' || nextPerformState === 'cancel_previous';
//}

