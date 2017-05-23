<h3>Why am I seeing TaskCancelation errors in my logs?</h3>

<p>
If you're seeing <code style="color:red;">TaskCancelation</code> errors show
up in your error logs,
it means that somewhere in your code, a Task that you <code>.perform()</code>ed
is being cast to a Promise (either by calling
<a href="/api/TaskInstance.html#then"><code>.then()</code></a> on
the task instance, or <code>await</code>ing the task instance in an
async function),
and since Promises have no built-in support for
cancelation, the task cancelation is being treated as a
promise rejection, which needs to be explicitly caught and handled
(otherwise it'll show up in your logs as an unhandled Promise rejection).
</p>

<p>
Here is an example that demonstrates the issue:
</p>

{{code-snippet name="task-cancelation-example-1.js"}}

<p>
In this example, the <code>fetchResults</code> action performs
the <code>queryServer</code> task and then immediately calls
<a href="/api/TaskInstance.html#then"><code>.then()</code></a>,
which internally generates a Promise that will reject if
<code>queryServer</code> is canceled. If <code>queryServer</code>
is canceled before it runs to completion, you'll see a
<code style="color:red;">TaskCancelation</code> error in the logs.
</p>

<p>
One approach to fixing this would be to add a <code>.catch()</code>
handler and using ember-concurrency's <code>didCancel()</code> helper
function to check if the error was a task cancelation, and ignore it
if so:
</p>

{{code-snippet name="task-cancelation-example-2.js"}}

<p>
But this is exactly the kind of cluttered, defensive programming
that ember-concurrency was designed to avoid.
</p>

<p>
The ideal solution here is to never call <code>.then()</code> on your
own task instances and instead try and find a way to express what
you're doing using only the ember-concurrency Task API, which has
built-in robust support for cancelation:
</p>

{{code-snippet name="task-cancelation-example-3.js"}}

<p>
And in your templates, you'd replace any instance of
<code>action "fetchResults"</code> with <code>perform fetchResults</code>.
</p>

<p>
When structured this way, the potential for task cancelation stays
within ember-concurrency's domain, where cancelation is routine and
handled gracefully.
</p>

<p>
For more information, see
{{link-to "Cancelation" 'docs.cancelation'}} and
{{link-to "Handling Errors" 'docs.error-vs-cancelation'}}.
</p>

