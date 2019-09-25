/* jshint node: true */
'use strict';

var path = require('path');
var mergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-maybe-import-regenerator',

  included: function(app) {
    this._super.included.apply(this, arguments);

    var hostApp = this._findApp(app);

    var babelOptions = (hostApp.options && hostApp.options.babel) || {};
    var emberCLIBabelOptions = (hostApp.options && hostApp.options['ember-cli-babel']) || {};

    var babelInstance = this.addons.filter(function(addon) { return addon.name === 'ember-cli-babel'; })[0];
    var needsRegenerator = babelInstance.isPluginRequired('transform-regenerator');

    var regeneratorAlreadyIncluded =
      hostApp.__ember_maybe_import_regenerator_included ||
      babelOptions.includePolyfill || emberCLIBabelOptions.includePolyfill;

    hostApp.__ember_maybe_import_regenerator_included = true;

    if (!regeneratorAlreadyIncluded && needsRegenerator) {
      hostApp.import('vendor/regenerator-runtime/runtime.js', {
        prepend: true
      });
    }
  },

  treeForVendor: function() {
    var regeneratorRuntimePath = path.dirname(require.resolve('regenerator-runtime'));
    return new Funnel(this.treeGenerator(regeneratorRuntimePath), {
      srcDir: '/',
      destDir: 'regenerator-runtime'
    });
  },

  _findApp: function(hostApp) {
    var app = this.app || hostApp;
    var parent = this.parent;
    while (parent.parent) {
      if (parent.app) {
        app = parent.app;
        break;
      }

      parent = parent.parent;
    }
    return app;
  }
};
