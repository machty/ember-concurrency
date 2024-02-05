import { tracked } from '@glimmer/tracking';
import TutorialComponent from '../shared-tutorial/component';

// BEGIN-SNIPPET better-syntax-10
import { task } from 'ember-concurrency';

export default class Tutorial9 extends TutorialComponent {
  @tracked result = null;

  findStores = task({ drop: true }, async () => {
    let geolocation = this.geolocation;
    let store = this.store;

    let coords = await geolocation.getCoords();
    let result = await store.getNearbyStores(coords);
    this.result = result;
  });
}
// END-SNIPPET
