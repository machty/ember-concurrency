'use strict';

/* eslint-env node */

module.exports = {
  name: 'ember-cli-eslint',

  // TODO: Disable this (or set it to return false) before committing
  isDevelopingAddon: function() {
    return false;
  },

  // instructs ember-cli-qunit and ember-cli-mocha to
  // disable their lintTree implementations (which use JSHint)
  isDefaultJSLinter: true,

  init() {
    this._super.init && this._super.init.apply(this, arguments);

    var VersionChecker = require('ember-cli-version-checker');
    var checker = new VersionChecker(this.project);

    if (checker.for('ember-qunit', 'npm').exists() || checker.for('ember-cli-qunit', 'npm').exists()) {
      this._testGenerator = 'qunit';
    } else if (checker.for('ember-mocha', 'npm').exists() || checker.for('ember-cli-mocha', 'npm').exists()) {
      this._testGenerator = 'mocha';
    }
  },

  included: function (app) {
    this._super.included.apply(this, arguments);
    this.options = app.options.eslint || {};
  },

  lintTree: function(type, tree) {
    var ui = this.ui;

    if (type === 'templates') {
      return undefined;
    }

    var ESLint = require('broccoli-lint-eslint');

    return ESLint.create(tree, {
      format: this.options.format,
      testGenerator: this.options.testGenerator || this._testGenerator,
      group: (this.options.group !== false) ? type : undefined,
      extensions: this.options.extensions,

      options: {
        rulesDir: this.options.rulesDir || 'eslint-rules'
      },

      console: {
        log: function(message) {
          ui.writeLine(message);
        },

        error: function(message) {
          ui.writeLine(message, 'ERROR');
        }
      }
    });
  }
};
