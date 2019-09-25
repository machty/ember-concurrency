# attach-ware [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Middleware with configuration.

## Installation

[npm][npm-install]:

```bash
npm install attach-ware
```

**attach-ware** is also available as an AMD, CommonJS, and globals
module, [uncompressed and compressed][releases].

## Usage

`x.js`:

```js
module.exports = function (ctx, options) {
    if (!options.condition) return;

    return function (req, res, next) {
        res.x = 'hello';
        next();
    };
}
```

`y.js`:

```js
module.exports = function (ctx, options) {
    if (!options.condition) return;

    return function (req, res, next) {
        res.y = 'world';
        next();
    };
}
```

`index.js`:

```js
var ware = require('attach-ware')(require('ware'));
var x = require('./x.js');
var y = require('./y.js');

var middleware = attachWare()
    .use(x, {'condition': true})
    .use(y, {'condition': false})
    .run({}, {}, function (err, req, res) {
        console.log(res.x); // "hello"
        console.log(res.y); // undefined
    });
```

## API

### `AttachWare = attachWare(Ware)`

Create a new `AttachWare` based on the given middleware constructor.

**Parameters**:

*   `Ware` ([`Ware`][ware]).

**Returns**: `Function`.

### `AttachWare()`

Create configurable middleware.  Works just like the given
[`Ware`][ware].

### `AttachWare#use(attach[, input...])`

Invokes `attach` with [`context`][context] and all `input`.

If `attach` returns another function (`fn`, which can be synchronous,
asynchronous, or a generator function), that function is [added to the
middleware][ware-use], and will be invoked when [`run()`][ware-run] is
invoked like normal middleware.

### `AttachWare#context`

The first argument for `attach`ers. When this is falsey, the instance
itself is used.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/attach-ware.svg

[travis]: https://travis-ci.org/wooorm/attach-ware

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/attach-ware.svg

[codecov]: https://codecov.io/github/wooorm/attach-ware

[npm-install]: https://docs.npmjs.com/cli/install

[releases]: https://github.com/wooorm/attach-ware/releases

[license]: LICENSE

[author]: http://wooorm.com

[ware]: https://github.com/segmentio/ware#ware-1

[ware-use]: https://github.com/segmentio/ware#usefn

[ware-run]: https://github.com/segmentio/ware#runinput-callback

[context]: #attachwarecontext
