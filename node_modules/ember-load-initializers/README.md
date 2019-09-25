Ember-load-initializers [![Build Status](https://travis-ci.org/ember-cli/ember-load-initializers.svg?branch=master)](https://travis-ci.org/ember-cli/ember-load-initializers)
==============================================================================

A tiny add-on to autoload your initializer and instance initializer files in ember-cli. This add-on iterates over files inside `app/initializers` and `app/instance-initializers` and invokes the `app.initializer` and `app.instanceInitializer` methods respectively, by passing on the resolved name of the files.

Installation
------------------------------------------------------------------------------

```
ember install ember-load-initializers
```

Contributing
------------------------------------------------------------------------------

### Installation

* `git clone https://github.com/ember-cli/ember-load-initializers.git`
* `cd ember-load-initializers`
* `yarn`

### Linting

* `yarn lint:hbs`
* `yarn lint:js`
* `yarn lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
