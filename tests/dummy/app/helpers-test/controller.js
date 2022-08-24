import Controller from '@ember/controller';
import { action } from '@ember/object';
import { forever, task } from 'ember-concurrency';

export default class HelpersTestController extends Controller {
  maybeNullTask = null;
  status = null;

  myTask = task(this, async (...args) => {
    try {
      this.set('status', args.join('-'));
      await forever;
    } finally {
      this.set('status', 'canceled');
    }
  });

  valueTask = task(this, async (value) => {
    let expected = 'Set value option';
    if (value !== expected) {
      throw new Error(`value !== ${expected}`);
    }
  });

  returnValue = task(this, async () => {
    return 10;
  });

  someTask = task(this, async () => {
    this.set('status', 'someTask');
  });

  @action
  setupTask() {
    this.set('maybeNullTask', this.someTask);
  }
}
