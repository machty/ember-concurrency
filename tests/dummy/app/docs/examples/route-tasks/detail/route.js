import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { task, timeout } from 'ember-concurrency';

// BEGIN-SNIPPET detail-route
export default Route.extend({
  notify: service('notify'),

  setupController(controller, model) {
    this._super(...arguments);
    this.get('pollServerForChanges').perform(model.id);
  },

  resetController() {
    this._super(...arguments);
    this.get('pollServerForChanges').cancelAll();
  },

  pollServerForChanges: task(function * (id) {
    let notify = this.get('notify');
    yield timeout(500);
    try {
      notify.info(`Thing ${id}: Starting to poll for changes`);
      while (true) {
        yield timeout(5000);
        notify.info(`Thing ${id}: Polling now...`);
      }
    } finally {
      notify.warning(`Thing ${id}: No longer polling for changes`);
    }
  }).restartable()
});
// END-SNIPPET
