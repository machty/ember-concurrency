import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  isShowingButton: false,
  showButtonSoon: task(function * () {
    this.set('isShowingButton', false);
    yield timeout(200);
    this.set('isShowingButton', true);
  }),

  value: 0,
  actions: {
    setValue() {
      this.set('value', 123);
    }
  }
});

