import TutorialComponent from '../shared-tutorial/component';

// BEGIN-SNIPPET better-syntax-7
import { task } from 'ember-concurrency';

export default TutorialComponent.extend({
  result: null,

  findStores: task(function * () {
    let geolocation = this.get('geolocation');
    let store = this.get('store');

    let coords = yield geolocation.getCoords();
    let result = yield store.getNearbyStores(coords);
    this.set('result', result);
  }),
});
// END-SNIPPET


