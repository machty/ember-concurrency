Ember Sinon
===========

[![Greenkeeper badge](https://badges.greenkeeper.io/csantero/ember-sinon.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/csantero/ember-sinon.svg?branch=master)](https://travis-ci.org/csantero/ember-sinon)
[![Ember Observer Score](http://emberobserver.com/badges/ember-sinon.svg)](http://emberobserver.com/addons/ember-sinon)
[![Dependency Status](https://www.versioneye.com/user/projects/56c7c42a18b27104252dcb49/badge.svg?style=flat)](https://www.versioneye.com/user/projects/56c7c42a18b27104252dcb49)
[![Code Climate](https://codeclimate.com/github/csantero/ember-sinon/badges/gpa.svg)](https://codeclimate.com/github/csantero/ember-sinon)
[![Codacy Badge](https://api.codacy.com/project/badge/grade/b6e21f46906b4847907956ea4806cfa9)](https://www.codacy.com/app/hawker-jordan/ember-sinon)

This addon adds support for [Sinon](https://github.com/cjohansen/Sinon.JS) to assist in testing your Ember CLI app.

Installation
------------------------------------------------------------------------------

```
ember install ember-sinon
```


Usage
------------------------------------------------------------------------------

While in testing mode (i.e. either when visiting `/tests` or when running `ember test`), `sinon` will be available as an import.

```js
import sinon from 'sinon';

test(".runCallback() should run the callback passed", function(assert) {
  var spy = sinon.spy();
  this.subject().runCallback(spy);

  // Default Sinon messages:
  sinon.assert.calledOnce(spy);
  sinon.assert.calledWith(spy, 'foo');

  // Custom messages:
  assert.ok(spy.calledOnce, "the callback should be called once");
  assert.ok(spy.calledWith('foo'), "the callback should be passed 'foo' as an argument");
});
```

## Integration with testing frameworks

Check out [ember-sinon-qunit](https://github.com/elwayman02/ember-sinon-qunit) for integration with Ember-QUnit!

Contributing
------------------------------------------------------------------------------

### Installation

* `git clone git@github.com:csantero/ember-sinon.git`
* `cd my-addon`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

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
