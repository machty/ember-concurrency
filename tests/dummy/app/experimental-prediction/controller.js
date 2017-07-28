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
      this.get('defaultTask'),
      this.get('restartableTask'),
      this.get('enqueuedTask'),
      this.get('droppingTask'),
      this.get('restartableTask3'),
      this.get('enqueuedTask3'),
      this.get('droppingTask3'),
    ];
  })
});

