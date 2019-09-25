
Legacy Guide
==============================================================================

This document describes the use of `ember-qunit` with Ember's legacy testing
APIs, which have been superseded by the newer testing system based on the RFCs
[232](https://github.com/emberjs/rfcs/blob/master/text/0232-simplify-qunit-testing-api.md) 
and 
[268](https://github.com/emberjs/rfcs/blob/master/text/0268-acceptance-testing-refactor.md).

## Usage

- [Component Integration Tests](#component-integration-tests)
- [Component Unit Tests](#component-unit-tests)
- [Other Tests](#other-tests)
- [Ember Data Tests](#ember-data-tests)

### Component Integration Tests

```js
import hbs from 'htmlbars-inline-precompile';
import { test, moduleForComponent } from 'ember-qunit';

moduleForComponent('x-foo', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // setup the outer context
  this.set('value', 'cat');
  this.on('action', function(result) {
    assert.equal(result, 'bar', 'The correct result was returned');
  });

  // render the component
  this.render(hbs`
    {{ x-foo value=value action="result" }}
  `);

  assert.equal(this.$('div>.value').text(), 'cat', 'The component shows the correct value');

  this.$('button').click();
});
```

Component integration tests are the default mode for `moduleForComponent`. You can still explicitly activate them by passing `integration: true`.

Integration tests have the advantage of testing your component as Ember would actually use them.  It's helpful to think of this mode as simply testing the inputs and outputs of the component.  These tests allow you interact with both the bound values that are passed into the component as well as its resulting actions.

Component integration tests have the following features:
- Your test context `this` acts as the outer context for the component.  As a result, you can call `this.set` and `this.on` to setup values and event listeners that you can then have interact with the component.
- You are required to render the component as a template, e.g. ``this.render(hbs`{{ your-component-name value=value action="updated" }}`)``.  You can render other components as well as block content.
- All of the normal Ember lifecycle hooks for a component are called (including the new ones from 1.13.x).
- Testing the component's template is through `this.$()`.
- You do not require dependencies through `needs:`.  Doing so will force the test into unit mode.
- You do not have direct access to the component instance.  (`this.subject()` will raise an exception).

### Component Unit Tests

[Ember Guide](http://guides.emberjs.com/v1.13.0/testing/testing-components/)

```js
import { test, moduleForComponent } from 'ember-qunit';

moduleForComponent('x-foo', {
  unit: true,
  needs: ['helper:pluralize-string']
});

// run a test
test('it renders', function(assert) {
  assert.expect(1);

  // creates the component instance
  var subject = this.subject();

  // render the component on the page
  this.render();
  assert.equal(this.$('.foo').text(), 'bar');
});
```

Unit tests used to be the default mode for component tests. To flag a test as a unit test, either specify `unit: true` or include `needs: []` in the callbacks object.

Unit tests have the advantage of giving you direct access to the component instance so you can test its internals.  Unit tests have the following features:

- You have access to the component instance through `this.subject()`.
- If you want to render the component's template, call either `this.render()` or `this.$()`.
- Testing the component's template is through `this.$()`.
- You are required to specify any dependencies other than the component's template in the `needs: []` option.  This includes helpers, services, partials, and any other components (with their templates) that are referenced.
- Unit tests do not call most of the Ember lifecycle hooks.  `didInsertElement` and `willDestroyElement` will be called, but the remaining hooks introduced in Ember 1.13.x will not be.
- There is no outer context for the component so testing things such as actions will require directly stubbing the actions on the component.

### Other Tests

[Controllers Guide](http://guides.emberjs.com/v1.13.0/testing/testing-controllers/)

[Routes Guide](http://guides.emberjs.com/v1.13.0/testing/testing-routes/)

```js
import { test, moduleFor } from 'ember-qunit';

moduleFor('controller:home');

test('It can calculate the result', function(assert) {
  assert.expect(1);

  var subject = this.subject();

  subject.set('value', 'foo');
  assert.equal(subject.get('result'), 'bar');
});
```

`moduleFor` works for any object you could look up with the Ember Resolver (service, routes, controllers, etc.).

Note: Controllers / Routes do not have access to rendering.  You will need to either use a component test or an acceptance test.

### Ember Data Tests

[Ember Guide](http://guides.emberjs.com/v1.13.0/testing/testing-models/)

```js
import { test, moduleForModel } from 'ember-qunit';

moduleForModel('user', {
  needs: ['model:child']
});

test('It can set its child', function(assert) {
  assert.expect(1);
  var subject = this.subject();

  var child = subject.store.createRecord('child');
  subject.get('children').pushObject(child);

  assert.equal(subject.get('some-computed-value'), true);
});
```

## Advanced Usage
### Setting the resolver

```js
// if you don't have a custom resolver, do it like this:
setResolver(Ember.DefaultResolver.create({ namespace: App }));

// otherwise something like:
import Resolver from './path/to/resolver';
import { setResolver } from 'ember-qunit';
setResolver(Resolver.create());
```

### Async Example

Under the hood, if you use `Ember.RSVP.Promise`, ember-qunit will call
QUnit's `start` and `stop` helpers to stop the test from tearing down
and running other tests while your asynchronous code runs. ember-qunit
also asserts that the promise gets fulfilled.

In addition, you can also return promises in the test body:

```js
// If you return a promise from a test callback it becomes an asyncTest. This
// is a key difference between ember-qunit and standard QUnit.
test('async is awesome', function(assert) {
  assert.expect(1);
  var myThing = MyThing.create();
  // myThing.exampleMethod() returns a promise
  return myThing.exampleMethod().then(function() {
    assert.ok(myThing.get('finished'));
  });
});
```

If an error is thrown in your promise or a promise
within `test` becomes rejected, ember-qunit will fail the test.
To assert that a promise should be rejected, you can "catch"
the error and assert that you got there:

```js
test('sometimes async gets rejected', function(assert) {
  assert.expect(1);
  var myThing = MyThing.create()

  return myThing.exampleMethod().then(function() {
    assert.ok(false, "promise should not be fulfilled");
  })['catch'](function(err) {
    assert.equal(err.message, "User not Authorized");
  });
});
```

## Test Helpers

### `moduleFor(fullName [, description [, callbacks]])`

- `fullName`: (String) - The full name of the unit, ie
  `controller:application`, `route:index`.

- `description`: (String) optional - The description of the module

- `callbacks`: (Object) optional
   - QUnit callbacks (`beforeEach` and `afterEach`)
   - ember-test-helpers callback (`subject`)
   - `integration: true` or `unit: true` (default: `integration: true`)
   - `needs` specify any dependencies the tested module will require.

### `moduleForComponent(name, [description, callbacks])`

- `name`: (String) - the short name of the component that you'd use in a
  template, ie `x-foo`, `ic-tabs`, etc.

- `description`: (String) optional - The description of the module

- `callbacks`: (Object) optional
   - QUnit callbacks (`beforeEach` and `afterEach`)
   - ember-test-helpers callback (`subject`)
   - `integration: true` or `unit: true` (default: `integration: true`)
   - `needs` specify any dependencies the tested module will require.  (Including this will force your test into unit mode).

### `moduleForModel(name, [description, callbacks])`

- `name`: (String) - the short name of the model you'd use in `store`
  operations ie `user`, `assignmentGroup`, etc.

- `description`: (String) optional - The description of the module

- `callbacks`: (Object) optional
   - QUnit callbacks (`beforeEach` and `afterEach`)
   - ember-test-helpers callback (`subject`)
   - `integration: true` or `unit: true` (default: `integration: true`)
   - `needs` specify any dependencies the tested module will require.
