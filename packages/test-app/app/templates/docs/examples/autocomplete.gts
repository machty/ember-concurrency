import { on } from '@ember/modifier';
import { LinkTo } from '@ember/routing';
import { isBlank } from '@ember/utils';
import Component from '@glimmer/component';
import { task, timeout } from 'ember-concurrency';
import CodeSnippet from '../../../components/code-snippet';
import LoadingSpinner from '../../../components/loading-spinner';

const DEBOUNCE_MS = 250;

export default class AutocompleteRouteComponent extends Component {
  // BEGIN-SNIPPET debounced-search-with-cancelation
  searchRepo = task({ restartable: true }, async (event) => {
    const term = event.target.value;

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

    // We await an AJAX request and wait for it to complete. If the task
    // is restarted before this request completes, the XHR request
    // is aborted (open the inspector and see for yourself :)
    let json = await this.getJSON.perform(url);
    return json.items.slice(0, 10);
  });

  getJSON = task(async (url) => {
    let controller = new AbortController();
    let signal = controller.signal;

    try {
      let response = await fetch(url, { signal });
      let result = await response.json();
      return result;

      // NOTE: could also write this as
      // return await fetch(url, { signal }).then((response) => response.json());
      //
      // either way, the important thing is to await before returning
      // so that the `finally` block doesn't run until after the
      // promise resolves (or the task is canceled).
    } finally {
      controller.abort();
    }
  });
  // END-SNIPPET

  <template>
    <h3>Debounced Type-Ahead Search</h3>

    <p>
      This advanced example combines multiple ember-concurrency concepts to
      build a basic type-ahead search field with the following features:
    </p>

    <ul>
      <li>
        Debouncing: the browser won't make network requests until the user has
        stopped typing for more than 250ms. This is accomplished by combining
        the
        <code><LinkTo @route='docs.task-concurrency'>restartable</LinkTo></code>
        task modifier with a
        <code>await timeout(250)</code>
        at the beginning of the task.
      </li>
      <li>
        Fetch cancelation: if the user starts typing while a prior fetch request
        is underway, that fetch request will be canceled to save network
        resources (this is accomplished via the
        <LinkTo @route='docs.error-vs-cancelation'>try / finally cancelation
          pattern</LinkTo>).
      </li>
      <li>
        Use
        <LinkTo @route='docs.derived-state'>Derived State</LinkTo>
        to display both a loading spinner and the final search results without
        using a single
        <code>.set()</code>.
      </li>
    </ul>

    <h5>Live Example</h5>

    <p>
      Please mind the GitHub API quota :)
    </p>

    <p>
      {{! BEGIN-SNIPPET debounced-search-with-cancelation-template }}
      <label>
        Search GitHub...

        <input
          type='text'
          {{on 'input' this.searchRepo.perform}}
          placeholder='e.g. machty/ember-concurrency'
        />
      </label>

      {{#if this.searchRepo.isRunning}}
        <LoadingSpinner />
      {{/if}}

      <ul>
        {{#each this.searchRepo.lastSuccessful.value as |repo|}}
          <li>{{repo.full_name}}</li>
        {{/each}}
      </ul>
      {{! END-SNIPPET }}
    </p>

    <h5>JavaScript</h5>

    <CodeSnippet @name='debounced-search-with-cancelation.gts' />

    <h5>Template</h5>

    <CodeSnippet @name='debounced-search-with-cancelation-template.gts' />
  </template>
}
