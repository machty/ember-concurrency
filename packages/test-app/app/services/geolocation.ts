import Service from '@ember/service';
import { timeout } from 'ember-concurrency';

export default class Geolocation extends Service {
  async getCoords() {
    await timeout(800);

    return {
      lat: Math.random() * 60,
      long: Math.random() * 60,
    };
  }
}
