import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { dropTask, timeout } from 'ember-concurrency';

// BEGIN-SNIPPET loading-ui-controller
export default class LoadingUIController extends Controller {
  @tracked result = null;

  askQuestion = dropTask(async () => {
    await timeout(1000);
    this.result = Math.random();
  });
}
// END-SNIPPET
