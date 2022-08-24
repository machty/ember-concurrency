import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';

export default class SharedTasksController extends Controller {
  restartableTask3 = task(
    this,
    { maxConcurrency: 3, restartable: true },
    async (t) => this.sharedTask.perform(t)
  );

  enqueuedTask3 = task({ maxConcurrency: 3, enqueue: true }, async (t) =>
    this.sharedTask.perform(t)
  );

  droppingTask3 = task({ maxConcurrency: 3, drop: true }, async (t) =>
    this.sharedTask.perform(t)
  );

  keepLatestTask3 = task(
    this,
    { maxConcurrency: 3, keepLatest: true },
    async (t) => this.sharedTask.perform(t)
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
// BEGIN-SNIPPET shared-tasks-concurrent
  restartableTask3 = task({ maxConcurrency: 3, restartable: true }, async (t) => { ... }
  enqueuedTask3 = task({ maxConcurrency: 3, enqueue: true }, async (t) => { ... }
  droppingTask3 = task({ maxConcurrency: 3, drop: true }, async (t) => { ... }
  keepLatestTask3 = task({ maxConcurrency: 3, keepLatest: true }, async (t) => { ... }
// END-SNIPPET
*/
