<h3>Using <code>.maxConcurrency(N)</code></h3>

<p>
  The examples on the previous page limit the concurrency of a task to 1 &mdash; only
  one instance of a task can run at a time. Most of the time, this
  is exactly what you want.
</p>

<p>
  There are some cases, however, when you might want to limit
  the number of concurrently running task instances to a number greater
  than 1.  In such cases, you can use the task modifier
  <code>.maxConcurrency(n)</code> to opt into a specific maximum
  concurrency other than 1.
</p>

<p>
  The examples below use the same task modifiers as the ones on the previous
  page, but with <code>.maxConcurrency(3)</code> applied to them: they each
  allow 3 running instances before enqueuing, canceling, or dropping
  <code>perform()</code>s.
</p>

{{code-snippet name="shared-tasks-concurrent.js"}}

<h4>restartable with .maxConcurrency(3)</h4>

<p>
  When concurrency exceeds maxConcurrency, the oldest running task is canceled.
</p>

{{concurrency-graph task=restartableTask3}}

<p>
  <em>
    TODO: while restartable is an excellent name when maxConcurrency
    is 1, it poorly describes the behavior for values greater than 1.
    A better name in this case might be .sliding(), as in sliding buffer.
  </em>
</p>


<h4>enqueue with .maxConcurrency(3)</h4>

{{concurrency-graph task=enqueuedTask3}}

<h4>drop with .maxConcurrency(3)</h4>

{{concurrency-graph task=droppingTask3}}

<h4>.keepLatest() with .maxConcurrency(3)</h4>

{{concurrency-graph task=keepLatestTask3}}

<p>
  <em>
    Thanks to <a href="https://github.com/ef4">Edward Faulkner</a> for providing
    a starting point for the graphs :)
  </em>
</p>
