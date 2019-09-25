# Frameworks flow
This document is intended to explain all differences between testing frameworks.

## Mocha
[Mocha](https://github.com/mochajs/mocha) is a testing framework without builtin assertions, this is why it is not checking tests
for at least one assertion, so in our Mocha specific [test fixture](https://github.com/js-reporters/js-reporters/blob/master/test/fixtures/mocha.js)
we can have empty tests.

Tests are grouped in `suites`, which can also be `nested`. Tests can be placed also outside of a suite, we call them *global tests*.

Internally Mocha wraps everything in a suite, we call it *global suite*, so the global tests will become the tests of the aformentioned suite, as also all other top level suites will become its direct child suites, implicitly all other suites will become its more deeper child suites, in a recursive structure.

Test particularities:
  * skipped tests start is not emitted by Mocha on its event *test*, but their end is emitted on *test end*
  * skipped tests do not have the `duration` property (i.e runtime) at all
  * failed tests have only one error, even if the tests contain multiple assertions, Mocha stops on the first failed assertion
  * the error of a failed test is only passed as parameter on Mocha's *fail* event, the `err` property is not availabe on the test object passed on "test end" event, it would be availabe only if you use Mocha's builtin reporters, because this property is added by their [base reporter](https://github.com/mochajs/mocha/blob/e939d8e4379a622e28064ca3a75f3e1bda7e225b/lib/reporters/base.js#L279)

Suite particularities:
  * the start and end of a suite, even the global one, are emitted only if the suite contains at least a test or a child suite (i.e nested suites) that contains a test

One interesting aspect is the execution of nested suites. Practically, when a suite in encountered that contains also suites and tests, its tests are always executed before the suites, no matter if the tests were declared after their siblings suites.

Lets take an example, to see quite all the idea explained above:

```js
describe('a', function() {
 describe('b', function() {
  it('bb', function () {});
 });

 describe('c', function() {
  describe('ca', function() {
   it('cca', function() {});
  });

  it('cc', function() {});
 });

 describe('d', function () {
 });

 it('aa', function() {});
});
```
Execution flow:
 * global suite starts
 * suite *a* starts
 * test *aa* starts
 * test *aa* ends
 * suite *b* starts
 * test *bb* starts
 * test *bb* ends
 * suite *b* ends
 * suite *c* starts
 * test *cc* starts
 * test *cc* ends
 * suite *ca* starts
 * test *cca* starts
 * test *cca* ends
 * suite *ca* ends
 * suite *c* ends
 * suite *a* ends
 * global suite ends

This is the execution of the above test fixture, as you can see the `d suite` is not executed.

Mocha has also an open [issue](https://github.com/mochajs/mocha/issues/902) for random test execution.

## QUnit

[QUnit](http://qunitjs.com/) is a testing framework with builtin assertion, so it is checking tests for at least one assertion, if it does not find one, the test will fail with an error thrown by QUnit itself.

Tests are grouped in modules, which can be also nested from [1.20.0 version](https://github.com/jquery/qunit/blob/master/History.md#1200--2015-10-27). Tests can be placed outside a module, we call them also *global tests*.

Internally QUnit has a global module, where global tests are putted, but it does not wrap the other modules into it. To emit a global suite on our *runStart/runEnd* events we must access QUnit internals, *QUnit.config.modules* which is a linear array that will contain all modules, even the nested ones.

An interesting fact of *QUnit.config.modules* is that it will not contain the *global module* if it does not have at least
one test, but it will contain all other modules, even if they do not have a test.

Test particularities:
  * skipped tests have a numeric value for their runtime

Modules particularities:
  * the start and end of a module, even the global one, are emitted only if the suite itself contains at least one test
  * nested modules have a concatenated name, from the outer most suite to the inner most

The execution is done in the source order, but QUnit has a more flat style for nested modules, it emits the start of a module, emits its tests, then the module ends and starts another, even if the modules were nested, there is not a sort of recursion between the modules.

**In contrast with the source order execution, the QUnit default reporter is always displaying only the suites in the source order**, tests are displayed together with their parent module which breaks the source order, this applies also for random tests execution (check out below example).

Example:

```js
module('a', function() {
	module('b', function() {
    test('bb', function(assert) {
      assert.ok(true);
    });
  });

  module('c', function() {
  	module('ca', function() {
      test('cca', function(assert) {
        assert.ok(true);
      });
  	});

  	test('cc', function(assert) {
  		assert.ok(true);
  	});
  });

  module('d', function() {

  });

  test('aa', function(assert) {
  	assert.ok(true);
  });
});
```
Execution flow:
  * module  *a > b*  starts
  * test  *bb*  starts
  * test  *bb*  ends
  * module  *a > b*  ends
  * module  *a > c > ca* starts
  * test *cca* starts
  * test *cca* ends
  * module *a > c > ca* ends
  * module *a > c* starts
  * test *cc* starts
  * test *cc* starts
  * module *a > c* ends
  * module  *a*  starts
  * test  *aa*  starts
  * test  *aa*  ends
  * module  *a*  ends

Reporter output:
* a: aa (1)
* a > b: bb (1)
* a > c: cc (1)
* a > c > ca: cca (1)

The *QUnit.config.modules* will contain 5 modules:
  0. module *a*
  1. module *a > b*
  2. module *a > c*
  3. module *a > c > a*
  4. module *a > d*

**The above execution flow is the default one**, QUnit has also 2 options that randomizes tests execution:
  1. the [reorder](http://api.qunitjs.com/QUnit.config/) option that on a rerun, runs firstly the failed tests, it is activated by default
  2. the [seed](http://api.qunitjs.com/QUnit.config/) option that randomizes tests execution, it is disabled by default

**The QUnit.config.modules will always contain the suites in the same order!**

## Jasmine
[Jasmine](http://jasmine.github.io/) is another testing framework with builtin assertions. Tests will pass even without containing any assertion.

Tests are grouped in suites, which can be nested. Tests can be placed also outside a suite, then they will belong to Jasmine's global suite.

To obtain information about the relationships between tests and suites can be achieved only through Jasmines's `topSuite`, because the objects emitted on Jasmine specific events contain only plain data about the test/suite in cause.

Tests and suites objects contain always a unique id assigned by Jasmine itself. 

Test particularities:
* tests have no `runtime` prop
* failed tests can contain multiple errors, i.e *failedExpectations*
* *beforeAll*, *beforeEach*, *afterEach* hook's errors will result in tests errors

Suite particularities:
  * the global suite start and end is not emitted
  * the start and end of a suite is emitted even if it does not contain any tests or other suites
  * suites have a *failedExpectations* prop which can contain only errors happend in the `afterAll` hook

Jasmine test execution is done exactly in the source order.

Example:
```js
describe('a', function() {
  describe('b', function() {
    it('bb', function() {
      expect(true).toBeTruthy();
    });
  });

  describe('c', function() {
    describe('ca', function() {
      it('cca', function() {
        expect(true).toBeTruthy();
      });
    });

    it('cc', function() {
      expect(true).toBeTruthy();
    });
  });

  describe('d', function() {
  });

  it('aa', function() {
    expect(true).toBeTruthy();
  });
});
```

Execution flow:
* Suite *a* starts
* Suite *b* starts
* Test *bb* starts
* Test *bb* ends
* Suite *b* ends
* Suite *c* starts
* Suite *ca* starts
* Test *cca* starts
* Test *cca* ends
* Suite *ca* ends
* Test *cc* starts
* Test *cc* ends
* Suite *c* ends
* Suite *d* starts
* Suite *d* ends
* Test *aa* starts
* Test *aa* ends
* Suite *a* ends

**Jasmine has also an option for randomizing tests execution**, the default reporter will alwasys show the tests in the order they were executed.

