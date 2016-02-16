import Ember from 'ember';
import { task } from 'ember-concurrency';
const { computed } = Ember;

let Tracker = Ember.Object.extend({
  id: null,
  performTime: null,
  startTime: null,
  endTime: Infinity,
  taskInstance: null,
  isCanceled: computed.oneWay('taskInstance.isCanceled'),
  state: computed('taskInstance.state', function() {
    return Ember.String.capitalize(this.get('taskInstance.state'));
  }),
});

let nextId = 0;

export default Ember.Component.extend({
  task: null,
  trackers: null,
  timeElapsed: 0,
  startTime: null,

  lowerLimit: Ember.computed('trackers.[]', function() {
    let v = Math.min(...this.get('trackers').mapBy('performTime'));
    return v;
  }),

  upperLimit: Ember.computed.oneWay('timeElapsed'),

  colors: [ 'red', 'green', 'blue' ],

  labelHeights: [ 40, 60, 80, 100, 120 ],

  ticker: task(function * () {
    this.restart();

    while (true) {
      let now = +new Date();
      this.set('timeElapsed', now - this.startTime);

      let defer = Ember.RSVP.defer();
      window.requestAnimationFrame(defer.resolve);
      yield defer.promise;
    }
  }).on('init'),

  restart() {
    this.startTime = +new Date();
    this.set('timeElapsed', 0);
    this.set('trackers', Ember.A());
  },

  actions: {
    startTask() {
      let tracker = Tracker.create({
        id: nextId++,
        performTime: this.timeElapsed,
        start: () => {
          tracker.set('startTime', this.timeElapsed);
        },
        end: () => {
          tracker.set('endTime', this.timeElapsed);
        },
      });

      let task = this.get('task');
      let taskInstance = task.perform(tracker);
      tracker.set('taskInstance', taskInstance);

      this.get('trackers').pushObject(tracker);
    },

    restart() {
      this.restart();
    }
  }
});

