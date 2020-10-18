import { computed } from '@ember/object';
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

export default Controller.extend({
  defaultTask:      task(SHARED_TASK_FN),
  restartableTask:  task(SHARED_TASK_FN).restartable(),
  enqueuedTask:     task(SHARED_TASK_FN).enqueue(),
  droppingTask:     task(SHARED_TASK_FN).drop(),
  restartableTask3: task(SHARED_TASK_FN).maxConcurrency(3).restartable(),
  enqueuedTask3:    task(SHARED_TASK_FN).maxConcurrency(3).enqueue(),
  droppingTask3:    task(SHARED_TASK_FN).maxConcurrency(3).drop(),

  tasks: computed(function() {
    return [
      this.defaultTask,
      this.restartableTask,
      this.enqueuedTask,
      this.droppingTask,
      this.restartableTask3,
      this.enqueuedTask3,
      this.droppingTask3,
    ];
  })
});

