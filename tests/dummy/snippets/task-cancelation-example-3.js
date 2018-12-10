import Component from '@ember/component';
export default Component.extend({
  queryServer: task(function * () {
    yield timeout(10000);
    return 123;
  }),

  fetchResults: task(function * () {
    let results = yield this.get('doStuff').perform();
    this.set('results', results);
  }),
});

