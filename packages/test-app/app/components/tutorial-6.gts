import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { task } from 'ember-concurrency';
import { Store, Geolocation } from './shared-tutorial';

// BEGIN-SNIPPET better-syntax-7

interface Tutorial6Signature {
  Args: {};
}

export default class Tutorial6 extends Component<Tutorial6Signature> {
  @tracked result = null;

  geolocation = new Geolocation();
  store = new Store();

  findStores = task(async () => {
    let geolocation = this.geolocation;
    let store = this.store;

    let coords = await geolocation.getCoords();
    let result = await store.getNearbyStores(coords);
    this.result = result;
  });

  <template>
    <div class="tutorial-example">
      {{! template-lint-disable block-indentation }}

      {{! BEGIN-SNIPPET better-syntax-7 }}
      <button {{on "click" this.findStores.perform}} type="button">
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
      {{! END-SNIPPET }}

      <span class="tutorial-example-label">Example</span>
    </div>
  </template>
}
// END-SNIPPET
