import TutorialComponent from '../shared-tutorial/component';

// BEGIN-SNIPPET better-syntax-1
import { action } from '@ember/object';

export default class Tutorial0 extends TutorialComponent {
  result = null;

  @action
  async findStores() {
    let geolocation = this.geolocation;
    let store = this.store;

    let coords = await geolocation.getCoords()
    let result = await store.getNearbyStores(coords);

    this.set('result', result);
  }
}
// END-SNIPPET
