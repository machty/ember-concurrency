import { oneWay } from '@ember/object/computed';
import { A } from '@ember/array';
import { on } from '@ember/object/evented';
import RSVP from 'rsvp';
import Component from '@ember/component';
import { capitalize } from '@ember/string';
import EmberObject, { computed } from '@ember/object';
import { task } from 'ember-concurrency';

let Tracker = EmberObject.extend({
  id: null,
  performTime: null,
  startTime: null,
  endTime: oneWay('comp.timeElapsed'),
  comp: null,
  taskInstance: null,
  isCanceled: oneWay('taskInstance.isCanceled'),
  state: computed('taskInstance.state', function() {
    return capitalize(this.get('taskInstance.state'));
  }),
  hasStarted: false,
});

export default Component.extend({
  task: null,
  trackers: null,
  timeElapsed: 0,
  startTime: null,
  nextId: 0,

  lowerLimit: computed('trackers.[]', function() {
    let trackers = this.get('trackers');
    if (!trackers) { return 0; }
    let v = Math.min(...trackers.mapBy('performTime'));
    return v;
  }),

  upperLimit: computed('timeElapsed', function() {
    let timeElapsed = this.get('timeElapsed');
    return Math.max(10000, timeElapsed);
  }),

  colors: [ 'red', 'green', 'blue' ],

  labelHeights: [ 0, 20, 40, 60, 80, 100 ],

  ticker: task(function * () {
    while (true) {
      let now = +new Date();
      this.set('timeElapsed', now - this.startTime);

      let defer = RSVP.defer();
      window.requestAnimationFrame(defer.resolve);
      yield defer.promise;
    }
  }).drop(),

  restart: on('init', function () {
    this.nextId = 0;
    this.set('trackers', A());
    this.get('ticker').cancelAll();
    this.set('timeElapsed', 0);
    this.startTime = 0;
  }),

  actions: {
    startTask() {
      this.startTime = this.startTime || +new Date();
      let tracker = Tracker.create({
        id: this.nextId++,
        performTime: this.timeElapsed,
        comp: this,
        start: () => {
          tracker.set('hasStarted', true);
          tracker.set('startTime', this.timeElapsed || 1);
        },
        end: () => {
          tracker.set('endTime', this.timeElapsed);
        },
      });

      let task = this.get('task');
      let taskInstance = task.perform(tracker);
      tracker.set('taskInstance', taskInstance);

      this.get('trackers').pushObject(tracker);
      this.get('ticker').perform();
    },

    restart() {
      this.restart();
    }
  }
});


