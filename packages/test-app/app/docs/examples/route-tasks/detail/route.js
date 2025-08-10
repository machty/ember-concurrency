import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { restartableTask, timeout } from 'ember-concurrency';

// BEGIN-SNIPPET detail-route
export default class RouteTasksDetailRoute extends Route {
  @service notifications;

  setupController(controller, model) {
    super.setupController(...arguments);

    this.pollServerForChanges.perform(model.id);
  }

  resetController() {
    super.resetController(...arguments);
    this.pollServerForChanges.cancelAll();
  }

  pollServerForChanges = restartableTask(async (id) => {
    let notifications = this.notifications;
    await timeout(500);
    try {
      notifications.info(`Thing ${id}: Starting to poll for changes`);
      while (true) {
        await timeout(5000);
        notifications.info(`Thing ${id}: Polling now...`);
      }
    } finally {
      notifications.warning(`Thing ${id}: No longer polling for changes`);
    }
  });
}
// END-SNIPPET
