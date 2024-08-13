# ember-concurrency

[![Build Status][build-status-img]][build-status-link]
[![NPM][npm-badge-img]][npm-badge-link]
[![Ember Observer Score][ember-observer-badge]][ember-observer-url]
![Ember Version][ember-version]

Improved concurrency primitives for Ember.js. Documentation can be
found [here](http://ember-concurrency.com).

## Installation

`ember-concurrency` is an ember-cli addon. You can install it via:

    ember install ember-concurrency

### Configure Babel Transform

Ember Concurrency requires the use of a Babel Transform to convert tasks in the "async-arrow" notation (e.g. `fooTask = task(async () => { /*...*/ }`) into generator functions. Since Ember Concurrency 4.0.0+ is an Embroider V2 Addon, this Babel transform needs to be configured on the consuming application or addon.

```js
// in app ember-cli-build.js

const app = new EmberApp(defaults, {
  // ...
  babel: {
    plugins: [
      // ... any other plugins
      require.resolve("ember-concurrency/async-arrow-task-transform"),

      // NOTE: put any code coverage plugins last, after the transform.
    ],
  }
});

// in V1 addon index.js

// ...
options: {
  babel: {
    plugins: [
      require.resolve('ember-concurrency/async-arrow-task-transform'),
    ],
  },
},

// in V2 addon babel.config.json
{
  "plugins": [
    [
      // ... any other plugins
    "ember-concurrency/async-arrow-task-transform"
  ]
}
```

See the [test application](https://github.com/machty/ember-concurrency/blob/master/packages/test-app/ember-cli-build.js) for an example.

## Documentation

The [ember-concurrency documentation site](http://ember-concurrency.com) is an ember-cli app
with interactive examples powered by ember-concurrency. It runs from
ember-concurrency's [test app](https://github.com/machty/ember-concurrency/tree/master/packages/test-app/app).

## Problems?

- [Open an Issue](https://github.com/machty/ember-concurrency/issues).
  - Try to replicate the issue within an [ember-twiddle][twiddle-starter]
- Ask a question in the `#e-concurrency` channel at the [Ember Community Discord server](https://discord.gg/zT3asNS)

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

[build-status-img]: https://github.com/machty/ember-concurrency/workflows/CI/badge.svg
[build-status-link]: https://github.com/machty/ember-concurrency
[npm-badge-img]: https://badge.fury.io/js/ember-concurrency.svg
[npm-badge-link]: http://badge.fury.io/js/ember-concurrency
[ember-observer-badge]: http://emberobserver.com/badges/ember-concurrency.svg
[ember-observer-url]: http://emberobserver.com/addons/ember-concurrency
[ember-version]: https://img.shields.io/badge/Ember-3.8+-brightgreen.svg
[twiddle-starter]: https://ember-twiddle.com/b2b0c016f4df24261381487b60c707f3?numColumns=2&openFiles=templates.application.hbs%2Ctemplates.application.hbs
