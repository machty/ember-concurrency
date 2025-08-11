import { A } from '@ember/array';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { timeout } from 'ember-concurrency';

const PREFIXES = [
  'Tomster',
  'Glimmer',
  'Transclusion',
  'Zoey',
  'Flux',
  'Reducer',
];

const SUFFIXES = [
  'Mart',
  ' Central',
  's ᴙ Us',
  'beds n stuff',
  'potle',
  ' Donuts',
];

function randomFrom(array: string[]) {
  return array[Math.floor(Math.random() * array.length)];
}

class Store {
  async getNearbyStores() {
    let num = 3; //Math.floor(Math.random() * 2) + 5;
    let stores = [];
    for (let i = 0; i < num; ++i) {
      let name = randomFrom(PREFIXES) + randomFrom(SUFFIXES);
      stores.push({
        lat: Math.random() * 60,
        long: Math.random() * 60,
        name,
        distance: Math.random().toFixed(2),
      });
    }

    await timeout(800);
    return { stores };
  }
}

class Geolocation {
  async getCoords() {
    await timeout(800);

    return {
      lat: Math.random() * 60,
      long: Math.random() * 60,
    };
  }
}

// Export the shared services and utility classes for use by tutorial components
export { Geolocation, Store };

interface SharedTutorialSignature {
  Args: {};
  Blocks: {
    default: [];
  };
}

export default class SharedTutorialComponent extends Component<SharedTutorialSignature> {
  logs = A();
  formData = {
    user: 'machty',
    amount: '9.99',
  };
  @tracked showTemplate = false;

  geolocation = new Geolocation();
  store = new Store();

  @action
  toggleTemplate() {
    this.showTemplate = !this.showTemplate;
  }

  <template>
    <div class='tutorial-example'>
      {{yield}}
      <span class='tutorial-example-label'>Example</span>
    </div>
  </template>
}
