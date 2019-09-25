@ember/test-helpers
==============================================================================

[![Build Status](https://secure.travis-ci.org/emberjs/ember-test-helpers.svg?branch=master)](http://travis-ci.org/emberjs/ember-test-helpers)

A test-framework-agnostic set of helpers for testing Ember.js applications

Installation
------------------------------------------------------------------------------

If you are writing a regular Ember app or addon there is not much for you to
do as [ember-qunit](https://github.com/emberjs/ember-qunit) (and
[ember-mocha](https://github.com/emberjs/ember-mocha)) already include this
package as a dependency. You only need to make sure that you are using a
recent enough version of either one of these packages.

If you are working on `ember-qunit` or `ember-mocha` themselves you can
install this package like any other regular Ember addon. 


Usage
------------------------------------------------------------------------------

This package exports several helper functions that can be used to improve
the testing experience when developing Ember.js apps or addons.

These helper functions include DOM interaction helpers (`click()`, `fillIn()`,
...), routing and rendering helpers (`visit()`, `render()`, ...) and some
other things that make it easy to write good tests.

**The full documentation can be found in the [API reference](API.md).**


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-test-helpers`
* `yarn install`

### Running tests

* `yarn test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).


Attribution
------------------------------------------------------------------------------

Much of `ember-test-helpers` was extracted from the original `ember-qunit`,
which was written by Stefan Penner, Robert Jackson, and Ryan Florence.


Copyright and License
------------------------------------------------------------------------------

Copyright 2015 [Switchfly](https://github.com/switchfly) and contributors.

Dual-licensed under the [Apache License, Version 2.0](./APACHE-LICENSE) and
the [MIT License](./MIT-LICENSE).
