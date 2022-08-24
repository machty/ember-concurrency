import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { restartableTask, timeout } from 'ember-concurrency';

// BEGIN-SNIPPET detail-route
export default class RouteTasksDetailRoute extends Route {
  @service notify;

  setupController(controller, model) {
    super.setupController(...arguments);
    this.pollServerForChanges.perform(model.id);
  }

  resetController() {
    super.resetController(...arguments);
    this.pollServerForChanges.cancelAll();
  }

  pollServerForChanges = restartableTask(async (id) => {
    let notify = this.notify;
    await timeout(500);
    try {
      notify.info(`Thing ${id}: Starting to poll for changes`);
      while (true) {
        await timeout(5000);
        notify.info(`Thing ${id}: Polling now...`);
      }
    } finally {
      notify.warning(`Thing ${id}: No longer polling for changes`);
    }
  });
}
// END-SNIPPET
