import Route from '@ember/routing/route';
import { task, timeout } from 'ember-concurrency';

export default Route.extend({
  setupController() {
    this.loopingTask.perform();
  },
  loopingTask: task(function* () {
    while (true) {
      // eslint-disable-next-line ember/no-controller-access-in-routes
      this.controller.incrementProperty('foo');
      yield timeout(200);
    }
  }),
});
