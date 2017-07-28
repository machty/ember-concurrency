import Route from '@ember/routing/route';
import { timeout } from 'ember-concurrency';

export default Route.extend({
  model() {
    return timeout(200).then(() => {});
  }
});

