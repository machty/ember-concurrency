import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { forever, task } from 'ember-concurrency';

// BEGIN-SNIPPET cancelation
export default class CancelationController extends Controller {
  @tracked count = 0;
  @tracked mostRecent = null;

  myTask = task(async () => {
    try {
      this.count += 1;
      await forever;
    } finally {
      // finally blocks always get called,
      // even when the task is being canceled
      this.decrementProperty('count');
      this.count -= 1;
    }
  });

  @action
  performTask() {
    let task = this.myTask;
    let taskInstance = task.perform();
    this.mostRecent = taskInstance;
  }

  @action
  cancelAll() {
    this.myTask.cancelAll();
  }

  @action
  cancelMostRecent() {
    this.mostRecent.cancel();
  }
}
// END-SNIPPET
