## ember-concurrency API docs

All of `ember-concurrency`'s public API is available
on the `"ember-concurrency"` module, and
most of the time, you'll only be using the `task` and `timeout`
imports, e.g.:

```js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';

export default class MyComponent extends Component {
  @tracked num;

  constructor() {
    super(...arguments);
    this.loopingTask.perform();
  }

  @task *loopingTask() {
    while (true) {
      this.num = Math.random();
      yield timeout(100);
    }
  }
});
```

## Task Decorators

You can find a description of all the Task Decorators
under the [global API docs](global.html).

- [task](global.html#task)
- [restartableTask](global.html#restartableTask)
- [enqueueTask](global.html#enqueueTask)
- [drop](global.html#dropTask)
- [keepLatest](global.html#keepLatestTask)
- [taskGroup](global.html#taskGroup)
- [restartableTaskGroup](global.html#restartableTaskGroup)
- [enqueueTaskGroup](global.html#enqueueTaskGroup)
- [dropGroup](global.html#dropTaskGroup)
- [keepLatestGroup](global.html#keepLatestTaskGroup)

## Task Modifiers

You can find a description of all the Task Modifiers
under the [Task Property API docs](TaskProperty.html).

- [restartable](TaskProperty.html#restartable)
- [enqueue](TaskProperty.html#enqueue)
- [drop](TaskProperty.html#drop)
- [keepLatest](TaskProperty.html#keepLatest)
- [maxConcurrency](TaskProperty.html#maxConcurrency)

### Task Modifier API

These functions provide the ability to register and lookup registered user-defined
Task Modifiers.

- [getModifier](global.html#getModifier)
- [hasModifier](global.html#hasModifier)
- [registerModifier](global.html#registerModifier)
## Task/cancelation-aware variants of Promise helpers

These helpers are just like their Promise/RSVP equivalents, but with
the added behavior that they support cancelation and can hence be
used in conjunction with Tasks / TaskInstances.

- [all](global.html#all)
- [allSettled](global.html#allSettled)
- [hash](global.html#hash)
- [hashSettled](global.html#hashSettled)
- [race](global.html#race)

## Misc

- [animationFrame](global.html#animationFrame)
- [didCancel](global.html#didCancel)
- [forever](global.html#forever)
- [rawTimeout](global.html#rawTimeout)
- [waitForEvent](global.html#waitForEvent)
- [waitForQueue](global.html#waitForQueue)
