# ember-qunit

[![Latest NPM release][npm-badge]][npm-badge-url]
[![TravisCI Build Status][travis-badge]][travis-badge-url]

[npm-badge]: https://img.shields.io/npm/v/ember-qunit.svg
[npm-badge-url]: https://www.npmjs.com/package/ember-qunit
[travis-badge]: https://img.shields.io/travis/emberjs/ember-qunit/master.svg
[travis-badge-url]: https://travis-ci.org/emberjs/ember-qunit

ember-qunit simplifies testing of Ember applications with
[QUnit](https://qunitjs.com/) by providing QUnit-specific wrappers around the
helpers contained in
[ember-test-helpers](https://github.com/emberjs/ember-test-helpers).


Requirements
------------------------------------------------------------------------------

- Node.js 6 or above
- Ember CLI 2.13 or above

If you need support for Node 4 or older Ember CLI versions please use v3.x
of this addon.


Installation
------------------------------------------------------------------------------

`ember-qunit` is an [Ember CLI](http://www.ember-cli.com/) addon, so install it
as you would any other addon:

```sh
$ ember install ember-qunit
```

Some other addons are detecting the test framework based on the installed
addon names and are expecting `ember-cli-qunit` instead. If you have issues
with this then `ember install ember-cli-qunit`, which should work exactly
the same.

Upgrading
------------------------------------------------------------------------------

For instructions how to upgrade your test suite to the latest testing APIs, 
please read our [Migration Guide](docs/migration.md).

Usage
------------------------------------------------------------------------------

The following section describes the use of ember-qunit with the latest modern
Ember testing APIs, as laid out in the RFCs
[232](https://github.com/emberjs/rfcs/blob/master/text/0232-simplify-qunit-testing-api.md)
and
[268](https://github.com/emberjs/rfcs/blob/master/text/0268-acceptance-testing-refactor.md).

For the older APIs have a look at our [Legacy Guide](docs/legacy.md).

### Setting the Application

Your `tests/test-helper.js` file should look similar to the following, to
correctly setup the application required by `@ember/test-helpers`:

```javascript
import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
```

Also make sure that you have set `ENV.APP.autoboot = false;` for the `test`
environment in your `config/environment.js`.

### Setup Tests

The `setupTest()` function can be used to setup a unit test for any kind
of "module/unit" of your application that can be looked up in a container.

It will setup your test context with:

* `this.owner` to interact with Ember's [Dependency Injection](https://guides.emberjs.com/v3.0.0/applications/dependency-injection/)
  system
* `this.set()`, `this.setProperties()`, `this.get()`, and `this.getProperties()`
* `this.pauseTest()` method to allow easy pausing/resuming of tests

For example, the following is a unit test for the `SidebarController`:

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


### Setup Rendering Tests

The `setupRenderingTest()` function is specifically designed for tests that
render arbitrary templates, including components and helpers.

It will setup your test context the same way as `setupTest()`, and additionally:

* Initializes Ember's renderer to be used with the
  [Rendering helpers](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#rendering-helpers),
  specifically `render()`
* Adds `this.element` to your test context which returns the DOM element
  representing the wrapper around the elements that were rendered via
  `render()`
* sets up the [DOM Interaction Helpers](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#dom-interaction-helpers)
  from `@ember/test-helpers` (`click()`, `fillIn()`, ...)

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

### Setup Application Tests

The `setupApplicationTest()` function can be used to run tests that interact
with the whole application, so in most cases acceptance tests.

On top of `setupTest()` it will:

* Boot your application instance
* Set up all the [DOM Interaction Helpers](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#dom-interaction-helpers)
  (`click()`, `fillIn()`, ...) as well as the [Routing Helpers](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#routing-helpers)
  (`visit()`, `currentURL()`, ...) from `@ember/test-helpers`

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


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-qunit`
* `npm install`

### Running tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
