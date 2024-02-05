import { tracked } from '@glimmer/tracking';
import TutorialComponent from '../shared-tutorial/component';

// BEGIN-SNIPPET better-syntax-4
import { action } from '@ember/object';

export default class Tutorial3 extends TutorialComponent {
  @tracked result = null;
  @tracked isFindingStores = false;

  @action
  async findStores() {
    if (this.isFindingStores) {
      return;
    }

    let geolocation = this.geolocation;
    let store = this.store;

    this.isFindingStores = true;

    let coords = await geolocation.getCoords();
    let result = await store.getNearbyStores(coords);

    if (this.isDestroyed) {
      return;
    } // ++

    this.result = result;
    this.isFindingStores = false;
  }
}
// END-SNIPPET
