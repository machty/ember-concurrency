# ember-disable-prototype-extensions

[![Build Status](https://travis-ci.org/ember-cli/ember-disable-prototype-extensions.svg?branch=master)](https://travis-ci.org/ember-cli/ember-disable-prototype-extensions)
[![Build status](https://ci.appveyor.com/api/projects/status/xvg1fxk24lh5u0eg/branch/master?svg=true)](https://ci.appveyor.com/project/embercli/ember-disable-prototype-extensions/branch/master)

Including this addon will disable Ember's prototype extensions.

This is a great idea for addon authors to ensure that their addon does not accidentally depend upon prototype extensions (which may be disabled in a consuming application).

For instructions on disabling prototype extensions see the Ember guide:

http://guides.emberjs.com/v1.11.0/configuring-ember/disabling-prototype-extensions/

## Installation 

```sh
ember install ember-disable-prototype-extensions
```

## Collaboration

### Setup

* `git clone` this repository
* `npm install`
* `bower install`

### Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`
