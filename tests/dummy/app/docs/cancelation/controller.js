import Controller from '@ember/controller';
import { action } from '@ember/object';
import { forever, task } from 'ember-concurrency';

// BEGIN-SNIPPET cancelation
export default class CancelationController extends Controller {
  count = 0;
  mostRecent = null;

  @task *myTask() {
    try {
      this.incrementProperty('count');
      yield forever;
    } finally {
      // finally blocks always get called,
      // even when the task is being canceled
      this.decrementProperty('count');
    }
  }

  @action
  performTask() {
    let task = this.myTask;
    let taskInstance = task.perform();
    this.set('mostRecent', taskInstance);
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
