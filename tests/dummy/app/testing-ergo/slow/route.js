import Ember from 'ember';
import { timeout } from 'ember-concurrency';

export default Ember.Route.extend({
  model() {
    return timeout(200).then(() => {});
  }
});

