import Ember from 'ember';
import { task } from 'ember-concurrency';
import { rawTimeout } from 'ember-concurrency/utils';

export default Ember.Controller.extend({
  isShowingButton: false,
  showButtonSoon: task(function * () {
    this.set('isShowingButton', false);
    yield rawTimeout(500);
    this.set('isShowingButton', true);
  }),
});

