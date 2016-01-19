import Ember from 'ember';
import { task, sleep } from 'ember-concurrency';

export default Ember.Component.extend({
  group: null,
  task: task('group', function * () {
    let i = 0;
    while(i++ < 6) {
      this.set('value', i);
      yield sleep(150);
    }
  }),

  cssClass: Ember.computed('task.isRunning', 'task.isPerformable', function() {
    if (this.get('task.isRunning')) {
      return 'running';
    } else if (!this.get('task.isPerformable')) {
      return 'disabled';
    } else {
      return 'ready';
    }
  }),

  value: 0,
});

