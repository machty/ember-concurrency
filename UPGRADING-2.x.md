# 2.0.0 Upgrade Guide

ember-concurrency 2.0 is primarily an "engine" replacement. Internally, its been
substantially rewritten and decoupled from Ember at it's core. This will enable
a much more maintainable codebase, as well as setting the stage for potential
extraction of core primatives for us in the broader JavaScript ecosystem.

The application developer-facing changes are fairly minimal, and there are few
semantic changes to the operation of the addon.

## Changes

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

## Notices

### Browser Compatibility

Modern evergreen browsers are supported, with Firefox and Chrome being tested in
CI. Other browsers, such as Safari, Edge, and IE 11 should work fine as well,
though the latter may require transpilation or polyfills via your
`config/targets.js` or babel configuration. In particular, native ES classes,
`WeakMap`, and `Proxy` are used.

### Notes to addon maintainers

If your addon depends directly or indirectly on ember-concurrency, you can likely
make some minor modifications to support both ember-concurrency 1.x and
ember-concurrency 2.x. It is strongly suggested that you do, at least for a little
while, as there are many folks using ember-concurrency and popular addons that
might take some time to upgrade to support the latest.

ember-concurrency 1.x and 2.x are more-or-less the same API, while being _very_
different internally.

#### package.json

Please accept versions liberally if you can, or use an appropriate version
specifier for your requirements:

```javascript
{
    // ...
    "dependencies": { // Or use `peerDependencies` if appropriate
      // ...
      "ember-concurrency": ">=1.0.0 <3", // or "^1.0.0 || ^2.0.0-beta.1"
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
            'ember-concurrency': '^2.0.0-beta.1'
          }
        }
      },
      // ...
}
```

```yml
# .travis.yml
jobs:
  include:

    # ... other configurations
    - env: EMBER_TRY_SCENARIO=ember-canary
    - env: EMBER_TRY_SCENARIO=ember-concurrency-1.x
    - env: EMBER_TRY_SCENARIO=ember-concurrency-2.x
```
