import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Geolocation, Store } from './shared-tutorial';

import LoadingSpinner from './loading-spinner';

// BEGIN-SNIPPET better-syntax-3

export default class Tutorial2 extends Component {
  @tracked result = null;
  @tracked isFindingStores = false;

  geolocation = new Geolocation();
  store = new Store();

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

  <template>
    <div class='tutorial-example'>
      <button {{on 'click' this.findStores}} type='button'>
        Find Nearby Stores
        {{#if this.isFindingStores}}
          <LoadingSpinner />
        {{/if}}
      </button>

      {{#if this.result}}
        {{#each this.result.stores as |s|}}
          <li>
            <strong>{{s.name}}</strong>:
            {{s.distance}}
            miles away
          </li>
        {{/each}}
      {{/if}}

      <span class='tutorial-example-label'>Example</span>
    </div>
  </template>
}
// END-SNIPPET
