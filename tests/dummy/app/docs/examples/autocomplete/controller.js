import { isBlank } from '@ember/utils';
import Controller from '@ember/controller';
import { restartableTask, task, timeout } from 'ember-concurrency';

// BEGIN-SNIPPET debounced-search-with-cancelation
const DEBOUNCE_MS = 250;
export default class AutocompleteController extends Controller {
  searchRepo = restartableTask(this, async (term) => {
    if (isBlank(term)) {
      return [];
    }

    // Pause here for DEBOUNCE_MS milliseconds. Because this
    // task is `restartable`, if the user starts typing again,
    // the current search will be canceled at this point and
    // start over from the beginning. This is the
    // ember-concurrency way of debouncing a task.
    await timeout(DEBOUNCE_MS);

    let url = `https://api.github.com/search/repositories?q=${term}`;

    // We yield an AJAX request and wait for it to complete. If the task
    // is restarted before this request completes, the XHR request
    // is aborted (open the inspector and see for yourself :)
    let json = await this.getJSON.perform(url);
    return json.items.slice(0, 10);
  });

  getJSON = task(this, async (url) => {
    let controller = new AbortController();
    let signal = controller.signal;

    try {
      let response = await fetch(url, { signal });
      let result = await response.json();
      return result;

      // NOTE: could also write this as
      // return yield fetch(url, { signal }).then((response) => response.json());
      //
      // either way, the important thing is to yield before returning
      // so that the `finally` block doesn't run until after the
      // promise resolves (or the task is canceled).
    } finally {
      controller.abort();
    }
  });
}
// END-SNIPPET
