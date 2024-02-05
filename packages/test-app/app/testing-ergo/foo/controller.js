import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';

export default class FooController extends Controller {
  @tracked isShowingButton = false;

  showButtonSoon = task(async () => {
    this.isShowingButton = false;
    await timeout(200);
    this.isShowingButton = true;
  });

  value = 0;

  @action
  setValue() {
    this.value = 123;
  }
}
