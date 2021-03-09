---
Stage: Accepted
Start Date: 2021-03-07
Release Date: Unreleased
Release Versions:
  ember-concurrency: vX.Y.Z
RFC PR: 
---

<!--- 
Directions for above: 

Stage: Leave as is
Start Date: Fill in with today's date, YYYY-MM-DD
Release Date: Leave as is
Release Versions: Leave as is
RFC PR: Fill this in with the URL for the Proposal RFC PR
-->

# Yieldables

## Summary

Promote Yieldables to public API, as a way to instrument TaskInstances by
providing a safe mechanism to implement custom waiters, hooks, introspection,
and other operations in a task definition, from application code.

## Motivation

> Why are we doing this? What use cases does it support? What is the expected
> outcome?

There are many great uses for yieldables, and indeed many of them are already
built-in to ember-concurrency today. Yieldables like `timeout`, `animationFrame`,
and `rawTimeout` provide safe, cancelation-aware ways to delay execution of a
task. Cancelable Promise helpers like `all`, and `hashSettled` are too a form of
yieldable.

While there are many built-in forms that provide cancelation-aware wrappers around
common browser APIs, there's a great opportunity for an ecosystem of yieldables,
based on domain-specific yieldables defined by users within their applications,
and supporting yieldables defined by complementary addons, in order to implement
behavior that would be inappropriate for inclusion in the main `ember-concurrency`
addon.

The expected outcome is that users and addon creators alike would be empowered
to experiment with new ways to control and introspect the task runtime, without
having to learn all about the ember-concurrency internals or waiting for
maintainers to try out their feature suggestions.

## Detailed design

Yieldables already exists in ember-concurrency in a similar form, but the
proposal would be to elevate this to a public API and add a little bit more
hiding of internals to avoid the need for users to know intimate details about
how to hand control back to the task.

The API proposed is fairly simple:

```javascript
class Yieldable {
  constructor(arg1, arg2, arg3, ...) {
    super(...arguments);
    // User setup logic would go here. If the yieldable took arguments, they
    // could be store in the Yieldable here
  }

  onYield(taskInstance) {
    // This is where most user code would go, defining what happens when the
    // task encounters `yield myYieldable`.

    // The user would have three methods they can call within here:
    // * this.next(value) - would could cause the yield to return with an
    //   optional value, and continue executing the task instance
    // * this.return(value) - would short-cirsuit task execution and have it
    //   return with an optional value.
    // * this.throw(error) - would raise a given error within the task instance
    //   and halt execution
  }

  onDispose() {
    // Custom dispose logic goes here. Would be called if task was canceled or
    // upon completion. Things like `cancelTimeout`, timer cleanup, or property
    // resets might happen here.
  }
}
```

For example, if I wanted to implement a yieldable for `requestIdleCallback`, I
could do the following:

```javascript
import Component from '@glimmer/component';
import { task, Yieldable } from 'ember-concurrency';

class IdleCallbackYieldable extends Yieldable {
  onYield() {
    this.callbackId = requestIdleCallback(() => this.next());
  }

  onDispose() {
    cancelIdleCallback(this.callbackId);
    this.callbackId = null;
  }
}

function idleCallback() {
  return new IdleCallbackYieldable();
}

class MyComponent extends Component {
  @task *backgroundTask() {
    yield idleCallback();

    const data = this.complicatedNumberCrunching();
    yield this.sendData(data);
  }
}
```

In general, `Yieldable` instances **should not** be reused across calls, and
thus care should be taken to ensure that users create a function, like `idleCallback`
above, to provide a new instance on every call.

## How we teach this

> What names and terminology work best for these concepts and why? How is this
> idea best presented? As a continuation of existing ember-concurrency patterns,
> or as a wholly new one?

We've called these yieldables internally for quite a while and I think it's a
relatively concise term for them, but am open to better suggestions.

> Would the acceptance of this proposal mean the ember-concurrency guides must be
> re-organized or altered? Does it change how ember-concurrency is taught to new
> users at any level?

We'd probably want to add a new docs page, maybe under some sort of "advanced"
section about extending ember-concurrency. It's probably not something for folks
just starting with ember-concurrency, but a useful tool to try later when they've
gotten the hang of things.

> How should this feature be introduced and taught to existing ember-concurrency
> users?

Introduce a docs page that illustrates the creation of a new yieldable and
explains how it ties in with cancelation/teardown, etc.

## Drawbacks

> Why should we *not* do this? Please consider the impact on teaching Ember,
> on the integration of this feature with other existing and planned features,
> on the impact of the API churn on existing apps, etc.

* Adds _slightly_ to the footprint of `ember-concurrency`'s public API

> There are tradeoffs to choosing any path, please attempt to identify them here.

* Potential footgun if used incorrectly (e.g. not doing teardown properly)

## Alternatives

> What other designs have been considered? What is the impact of not doing this?
> This section could also include prior art, that is, how other frameworks in the
> same domain have solved this problem.

It might be possible to provide a more functional approach, with a disposer being
returned by the function (many yieldables were first implemented this way), but
this complicates or precludes certain use cases. However, I think a functional
approach would remain available later. See Ember helpers and modifiers as an
example that allows both functional and class-based implementations.

## Unresolved questions

> Optional, but suggested for first drafts. What parts of the design are still
> TBD?

* Is providing access to `taskInstance` too unsafe, and a potential footgun? Is
  this something to worry about?
