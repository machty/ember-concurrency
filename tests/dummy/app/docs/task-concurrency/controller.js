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
export default class SharedTasksController extends Controller {
  @task defaultTask = SHARED_TASK_FN;
  @task({ restartable: true }) restartableTask = SHARED_TASK_FN;
  @task({ enqueue: true }) enqueuedTask = SHARED_TASK_FN;
  @task({ drop: true }) droppingTask = SHARED_TASK_FN;
  @task({ keepLatest: true }) keepLatestTask = SHARED_TASK_FN;
}
// END-SNIPPET
