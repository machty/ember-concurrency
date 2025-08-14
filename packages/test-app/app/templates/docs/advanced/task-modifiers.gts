import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import { task, timeout } from 'ember-concurrency';
import CodeSnippet from '../../../components/code-snippet';

// registerModifer is called in the module defining the modifier,
// so we're really just importing it here for the side-effect. This is mostly for
// terseness in this illustration. You may want to separate defining the modifier
// and registering it with registerModifier, and be explicit about where you
// register (e.g. addon, library, or app initialization)
import 'test-app/task-modifiers/benchmark';

let performance =
  typeof window !== 'undefined' && window.performance
    ? window.performance
    : { getEntriesByName() {} };

export default class TaskModifiersRouteComponent extends Component {
  // BEGIN-SNIPPET task-modifier-benchmark-on-task
  doWork = task({ drop: true, benchmark: true }, async () => {
    await timeout(20000 * Math.random());
  });

  get perfEntries() {
    if (this.doWork.isRunning) {
      return [];
    } else {
      return performance.getEntriesByName(
        'ember-concurrency.doWork.runtime',
        'measure',
      );
    }
  }
  // END-SNIPPET

  <template>
    <h2>Task Modifiers</h2>

    <p>
      Starting with ember-concurrency v2.2.0, public Task Modifier APIs have
      been added to allow for custom task modifiers to be registered from
      third-party addons and application code to provide behavior for specific
      situations not suited to inclusion within ember-concurrency's core itself.
    </p>

    <p>
      Task modifiers have been a concept built-in to `ember-concurrency` since
      the beginning. However, until `0.7.19` they were only specifyable within
      `ember-concurrency` internals, and not extendable by users. `0.7.19` added
      the ability to specify new modifiers as prototype extensions on
      `TaskProperty`. Unfortunately, `TaskProperty` is inherently tied to Ember
      internals and is not used when using decorators, and using prototype
      extensions does not make clear what modifiers exist, so the `getModifier`,
      `hasModifier`, and `registerModifier` APIs were introduced to provide a
      way to manage modifiers and make them discoverable.
    </p>

    <h3>Defining a custom task modifier</h3>

    <p>
      Let's say we want to build a benchmarking modifier to help us get a sense
      for how long our tasks are running.
    </p>

    <CodeSnippet @name='task-modifier-benchmark.js' />

    <p>
      Now that we have a new modifier defined, we can apply it to any tasks that
      we wish and have it apply the behavior we built. Let's see it in action!
    </p>

    {{! BEGIN-SNIPPET task-modifier-benchmark-on-task }}
    <button {{on 'click' this.doWork.perform}} type='button'>
      Benchmark task
    </button>

    {{#if this.doWork.isRunning}}
      Running benchmark...
    {{/if}}

    <ol>
      {{#each this.perfEntries as |entry|}}
        <li>Start time:
          {{entry.startTime}}ms after page-load; duration =
          {{entry.duration}}ms</li>
      {{/each}}
    </ol>
    {{! END-SNIPPET }}

    <CodeSnippet @name='task-modifier-benchmark-on-task.gts' />
  </template>
}
