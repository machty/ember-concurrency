
Migration Guide
==============================================================================

This guide provides instruction for upgrading your test suite from the
[Legacy APIs](legacy.md) to Ember's latest testing APIs based on RFCs
[232](https://github.com/emberjs/rfcs/blob/master/text/0232-simplify-qunit-testing-api.md)
and
[268](https://github.com/emberjs/rfcs/blob/master/text/0268-acceptance-testing-refactor.md).

Upgrading to the new testing APIs
------------------------------------------------------------------------------

For the complete introduction to the new testing APIs, please read the
latest [Ember Guides](https://guides.emberjs.com/v3.0.0/testing/). The
following examples will give you an overview how to migrate your existing Ember
QUnit based test suite.

### Unit tests

Before:

```javascript
import { test, moduleFor } from 'ember-qunit';

moduleFor('controller:sidebar', 'SidebarController', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

// Replace this with your real tests.
test('exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
```

After:

```javascript
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('SidebarController', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('exists', function() {
    let controller = this.owner.lookup('controller:sidebar');
    assert.ok(controller);
  });
});
```

#### Migration steps

* Use `module` and `test` imported from `qunit` directly
* Use `setupTest()` instead of `moduleFor()`
* Use the Owner object given by `this.owner` directly instead of `this.subject()`

You can use the
[ember-qunit-codemod](https://github.com/rwjblue/ember-qunit-codemod)
to update your test code automatically.

### Component tests

Before:

```javascript
import { test, moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('GravatarImageComponent', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{gravatar-image}}`);
  assert.equal(this.$('img').length, 1);
});
```

After:

```javascript
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('GravatarImageComponent', function(hooks) {
  setupRenderingTest(hooks);

  test('renders', async function() {
    await render(hbs`{{gravatar-image}}`);
    assert.ok(this.element.querySelector('img'));
  });
});
```

#### Migration steps

* Use `module` and `test` imported from `qunit` directly
* Use `setupRenderingTest()` instead of `moduleForComponent()`
* Render using the `render()` helper from `@ember/test-helpers` instead of
  `this.render()`
* `render()` is now always an async call, so use `async`/`await` to wait for it
  to complete
* Use `this.element` to get access to the rendered DOM
* Do not use jQuery for DOM interaction, instead use the
  [DOM Interaction Helpers](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#dom-interaction-helpers)
  from `@ember/test-helpers`

You can use the
[ember-qunit-codemod](https://github.com/rwjblue/ember-qunit-codemod)
to update your test setup code automatically.

For migrating to the DOM interaction helpers, you can use the
[ember-test-helpers-codemod](https://github.com/simonihmig/ember-test-helpers-codemod)
to automatically convert all or most of it.

### Acceptance tests

Before:

```javascript

import { test } from 'qunit';
import moduleForAcceptance from 'app/tests/helpers/module-for-acceptance';

moduleForAcceptance('basic acceptance test');

test('can visit /', function() {
  visit('/');

  andThen(() => {
    assert.equal(currentURL(), '/');
  });
});
```

After:


```javascript
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit, currentURL } from '@ember/test-helpers';

module('basic acceptance test', function(hooks) {
  setupApplicationTest(hooks);

  test('can visit /', async function(assert) {
    await visit('/');
    assert.equal(currentURL(), '/');
  });
});
```

#### Migration steps

* Use `module` and `test` imported from `qunit` directly
* Use `setupApplicationTest()` instead of `moduleForAcceptance()` or `beforeEach`/`afterEach` hooks for setting up the
  application
* Use the [Routing Helpers](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#routing-helpers)
  from `@ember/test-helpers` instead of the global helpers, e.g. `visit`
* Do not use the "global" test helpers for DOM interaction, instead use the
  [DOM Interaction Helpers](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#dom-interaction-helpers)
  from `@ember/test-helpers`
* use `async`/`await` to wait for asynchronous operations like `visit()` or
  `click()`
* use `this.element` to get access to the rendered DOM

You can use the
[ember-qunit-codemod](https://github.com/rwjblue/ember-qunit-codemod)
to update your test setup code automatically.

For migrating from the global test helpers to those proved by
`@ember/test-helpers`, you can use the
[ember-test-helpers-codemod](https://github.com/simonihmig/ember-test-helpers-codemod)
to assist you with that task.

##### Caveats

* As of ember-cli-qunit@4.1.0 / ember-qunit@3.0.0, `Ember.testing` is only set tor `true` during the test run. Previously it was always set to `true`. For more information see https://github.com/ember-cli/eslint-plugin-ember/tree/master/docs/rules/no-ember-testing-in-module-scope.md
