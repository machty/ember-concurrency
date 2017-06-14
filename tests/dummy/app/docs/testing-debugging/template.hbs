<h3>Testing</h3>

<p>
  Ember doesn't yet have strong conventions for testing
  long-term timers and polling loops, and since many of the use cases
  that ember-concurrency addresses involves heavy use of <code>timeout()</code>,
  and often times within a (possibly infinite) loop, it can be difficult
  to figure out how to test code that makes heavy use of such things
  within ember-concurrency tasks.
</p>

<p>
  <em>
    NOTE: this is an area of active development within the Ember community,
    particularly amongst ember-concurrency users; in due time we will probably
    have more official API (possibly in the form of another addon) to help
    make testing time more manageable, but in the meantime, this page documents
    some common approaches to testing time with present-day tooling.
  </em>
</p>

<h4>The Problem</h4>

<p>
  Consider the following (common) pattern for polling a server for changes:
</p>

{{code-snippet name="poll-loop.js"}}

<p>
  The above example uses ember-concurrency tasks; to demonstrate that these
  issues aren't limited to ember-concurrency tasks, here is how the same
  logic might be written without ember-concurrency:
</p>

{{code-snippet name="poll-loop-classic.js"}}

<p>
  Both of these cases involve a "poll loop": on every iteration, do something asynchronous,
  then pause for some period of time, then repeat.
</p>

<p>
  If, within an acceptance test, you <code>visit()</code>ed the page that
  causes this loop to start, your acceptance test case would "hang" and eventually
  fail with a QUnit test timeout. The reason this happens is that the Ember testing
  tools are aware of all timers created via <code>Ember.run.later</code> (and
  ember-concurrency's <code>timeout()</code> helper internally uses <code>Ember.run.later</code>),
  and will wait for all timers to "settle" before allowing the test to proceed.
  But if you have a timer within a loop, the timers will never settle, and hence
  your test will hang.
</p>

<p>
  The solution, one way or another, is to "break" the timer loop when in a testing environment.
  Here are all the ways to do that, each with their own problems / tradeoffs:
</p>

<h5>Insert <code>Ember.testing</code> checks in your code</h5>

{{code-snippet name="poll-loop-break-1.js"}}

<p>
  This is sufficient when it's satisfactory to just test a single
  iteration of a loop, but a) it won't test that the task continues
  to loop, and b) it's unfortunate to have to riddle your actual
  code with testing logic.
</p>

<h5>Use <code>Ember.run.cancelTimers</code> in your test case</h5>

<p>
  This is the approach used by the ember-concurrency
  <a href="https://github.com/machty/ember-concurrency/blob/72f70b6c327f5242ca623d61ea0595b5f9093896/tests/helpers/start-app.js#L17-L19">documentation site tests</a>;
  since any of the pages on this docs site might demonstrate a live
  ember-concurrency task with a timer loop, all of the acceptance tests
  automatically cancel all outstanding timers after 500ms to effectively
  stop all tasks wherever they're paused.
</p>

<h4>No loops, but long timers</h4>

<p>
  If you're testing code that just uses long timers, but not necessarily loops,
  you might still run into the problem of test cases that take too long to complete,
  or might hit the QUnit timeout. A common solution to this problem is to use much
  smaller millisecond timer values in a testing environment. You can either do this
  by checking <code>Ember.testing</code> wherever you set a timer, or, more elegantly, you can
  define common timer values in a config file, import the timer values
  wherever you need to set a timer, and in test environments, the config
  file specifies much smaller values so that the timers elapse more quickly.
</p>

<h4>The Future</h4>

<p>
  The above solutions leave much to be desired. Hopefully a definitive solution
  that produces clear, deterministic, consistent results will emerge from the
  community. There are some <a href="https://gist.github.com/machty/574457b1f2d993cc5959a1d6d6c74e5b">ideas</a>
  floating around, and if you're interested in contributing to the discussion
  please join the <code>#e-concurrency</code> channel on the Ember Community Slack.
</p>

<p>
  Also, if you're finding success with a testing approach that wasn't mentioned here,
  please open a GitHub issue with your ideas or open a Pull Request to add
  additional docs to <a href="https://github.com/machty/ember-concurrency/blob/master/tests/dummy/app/docs/testing-debugging/template.hbs">this page</a>.
</p>


<h3>Debugging</h3>

<p>
  <a href="http://vanderwijk.info/blog/how-disable-es6-transpilation-emberjs-in-order-have-better-debugging-experience/">This article</a>
  provides some nice ideas as to how to improve the debugging experience within ember-concurrency:
  in particular, by blacklisting "regenerator" in your app's Babel configuration,
  you can avoid Ember transpiling your task generator functions into a somewhat
  unrecognizable format. Just keep in mind that you should probably only enable
  this configuration in a development environment, and that whatever browser
  you're testing on needs to have a spec-compliant implementation of generator
  functions (Chrome's implementation only became spec-compliant around June, 2016).
</p>

<h4>Unexpected Cancelation</h4>

<p>
  Sometimes it's not obvious why a Task was canceled; in these cases you
  can use the <code>.debug()</code> Task Modifier on a specific task e.g.
  <code>nameOfTask: task(...).debug()</code>,
  which will provide some logging about the task's lifecycle, e.g.
  <code>TaskInstance 'nameOfTask' was canceled because the object it lives on was destroyed or unrendered </code>.
</p>

<p>
  To enable lifecycle logging on ALL ember-concurrency tasks, you can enable the <code>DEBUG_TASKS</code>
  flag on <code>EmberENV</code> in your project's <code>config/environment.js</code> file.
</p>


