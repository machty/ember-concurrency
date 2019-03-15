import Component from '@ember/component';
export default Component.extend({
  queryServer: task(function * () {
    yield timeout(10000);
    return 123;
  }),

  actions: {
    fetchResults() {
      this.get('queryServer').perform().then((results) => {
        this.set('results', results);
      });
    }
  }
});

