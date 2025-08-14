import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import type NotificationsService from '../../../../services/notifications';

// BEGIN-SNIPPET detail-route
export default class RouteTasksDetailRoute extends Route {
  @service declare notifications: NotificationsService;

  setupController(controller: any, model: any) {
    super.setupController(...arguments);

    this.pollServerForChanges.perform(model.id);
  }

  resetController() {
    super.resetController(...arguments);
    this.pollServerForChanges.cancelAll();
  }

  pollServerForChanges = task({ restartable: true }, async (id: string) => {
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
