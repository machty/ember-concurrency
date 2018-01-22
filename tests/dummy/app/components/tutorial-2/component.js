import TutorialComponent from '../shared-tutorial/component';

// BEGIN-SNIPPET better-syntax-3
export default TutorialComponent.extend({
  result: null,
  isFindingStores: false,
  actions: {
    findStores() {
      if (this.isFindingStores) { return; } // ++

      let geolocation = this.get('geolocation');
      let store = this.get('store');

      this.set('isFindingStores', true);
      geolocation.getCoords()
        .then(coords => store.getNearbyStores(coords))
        .then(result => {
          this.set('result', result);
          this.set('isFindingStores', false);
        });
    }
  },
});
// END-SNIPPET


