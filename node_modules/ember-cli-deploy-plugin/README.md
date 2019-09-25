# ember-cli-deploy-plugin

This NPM module exposes a base class that can be used by ember-cli-deploy plugins to streamline
implementation of a plugin.

## Usage

In your plugin's directory:

`npm install ember-cli-deploy-plugin --save`

In your plugin's `index.js` file:

```js
/* jshint node: true */
'use strict';

var DeployPluginBase = require('ember-cli-deploy-plugin');

module.exports = {
  name: 'ember-cli-deploy-awesomeness',

  createDeployPlugin: function(options) {
    var DeployPlugin = DeployPluginBase.extend({
      name: options.name,

      // note: most plugins can simply implement these next two properties and use
      // the base class' implementation of the `configure` hook
      defaultConfig: {
        someKey: 'defaultValue',
        anotherKey: function(context) {
          return context.anotherKey; // to use data added to the context by another plugin
        }
      },
      requiredConfig: ['awesomeApiKey'], // throw an error if this is not configured

      // implement any hooks appropriate for your plugin
      willUpload: function(context) {
        // Use the `readConfig` method for uniform access to this plugin's config,
        // whether via a dynamic function or a configured value
        var someValue     = this.readConfig('someKey');
        var anotherValue  = this.readConfig('anotherKey');
        var awesomeApiKey = this.readConfig('awesomeApiKey');

        // Use the `log` method to generate output consistent with the tree style
        // of ember-cli-deploy's verbose output
        this.log('output some awesomeness');
        this.log('output some red awesomeness', { color: 'red' });
        this.log('output this only when verbose option is enabled', { verbose: true });

        // Need to do something async? You can return a promise.
        // Need to fail out? Throw an error or return a promise which becomes rejected
        return Promise.resolve();
      },
    });
    return new DeployPlugin();
  }
};

## TODO

Tests
