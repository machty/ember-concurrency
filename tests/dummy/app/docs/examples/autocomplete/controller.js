import Ember from 'ember';
import { task, timeout, createObservable } from 'ember-concurrency';

// Wrap the $.getJSON API so that it's cancellable.
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
    if (Ember.isBlank(term)) { return []; }

    // Pause here for DEBOUNCE_MS milliseconds. Because this
    // task is `.restartable()`, if the user starts typing again,
    // the current search will be cancelled at this point and
    // start over from the beginning. This is the
    // ember-concurrency way of debouncing a task.
    yield timeout(DEBOUNCE_MS);

    let url = `https://api.github.com/search/repositories?q=${term}`;

    // We yield an AJAX request and wait for it to complete. If the task
    // is restarted before this request completes, the XHR request
    // is aborted (open the inspector and see for yourself :)
    let json = yield cancellableGetJSON(url);
    return json.items;
  }).restartable(),
});
// END-SNIPPET

