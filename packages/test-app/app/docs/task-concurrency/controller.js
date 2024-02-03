import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';

export default class SharedTasksController extends Controller {
  defaultTask = task(async (t) => this.sharedTask.perform(t));

  restartableTask = task({ restartable: true }, async (t) =>
    this.sharedTask.perform(t)
  );

  enqueuedTask = task({ enqueue: true }, async (t) =>
    this.sharedTask.perform(t)
  );

  droppingTask = task({ drop: true }, async (t) => this.sharedTask.perform(t));

  keepLatestTask = task({ keepLatest: true }, async (t) =>
    this.sharedTask.perform(t)
  );

  sharedTask = task(async (tracker) => {
    tracker.start();
    try {
      // simulate async work
      await timeout(1500);
    } finally {
      tracker.end();
    }
  });
}

/*
// BEGIN-SNIPPET shared-tasks
  defaultTask = task(async (t) => { ... });
  restartableTask = task({ restartable: true }, async (t) => { ... }
  enqueuedTask = task({ enqueue: true }, async (t) => { ... }
  droppingTask = task({ drop: true }, async (t) => { ... }
  keepLatestTask = task({ keepLatest: true }, async (t) => { ... }
// END-SNIPPET
*/
