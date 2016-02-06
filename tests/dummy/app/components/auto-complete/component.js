import Ember from 'ember';
import { task, sleep } from 'ember-concurrency';

const DEBOUNCE_MS = 200;

function * cancellable(jqXHR) {
  try {
    let results = yield jqXHR.promise();
    return results;
  } finally {
    jqXHR.abort();
  }
}

export default Ember.Component.extend({
  results: null,

  updateSearch: task(function * (event) {
    let query = event.target.value;
    if (Ember.isBlank(query)) { return; }
    yield sleep(DEBOUNCE_MS);
    let results = yield cancellable(Ember.$.getJSON(`http://localhost:9292/search?q=${query}`));
    this.set('results', results);
  }),
});

