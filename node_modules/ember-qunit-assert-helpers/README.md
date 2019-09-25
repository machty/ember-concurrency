# ember-qunit-assert-helpers

This addon provides additional QUnit 2.0 assertions that are specific to Ember.js. It is meant to be a replacement for [ember-dev](https://github.com/emberjs/ember-dev) which only supports QUnit 1.0.

Can be use in your application or an addon.

## Installation

```
ember install ember-qunit-assert-helpers
```

## Compatibility

This addon relies on functionality introduced in Ember 2.1. If you need support for Ember 2.0 and old, please also include [ember-debug-handlers-polyfill](https://github.com/rwjblue/ember-debug-handlers-polyfill).

## Usage

### `Ember.assert` Assertions

`assert.expectAssertion(callback, matcher)`

Asserts that `Ember.assert` did throw an error. An optional string or regular expression matcher can be provided to match a specific error message.

```javascript
test('triggers Ember.assert', function(assert) {
  assert.expectAssertion(() => {
    // Code triggers Ember.assert
  });

  assert.expectAssertion(() => {
    Ember.assert('You forgot "bar", the required parameter');
  }, /You forgot "\w+", the required parameter/);
})
```


### `Ember.run` Assertions

`assert.expectNoRunLoop()`

Asserts that there is not a current run loop running and there are no scheduled timers. If there are, they will be cleaned up.

```javascript
test('`Ember.deprecate` was called anytime during the test and matched', function(assert) {
  Ember.run.later(() => { });
  assert.expectNoRunLoop(); // Fail
});
```


### `Ember.deprecate` Assertions

`assert.expectDeprecation(callback, matcher)`

Asserts that `Ember.deprecate` was called. An optional callback can be provided. An optional string or regular expression matcher can also be provided.

```javascript
test('`Ember.deprecate` was called anytime during the test', function(assert) {
  // ...

  // One or more deprecations were triggered since the start of this test
  assert.expectDeprecation();
});

test('`Ember.deprecate` was called in a callback', function(assert) {
  assert.expectDeprecation(() => {
    // Code triggers one or more Ember.deprecate
  });
});

test('`Ember.deprecate` was called anytime during the test and matched', function(assert) {
  // ...

  // One or more deprecations matching a specific message were triggered since the start of this test
  assert.expectDeprecation(/expected deprecation message/);
});

test('`Ember.deprecate` was called in a callback', function(assert) {
  assert.expectDeprecation(() => {
    Ember.deprecate('API is deprecated', false, {
      id: 'old-api',
      until: '3.0.0'
    })
  }, 'API is deprecated');
});
```

`assert.expectNoDeprecation(callback, matcher)`

Asserts that `Ember.deprecate` was not called. An optional callback can be provided. An optional matcher can also be provided.

```javascript
test('`Ember.deprecate` was not called anytime during the test', function(assert) {
  // ...

  // No deprecations were triggered since the start of this test
  assert.expectNoDeprecation();
});
```

### `Ember.warn` Assertions

*Same as `Ember.deprecate`, but for warnings. Above code samples can be applied here.*

`assert.expectWarning(callback, matcher)`

Asserts that `Ember.warn` was called. An optional callback can be provided. An optional matcher can also be provided.

`assert.expectNoWarning(callback, matcher)`

Asserts that `Ember.warn` was not called. An optional callback can be provided. An optional matcher can also be provided.


### `afterEach` asserting

You can easily use these asserts in your `afterEach`.

```javascript
moduleForComponent('x-foo', {
  integration: true,
  afterEach(assert) {
    assert.expectNoDeprecation();
    assert.expectNoRunLoop();
    assert.expectNoWarning();
  }
});
```


## Thanks and Credit

Thanks to Robert Jackson ([@rwjblue](https://github.com/rwjblue)) for providing guidance on the implementation.

Credit goes [ember-dev](https://github.com/emberjs/ember-dev) and [CrowdStrike](https://www.crowdstrike.com/) for the overall concept and much the API provided by this addon.
