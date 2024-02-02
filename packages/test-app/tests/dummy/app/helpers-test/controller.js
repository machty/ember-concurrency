import Controller from '@ember/controller';
import { action } from '@ember/object';
import { forever, task } from 'ember-concurrency';

export default class HelpersTestController extends Controller {
  maybeNullTask = null;
  status = null;

  myTask = task(async (...args) => {
    try {
      this.set('status', args.join('-'));
      await forever;
    } finally {
      this.set('status', 'canceled');
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
    this.set('status', 'someTask');
  });

  @action
  setupTask() {
    this.set('maybeNullTask', this.someTask);
  }
}
