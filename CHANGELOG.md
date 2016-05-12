# Changelog
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

