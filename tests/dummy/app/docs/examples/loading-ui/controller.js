import Controller from '@ember/controller';
import { dropTask, timeout } from 'ember-concurrency';

// BEGIN-SNIPPET loading-ui-controller
export default class LoadingUIController extends Controller {
  result = null;

  askQuestion = dropTask(this, async () => {
    await timeout(1000);
    this.set('result', Math.random());
  });
}
// END-SNIPPET
