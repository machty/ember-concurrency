import Controller from '@ember/controller';
import { action } from '@ember/object';
import { forever, task } from 'ember-concurrency';

export default class HelpersTestController extends Controller {
  maybeNullTask = null;
  status = null;

  @task *myTask(...args) {
    try {
      this.set('status', args.join('-'));
      yield forever;
    } finally {
      this.set('status', 'canceled');
    }
  }

  @task *valueTask(value) {
    let expected = 'Set value option';
    if (value !== expected) {
      throw new Error(`value !== ${expected}`);
    }
  }

  @task *returnValue() {
    return 10;
  }

  @task *someTask() {
    this.set('status', 'someTask');
  }

  @action
  setupTask() {
    this.set('maybeNullTask', this.someTask);
  }
}
