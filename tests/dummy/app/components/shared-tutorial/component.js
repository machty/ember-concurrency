import { A } from '@ember/array';
import Component from '@ember/component';
import { action } from '@ember/object';
import { timeout } from 'ember-concurrency';

const PREFIXES = [
  "Tomster",
  "Glimmer",
  "Transclusion",
  "Zoey",
  "Flux",
  "Reducer",
];

const SUFFIXES = [
  "Mart",
  " Central",
  "s ᴙ Us",
  "beds n stuff",
  "potle",
  " Donuts",
];

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

class Store {
  async getNearbyStores() {
    let num = 3; //Math.floor(Math.random() * 2) + 5;
    let stores = [];
    for (let i = 0; i < num; ++i) {
      let name = randomFrom(PREFIXES) + randomFrom(SUFFIXES);
      stores.push({
        lat: Math.random * 60,
        long: Math.random * 60,
        name,
        distance: Math.random().toFixed(2),
      });
    }

    await timeout(800)
    return { stores };
  }
}

class Geolocation {
  async getCoords() {
    await timeout(800);

    return {
      lat: Math.random * 60,
      long: Math.random * 60,
    };
  }
}

export default class SharedTutorialComponent extends Component {
  logs = A();
  formData = {
    user: "machty",
    amount: "9.99",
  };
  showTemplate = false;

  geolocation = new Geolocation();
  store = new Store();

  @action
  toggleTemplate() {
    this.toggleProperty('showTemplate');
  }
}
