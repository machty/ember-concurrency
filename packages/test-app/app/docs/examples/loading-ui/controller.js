import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';

// BEGIN-SNIPPET loading-ui-controller
export default class LoadingUIController extends Controller {
  @tracked result = null;

  askQuestion = task({ drop: true }, async () => {
    await timeout(1000);
    this.result = Math.random();
  });
}
// END-SNIPPET
