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
export default class SharedTasksAdvancedController extends Controller {
  @task({ maxConcurrency: 3, restartable: true })
  restartableTask3 = SHARED_TASK_FN;

  @task({ maxConcurrency: 3, enqueue: true })
  enqueuedTask3 = SHARED_TASK_FN;

  @task({ maxConcurrency: 3, drop: true })
  droppingTask3 = SHARED_TASK_FN;

  @task({ maxConcurrency: 3, keepLatest: true })
  keepLatestTask3 = SHARED_TASK_FN;
}
// END-SNIPPET
