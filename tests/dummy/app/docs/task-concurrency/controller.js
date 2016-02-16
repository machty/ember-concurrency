import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

// BEGIN-SNIPPET shared-task-function
function * SHARED_TASK_FN(tracker) {
  tracker.start();
  let didComplete = false;
  try {
    // simulate async work
    yield timeout(1500);
    didComplete = true;
  } finally {
    tracker.end(didComplete);
  }
}
// END-SNIPPET

export default Ember.Controller.extend({
// BEGIN-SNIPPET shared-tasks
  defaultTask:     task(SHARED_TASK_FN),
  restartableTask: task(SHARED_TASK_FN).restartable(),
  enqueuedTask:    task(SHARED_TASK_FN).enqueue(),
  droppingTask:    task(SHARED_TASK_FN).drop(),
  keepLatestTask:  task(SHARED_TASK_FN).keepLatest(),
// END-SNIPPET

// BEGIN-SNIPPET shared-tasks-concurrent
  restartableTask3: task(SHARED_TASK_FN).maxConcurrency(3).restartable(),
  enqueuedTask3:    task(SHARED_TASK_FN).maxConcurrency(3).enqueue(),
  droppingTask3:    task(SHARED_TASK_FN).maxConcurrency(3).drop(),
  keepLatestTask3:  task(SHARED_TASK_FN).maxConcurrency(3).keepLatest(),
// END-SNIPPET
});

