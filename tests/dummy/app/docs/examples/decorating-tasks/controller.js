import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

// BEGIN-SNIPPET decorating-tasks
function taskWithCooldown(taskPath, ms) {
  return task(function * (...args) {
    // perform the task...
    yield this.get(taskPath).perform(...args);

    // ...and wait for cooldown timer.
    yield timeout(ms);
  }).drop().performs(taskPath);
}

export default Ember.Controller.extend({
  sharedTask: task(function * () {
    yield timeout(1000);
  }).drop(),

  halfSecond: taskWithCooldown('sharedTask', 500),
  oneSecond:  taskWithCooldown('sharedTask', 1000),
  twoSeconds: taskWithCooldown('sharedTask', 2000),

  tasks: Ember.computed(function() {
    return [
      this.get('halfSecond'),
      this.get('oneSecond'),
      this.get('twoSeconds')
    ];
  }),
});
// END-SNIPPET

