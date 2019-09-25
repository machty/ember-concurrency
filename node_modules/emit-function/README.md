# emit-function

because I hate having to import `EventEmitter` and
call `EventEmitter.prototype.emit.bind.bind(EventEmitter.prototype.emit)`.

```javascript

var EE = require('events').EventEmitter
  , emit = require('emit-function')

var ee_1 = new EE
  , ee_2 = new EE

ee_1.on('data', emit(ee_2, 'data'))

```

## api

#### emit(eventemitter, eventName[, curryArg1...curryArgN]) -> function

Creates a function that, when called, calls `emit` on `eventemitter`
with `eventName`. Curried args are placed at the front, args added by
calling the function are added after the curried args. Allows easy
forwarding of events from emitter to emitter.

# license

MIT
