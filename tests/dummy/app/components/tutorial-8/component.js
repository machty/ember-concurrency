import TutorialComponent from '../shared-tutorial/component';

// BEGIN-SNIPPET better-syntax-9
import { task } from 'ember-concurrency';

export default class Tutorial8 extends TutorialComponent {
  result = null;

  @task({ drop: true }) // ++
  *findStores() {
    let geolocation = this.geolocation;
    let store = this.store;

    let coords = yield geolocation.getCoords();
    let result = yield store.getNearbyStores(coords);
    this.set('result', result);
  }
}
// END-SNIPPET
