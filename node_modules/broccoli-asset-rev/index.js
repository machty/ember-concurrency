var path = require('path');

var defaults = require('./lib/default-options');

module.exports = {
  name: 'broccoli-asset-rev',
  initializeOptions: function() {
    var defaultOptions = {
      enabled: this.app.env === 'production',
      exclude: defaults.exclude,
      extensions: defaults.extensions,
      prepend: defaults.prepend,
      replaceExtensions: defaults.replaceExtensions
    };

    // Allow simply setting { fingerprint: false } as a shortcut option to disable
    if (this.app.options.fingerprint === false) {
      this.options = this.app.options.fingerprint = { enabled: false };
    } else {
      this.options = this.app.options.fingerprint = this.app.options.fingerprint || {};
    }

    for (var option in defaultOptions) {
      if (!this.options.hasOwnProperty(option)) {
        this.options[option] = defaultOptions[option];
      }
    }
  },
  postprocessTree: function (type, tree) {
    if (type === 'all' && this.options.enabled) {
      tree = require('./lib/asset-rev')(tree, this.options);
    }

    return tree;
  },
  included: function (app) {
    this.app = app;
    this.initializeOptions();
  },
  treeFor: function() {},

  // ember-cli-fastboot uses the presence of this flag to give a
  // helpful error if you're using an older version of this addon that
  // doesn't know how to rewrite the fastboot manifest.
  supportsFastboot: true
};
