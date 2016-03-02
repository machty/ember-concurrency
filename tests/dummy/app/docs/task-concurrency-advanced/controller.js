import Ember from 'ember';
import { timeout } from 'ember-concurrency';

function * SHARED_TASK_FN(tracker) {
  tracker.start();
  try {
    // simulate async work
    yield timeout(1500);
  } finally {
    tracker.end();
  }
}

// BEGIN-SNIPPET shared-tasks-concurrent
import { task, restartable, enqueue, drop, maxConcurrency } from 'ember-concurrency';
export default Ember.Controller.extend({
  restartableTask3: task(restartable, maxConcurrency(3), SHARED_TASK_FN),
  enqueuedTask3:    task(enqueue,     maxConcurrency(3), SHARED_TASK_FN),
  droppingTask3:    task(drop,        maxConcurrency(3), SHARED_TASK_FN),
});
// END-SNIPPET

