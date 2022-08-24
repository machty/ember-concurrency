import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';

export default class SharedTasksController extends Controller {
  defaultTask = task(this, async (t) => this.sharedTask.perform(t));

  restartableTask = task(this, { restartable: true }, async (t) =>
    this.sharedTask.perform(t)
  );

  enqueuedTask = task(this, { enqueue: true }, async (t) =>
    this.sharedTask.perform(t)
  );

  droppingTask = task(this, { drop: true }, async (t) =>
    this.sharedTask.perform(t)
  );

  keepLatestTask = task(this, { keepLatest: true }, async (t) =>
    this.sharedTask.perform(t)
  );

  sharedTask = task(this, async (tracker) => {
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
  defaultTask = task(this, async (t) => { ... });
  restartableTask = task(this, { restartable: true }, async (t) => { ... }
  enqueuedTask = task(this, { enqueue: true }, async (t) => { ... }
  droppingTask = task(this, { drop: true }, async (t) => { ... }
  keepLatestTask = task(this, { keepLatest: true }, async (t) => { ... }
// END-SNIPPET
*/
