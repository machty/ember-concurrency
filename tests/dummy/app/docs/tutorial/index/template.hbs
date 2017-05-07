<h3>Introduction to ember-concurrency</h3>

<p>
To demonstrate the kinds of problems ember-concurrency
is designed to solve, we'll first implement a basic example of
loading data in a Component using only core Ember APIs. Then
we'll introduce ember-concurrency tasks as part of a refactor.
</p>

<p>
This tutorial (and ember-concurrency itself) assumes that you have
reasonable familiarity with Ember's core APIs, particularly surrounding
Components, templates, actions, and Promises.
</p>

<p>
For our use case, we're going to implement a Component that
fetches and displays nearby retail stores. This involves
a two-step asynchronous process:
</p>

<ol>
  <li>
    It uses geolocation to find the user's latitude/longitude coordinates, and then:
  </li>
  <li>
    It forwards those coordinates to the server to fetch a list of nearby restaurants.
  </li>
</ol>

<p>
<em>
This is basically the same example demonstrated in the
<a href="https://youtu.be/VEzVDOmY-dc?t=123">EmberConf 2017 ember-concurrency talk</a>;
take a look if you prefer a video alternative to this tutorial.
</em>
</p>

<h4>Version 1: Bare Minimum Implementation</h4>

<p>
We'll start off a bare-bones implementation of the feature: within
an action called <code>findStores</code>, we'll create a Promise
chain that fetches the coordinates from a geolocation service
and passes those coordinates to a store's <code>getNearbyStores</code>
method, which eventually gives us an array of stores that we stash
on the <code>result</code> property so that the stores can be displayed
in the template.
</p>

{{code-template-toggle
    codeSnippet="better-syntax-1.js"
    templateSnippet="better-syntax-1.hbs"}}
{{tutorial-0}}

<p>
This first implementation <em>works</em>, but it's not really production-ready.
The most immediate problem is that there's no loading UI; the user clicks
the button and it seems like nothing is happening until the results come back.
</p>

<h4>Version 2: Add a Loading Spinner</h4>

<p>
We'd like to display a loading spinner while the code is fetching nearby stores.
In order to do this, we'll add an <code>isFindingStores</code> property to the
component that the template can use to display a spinner.
</p>

<p><em>
  We'll use <code>++</code> comments to highlight newly added code.
</em></p>

{{code-template-toggle
    codeSnippet="better-syntax-2.js"
    templateSnippet="better-syntax-2.hbs"}}
{{tutorial-1}}

<p>
This is certainly an improvement, but strange things start to happen if you
click the "Find Nearby Stores" button many times in a row.
</p>

<p>
The problem is that we're kicking off multiple concurrent attempts to fetch
nearby locations, when really we just want only one fetch to be running
at any given time.
</p>

<h4>Version 3: Preventing Concurrency</h4>

<p>
We'd like to prevent another fetch from happening if one is already in
progress. To do this, just need to add a check to see if
<code>isFindingStores</code> is true, and return early if so.
</p>

{{code-template-toggle
    codeSnippet="better-syntax-3.js"
    templateSnippet="better-syntax-3.hbs"}}
{{tutorial-2}}

<p>
Now it is safe to tap the "Find Nearby Stores" button. Are we done?
</p>

<p>
Unfortunately, no. There's an important corner case we haven't addressed yet:
if the component is destroyed (because the user navigated
to a different page) while the fetch is running, our code
will throw an Error with the message
<code>"calling set on destroyed object"</code>.
</p>

<p>
You can
actually verify that this happening by opening your browser's
web inspector, clicking "Find Nearby Stores" from the example
above, and then quickly clicking {{link-to 'this link' 'docs.introduction'}}
before the store results have come back.
</p>

<h4>Version 4: Handling "set on destroyed object" errors</h4>

<p>
The problem is that it's possible for our promise callback (the
one that sets <code>result</code> and <code>isFindingStores</code>)
to run after the component has been destroyed, and Ember (and React
and many others) will complain if you try and, well, call <code>set()</code>
on a destroyed object.
</p>

<p>
Fortunately, Ember let's us check if an object has been destroyed
via the <code>isDestroyed</code> flag, so we can just add a bit of
defensive programming to our promise callback as follows:
</p>

{{code-template-toggle
    codeSnippet="better-syntax-4.js"
    templateSnippet="better-syntax-4.hbs"}}
{{tutorial-3}}

<p>
Now if you click "Find Nearby Stores" and
{{link-to 'navigate elsewhere' 'docs.introduction'}}, you won't see
that pesky error.
</p>

<p>
Now, are we done?
</p>

<h4>Version 5: Handle Promise Rejection</h4>

<p>
You might have noticed that we don't have any error handling if
either the <code>getCoords</code> or <code>getNearbyStores</code>
promises reject with an error.
</p>

<p>
Even if we were too lazy to build
an error banner or popup to indicate that something went wrong (and we are),
the least we could do is make sure that our code gracefully
recovers from such an error and doesn't wind up in a bad state.
As it stands, if one of those promises rejected,
<code>isFindingStores</code> would be stuck to <code>true</code>, and
there'd be no way to try fetching again.
</p>

<p>
Let's use a <code>finally()</code> handler to make sure that
<code>isFindingStores</code> always gets set to <code>false</code>,
regardless of success or failure. Unfortunately, this also
means we have to duplicate our <code>isDestroyed</code> check.
</p>

{{code-template-toggle
    codeSnippet="better-syntax-5.js"
    templateSnippet="better-syntax-5.hbs"}}
{{tutorial-4}}

<p>
And there you have it: a reasonably-production ready implementation
of finding nearby stores.
</p>

