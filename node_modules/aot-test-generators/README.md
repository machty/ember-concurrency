aot-test-generators
==============================================================================

[![Build Status](https://travis-ci.org/ember-cli/aot-test-generators.svg?branch=master)](https://travis-ci.org/ember-cli/aot-test-generators)
[![npm](https://img.shields.io/npm/v/aot-test-generators.svg)](https://www.npmjs.com/package/aot-test-generators)

> Generate test suites for checks that already happened at build-time


Install
-------------------------------------------------------------------------------

```
npm install --save aot-test-generators
```


Usage
-------------------------------------------------------------------------------

```js
const testGenerators = require('aot-test-generators');

let test = testGenerators.qunit.test('5 is not 42', true);

console.log(test);
// QUnit.test('test-name', function(assert) {
//   assert.expect(1);
//   assert.ok(true, 'assertion-message');
// });
```

`aot-test-generators` currently supports:

- [Mocha](https://mochajs.org/) (exported as `mocha`).
- [QUnit](https://qunitjs.com/) (exported as `qunit`)


API
-------------------------------------------------------------------------------

### test(testName, passed, [assertionMessage])

Generates code for passing and failing tests.

#### testName

Type: `string`

Name of the test.

#### passed

Type: `boolean`

`true` generates a passing test, `false` generates a failing test.

#### assertionMessage

Type: `string`<br>
Default: same as `testName`

Assertion message inside of the test.


### suiteHeader(suiteName)

Generates test suite header code.

#### suiteName

Type: `string`

Name of the test suite.


### suiteFooter()

Generates test suite footer code (if necessary).


License
-------------------------------------------------------------------------------

This project is licensed under the [Apache License 2.0](LICENSE).
