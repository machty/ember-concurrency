# get-comments [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] 

> Extract javascript comments on per character basis. Comment object compatible with `acorn-extract-comments` and Esprima format.

**Notice:** It extracts only first level block comments, not include nested comments.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]


## Install
```
npm i get-comments --save
npm test
```


## Usage
> For more use-cases see the [tests](./test.js)

- `<input>` **{String}** string to extract from
- `[resType]` **{Boolean}** if true, will return array, otherwise object
- `return` **{Array|Object}**

**Example**
```js
var getComments = require('get-comments');

var input = fs.readFileSync('./fixture.js', 'utf8')
var comments = getComments(input, true)
//=>
// [ {
//   "start": 249,
//   "end": 1353,
//   "type": "Block",
//   "loc": {
//     "start": {
//       "line": 12,
//       "column": 0
//     },
//     "end": {
//       "line": 48,
//       "column": 3
//     }
//   },
//   "value": "*\n * > Filtering incoming request ...",
//   "api": true,
//   "after": "module.exports = function koaIpFilter (options) {"
// }, {
//   "start": 2187,
//   "end": 2267,
//   "type": "Block",
//   "loc": {
//     "start": {
//       "line": 82,
//       "column": 0
//     },
//     "end": {
//       "line": 87,
//       "column": 3
//     }
//   },
//   "value": "*\n * abcd description\n *\n * @name koaIpFilter\n * @param {Object} `options`\n ",
//   "api": false,
//   "after": "exports.data = function () {"
// } ]
```


## See also
- [acorn-extract-comments](https://github.com/tunnckocore/acorn-extract-comments): Extract JavaScript code comments from a string, using `acorn`… [more](https://github.com/tunnckocore/acorn-extract-comments)
- [acorn-strip-comments](https://github.com/tunnckocore/acorn-strip-comments): Strip code comments from given input string, using acorn javascript… [more](https://github.com/tunnckocore/acorn-strip-comments)
- [esprima-extract-comments](https://github.com/jonschlinkert/esprima-extract-comments): Extract code comments from string or from a glob of… [more](https://github.com/jonschlinkert/esprima-extract-comments)
- [js-comments](https://github.com/jonschlinkert/js-comments): Parse JavaScript code comments and generate API documentation.
- [parse-comments](https://github.com/jonschlinkert/parse-comments): Parse code comments from JavaScript or any language that uses… [more](https://github.com/jonschlinkert/parse-comments)


## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/tunnckoCore/get-comments/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.


## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckocore.tk][author-www-img]][author-www-url] [![keybase tunnckocore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]


[npmjs-url]: https://www.npmjs.com/package/get-comments
[npmjs-img]: https://img.shields.io/npm/v/get-comments.svg?label=get-comments

[license-url]: https://github.com/tunnckoCore/get-comments/blob/master/LICENSE.md
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg


[codeclimate-url]: https://codeclimate.com/github/tunnckoCore/get-comments
[codeclimate-img]: https://img.shields.io/codeclimate/github/tunnckoCore/get-comments.svg

[travis-url]: https://travis-ci.org/tunnckoCore/get-comments
[travis-img]: https://img.shields.io/travis/tunnckoCore/get-comments.svg

[coveralls-url]: https://coveralls.io/r/tunnckoCore/get-comments
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/get-comments.svg

[david-url]: https://david-dm.org/tunnckoCore/get-comments
[david-img]: https://img.shields.io/david/dev/tunnckoCore/get-comments.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg


[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/messages
[new-message-img]: https://img.shields.io/badge/send%20me-message-green.svg