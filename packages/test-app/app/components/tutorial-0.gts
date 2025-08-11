import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import type Geolocation from '../services/geolocation';
import {
  type FindStoresResult,
  type default as Store,
} from '../services/store';

// BEGIN-SNIPPET better-syntax-1
export default class Tutorial0 extends Component {
  @tracked result: FindStoresResult | null = null;

  @service declare geolocation: Geolocation;
  @service declare store: Store;

  @action
  async findStores() {
    let geolocation = this.geolocation;
    let store = this.store;

    let coords = await geolocation.getCoords();
    let result = await store.getNearbyStores(coords);

    this.result = result;
  }

  <template>
    <div class='tutorial-example'>
      <button {{on 'click' this.findStores}} type='button'>
        Find Nearby Stores
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
