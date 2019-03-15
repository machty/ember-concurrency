import Component from '@ember/component';
import { task, timeout, didCancel } from 'ember-concurrency';

export default Component.extend({
  queryServer: task(function * () {
    yield timeout(10000);
    return 123;
  }),

  actions: {
    fetchResults() {
      this.get('queryServer').perform().then((results) => {
        this.set('results', results);
      }).catch((e) => {
        if (!didCancel(e)) {
          // re-throw the non-cancelation error
          throw e;
        }
      });
    }
  }
});

