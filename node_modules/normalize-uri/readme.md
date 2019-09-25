# normalize-uri [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Normalize a URI.

## Installation

[npm][]:

```bash
npm install normalize-uri
```

## Usage

```javascript
var normalizeURI = require('normalize-uri')

normalizeURI('foo bar') // => 'foo%20bar'
normalizeURI('foo%20bar') // => 'foo%20bar'
normalizeURI('👌') // => '%F0%9F%91%8C'
```

## API

### `normalizeURI(value)`

Normalize `uri`.  This only works when both `encodeURI` and `decodeURI` are
available.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/normalize-uri.svg

[travis]: https://travis-ci.org/wooorm/normalize-uri

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/normalize-uri.svg

[codecov]: https://codecov.io/github/wooorm/normalize-uri

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com
