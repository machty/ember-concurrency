<h3>Task Function Syntax</h3>

<p>
  When a task is performed, it runs the code in the task function
  you passed into <code>task()</code>. This function must
  be a <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*">generator function</a>
  &mdash; it must use the <code>function *</code> syntax, and cannot
  be just a regular JavaScript function.
</p>

<p>
  This example demonstrates how, in ember-concurrency, generator
  functions behave <em>just like regular functions</em>. Anything you can
  do in a regular function, you can do in a generator function.
</p>

{{task-function-syntax-2}}

{{code-snippet name="task-function-syntax-2.js"}}

<h4>Using the <code>yield</code> keyword</h4>

<p>
  Much of the power of Tasks is unleashed once you start making
  use of the <code>yield</code> keyword within generator functions.
  The <code>yield</code> keyword, when used with a promise, lets you
  pause execution of your task function until that promise resolves, at
  which point the task function will continue running from where it
  had paused.
</p>

<p>
  This example demonstrates how you can <code>yield timeout(1000)</code>
  to pause execution for 1000 ms (one second). The <code>timeout()</code>
  helper function, which <strong>ember-concurrency</strong> provides,
  simply returns a promise that resolves after the specified number of milliseconds.
</p>

{{task-function-syntax-1}}

{{code-snippet name="task-function-syntax-1.js"}}

<p>
  When you <code>yield</code> a promise, the <code>yield</code> expression
  evaluates to the resolved value of the promise. In other words, you can
  set a variable equal to a yielded promise, and when the promise resolves,
  the task function will resume and the value stored into that variable will
  be the resolved value of the promise.
</p>

{{task-function-syntax-3}}

{{code-snippet name="task-function-syntax-3.js"}}

<p>
  If you <code>yield</code> a promise that rejects, the task function will
  throw the rejected value (likely an exception object) from the point in
  task function where the rejecting promise was yielded. This means you can
  use <code>try {} catch(e) {} finally {}</code> blocks, just as you would
  for code that runs synchronously.
</p>

{{task-function-syntax-4}}

{{code-snippet name="task-function-syntax-4.js"}}

<p>
  The behavior of yielding promises within task generator functions
  is designed to closely follow the behavior of the proposed
  <a href="https://github.com/tc39/ecmascript-asyncawait">async/await</a>
  syntax, but instead of <code>async function</code>, you use
  <code>function *</code>, and instead of <code>await</code>, you
  use <code>yield</code>.
</p>

