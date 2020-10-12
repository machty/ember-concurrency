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

// BEGIN-SNIPPET shared-tasks-concurrent
export default Controller.extend({
  restartableTask3: task(SHARED_TASK_FN).maxConcurrency(3).restartable(),
  enqueuedTask3:    task(SHARED_TASK_FN).maxConcurrency(3).enqueue(),
  droppingTask3:    task(SHARED_TASK_FN).maxConcurrency(3).drop(),
  keepLatestTask3:  task(SHARED_TASK_FN).maxConcurrency(3).keepLatest(),
  priorityTask:     task(SHARED_TASK_FN).enqueueWithPriority(prioritySortFn),
  priorityTask3:    task(SHARED_TASK_FN).maxConcurrency(3).enqueueWithPriority(prioritySortFn),
});

// An example sort function which sorts tasks based on the perform time descending
function prioritySortFn(a, b) {
  return b.args[0].performTime - a.args[0].performTime;
}
// END-SNIPPET

