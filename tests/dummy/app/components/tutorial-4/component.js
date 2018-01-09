import TutorialComponent from '../shared-tutorial/component';

// BEGIN-SNIPPET better-syntax-5
export default TutorialComponent.extend({
  result: null,
  isFindingStores: false,
  actions: {
    findStores() {
      if (this.isFindingStores) { return; }

      let geolocation = this.get('geolocation');
      let store = this.get('store');

      this.set('isFindingStores', true);
      geolocation.getCoords()
        .then(coords => store.getNearbyStores(coords))
        .then(result => {
          if (this.isDestroyed) { return; }
          this.set('result', result);
        })
        .finally(() => {                      // ++
          if (this.isDestroyed) { return; }   // ++
          this.set('isFindingStores', false); // ++
        });
    }
  },
});
// END-SNIPPET


