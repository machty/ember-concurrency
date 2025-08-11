import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { if } from '@ember/helper';
import { task } from 'ember-concurrency';
import { Store, Geolocation } from './shared-tutorial';

import LoadingSpinner from './loading-spinner';

// BEGIN-SNIPPET better-syntax-9

interface Tutorial8Signature {
  Args: {};
}

export default class Tutorial8 extends Component<Tutorial8Signature> {
  @tracked result = null;

  geolocation = new Geolocation();
  store = new Store();

  findStores = task({ drop: true }, async () => {
    // ++
    let geolocation = this.geolocation;
    let store = this.store;

    let coords = await geolocation.getCoords();
    let result = await store.getNearbyStores(coords);
    this.result = result;
  });

  <template>
    <div class="tutorial-example">
      {{! BEGIN-SNIPPET better-syntax-9 }}
      <button {{on "click" this.findStores.perform}} type="button">
        Find Nearby Stores
        {{#if this.findStores.isRunning}}
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
      {{! END-SNIPPET }}

      <span class="tutorial-example-label">Example</span>
    </div>
  </template>
}
// END-SNIPPET
