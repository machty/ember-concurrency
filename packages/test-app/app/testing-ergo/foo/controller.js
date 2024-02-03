import Controller from '@ember/controller';
import { action } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

export default class FooController extends Controller {
  isShowingButton = false;

  showButtonSoon = task(async () => {
    this.set('isShowingButton', false);
    await timeout(200);
    this.set('isShowingButton', true);
  });

  value = 0;

  @action
  setValue() {
    this.set('value', 123);
  }
}
