import TutorialComponent from '../shared-tutorial/component';

// BEGIN-SNIPPET better-syntax-3
import { action } from '@ember/object';

export default class Tutorial2 extends TutorialComponent {
  result = null;
  isFindingStores = false;

  @action
  async findStores() {
    if (this.isFindingStores) { return; } // ++

    let geolocation = this.geolocation;
    let store = this.store;

    this.set('isFindingStores', true);

    let coords = await geolocation.getCoords()
    let result = await store.getNearbyStores(coords);

    this.set('result', result);
    this.set('isFindingStores', false);
  }
}
// END-SNIPPET
