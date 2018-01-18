import { A } from '@ember/array';
import Component from '@ember/component';
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

let store = {
  getNearbyStores() {
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

    return timeout(800).then(() => ({ stores }));
  }
};

let geolocation = {
  getCoords() {
    return timeout(800).then(() => ({
      lat: Math.random * 60,
      long: Math.random * 60,
    }));
  }
};

export default Component.extend({
  init() {
    this._super();
    this.set('logs', A());
    this.set('formData', {
      user: "machty",
      amount: "9.99",
    });
  },
  logs: null,
  formData: null,

  showTemplate: false,

  geolocation,
  store,

  actions: {
    toggleTemplate() {
      this.toggleProperty('showTemplate');
    }
  }
});

