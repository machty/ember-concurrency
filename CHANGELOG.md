# Changelog
### 0.5.15:
 - feature: add "prefix" variants of task modifiers, for example
   you can import { task, drop } from 'ember-concurrency' and
   declare a dropping task via: `myTask: task(drop, function * () {...})`.
   This form allows you to specify your concurrency constraints up
   front rather than having to look at the bottom of the task to see which
   chained task modifiers were applied, which is cumbersome
   for large/long tasks (that can't necessarily be split up).

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

