import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import type Geolocation from '../services/geolocation';
import type Store from '../services/store';
import type { FindStoresResult } from '../services/store';

import LoadingSpinner from './loading-spinner.gts';

// BEGIN-SNIPPET better-syntax-4
export default class Tutorial3 extends Component {
  @service declare geolocation: Geolocation;
  @service declare store: Store;

  @tracked result: FindStoresResult | null = null;
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
