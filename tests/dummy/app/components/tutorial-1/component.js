import TutorialComponent from '../shared-tutorial/component';

// BEGIN-SNIPPET better-syntax-2
import { action } from '@ember/object';

export default class Tutorial1 extends TutorialComponent {
  result = null;
  isFindingStores = false; // ++

  @action
  async findStores() {
    let geolocation = this.geolocation;
    let store = this.store;

    this.set('isFindingStores', true); // ++

    let coords = await geolocation.getCoords()
    let result = await store.getNearbyStores(coords);

    this.set('result', result);
    this.set('isFindingStores', false); // ++
  }
}
// END-SNIPPET
