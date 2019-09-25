# Ember Resolver [![Build Status](https://travis-ci.org/ember-cli/ember-resolver.svg?branch=master)](https://travis-ci.org/ember-cli/ember-resolver)

The Ember Resolver is the mechanism responsible for looking up code in your application and converting its naming conventions into the actual classes, functions, and templates that Ember needs to resolve its dependencies, for example, what template to render for a given route. It is a system that helps the app resolve the lookup of JavaScript modules agnostic of what kind of module system is used, which can be AMD, CommonJS or just plain globals. It is used to lookup routes, models, components, templates, or anything that is used in your Ember app.

This project provides the Ember resolver used by the following projects:

* [ember-cli](https://github.com/ember-cli/ember-cli)
* [ember-app-kit](https://github.com/stefanpenner/ember-app-kit)
* [ember-appkit-rails](https://github.com/DavyJonesLocker/ember-appkit-rails)

## Installation

`ember-resolver` is an ember-cli addon, and should be installed with `ember install`:

```
ember install ember-resolver
```

## Configuration

To customize pluralization provide a `pluralizedTypes` object to your extended version of the Resolver in consuming app:

```js
# app/resolver.js
import Resolver from 'ember-resolver';

export default Resolver.extend({
  pluralizedTypes: {
    'sheep': 'sheep',
    'strategy': 'strategies'
  }
})
```

## Upgrading

`ember-resolver` is normally bumped with ember-cli releases. To install a newer
version use `yarn` or `npm`. For example:

```
yarn upgrade ember-resolver
```

### Migrating from bower

Before v1.0.1 `ember-resolver` was primarially consumed via bower. To migrate
install the addon version via `yarn` or `npm`. If you're currently using
`ember-resolver` v0.1.x in your project, you should uninstall it:

```
bower uninstall ember-resolver --save
```

_You can continue to use ember-resolver v0.1.x as a bower package, but be
careful not to update it to versions greater than v1.0._

## Addon Development

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## Troubleshooting

As mentioned above, `ember-resolver` is no longer a bower package.  If you're seeing a message like this:

```
Unable to find a suitable version for ember-resolver, please choose one:
    1) ember-resolver#~0.1.20 which resolved to 0.1.21 and is required by ember-resolver#2.0.3
    2) ember-resolver#~2.0.3 which resolved to 2.0.3 and is required by [APP_NAME]
```

... you probably need to update your application accordingly.  See [aptible/dashboard.aptible.com#423](https://github.com/aptible/dashboard.aptible.com/pull/423/files) as an example of how to update.
