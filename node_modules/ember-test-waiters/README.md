# ember-test-waiters

[![Build Status](https://travis-ci.com/rwjblue/ember-test-waiters.svg?branch=master)](https://travis-ci.com/rwjblue/ember-test-waiters)
[![npm version](https://badge.fury.io/js/ember-test-waiters.svg)](https://badge.fury.io/js/ember-test-waiters)
[![Code Style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](#badge)

This addon provides APIs to allow [@ember/test-helpers](https://github.com/emberjs/ember-test-helpers/) to play nicely
with other asynchronous operations, such as an application that is waiting for a CSS transition or an IndexDB transaction.
The async helpers inside `@ember/test-helpers` return promises (i.e. `click`, `andThen`, `visit`, etc). Waiters run periodically
after each helper has executed until a predetermined condition is met. After the waiters finish, the next async helper
is executed and the process repeats.

This allows the test suite to pause at deterministic intervals, and helps thread together the async nature of tests.

Test waiters can be added to application code to provide the necessary integration with the test suite. The waiters will
function as intended in development mode, and we strip the vast majority of the functionality in production mode so as to
minimize negative performance impact.

## Compatibility

- Ember.js v2.18 or above
- Ember CLI v2.13 or above

## Installation

```
ember install ember-test-waiters
```

## Usage

`ember-test-waiters` uses a minimal API to provide waiting functionality. This minimal API can be composed to accommodate various complex scenarios.

### buildWaiter function

The `buildWaiter` function is, in most cases, all you will need to wait for async operations to complete before continuing tests. It returns a waiter instance
that provides a number of methods. The key methods that allow you to control async behavior are `beginAsync` and `endAsync`, which are expected to be called as
a pair to _begin_ waiting and _end_ waiting respectively. The `beginAsync` method returns a `token`, which uniquely identifies that async operation. To mark the
async operation as complete, call `endAsync`, passing in the `token` that was returned from the prior `beginAsync` call.

```js
import Component from '@ember/component';
import { buildWaiter } from 'ember-test-waiters';

let waiter = buildWaiter('friend-waiter');

export default class Friendz extends Component {
  didInsertElement() {
    let token = waiter.beginAsync();

    someAsyncWork()
      .then(() => {
        //... some work
      })
      .finally(() => {
        waiter.endAsync(token);
      });
  }
}
```

### waitForPromise function

This addon also provides a `waitForPromise` function, which can be used to wrap a promise to register it with the test waiter system. _Note_: the
`waitForPromise` function will ensure that `endAsync` is called correctly in the `finally` call of your promise.

```js
import Component from '@ember/component';
import { waitForPromise } from 'ember-test-waiters';

export default class MoreFriendz extends Component {
  didInsertElement() {
    waitForPromise(someAsyncWork).then(() => {
      doOtherThings();
    });
  }
}
```

### Waiting on all waiters

The `ember-test-waiters` addon provides a `waiter-manager` to register, unregister, iterate and invoke waiters to determine if we should wait for conditions to be met or continue test execution. This functionality is encapsulated in the `hasPendingWaiters` function, which evaluates each registered waiter to determine its current state.

```js
import { hasPendingWaiters } from 'ember-test-waiters';

// ...

// true if waiters are pending, allowing us to still wait for async to complete
let hasPendingWaiters = hasPendingWaiters();

// ...
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
