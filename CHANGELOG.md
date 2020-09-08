# Changelog

### 1.3.0
  - Add `animationFrame` yieldable helper. Yielding `animationFrame()` will
    pause a task until after the next animation frame using the native
    `requestAnimationFrame()` browser API.

    **Note**: ember-concurrency tasks are scheduled on the runloop, so this will
    not cause the remainder of the task to instead run during the next animation
    frame, but the runloop after the next animation frame.
  - Add `hashSettled` helper for cancellation-aware implementation of RSVP's `hashSettled` (#353, thanks @kwliou!)
  - Add missing types for `linked()` and `unlinked()` (#373)
  - Deprecate direct usage of task with action helper and disable tests for it
    on 3.20+.

    This feature unfortunately depends on private APIs that will be removed in
    Ember 3.25. Unfortunately, the mechanism was already removed in Ember 3.20,
    making it impossible to support this for releases at least until recent
    canaries where it was re-introduced with a deprecation. However, the feature
    is rarely used, only documented in this changelog, and frequently breaks
    whenever the private constant it depends on moves modules internally
    throughout new versions of Ember.

    It will continue to remain available for Ember < 3.20, but will not be
    available in Ember-Concurrency 2.0, and will show a deprecation warning from
    1.3.0 forward.

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

### 1.2.1
  - Correct types for encapsulated tasks to allow accessing encapsulated task state (#362, thanks @chancancode!)
  - Correct types to reflect that Task, TaskInstance, and TaskGroup extend EmberObject (#363, thanks @jamescdavis!)

### 1.2.0
  - Introduce official TypeScript definitions targetting the last 3 versions of
    TypeScript. A big, big thank you to @chancancode for this heroic effort!
    Also, a thank you to all others before who worked on previous iterations of
    typing experiments for ember-concurrency and provided feedback. **If you were
    using one of the community-provided solutions or other custom type definitions,
    you will likely need to remove those and refactor to adhere to the new official
    types. (#357)

    For more information about using TypeScript with ember-concurrency, please see the new [docs page](https://ember-concurrency.com/docs/typescript)

### 1.1.7
  - Fix waitForProperty on non-EmberObject hosts (#352. Fixes #292. Thanks @andrewfan for the find!)

### 1.1.6
  - Add support for `waitForEvent` helper on host objects supporting 'on' API.
    Previously, `waitForEvent` only supported DOM-like objects with
    `addEventListener`/`removeEventListener` or jQuery-like objects with `one`/`off`,
    but did not support those with just `on`/`off`. (#348. Fixes #164)

### 1.1.5
  - Avoid auto-tracking rerender assertion / infinite rerender during cancelation
    in certain contexts in Ember 3.15+ (#341, Fixes #340)

### 1.1.4
  - Avoid auto-tracking rerender assertion thrown in certain contexts in Ember 3.15+
  - Fix passing tasks into `action` helper directly on Ember 2.8 (yes, 2.8)

### 1.1.3
  - Fix issue where `rawTimeout`, `waitForEvent`, and `waitForQueue` helper timers
    were not properly canceled or cleaned up in some cases, such as when used with
    Task-aware Promise helpers such as `race`. (#331. Fixes #309, #329)
  - Fix use of Tasks with `action` and `fn` helpers in Ember 3.x (#312, #333. Thanks @thiagofelix for the find!)
  - [docs] Remove 404'd link on outdated regenerator runtime removal
  - [docs] Document task syntax for use with ES native classes and Ember Octane

### 1.1.2
  - _Totally_ fix use of task groups with ES native class/Glimmer components (#324, thanks @jrjohnson)
  - [dev] Add test coverage for tasks on ES native class/Glimmer components

### 1.1.1
  - Fix use of task groups with ES native class components (#321, thanks @jrjohnson)
  - Document and export `rawTimeout` helper in top-level `ember-concurrency` module. (#310, thanks @Turbo87)

### 1.1.0
  - Babel 7 (#317)
  - Assert argument is an `Array` for Promise helpers (`race`, `all`, `allSettled`) (#313, thanks @buschtoens!)
  - Throw an error in `waitForQueue` when queue does not exist (#314, @mydea!)
  - Resolve warning about colliding `ember-maybe-import-regenerator` versions (#316, thanks @jherdman!)
  - Fix service injection on nested encapsulated tasks on Ember 3.13+ (#318)
  - Use `clearTimeout()` instead of `clearInterval()` on timer set with `setTimeout` (#309, thanks @Turbo87!)
  - Document options for `cancelAll()` (#305, thanks @ggayowsky!)
  - [dev] Upgrade Ember-CLI to 3.12 (#317)
  - [dev] Upgrade ember-cli-sass to enable use on Node 12 (#299, thanks @buschtoens!)

### 1.0.0
  - No changes, just a long overdue 1.0 release :)

### 0.8.27
  - Fix Ember.Logger deprecations (#266)
  - Add the ability to `yield forever` to pause a task indefinitely (#274)
  - Better error messaging for later versions of Ember (#270)

### 0.8.24
  - cancelAll({ resetState: true }) can remove existing derived state (#253)
  - fix issue with Ember 3.6.0+ when IE11 is not being targeted (#261)

### 0.8.22
  - Fixes ember-metal related issues on Ember Canary.

### 0.8.21
  - Fixes ES5 getter syntax on Ember Canary (#248)

### 0.8.18
  - Adds `.evented()` task modifier and task lifecycle events.

### 0.8.17
  - waitForEvent/Queue/Property helpers now work with the various
    promise helpers (e.g. `all` and `race`)

### 0.8.16
  - Allow passing a non-Function value to waitForProperty() as
    a shortcut for waiting for the observed property to `===`
    that value.

### 0.8.15
  - Added waitForProperty() to pause execution until a property
    on an Ember Object becomes a certain value.

### 0.8.14
  - Revert to "old style" Ember imports in `app/` tree

### 0.8.13
  - waitForEvent() support for native DOM EventTargets
    (instead of just Ember / jQuery objects) (#187)

### 0.8.12
  - Officially release and document "Encapsulated Tasks", which
    are tasks that can maintain/mutate their own state without
    having direct access to the host object's state. In conjunction
    with Derived State, this allows for some nice patterns for
    containing state/logic/mutations _within_ the tasks, rather
    than requiring that state/events generated by tasks live on /
    bleed into the host objects.

### 0.8.11
  - Added Task.linked()/unlinked() as a means to avoid circular
    cancelation errors. There is no change to behavior here,
    but in the case that ember-concurrency detects a circular
    self-cancel-on-destroy scenario, it'll warn you about the
    issue and require you to annotate the desired behavior
    with linked()/unlinked(). A "circular self-cancel-on-destroy"
    usually occurs when a component task performs a task on a
    service, which causes a state change that causes the
    component to be destroyed, canceling the original task,
    thus canceling the service task.

### 0.8.7
  - Added helpful error when improperly trying to perform a
    task via `this.taskName.perform()`

### 0.8.6
  - Add `.debug()` Task Modifier and EmberENV.DEBUG_TASKS to log
    the reason a task is canceled, e.g. "TaskInstance 'doStuff' was
    canceled because the object it lives on was destroyed or unrendered"

### 0.8.5
  - Support null/undefined values in cancelable promise helpers (#153)

### 0.8.4
  - Added helpful link to TaskCancelation errors

### 0.8.3
  - Added informative messages as to the root cause of a
    TaskCancelation, e.g.
    "TaskCancelation: TaskInstance 'doStuff' was canceled because .cancel() was explicitly called"
    "TaskInstance 'doStuff' was canceled because .cancelAll() was explicitly called on the Task"
    "TaskInstance 'doStuff' was canceled because it belongs to a 'restartable' Task that was .perform()ed again"

### 0.8.2
  - Reverted some of the changes introduced in 0.8.0; in particular,
    while the first "slice" of a task function executes synchronously
    when performed, advancing the task is deferred to a run loop queue.
    This fixes some regressions caused by the overzealous
    as-sync-as-possible scheduling introduced in 0.8.0
    (#148, #138)

### 0.8.1
  - Removed a left-over `debugger` statement. :(

### 0.8.0
  - POSSIBLE BREAKING CHANGE: the internal task scheduler
    has been rewritten to be more performant, but to also
    more immediately start executing task functions. Prior
    to this version, `perform()`ing a task wouldn't actually
    start executing the task function until the `actions` queue
    on the run loop; this behavior was inconsistent with the timing
    of async functions, and meant that certain lifecycle hooks
    that depended on logic being run synchronously couldn't be
    used with ember-concurrency Tasks (because they already
    missed their window of execution). This is unlikely to
    break anyone's apps, but it's possible some apps out there
    have subtle timing dependencies on tasks running within
    run loop queues, so it's better to announce this as a possible
    breaking change. (#107)
  - Derived state: Task Instances now have an additional
    `isSuccessful` and `isError` property (#119)
  - Derived state: Tasks expose `performCount` that tracks
    how many times a task has been performed.
  - waitForEvent and waitForQueue for pausing the task until
    a jQuery / Ember event occurs, or until a particular
    run loop queue has been reached.

### 0.7.19
  - Added the ability to extend/wrap/decorate `TaskProperty`s (the
    value returned from `task()`, so that things like task test
    waiter APIs can be built without having to merge such
    functionality into the main EC repo. TL;DR,
    the `.taskFn` property is exposed, so it can be swapped out
    with another generator fn with wrapping code around
    `yield * originalTaskFn.call(this, arg)`
    (#116 + #117)

### 0.7.18
  - TaskGroup.isRunning always returns a Boolean (#112)
  - Fix Ember.K deprecation warnings (#110)

### 0.7.17
  - The (perform) helper won't throw an error when passed a non-Task
    until the helper is actually invoked (e.g. a button is clicked).
    Previously it would error more eagerly, right at first render,
    which was often a poor dev experience and at odds with the
    (action) helper's behavior.

### 0.7.16
  - Fixed Ember 2.10 error when passing (hash) helper values
    as an arg to a task (#99)
  - Using ember-owner-polyfill to cut down on bloat

### 0.7.15
  - BREAKING: revert the feature introduced in 0.7.11 for being
    able to do `this.myTask.perform()` instead of
    `this.get('myTask').perform()`. The internal semantics
    of ember-metal are too different between versions of Ember
    to be able to support this with any confidence; we'll just
    have to wait for ES5 getter syntax to come to Computed Properties
    in general in order to support this. Apologies for too eagerly
    introducing this broken feature.

### 0.7.14
  - no functional changes; just removed unneeded files from NPM package
    to decrease package size

### 0.7.13
  - fix not being able to mock tasks in tests (#84) and
    other related bugs

### 0.7.12
  - fix tasks not being overridable in subclass (#81)

### 0.7.11
  - support for `this.myTask.perform()`, i.e. you can get a
    reference to a Task using simple JavaScript accessors
    rather than having to write `this.get('myTask').perform()`

### 0.7.10
  - tasks can be tested in component integration tests (#66)
  - deprecation: using `.maxConcurrency()` without any other
    task modifier will produce a deprecation warning because
    it is unclear/ambiguous as to _how_ to constrain concurrency
    in such a case (#79)

### 0.7.9
  - Add task-aware `allSettled` promise equivalent (#75)

### 0.7.8
  - Adds Object.assign polyfill so that tests pass on
    on non-supporting browsers for apps that don't
    set includePolyfill:true

### 0.7.7
  - Upgraded ember-maybe-import-regenerator so that other
    addons can consume/depend on ember-concurrency without
    making the end user have to make any additional
    configuration to support transpiled generator function
    syntax.

### 0.7.6
  - Upgraded to more Node-backwards-compatible version of
    ember-maybe-import-regenerator.

### 0.7.5
  - You no longer have to set `includePolyfill:true` in
    ember-cli-build.js as a requirement for using
    ember-concurrency. `regenerator-runtime` is now
    provided by https://github.com/machty/ember-maybe-import-regenerator,
    which gracefully no-ops if you still want to keep
    `includePolyfill:true`. Babel's polyfill is 98kb minified,
    whereas the regenerator runtime is only 4kb minified.

### 0.7.4
  - When using Ember 2.5.0 or higher, you can now pass task objects
    directly to the closure `action` helper, e.g.
    `onclick={{action myTask 1 2 3}}`. This works exactly the same
    as `onclick={{perform myTask 1 2 3}}` but it's nice because
    any component that fires actions using the `(action)` helper
    can now directly be passed a task and have it run properly,
    rather than having to cast to an action using the `(perform)`
    helper.

### 0.7.3
  - removed any attempt to auto-polyfill using babel.includePolyfill,
    fixing #57. The auto-polyfill was never working reliably so it
    shouldn't break anyone's code.

### 0.7.2
  - (perform) and (cancel-all) helpers no longer cause run loop autoruns
  - The .keepLatest() task modifier has been redocumented due
    to popular demand; it's useful for when you want to enqueue
    only the most recent intermediate .perform() and drop everything
    in between.

### 0.7.1
  - Support for Ember 1.13.0

### 0.7.0
  - within a task generator function, TaskCancelation "errors" are
    longer "catchable" in the catch block of a try/catch. This means
    you no longer have to check if the error thrown is a cancelation
    in order to handle it differently than an exception.
  - That said, since promises have no concept of cancelation, if
    you perform a task within a promise (or you call
    `someTask.perform().then(...).catch(...)`), then any promise
    `catch` handlers _will_ be called with TaskCancelation "errors",
    and if you need to distinguish between cancelation and exceptions
    thrown, you can import and use the new `didCancel` utility function,
    which returns true if the error passed to it is a TaskCancelation.
    Previously, the only safe way to test this was to check
    `err && err.name === 'TaskCancelation'`; now you can just
    `import { didCancel } from 'ember-concurrency'` and
    check `didCancel(err)`.

### 0.6.3
  - bugfix: errors that bubble throw arbitrary depths of child tasks
    will only call window/Ember.onerror once

### 0.6.2
  - bugfix: errors thrown from child tasks don't "rethrow" when
    caught by parent task

### 0.6.1
  - Fixed bug when using ember-concurrency in an addon that is consumed
    by another app. #46

### 0.6.0
  - feature: Task Groups: http://ember-concurrency.com/#/docs/task-groups.
    Task Groups let you enforce concurrency constraints across multiple
    tasks, which previously wasn't possible.
  - feature: Moar Derived State: http://ember-concurrency.com/#/docs/derived-state
    Task Instances now expose .value and .error properties for the
    value returned from the task function, or the error thrown from it.
    Furthermore: Task objects expose `last` and `lastSuccessful`, which
    point to recently performed TaskInstances, which then make it
    possible to idiomatically access .value and .error, e.g.
    `{{myTask.last.value}}` or `{{myTask.last.error}}`. This is
    a continuation of ember-concurrency's goal of exposing as
    much Derived State as possible, and minimizing boilerplate.
  - feature: .observes() Task Modifier: appending .observes('foo', 'bar')
    to a task will automatically perform the task when 'foo' or 'bar'
    changes. Thanks to @ofbriggs for co-authoring this feature.
  - bugfix: once an object is destroyed, any attempts to perform
    a task on that object will be immediately canceled.

### 0.5.17:
 - experimental: support for linking tasks

### 0.5.16:
 - bugfix: timeout() internally uses Ember.run.later() now so that
   Ember testing helpers know to wait for it. Note: this means that
   infinite loops in tasks that pause with a timer can pause
   your acceptance tests until they timeout unless you break
   the loop somehow; one way to do this is to call Ember.run.cancelTimers()
 - bugfix: fixed a few more corner cases where a TaskCancelation error
   unnecessarily bubbled to the top even though the user hadn't opted
   into handling cancelations (by calling .then() on the TaskInstance returned
   from task.perform()).

### 0.5.15:
 - bugfix: don't set taskInstance.isCanceled to true if cancel()
   is called after a successful finish.

### 0.5.14:
 - bugfix: No longer treat the most recent yield as the implicit
   return of a function.

### 0.5.13:
 - bugfix: perform helper returns the performed TaskInstance

### 0.5.12:
 - bugfix: perform helper properly curries arguments

### 0.5.11:
 - Added perform and cancel-all helper for a more familiar
   approach to calling tasks from templates:
   `onclick={{perform taskName 1 2 3}}` and
   `onclick={{cancel-all taskName}}`

### 0.5.10:
 - EXPERIMENTAL: integration with observables via `subscribe` function

### 0.5.9:
 - Prevent promises from being swallowed in some cases

### 0.5.8:
 - EXPERIMENTAL: Task#performWillSucceed boolean property
 - EXPERIMENTAL: TaskProperty#.performs() for linking
   to tasks you intend to call.

### 0.5.7:
 - added Task-aware/cancelable variant of Promise.race

### 0.5.6:
 - added Task-aware/cancelable variant of Promise.all for joining multiple
   child tasks.

### 0.5.5:
 - added task(...).cancelOn('eventName'), which calls cancelAll()
   on the task whenever the event is fired

### 0.5.4:
 - .state properties for Tasks and TaskInstances
 - task.cancelAll() cancels all running/pending task instances
 - taskInstance.cancel() cancels an individual instance

### 0.5.3:
 - Added .maxConcurrency(n) task modifier which works in
   conjunction with the other task modifiers.
 - `nameOfTask.perform()` returns a Task Instance, which represents
   a single execution of that task which might be cancelled, dropped,
   or run to completion. It exposes a .cancel() method and other
   properties like .isRunning or .isFinished

### 0.5.0:
 - First stable version since re-working the docs site
 - No more reliance on js-csp, or CSP concepts whatsoever
