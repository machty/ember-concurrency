# 2.0.0 Upgrade Guide

ember-concurrency 2.0 is primarily an "engine" replacement. Internally, its been
substantially rewritten and decoupled from Ember at it's core. This will enable
a much more maintainable codebase, as well as setting the stage for potential
extraction of core primitives for use in the broader JavaScript ecosystem.

The application developer-facing changes are fairly minimal, and there are few
semantic changes to the operation of the addon.

## Changes

### Drops support for Ember < 3.8 and Node 8

ember-concurrency 2.0.0 drops support for many older Ember and Node versions.
Usage with 3.8 LTS and up ensures ember-concurrency can depend on the same Ember
runloop semantics (e.g. running on the microtask queue), while still providing a
broad level of compatibility with existing apps.

In some cases, polyfills will be needed for Ember 3.8, for example when using
decorators. See [config/ember-try.js](config/ember-try.js) for the `ember-lts-3.8`
scenario.

ember-concurrency 1.x is still available for those apps needing support back to
Ember 2.4 LTS.

### Decorators from `ember-concurrency-decorators` are built-in

This provides built-in support for the "nice" decorator syntax based on the
decorators implemented at ember-concurrency-decorators. Many thanks to
@buschtoens for years of stewardship of that addon, and important contributions
from @chancancode for TypeScript support, and others in the community to get it
to a place where it's seen wide adoption in the world of Ember Octane,
TypeScript, and native ES classes.

The "ugly" decorators (e.g. (@(task(function* () { ... }).drop()) will remain
available by virtue of coming "for free" with the computed-based TaskProperty
implementation (necessary to support the classic EmberObject model for task
hosts), but are deprecated to be removed in favor of these "nice" decorators
at some point in the future.

To migrate, simply replace `ember-concurrency-decorators` imports with `ember-concurrency`.

```diff
- import { restartableTask, task } from 'ember-concurrency-decorators';
+ import { restartableTask, task } from 'ember-concurrency';
```

Use of the computed property-based `task(function* () {})` for Ember Classic
objects remains available and unchanged, however the docs will now use native
classes and decorators for most examples.

### Task, TaskGroup, and TaskInstance no longer extend `EmberObject`

This mostly impacts the TypeScript type definitions, and use with older styles of
working in Ember, but Task and TaskInstance are native ES classes now. This should
have little impact, other than removal of `.get` and `.set`.

See [Removals](#Removals) section below for more information

### ember-concurrency uses `@tracked` properties underneath on Ember 3.16+

With the introduction of Octane, `@tracked` properties are used instead of
classic computed properties on Ember 3.16+. This enables Tasks and TaskInstances
to work well alongside Glimmer components without having to dip into interop
with the computed property system.

The Task, TaskGroup, and TaskInstance remain compatible with `@computed`-based
uses, as well, allowing use in both classic and Glimmer components.

As a consequence of using `@tracked` properties, reading `Task` or `TaskInstance`
state via native getters inside a computed property may require annotating the
native getter with [`@dependentKeyCompat`](https://api.emberjs.com/ember/release/functions/@ember%2Fobject%2Fcompat/dependentKeyCompat) to make changes visible to the
computed property system. This also applies to decorators like `@lastValue` that
internally create a native getter. For more information, see [this comment](https://github.com/machty/ember-concurrency/issues/424#issuecomment-1322505998).

### Scheduler now runs all task steps on microtask queue

In ember-concurrency 1.x, scheduling of tasks happened on the runloop OR using
`setTimeout` depending on the state of the former. This could cause subtle timing
bugs, often in testing, especially when using the microtask-based runloop in
Ember 3.6+.

### Uncaught async exceptions are reliably reported on

Related to the above change in task scheduling, error reporting now reliably
reports using the microtask queue. Your test suite may reveal errors that had
previously slipped through the cracks.

This is probably the most **breaking** change. It may be more apparent with
`ember-mocha`, as it does not have the same ability as `ember-qunit` with
regard to detecting async leakage in tests.

### `Task#cancelAll` and `TaskInstance#cancel` returns a Promise

As cancelation is asynchronous and reliably scheduled now, the behavior has
changed slightly. This may affect use-cases where something executed immediately
after cancelation depends on the cancelation of the task (e.g. calling `perform`
again after calling `cancelAll` on a task w/ `maxConcurrency` of `1`). However,
consuming applications can now reliably schedule subsequent operations that may
depend on cancelation to finish by awaiting the value of the promise returned by
the cancelation methods on `Task` and `TaskInstance`, `cancelAll` and `cancel`,
respectively.

It should be noted that when calling `cancelAll` with `{ resetState: true }`, the
state reset does not take effect immediately, as it did in e-c 1.x, but happens
on cancelation finalization, making it important to `await` calls to `cancelAll`.

For example,

```javascript
@dropTask *myTask() {
  while(1) {
   console.log("hello!");
   yield timeout(1000);
  }
}

@task *restartMyTask() {
  // Note the `yield`. This could also be an `await` or `then`, if done
  // outside of tasks
  yield this.myTask.cancelAll();

  // Without being able to `yield` on `cancelAll` above, the cancelation
  // wouldn't be guaranteed to have taken place before this is called,
  // resulting in `perform` no-oping and dropping the task and myTask would
  // not restart
  this.myTask.perform();
}
```

## Deprecations

### Sub-module imports

Various private sub-modules of `ember-concurrency` that were used by "friendly"
libraries (e.g. extensions on ember-concurrency) are deprecated due to the
change in structure of the library itself.

## Removals

### `.get` (or `.set`) on Task, TaskGroup, and TaskInstance

As ember-concurrency Tasks and TaskInstances no longer sub-class `EmberObject`,
`get` (and `set`) are no longer available. Instead, you can access the same state
via the native ES5 getters for the same properties. If you were already doing so
in Ember 3.1+ and ember-concurrency < 2, you shouldn't need to change anything
and it should Just Work™.

```js
// Before (ember-concurrency < 2)
myTask.get('isRunning');

// After (ember-concurrency 2.x)
myTask.isRunning;
```

Using `.set` on Tasks and TaskInstances was never supported, but now is also not
available.

### Direct use of tasks with `{{action}}` helper

This feature unfortunately depended on private APIs that will be/were removed in
Ember 3.25. The mechanism was already removed in Ember 3.20, but later was
re-introduced with a deprecation. However, this made it very difficult to support
due to the gap of functionality. The feature was rarely used, only documented
in the changelog, and frequently broke whenever the private constant it depended
on moved modules internally throughout new versions of Ember.

This feature was deprecated in ember-concurrency 1.3.0 and is removed completely
in 2.0.0.

Any existing uses can be converted to using `{{perform}}` directly or
wrapping the task in `(perform)` before passing to `{{action}}` or `{{fn}}`

Before:

```hbs
<button onClick={{action someTask}}>My button</button>
```

After:

```hbs
{{!-- Any of these --}}
<button {{on "click" (perform someTask)}}>My button</button>
<button onClick={{perform someTask}}>My button</button>
<button onClick={{action (perform someTask)}}>My button</button>
<button onClick={{fn (perform someTask)}}>My button</button>
```

### chained.property.use with `@lastValue` decorator (issue [#420](https://github.com/machty/ember-concurrency/issues/420))

If using `ember-concurrency-decorators`, you might have relied on its use of
`Ember.get`'s property chaining semantics to read tasks nested inside other
properties or services on the component. With the `@lastValue` decorator
implemented in ember-concurrency v2, `@lastValue` no longer uses `Ember.get`
underneath and does not implement support for chained property lookups.

## Known Issues

### Increase in bundle size

It has been found that ember-concurrency 2.x is a bit larger than 1.3.x in terms of
bundled size at build time. There are a number of reasons for this, but we'll be
looking at reducing that over time. For an idea on how much of an increase, here's
some results from ember-cli-bundle-analyzer:

**ember-concurrency 1.3.0:**
  * Raw, uncompressed, unminified: 99.46 kB
  * Gzip, minified: 8.5 kB

**ember-concurrency 1.3.0 + ember-concurrency-decorators 2.0.1:**
  * Raw, uncompressed, unminified: 110.03 kB
  * Gzip, minified: 9.17 kB

**ember-concurrency 2.0.0 dev (around rc.1):**
  * Raw, uncompressed, unminified: 124.46 kB
  * Gzip, minified: 13.71 kB

Given the above, you might expect around a 4kB of increase (gzip) from 2.x (not accounting
for app code, which may increase further for decorator usage via Babel if not currently
using decorators.)

## Notices

### Browser Compatibility

Modern evergreen browsers are supported, with Firefox and Chrome being tested in
CI. Other browsers, such as Safari, Edge, and IE 11 should work fine as well,
though the latter may require transpilation or polyfills via your
`config/targets.js` or babel configuration. In particular, native ES classes,
`WeakMap`, and `Proxy` are used. However, `Proxy` may not be polyfillable, but is
only required for encapsulated tasks. If you do not use this feature, you can
likely still use ember-concurrency with older browsers.

### Notes to addon maintainers

If your addon depends directly or indirectly on ember-concurrency, you can likely
make some minor modifications to support both ember-concurrency 1.x and
ember-concurrency 2.x. It is strongly suggested that you do, at least for a little
while, as there are many folks using ember-concurrency and popular addons that
might take some time to upgrade to support the latest.

ember-concurrency 1.x and 2.x are more-or-less the same API, while being _very_
different internally.

If you use decorators via `ember-concurrency-decorators` and wish to support
both ember-concurrency 1.x and 2.x, you must keep using
`ember-concurrency-decorators` and not use the "nice" decorators built-in to
`ember-concurrency` 2.x, as they will not work under 1.x. However, please make
sure you use `ember-concurrency-decorators@^2.0.3` or higher.

#### package.json

Please accept versions liberally if you can, or use an appropriate version
specifier for your requirements:

```javascript
{
    // ...
    "dependencies": { // Or use `peerDependencies` if appropriate
      // ...
      "ember-concurrency": "^1.0.0 || ^2.0.0-rc.1",
      // ...
    },
    // ...
}
```

#### Accessing task state

If your addon must support versions of Ember < 3.1, ember-concurrency state will
not be available via `.get` on the Task, TaskGroup, and TaskInstance directly.
Instead, you should access the state using `Ember.get`, which will work for both
1.x and 2.x. Template usage remains the same for both.

#### Testing

If you intend to support both versions, please add ember-try scenarios for both
to protect against possible regressions.

```javascript
// config/ember-try.js
{
      // ...
      {
        name: 'ember-concurrency-1.x',
        npm: {
          dependencies: {
            'ember-concurrency': '^1.3.0'
          }
        }
      },
      {
        name: 'ember-concurrency-2.x',
        npm: {
          dependencies: {
            'ember-concurrency': '^2.0.0-rc.1'
          }
        }
      },
      // ...
}
```

```yml
# .travis.yml or equivalent for GitHub Actions, CircleCI, etc.
jobs:
  include:

    # ... other configurations
    - env: EMBER_TRY_SCENARIO=ember-canary
    - env: EMBER_TRY_SCENARIO=ember-concurrency-1.x
    - env: EMBER_TRY_SCENARIO=ember-concurrency-2.x
```

## FAQ

### Something is broken even though I made sure to do the above updates!

First, make sure that ember-concurrency 2.0.0 or higher is the version that is
being loaded and used by your application. It's often the case that an addon
might be pinned to an older version and is pulling that in and it's being used
instead. Check `yarn why ember-concurrency` to see how the versions are being
resolved, if you're a `yarn` user. For npm, use whatever available equivalents.

You may need to contact the maintainer of another addon to get them to release
a version with support for ember-concurrency 2.0.0 (point them to this guide!)
or you might be able to workaround it with Yarn resolutions, as the APIs are
largely compatible between the two versions.

If you've verified the proper version of ember-concurrency is being loaded and
you still are seeing the issue, please reach out on Discord or open an issue here.
