import TutorialComponent from '../shared-tutorial/component';

// BEGIN-SNIPPET better-syntax-1
export default TutorialComponent.extend({
  result: null,
  actions: {
    findStores() {
      let geolocation = this.get('geolocation');
      let store = this.get('store');

      geolocation.getCoords()
        .then(coords => store.getNearbyStores(coords))
        .then(result => {
          this.set('result', result);
        });
    }
  },
});
// END-SNIPPET


