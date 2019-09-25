# ember-cli-app-version [![Build Status](https://travis-ci.org/ember-cli/ember-cli-app-version.svg?branch=master)](https://travis-ci.org/ember-cli/ember-cli-app-version) ![[EmberObserver Badge](http://emberobserver.com/addons/ember-cli-app-version)](http://emberobserver.com/badges/ember-cli-app-version.svg)

Adds your Ember App's version to Info tab in Ember Inspector. The version is taken from your project's package.json#version.
If you add build metadata to the version, this addon will automatically append SHA to the end of the version.

![Ember Inspector Info Tab](https://www.evernote.com/shard/s51/sh/c2f52608-bc17-4d5c-ac76-dec044eeb2e2/2f08de0cfb77217502cfc3a9188d84bf/res/3fb1d3d9-d809-48f6-9d3b-6e9a4af29892/skitch.png?resizeSmall&width=832)

## {{app-version}} helper

This addon provides `{{app-version}}` helper that allows you to show your current app version in your app.

The addon has flags to display parts of the version:

* `{{app-version versionOnly=true}} // => 2.0.1`
* `{{app-version versionOnly=true showExtended=true}} // => 2.0.1-alpha.1`
* `{{app-version shaOnly=true}} // => <git SHA>`

Flags are `false` by default.

## Heroku

When running on Heroku the `.git` folder is not present, making it impossible to fetch the `git SHA`. A workaround for this is adding the below in your `config/environment.js`:

```
// Heroku Git Hash support
if (process.env.SOURCE_VERSION) {
  const pkg = require('../package.json');
  const hash = process.env.SOURCE_VERSION.substr(0, 7);
  ENV['ember-cli-app-version'] = {
    version: `${pkg.version}+${hash}`
  };
}
```

## Installation

* ember install ember-cli-app-version

## Running Tests

* `git clone git@github.com:ember-cli/ember-cli-app-version.git`
* `npm install`
* `bower install`
* `ember test`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
