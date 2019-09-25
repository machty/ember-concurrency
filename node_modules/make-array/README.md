# make-array [![NPM version](https://badge.fury.io/js/make-array.svg)](http://badge.fury.io/js/make-array) [![Build Status](https://travis-ci.org/kaelzhang/make-array.svg?branch=master)](https://travis-ci.org/kaelzhang/make-array) [![Dependency Status](https://gemnasium.com/kaelzhang/make-array.svg)](https://gemnasium.com/kaelzhang/make-array)

Creates a real Array from almost anything.

## Install

```bash
$ npm install make-array --save
```

## Usage

```js
var makeArray = require('make-array');
makeArray();              // []
makeArray(undefined);     // []
makeArray(1);             // [1]
makeArray([1, 2]);        // [1, 2]
makeArray({
  '0': 1,
  '1': 2,
  length: 2
});                       // [1, 2]

function foo (){
  return makeArray(arguments);
}

foo(1, 2, 3);             // [1, 2, 3]
```

### makeArray(subject, [host])

- subject `mixed` things you want to make it an array
- host `Array=` if `host` is specified, the newly-created array will append to the end of the `host`

Returns `Array`. If `host` is specified, it will return the `host` itself.

```js
var host = [1, 2];
function foo(){
  return arguments;
}

var result = makeArray(foo({}, []), host);
result;           // [1, 2, {}, []];
result === host;  // true
``` 

## License

MIT
<!-- do not want to make nodeinit to complicated, you can edit this whenever you want. -->