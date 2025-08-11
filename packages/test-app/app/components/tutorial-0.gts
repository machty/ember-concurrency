import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Geolocation, Store } from './shared-tutorial';

// BEGIN-SNIPPET better-syntax-1

interface Tutorial0Signature {
  Args: {};
}

export default class Tutorial0 extends Component<Tutorial0Signature> {
  @tracked result = null;

  geolocation = new Geolocation();
  store = new Store();

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
      {{! BEGIN-SNIPPET better-syntax-1 }}
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
      {{! END-SNIPPET }}

      <span class='tutorial-example-label'>Example</span>
    </div>
  </template>
}
// END-SNIPPET
