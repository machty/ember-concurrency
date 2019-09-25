# ember-router-service-polyfill

This addon provides a best effort polyfill for the `ember-routing-router-service` feature added in Ember 2.15.

Please review [emberjs/rfcs#95](https://github.com/emberjs/rfcs/blob/master/text/0095-router-service.md) for more details.

[![Build Status](https://travis-ci.org/rwjblue/ember-router-service-polyfill.svg?branch=master)](https://travis-ci.org/rwjblue/ember-router-service-polyfill)

## Installation

```sh
ember install ember-router-service-polyfill
```

## Usage

```javascript
import Ember from 'ember';

export default Ember.Component.extend({
  router: Ember.inject.service(),

  actions: {
    next() {
      this.get('router').transitionTo('other.route');
    }
  }
});
```

## Known Incompatibilities

This addon provides the router service and the primary APIs that shipped in Ember 2.15. Unfortunately, there is
at least one scenario that is not easily polyfilled: avoiding the eliding of default query param values during
`routerService.transitionTo` / `routerService.replaceWith`.

## Migration

### Applications

After you upgrade your application to Ember 2.15 or higher, you should remove `ember-router-service-polyfill` from
your `package.json`.

### Addons

Addons generally support many different Ember versions, so leaving `ember-router-service-polyfill` in
place for consumers of your addon is perfectly normal.  When the addon no longer supports Ember
versions older than 2.15, we recommend removing `ember-router-service-polyfill` from your `package.json`
and doing a major version bump.

## Compatibility

This addon is tested against quite a few past Ember versions. Check `config/ember-try.js` for the current list, but
the list of supported Ember versions at the time of authoring was:

* 2.4
* 2.8
* 2.12
* 2.13
* 2.14
* 2.15 (canary at the time)

## Addon Maintenance

### Installation

* `git clone <repository-url>` this repository
* `cd ember-router-service-polyfill`
* `npm install`

### Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
