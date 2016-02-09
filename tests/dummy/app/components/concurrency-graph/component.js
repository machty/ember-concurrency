import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

let Tracker = Ember.Object.extend({
  id: null,
  performTime: null,
  startTime: null,
  endTime: Infinity,
  cancelled: false,
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
      requestAnimationFrame(defer.resolve);
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
        end: (didComplete) => {
          tracker.set('endTime', this.timeElapsed);
          if (!didComplete) {
            tracker.set('cancelled', true);
          }
        },
      });

      this.get('trackers').pushObject(tracker);

      let task = this.get('task');
      task.perform(tracker);
    },

    restart() {
      this.restart();
    }
  }
});

