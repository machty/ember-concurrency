import { tracked } from '@glimmer/tracking';
import TutorialComponent from '../shared-tutorial/component';

// BEGIN-SNIPPET better-syntax-3
import { action } from '@ember/object';

export default class Tutorial2 extends TutorialComponent {
  @tracked result = null;
  @tracked isFindingStores = false;

  @action
  async findStores() {
    if (this.isFindingStores) {
      return;
    } // ++

    let geolocation = this.geolocation;
    let store = this.store;

    this.isFindingStores = true;

    let coords = await geolocation.getCoords();
    let result = await store.getNearbyStores(coords);

    this.result = result;
    this.isFindingStores = false;
  }
}
// END-SNIPPET
