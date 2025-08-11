import { on } from '@ember/modifier';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';
import type Geolocation from '../services/geolocation';
import type Store from '../services/store';
import type { FindStoresResult } from '../services/store';

// BEGIN-SNIPPET better-syntax-7
export default class Tutorial6 extends Component {
  @service declare geolocation: Geolocation;
  @service declare store: Store;

  @tracked result: FindStoresResult | null = null;

  findStores = task(async () => {
    let geolocation = this.geolocation;
    let store = this.store;

    let coords = await geolocation.getCoords();
    let result = await store.getNearbyStores(coords);
    this.result = result;
  });

  <template>
    <div class='tutorial-example'>
      {{! template-lint-disable block-indentation }}

      <button {{on 'click' this.findStores.perform}} type='button'>
        {{! ++ }}
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
