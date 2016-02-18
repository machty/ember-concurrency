## ember-concurrency API docs

All of `ember-concurrency`'s public API is available
on the `"ember-concurrency"` module, and
most of the time, you'll only be using the `task` and `timeout`
imports, e.g.:

```js
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  loopingTask: task(function * () {
    while (true) {
      this.set('num', Math.random());
      yield timeout(100);
    }
  }).on('init')
});
```

## Task Modifiers

You can find a description of all the Task Modifiers
under the [Task Property API docs](TaskProperty.html).

- [.enqueue()](TaskProperty.html#enqueue)
- [.drop()](TaskProperty.html#drop)
- [.maxConcurrency()](TaskProperty.html#maxConcurrency)


## The full API

```js
import {
  task,    // task macro
  timeout, // pause execution

  // Task/cancelation-aware variants of Promise.all/race
  all,
  race,
} from 'ember-concurrency';
```

