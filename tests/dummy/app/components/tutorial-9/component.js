import TutorialComponent from '../shared-tutorial/component';

import { task } from 'ember-concurrency';

// BEGIN-SNIPPET better-syntax-10
export default TutorialComponent.extend({
  result: null,
  findStores: task(function * () {
    let geolocation = this.geolocation;
    let store = this.store;

    let coords = yield geolocation.getCoords();
    let result = yield store.getNearbyStores(coords);
    this.set('result', result);
  }).drop(),
});
// END-SNIPPET


