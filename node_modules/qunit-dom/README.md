qunit-dom
==============================================================================

[![TravisCI Build Status][travis-badge]][travis-badge-url]
[![Latest NPM release][npm-badge]][npm-badge-url]

[npm-badge]: https://img.shields.io/npm/v/qunit-dom.svg
[npm-badge-url]: https://www.npmjs.com/package/qunit-dom
[travis-badge]: https://img.shields.io/travis/simplabs/qunit-dom/master.svg
[travis-badge-url]: https://travis-ci.org/simplabs/qunit-dom

High Level DOM Assertions for [QUnit](https://qunitjs.com/)

```js
assert.dom('h1').exists();
assert.dom('h1').hasClass('title');
assert.dom('h1').hasText('Welcome to Ember, John Doe!');

assert.dom('input').isFocused();
assert.dom('input').hasValue(/.+ Doe/);
assert.dom('input').hasAttribute('type', 'text');
```


Install
------------------------------------------------------------------------------

### npm

```bash
npm install --save-dev qunit-dom
```

or using [`yarn`](https://yarnpkg.com/):

```bash
yarn add --dev qunit-dom
```

(This is the recommended method for Ember projects.)

### `<script>` Tag

Load `qunit-dom.js` *after* `qunit.js`:

```html
<script src="https://unpkg.com/qunitjs/qunit/qunit.js"></script>
<script src="https://unpkg.com/qunit-dom/dist/qunit-dom.js"></script>
```


Usage
------------------------------------------------------------------------------

Once installed the DOM element assertions are available at `assert.dom(...).*`:

```js
test('the title is welcoming', function(assert) {
  assert.dom('#title').hasText('Welcome to QUnit');
});
```

**All available assertions are documented in [API.md](API.md).**

A basic codemod to automatically convert your assertions is available at
[https://github.com/simplabs/qunit-dom-codemod](https://github.com/simplabs/qunit-dom-codemod).


### TypeScript

`qunit-dom` includes type definition files, but the way it extends QUnit means
that you need import it somewhere so that TS and your editor can pick up the
types. It is recommended to add the following line to your
`tests/test-helper.ts` file:

```
import 'qunit-dom';
```

Rename your `tests/test-helper.js` to `.ts` if you do not have such a
file yet.

Contributing
------------------------------------------------------------------------------

### How to Run Tests

```bash
yarn test
```

### How to Generate the Documentation

```bash
yarn docs
```

Related
------------------------------------------------------------------------------

- [chai-dom](https://github.com/nathanboktae/chai-dom) – DOM assertions for
  the Chai assertion library using vanilla JavaScript
- [chai-jquery](https://github.com/chaijs/chai-jquery) – jQuery assertions
  for chai


License
------------------------------------------------------------------------------

qunit-dom is developed by and &copy;
[simplabs GmbH](http://simplabs.com) and contributors. It is released under the
[MIT License](https://github.com/simplabs/qunit-dom/blob/master/LICENSE.md).
