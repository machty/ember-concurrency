import Component from '@glimmer/component';
import { task, timeout } from 'ember-concurrency';
import CodeSnippet from '../../components/code-snippet';
import ConcurrencyGraph from '../../components/concurrency-graph';

export default class TaskConcurrencyAdvancedRouteComponent extends Component {
  restartableTask3 = task({ maxConcurrency: 3, restartable: true }, async (t) =>
    this.sharedTask.perform(t),
  );

  enqueuedTask3 = task({ maxConcurrency: 3, enqueue: true }, async (t) =>
    this.sharedTask.perform(t),
  );

  droppingTask3 = task({ maxConcurrency: 3, drop: true }, async (t) =>
    this.sharedTask.perform(t),
  );

  keepLatestTask3 = task({ maxConcurrency: 3, keepLatest: true }, async (t) =>
    this.sharedTask.perform(t),
  );

  sharedTask = task(async (tracker) => {
    tracker.start();
    try {
      // simulate async work
      await timeout(1500);
    } finally {
      tracker.end();
    }
  });

  <template>
    <h3>Using <code>maxConcurrency: N</code></h3>

    <p>
      The examples on the previous page limit the concurrency of a task to 1
      &mdash; only one instance of a task can run at a time. Most of the time,
      this is exactly what you want.
    </p>

    <p>
      There are some cases, however, when you might want to limit the number of
      concurrently running task instances to a number greater than 1. In such
      cases, you can use the task modifier
      <code>maxConcurrency: n</code>
      to opt into a specific maximum concurrency other than 1.
    </p>

    <p>
      The examples below use the same task modifiers as the ones on the previous
      page, but with
      <code>maxConcurrency: 3</code>
      applied to them: they each allow 3 running instances before enqueuing,
      canceling, or dropping
      <code>perform()</code>s.
    </p>

    <CodeSnippet @name='shared-tasks-concurrent.gts' />

    <h4>restartable with <code>maxConcurrency: 3</code></h4>

    <p>
      When concurrency exceeds maxConcurrency, the oldest running task is
      canceled.
    </p>

    <ConcurrencyGraph @task={{this.restartableTask3}} />

    <p>
      <em>
        TODO: while restartable is an excellent name when maxConcurrency is 1,
        it poorly describes the behavior for values greater than 1. A better
        name in this case might be "sliding", as in sliding buffer.
      </em>
    </p>

    <h4>enqueue with <code>maxConcurrency: 3</code></h4>

    <ConcurrencyGraph @task={{this.enqueuedTask3}} />

    <h4>drop with <code>maxConcurrency: 3</code></h4>

    <ConcurrencyGraph @task={{this.droppingTask3}} />

    <h4>keepLatest with <code>maxConcurrency: 3</code></h4>

    <ConcurrencyGraph @task={{this.keepLatestTask3}} />
  </template>
}

/*
// BEGIN-SNIPPET shared-tasks-concurrent
  restartableTask3 = task({ maxConcurrency: 3, restartable: true }, async (t) => { ... }
  enqueuedTask3 = task({ maxConcurrency: 3, enqueue: true }, async (t) => { ... }
  droppingTask3 = task({ maxConcurrency: 3, drop: true }, async (t) => { ... }
  keepLatestTask3 = task({ maxConcurrency: 3, keepLatest: true }, async (t) => { ... }
// END-SNIPPET
*/
