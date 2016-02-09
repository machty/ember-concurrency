# ember-concurrency [![Build Status](https://travis-ci.org/machty/ember-concurrency.svg?branch=master)](https://travis-ci.org/machty/ember-concurrency)

Improved concurrency primitives for Ember.js. Documentation can be
found [here](http://ember-concurrency.com).

## Installation

`ember-concurrency` is an ember-cli addon. You can install it via:

    ember install liquid-fire

`ember-concurrency` also requires that the Regenerator runtime be
included in your app. The easiest way to ensure this is to enable
the `babel.includePolyfill` option in your `ember-cli-build.js`
or `Brocfile.js` files.

    var app = new EmberAddon(defaults, {
      babel: {
        includePolyfill: true,
      },
    });

## Addon Maintenance

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
