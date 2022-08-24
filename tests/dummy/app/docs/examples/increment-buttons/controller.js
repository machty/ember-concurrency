import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';

// BEGIN-SNIPPET increment-button-task
export default class IncrementButtonsController extends Controller {
  count = 0;

  incrementBy = task(async (inc) => {
    let speed = 400;
    while (true) {
      this.incrementProperty('count', inc);
      await timeout(speed);
      speed = Math.max(50, speed * 0.8);
    }
  });
}
// END-SNIPPET
