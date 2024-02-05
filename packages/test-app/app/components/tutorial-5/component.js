import { tracked } from '@glimmer/tracking';
import TutorialComponent from '../shared-tutorial/component';

// BEGIN-SNIPPET better-syntax-6
import { action } from '@ember/object';

export default class Tutorial5 extends TutorialComponent {
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

    try {
      let coords = await geolocation.getCoords();
      let result = await store.getNearbyStores(coords);

      if (this.isDestroyed) {
        return;
      }

      this.result = result;
    } finally {
      if (!this.isDestroyed) {
        this.isFindingStores = false;
      }
    }
  }
}
// END-SNIPPET
