import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Route.extend({
  setupController() {
    this.get('loopingTask').perform();
  },
  loopingTask: task(function * () {
    while(true) {
      this.controller.incrementProperty('foo');
      yield timeout(200);
    }
  }),
});

