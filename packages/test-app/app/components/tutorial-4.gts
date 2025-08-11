import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { on } from '@ember/modifier';
import { if } from '@ember/helper';
import { Store, Geolocation } from './shared-tutorial';

import LoadingSpinner from './loading-spinner';

// BEGIN-SNIPPET better-syntax-5

interface Tutorial4Signature {
  Args: {};
}

export default class Tutorial4 extends Component<Tutorial4Signature> {
  @tracked result = null;
  @tracked isFindingStores = false;

  geolocation = new Geolocation();
  store = new Store();

  @action
  async findStores() {
    if (this.isFindingStores) {
      return;
    }

    let geolocation = this.geolocation;
    let store = this.store;

    this.isFindingStores = true;

    try {
      // ++
      let coords = await geolocation.getCoords();
      let result = await store.getNearbyStores(coords);

      if (this.isDestroyed) {
        return;
      }

      this.result = result;
    } finally {
      // ++
      if (!this.isDestroyed) {
        // ++
        this.isFindingStores = false; // ++
      } // ++
    } // ++
  }

  <template>
    <div class="tutorial-example">
      {{! BEGIN-SNIPPET better-syntax-5 }}
      <button {{on "click" this.findStores}} type="button">
        Find Nearby Stores
        {{#if this.isFindingStores}}
          <LoadingSpinner />
        {{/if}}
      </button>

      {{#if this.result}}
        {{#each this.result.stores as |s|}}
          <li>
            <strong>{{s.name}}</strong>:
            {{s.distance}} miles away
          </li>
        {{/each}}
      {{/if}}
      {{! END-SNIPPET }}

      <span class="tutorial-example-label">Example</span>
    </div>
  </template>
}
// END-SNIPPET
