import TutorialComponent from '../shared-tutorial/component';
import { tracked } from '@glimmer/tracking';

// BEGIN-SNIPPET better-syntax-1
import { action } from '@ember/object';

export default class Tutorial0 extends TutorialComponent {
  @tracked result = null;

  @action
  async findStores() {
    let geolocation = this.geolocation;
    let store = this.store;

    let coords = await geolocation.getCoords();
    let result = await store.getNearbyStores(coords);

    this.result = result;
  }
}
// END-SNIPPET
