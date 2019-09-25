# spawnback

Simplified process spawning with buffered output in a callback.

Support this project by [donating on Gratipay](https://gratipay.com/scottgonzalez/).



## Installation

```
npm install spawnback
```



## Usage

```javascript
var spawn = require( "spawnback" );
spawn( "git", [ "status" ], function( error, stdout ) {
	console.log( stdout );
});
```

## API

spawnback follows the same API as node's built-in `child_process.spawn()`, but accepts a callback as the final parameter. The callback receives three paramaters: an error object, stdout as a string, and stderr as a string.

### spawnback( command, [args], [options], callback )

* `command` String: The command to run.
* `args` Array: List of string arguments.
* `options` Object: See the [node API docs](http://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options) for full details on which options are supported.
* `callback` function( error, stdout, stderr ): A callback to invoke when the child process has ended and all stdio streams have terminated.
* return: [`ChildProcess`](http://nodejs.org/api/child_process.html#child_process_child_process) instance.



## License

Copyright 2014 Scott González. Released under the terms of the MIT license.

---

Support this project by [donating on Gratipay](https://gratipay.com/scottgonzalez/).
