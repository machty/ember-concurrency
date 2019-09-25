# Stagehand [![Build Status](https://travis-ci.com/dfreeman/stagehand.svg?branch=master)](https://travis-ci.com/dfreeman/stagehand)

Stagehand provides a type-safe means of coordinating communication across an evented message-passing boundary, such as a web worker or a Node.js child process.

## Example

The following is a quick example of how you might spin up a child process in Node to perform expensive computations:

```ts
// greeting-worker.js
import { launch } from 'stagehand/lib/adapters/child-process';

class GreetingWorker {
  veryExpensiveGreeting(target) {
    // The body of this method (and any others defined on the object passed to
    // `launch`) might be arbitrarily expensive synchronous or async work.
    return `Hello, ${target}!`;
  }
}

launch(new GreetingWorker());
```

```ts
// main.js
import { fork } from 'child_process';
import { connect } from 'stagehand/lib/adapters/child-process';

let worker = await connect(fork('./greeting-worker'));
let greeting = await worker.veryExpensiveGreeting('World');

console.log(greeting); // 'Hello, World!'
```

## API

The main `stagehand` module exports three functions: `launch`, `connect` and `disconnect`. These functions all center around the concept of a `MessageEndpoint`, which is the core interface Stagehand uses for communication.

### `launch<T>(endpoint: MessageEndpoint, implementation: Implementation<T>)`

This function is called to expose a backing implementation object across the given endpoint. Typically you'll call this from your child process/web worker/otherwise-somehow-secondary context in order to begin servicing commands from the parent.

In general, all functions on the implementation object passed to `launch` will be exposed on the corresponding object on the `connect` side, but made async where appropriate. This means that all return values from methods on `implementation` will be promises, but also that functions _passed in_ to methods on the backing implementation will be asynchronous as well.

If you're using TypeScript, you'll find this invariant enforced by the signature of `launch`, i.e.

```ts
// This is valid:
launch(endpoint, {
  doSomething(callback: () => Promise<number>) {
    // Because `callback` is async, can communicate back to the parent when
    // called in order to get the return value
  }
});

// But this is not:
launch(endpoint, {
  doSomething(callback: () => number) {
    // There's no way for `callback` to synchronously get a return value
    // from the function originally passed on the parent side
  }
});
```

### `connect<T>(endpoint: MessageEndpoint): Promise<Remote<T>>`

This function is called to connect to a backing implementation that was set up on the other end of the given message endpoint. It returns a promise that will ultimately resolve to a value that exposes the same methods as the backing implementation.

When calling these methods, their results will always be promises that resolve or reject based on the return value or thrown execption when that method is called on the implementation side.

### `disconnect<T>(remote: Remote<T>)`

Disconnects the given stagehand worker, clearing any saved state on both ends and calling `disconnect` on both halves of the corresponding `MessageEndpoint`.

### `MessageEndpoint`

A `MessageEndpoint` is any object with the following three methods:
 - `onMessage(callback: (message: unknown) => void): void`
 - `sendMessage(message: unknown): void`
 - `disconnect(): void`

Several adapters for converting common communication objects to this type are included in this library:
 - `stagehand/lib/adapters/child-process` creates endpoints for communicating to/from processes spawned with Node.js's [`fork`](https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options) (see the example above)
 - `stagehand/lib/adapters/web-worker` creates endpoints for communicating to /from [web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
 - `stagehand/lib/adapters/in-memory` create endpoints from scratch that both exist within the same process (mostly useful for testing)

These adapter modules also generally expose specialized versions of `launch` and `connect` that accept appropriate objects for the domain they deal with and internally convert them using the endpoint adapters also defined there.

