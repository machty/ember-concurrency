import Service from '@ember/service';
import { timeout } from 'ember-concurrency';

export type FindStoresResult = {
  stores: StoreData[];
};

export type StoreData = {
  lat: number;
  long: number;
  name: string;
  distance: string;
};

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

function randomFrom(array: string[]): string {
  return array[Math.floor(Math.random() * array.length)]!;
}

export default class Store extends Service {
  async getNearbyStores(_coords: any): Promise<FindStoresResult> {
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
