import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { forever, task } from 'ember-concurrency';

export default class HelpersTestController extends Controller {
  @tracked maybeNullTask = null;
  @tracked status = null;

  myTask = task(async (...args) => {
    try {
      this.status = args.join('-');
      await forever;
    } finally {
      this.status = 'canceled';
    }
  });

  valueTask = task(async (value) => {
    let expected = 'Set value option';
    if (value !== expected) {
      throw new Error(`value !== ${expected}`);
    }
  });

  returnValue = task(async () => {
    return 10;
  });

  someTask = task(async () => {
    this.status = 'someTask';
  });

  @action
  setupTask() {
    this.maybeNullTask = this.someTask;
  }
}
