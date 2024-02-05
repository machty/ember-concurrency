import TutorialComponent from '../shared-tutorial/component';

// BEGIN-SNIPPET better-syntax-4
import { action } from '@ember/object';

export default class Tutorial3 extends TutorialComponent {
  result = null;
  isFindingStores = false;

  @action
  async findStores() {
    if (this.isFindingStores) {
      return;
    }

    let geolocation = this.geolocation;
    let store = this.store;

    this.set('isFindingStores', true);

    let coords = await geolocation.getCoords();
    let result = await store.getNearbyStores(coords);

    if (this.isDestroyed) {
      return;
    } // ++

    this.set('result', result);
    this.set('isFindingStores', false);
  }
}
// END-SNIPPET
