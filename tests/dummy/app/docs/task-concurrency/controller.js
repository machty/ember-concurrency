import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';

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
export default Controller.extend({
  defaultTask:     task(SHARED_TASK_FN),
  restartableTask: task(SHARED_TASK_FN).restartable(),
  enqueuedTask:    task(SHARED_TASK_FN).enqueue(),
  droppingTask:    task(SHARED_TASK_FN).drop(),
  keepLatestTask:  task(SHARED_TASK_FN).keepLatest(),
});
// END-SNIPPET

