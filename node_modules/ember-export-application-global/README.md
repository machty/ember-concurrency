# ember-export-application-global

[![Build Status](https://travis-ci.org/ember-cli/ember-export-application-global.svg?branch=master)](https://travis-ci.org/ember-cli/ember-export-application-global)
[![devDependency Status](https://david-dm.org/ember-cli/ember-export-application-global/dev-status.svg)](https://david-dm.org/ember-cli/ember-export-application-global#info=devDependencies)
[![npm version](https://badge.fury.io/js/ember-export-application-global.svg)](http://badge.fury.io/js/ember-export-application-global)

Sets `window.MyAppName` up as the application instance upon boot.

By default this is only done when not running in production mode, but you can fully
control when it is executed by including `exportApplicationGlobal` in your `config/environment.js`
with `true` if you want the global exported, or `false` if you do not.

## Example Configuration

```javascript
// config/environment.js

module.exports = function(environment) {
  var ENV = {
    // other configuration
    exportApplicationGlobal: ['staging', 'production'].indexOf(environment) === -1
  }
};
```

## Installation

```sh
ember install ember-export-application-global
# or for ember-cli < 0.1.5
npm install --save-dev ember-export-application-global
```

## Available Configuration

* `exportApplicationGlobal` - Specify if you want the global to be exported.
  A `true` will export global as the application name, but a string will export
  is as that string.

## Contributing

This README outlines the details of collaborating on this Ember addon.

### Installation

* `git clone <repository-url>` this repository
* `cd ember-export-application-global`
* `npm install`
* `bower install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).

## License

MIT
