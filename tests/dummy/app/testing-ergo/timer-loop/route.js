import Route from '@ember/routing/route';
import { task, timeout } from 'ember-concurrency';

export default Route.extend({
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

