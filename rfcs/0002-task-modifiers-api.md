---
Stage: Accepted
Start Date: 2021-09-18
Release Date:
Release Versions:
  ember-concurrency: vX.X.X
RFC PR: https://github.com/machty/ember-concurrency/pull/441
---

<!---
Directions for above:

Stage: Leave as is
Start Date: Fill in with today's date, YYYY-MM-DD
Release Date: Leave as is
Release Versions: Leave as is
RFC PR: Fill this in with the URL for the Proposal RFC PR
-->

# Task Modifier API

## Summary

Task modifiers have been a concept built in to `ember-concurrency` since the
beginning. Until `0.7.19` they were only specifyable within `ember-concurrency`
internals, and not extendable by users. `0.7.19` added the ability to specify
new modifiers as prototype extensions on `TaskProperty`, which is the only API
today for users creating their own modifiers. Unfortunately, `TaskProperty` is
inherently tied to Ember internals and is not used when using decorators, and
using prototype extensions does not make clear what modifiers exist.

Instead, this RFC proposes a `registerModifier` API and making some of
`TaskFactory`'s APIs public for creating a more supported experience for creating
user-defined Task modifiers, enabling much more experimentation outside of
`ember-concurrency`'s core.

## Motivation

> Why are we doing this? What use cases does it support? What is the expected
> outcome?

This RFC is to provide a more supported, declarative approach to modifier
definition, and provide capabilities for more user experimentation on top of
`ember-concurrency` tasks. The use cases it supports are for providing easier
implementation of external Task modifiers such as those provided by
`ember-concurrency-retryable` and `ember-concurrency-test-waiters`, as well as
allowing users to define modifiers that are relevant or useful to their application
that might not be broadly applicable enough for inclusion in `ember-concurrency`
itself.

The expected outcome is that we can drop support for `TaskProperty` prototype
extensions in the future, and rely only on well-documented, public APIs for
letting users create `ember-concurrency` modifiers.

## Detailed design

This RFC defines the following new APIs. These currently exist in an undocumented,
non-public form on `master`, but will be elevated to public API by this RFC and
documented on the docs site and via JSDoc:


```typescript
interface TaskModifier {
  (factory: TaskFactory, taskModifierOption: any): Task;
}
type TaskState = {
  last: TaskInstance<any> | null;
  lastRunning: TaskInstance<any> | null;
  lastPerformed: TaskInstance<any> | null;
  lastSuccessful: TaskInstance<any> | null;
  lastComplete: TaskInstance<any> | null;
  lastErrored: TaskInstance<any> | null;
  lastCanceled: TaskInstance<any> | null;
  lastIncomplete: TaskInstance<any> | null;
  performCount: number;
  numRunning: number;
  numQueued: number;
  isRunning: boolean;
  isQueued: boolean;
  isIdle: boolean;
  state: 'running' | 'queued' | 'idle';
}
interface OnStateCallback {
  (state: TaskState, taskable: Task | TaskGroup): void;
}
type TaskDefinition = TaskFunction<any, any[]> | EncapsulatedTaskDescriptor<any, any[]>;

/**
 * Registers a new modifier with the modifier registry
 */
export function registerModifier(name: string, definition: TaskModifier): void;

/**
 * Returns a specified modifier, if it exists in the registry
 */
export function getModifier(name: string): TaskModifier?;

/**
 * Returns whether a specified modifier exists in the registry
 */
export function hasModifier(name: string): boolean;

/**
 * While instantiation will not be supported (yet), this is the interface
 * provided to modifiers via the definition callback in `registerModifier`
 */
interface TaskFactory {
  name: string;
  taskDefinition: TaskDefinition;

  getOptions(): { [key: string]: any; }
  setDebug(isDebug: boolean): this;
  setEvented(isEvented: boolean): this;
  setGroup(groupName: string): this;
  setMaxConcurrency(maxConcurrency: number): this;
  setName(name: string): this;
  setOnState(onStateCallback: OnStateCallback): this;
  setTaskDefinition(taskDefinition: TaskDefinition): this;
}
```

To use [ember-concurrency-retryable](https://github.com/maxfierke/ember-concurrency-retryable) as an example,
instead of implementing it via a prototype extension:

```javascript
function retryable(taskProperty, retryPolicy) {
  assert("retryable() will only work with ember-concurrency >=0.7.19 -- please upgrade", taskProperty.taskFn);

  const baseTaskFn = taskProperty.taskFn;

  taskProperty.taskFn = function* (...args) {
    const instance = new RetryableTaskInstance({
      policy: retryPolicy,
      context: this,
      fn: baseTaskFn,
      args: args
    });
    return yield* instance.run();
  }

  return taskProperty;
}

TaskProperty.prototype.retryable = function (retryPolicy) {
    return retryable(this, retryPolicy);
};
```

we could instead implement using these new public APIs:

```javascript
function retryableModifier(factory, retryPolicy) {
  let taskDefinition = factory.taskDefinition;
  let retryableDefinition = function* (...args) {
    const instance = new RetryableTaskInstance({
      policy: retryPolicy,
      context: this,
      fn: taskDefinition,
      args: args
    });
    return yield* instance.run();
  };

  factory.setDefinition(retryableDefinition);

  return true;
}

registerModifier('retryable', retryableModifier);
```

## How we teach this

> What names and terminology work best for these concepts and why? How is this
> idea best presented? As a continuation of existing ember-concurrency patterns,
> or as a wholly new one?

This is mostly a continuation of existing terminology (e.g. task modifier).
"Factory" is also commonly used in the Ember world, and `TaskFactory` should be
well understood as a factory that creates Tasks.

> Would the acceptance of this proposal mean the ember-concurrency guides must be
> re-organized or altered? Does it change how ember-concurrency is taught to new
> users at any level?

There is currently no documentation for the existing user-specified modifier
feature, but it would it would likely be documented as an advanced feature.

> How should this feature be introduced and taught to existing ember-concurrency
> users?

We'll add a new page to the docs describing how to use the new feature, like we
did with the `Yieldable` RFC.

## Drawbacks

> Why should we *not* do this? Please consider the impact on teaching Ember,
> on the integration of this feature with other existing and planned features,
> on the impact of the API churn on existing apps, etc.

There's not really a good reason _not_ to do this, as `TaskProperty` will
probably go away at some point, and the prototype extension based method for
user-specified modifiers is mostly an escape hatch, and not well-defined
functionality.

> There are tradeoffs to choosing any path, please attempt to identify them here.

* Modest expansion of the public API surface

## Alternatives

> What other designs have been considered? What is the impact of not doing this?
> This section could also include prior art, that is, how other frameworks in the
> same domain have solved this problem.

No other designs have been considered. The risk of not doing this is that there
would be a need to continue supporting the `TaskProperty` prototype extension
method, possibly past when `TaskProperty` is even used itself. There would also
not be an equivalent API for when the eventual extraction of the core happens,
whereas this RFC provides a generic API, usable in an extracted core.

## Unresolved questions

> Optional, but suggested for first drafts. What parts of the design are still
> TBD?

None. It's mostly already implemented in master under the hood, so much of it is
already proved out, with Ember-specific modifiers implemented using the API.
