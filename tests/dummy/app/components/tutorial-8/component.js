import TutorialComponent from '../shared-tutorial/component';

// BEGIN-SNIPPET better-syntax-9
import { task } from 'ember-concurrency';

export default class Tutorial8 extends TutorialComponent {
  result = null;

  findStores = task(this, { drop: true }, async () => { // ++
    let geolocation = this.geolocation;
    let store = this.store;

    let coords = await geolocation.getCoords();
    let result = await store.getNearbyStores(coords);
    this.set('result', result);
  });
}
// END-SNIPPET
