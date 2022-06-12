import TutorialComponent from '../shared-tutorial/component';

// BEGIN-SNIPPET better-syntax-7
import { task } from 'ember-concurrency';

export default class Tutorial6 extends TutorialComponent {
  result = null;

  findStores = task(this, async () => {
    let geolocation = this.geolocation;
    let store = this.store;

    let coords = yield geolocation.getCoords();
    let result = yield store.getNearbyStores(coords);
    this.set('result', result);
  });
}
// END-SNIPPET
