'use strict';

const { addPlugin, hasPlugin } = require('ember-cli-babel-plugin-helpers');
const Plugin = require.resolve(
  './lib/babel-plugin-transform-ember-concurrency-async-tasks'
);

module.exports = {
  name: require('./package').name,

  included(parent) {
    this._super.included.apply(this, arguments);

    if (!hasPlugin(parent, Plugin)) {
      addPlugin(parent, Plugin, {
        before: [
          '@babel/plugin-proposal-decorators',
          '@babel/plugin-transform-typescript',

          // Run before ember-cli-code-coverage
          'babel-plugin-istanbul',
        ],
      });
    }
  },
};
