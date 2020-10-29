import { oneWay } from '@ember/object/computed';
import { A } from '@ember/array';
import Component from '@ember/component';
import { capitalize } from '@ember/string';
import EmberObject, { action, computed } from '@ember/object';
import { animationFrame, task } from 'ember-concurrency';

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

export default class ConcurrencyGraphComponent extends Component {
  task = null;
  trackers = null;
  timeElapsed = 0;
  startTime = null;
  nextId = 0;

  colors = [ 'red', 'green', 'blue' ];
  labelHeights = [ 0, 20, 40, 60, 80, 100 ];

  didInsertElement() {
    super.didInsertElement(...arguments);
    this.restart();
  }

  @computed('trackers.[]')
  get lowerLimit() {
    let trackers = this.trackers;
    if (!trackers) { return 0; }
    let v = Math.min(...trackers.mapBy('performTime'));
    return v;
  }

  @computed('timeElapsed')
  get upperLimit() {
    let timeElapsed = this.timeElapsed;
    return Math.max(10000, timeElapsed);
  }

  @(task(function * () {
    while (true) {
      let now = +new Date();
      this.set('timeElapsed', now - this.startTime);
      yield animationFrame();
    }
  }).drop()) ticker;

  @action
  restart() {
    this.nextId = 0;
    this.set('trackers', A());
    this.ticker.cancelAll();
    this.set('timeElapsed', 0);
    this.startTime = 0;
  }

  @action
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

    let task = this.task;
    let taskInstance = task.perform(tracker);
    tracker.set('taskInstance', taskInstance);

    this.trackers.pushObject(tracker);
    this.ticker.perform();
  }
}
