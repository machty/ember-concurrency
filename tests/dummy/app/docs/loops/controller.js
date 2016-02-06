import Ember from 'ember';
import { task, timeout, createObservable, restartable } from 'ember-concurrency';

function cancellableGetJSON(url) {
  return createObservable(publish => {
    let xhr = Ember.$.getJSON(url);
    xhr.then(publish, publish.error);

    return () => {
      xhr.abort();
    };
  });
}

// BEGIN-SNIPPET debounced-search-with-cancellation
const DEBOUNCE_MS = 250;
export default Ember.Controller.extend({
  searchRepo: task(function * (term) {
    restartable();

    if (Ember.isBlank(term)) { return []; }
    yield timeout(DEBOUNCE_MS);
    let url = `//api.github.com/search/repositories?q=${term}`;
    let json = yield cancellableGetJSON(url);
    return json.items;
  }),
});
// END-SNIPPET

