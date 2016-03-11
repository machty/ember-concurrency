import Ember from 'ember';

const { computed } = Ember;

export default Ember.Mixin.create({
  isIdle: computed.equal('concurrency', 0),
  isRunning: Ember.computed.not('isIdle'),

  state: computed('isIdle', function() {
    return this.get('isIdle') ? 'idle' : 'running';
  }),

  _maxConcurrency: Infinity,

  _propertyName: null,
  _origin: null,
  name: computed.oneWay('_propertyName'),

  concurrency: computed.alias('_scheduler.concurrency'),

  cancelAll() {
    this._scheduler.cancelAll();
  },

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

