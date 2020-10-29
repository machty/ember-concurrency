import TutorialComponent from '../shared-tutorial/component';

// BEGIN-SNIPPET better-syntax-8
import { task } from 'ember-concurrency';

export default class Tutorial7 extends TutorialComponent {
  result = null;

  @task *findStores() {
    let geolocation = this.geolocation;
    let store = this.store;

    let coords = yield geolocation.getCoords();
    let result = yield store.getNearbyStores(coords);
    this.set('result', result);
  }
}
// END-SNIPPET
