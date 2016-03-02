import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

// BEGIN-SNIPPET detail-route
export default Ember.Route.extend({
  notify: Ember.inject.service('notify'),

  setupController(controller, model) {
    this.get('pollServerForChanges').perform(model.id);
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
  }).cancelOn('deactivate').restartable(),
});
// END-SNIPPET

