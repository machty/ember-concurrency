import Controller from '@ember/controller';
import { task, rawTimeout } from 'ember-concurrency';

export default Controller.extend({
  isShowingButton: false,
  showButtonSoon: task(function * () {
    this.set('isShowingButton', false);
    yield rawTimeout(500);
    this.set('isShowingButton', true);
  }),
});

