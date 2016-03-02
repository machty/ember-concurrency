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

// BEGIN-SNIPPET shared-tasks

import { task, restartable, enqueue, drop } from 'ember-concurrency';
export default Ember.Controller.extend({
  defaultTask:     task(SHARED_TASK_FN),
  restartableTask: task(restartable, SHARED_TASK_FN),
  enqueuedTask:    task(enqueue,     SHARED_TASK_FN),
  droppingTask:    task(drop,        SHARED_TASK_FN),
});
// END-SNIPPET

