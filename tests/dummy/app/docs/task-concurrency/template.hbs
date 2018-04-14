<h3>Managing Task Concurrency</h3>

<p>
  By default, <strong>ember-concurrency</strong> tasks run concurrently
  &mdash; if you call <code>myTask.perform(); myTask.perform();</code>,
  two instances of the task will run at the same time (unless the object
  they live on is destroyed, in which case they'll be canceled).
</p>

<p>
  Often, you want to guarantee that no more than one instance of a task
  runs at the same time; for instance, if you have a task that saves
  model state to the server, you probably don't want that task to run
  concurrently &mdash; you want it to run sequentially, or you might
  want to ignore attempts to perform the task if it's already running.
  Manually enforcing these constraints is tricky and often results
  in redundant, error-prone boilerplate, but ember-concurrency
  makes it easy to rein in this undesired concurrency with the
  modifiers described below.
</p>

<h3>Examples</h3>

<p>
  All of the examples below run the same task function (which
  just pauses for a moment and then completes), but with
  different task modifiers applied:
</p>

{{code-snippet name="shared-tasks.js"}}

<h5>Default Behavior: Tasks Run Concurrently</h5>

<p>
  Tap the <code>task.perform()</code> button a few times. Note how
  the lifetimes of each task overlap, and each task runs to completion.
</p>

{{concurrency-graph task=defaultTask}}


<h4>restartable</h4>

<p>
  The <code>restartable</code> modifier ensures that only one instance
  of a task is running by canceling any currently-running tasks and starting
  a new task instance immediately. Note how there is no task overlap,
  and how currently running tasks get canceled
  if a new task starts before a prior one completes.
</p>

<p>
  <em>
    Check out {{link-to 'Debounced Auto-Search' 'docs.examples.autocomplete'}} for
    a practical example of restartable
  </em>
</p>


{{concurrency-graph task=restartableTask}}

<h4>enqueue</h4>

<p>
  The <code>enqueue</code> modifier ensures that only one instance
  of a task is running by maintaining a queue of pending tasks and
  running them sequentially. Note how there is no task overlap, but no
  tasks are canceled either.
</p>

{{concurrency-graph task=enqueuedTask}}


<h4>drop</h4>

<p>
  The <code>drop</code> modifier drops tasks that are <code>.perform</code>ed
  while another is already running. Dropped tasks' functions are never even called.
</p>

<p>
  <em>
    Check out the {{link-to 'Loading UI' 'docs.examples.loading-ui'}} example for a common
    use case for <code>drop</code>
  </em>
</p>

{{concurrency-graph task=droppingTask}}


<h4>.keepLatest()</h4>

<p>
  The <code>.keepLatest()</code> will drop all but the most recent intermediate <code>.perform()</code>,
  which is enqueued to run later.
</p>

<p>
  <em>
    Use case: you poll the server in a loop, but during the server request,
    you get some other indication (say, via websockets) that the data is stale
    and you need to query the server again when the initial request completed.
  </em>
</p>

{{concurrency-graph task=keepLatestTask}}

