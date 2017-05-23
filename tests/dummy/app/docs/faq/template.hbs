<h2>FAQ &amp; Fact Sheet</h2>

<h4>Why am I seeing TaskCancelation errors in my logs?</h4>

<p>
See {{link-to 'this link' 'docs.task-cancelation-help'}}.
</p>

<h4>Does ember-concurrency work with older browsers?</h4>

<p>
  Yes. The <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*">ES6 Generator Function syntax</a>
  that ember-concurrency relies on is automatically transpiled using Babel
  and <a href="https://github.com/facebook/regenerator">regenerator</a>, so
  it'll work on all browsers supported by Ember.
</p>

<h4>How do ember-concurrency Tasks compare to...</h4>

<h5>Promises?</h5>

<p>
  Promises aren't cancelable, and as of 12/2016, there is no active TC39 specification
  under development for adding cancelation to promises.
  EC Tasks, in contrast, are cancelable.
</p>

<p>
  The design of Promises is such that once a Promise has been created, it's not
  possible to externally reach in and resolve/reject a Promise. This constraint
  encourages a clear, unidirectional, structured architecture for building
  asynchronous chains of logic.
</p>

<p>
  Like Promises, the return/reject value of an EC Task cannot be externally
  set / overridden; in other words, once a Task has been performed, there's
  no way to externally force it to return/reject early, with the exception of
  cancelation. When you <code>.cancel()</code> a task instance, the task
  will "return" from wherever it is currently paused (e.g. at a <code>yield</code>).
  Presently, there is no API to "delay" the cancelation of a Task once a cancel
  has been requested, but this functionality might be added to future APIs.
</p>

<ul>
  <li>
    {{link-to 'Docs: implicit vs explicit cancelation' 'docs.cancelation'}}
  </li>
  <li>
    <a href="https://github.com/machty/ember-concurrency/issues/98">
      API discussion: cancel tokens, non-preemptive APIs
    </a>
  </li>
</ul>

<h5>Observables?</h5>


<ul>
  <li><strong>Cancelability</strong>
    Both Observable subscriptions and Task instances are cancelable. Observables
    can be canceled implicitly when all subscribers have unsubscribed, or explicitly
    by calling <code>.dispose()</code> (though this approach is frowned up in favor
    of explicitly specifying when an observable should terminate -- e.g. via <code>takeUntil()</code>).
    {{link-to 'Tasks can be canceled' 'docs.cancelation'}} implicitly (via 1. host object destruction, 2. the
    <code>.restartable()</code> task modifier) or explicitly (via <code>.cancel() / .cancelAll()</code>), though,
    like Observables, the implicit approach is preferable.
  </li>
  <li><strong>Multiple / Single Values</strong>
    Observables can emit multiple values over time. Tasks don't really "emit" values,
    but can <code>.set()</code> values on the object the task lives on so that those
    values can be easily displayed in the template. Tasks also expose the value / error
    returned from the task function (see {{link-to 'Derived State' 'docs.derived-state'}}),
    which are preferable to <code>.set()</code>s where possible.
  </li>
  <li><strong>Composability</strong>
    The degree to which an abstraction "composes" depends highly on the problems
    it is trying to solve and the constraints therein. Observables as a low-level
    primitive aren't designed to solve specific problems but rather to be as flexible
    and composable as possible so that developers can build almost anything on top of
    them to model just about any domain logic under the sun. So, in a sense,
    Observables can be considered more composable (compositional?) than Tasks,
    which, by the time they exist, are bound to the lifetime of the Ember Object
    they live on, which constrains how and where Tasks can be used, but this tradeoff
    is deliberate and enables some of the patterns described below.
  </li>
  <li><strong>Marble Diagrams vs Block Diagrams</strong>
    The behavior of Observables and their various combinators can be
    visualized by <a href="http://rxmarbles.com/">Marble Diagrams</a>, where each
    marble represents a discrete event emitted. Tasks don't emit multiple values,
    and instead make a greater emphasis on the concept of task/object lifespans, hence
    are more easily visualized as
    {{link-to 'possibly overlapping blocks' 'docs.task-concurrency'}} over time.
  </li>
  <li><strong>Readability</strong>
    Warning: highly subjective. ember-concurrency tasks are designed to "feel" like
    an Ember-y API; among other design goals, it should be relatively easy for a
    newcomer to the code base come along and understand the flow and various steps
    taken from the start to the end of the task. It is the contention of @machty,
    who is biased but also well-versed in both observables and tasks,
    that understanding the flow of an ember-concurrency
    task is much "easier" than untangling a mess of Observable combinators for
    an observable that does the same amount of work and exposes the same amount
    of derived state as an ember-concurrency task (and @machty has written plenty
    of apps with Observables). This clarity is due to 1) the pausable/resumable nature
    of the generator function syntax that ember-concurrency tasks use,
    2) the fact that tasks expose a lot of commonplace derivable state that you'd
    otherwise have to split out / filter / merge yourself using observables
    (e.g. <code>.isIdle / .isRunning / .concurrency</code>) and 3)
    it's often easier to model domain state as bindable values rather than
    discrete events.
  </li>
</ul>

