import Controller from '@ember/controller';
import { action } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

export default class FooController extends Controller {
  isShowingButton = false;
  @task *showButtonSoon() {
    this.set('isShowingButton', false);
    yield timeout(200);
    this.set('isShowingButton', true);
  }

  value = 0;

  @action
  setValue() {
    this.set('value', 123);
  }
}
