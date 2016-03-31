# Changelog
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

