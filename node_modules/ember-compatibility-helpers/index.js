'use strict';

const VersionChecker = require('ember-cli-version-checker');
const extractTrueVersion = require('./utils/extract-true-version');
const getFlags = require('./utils/get-flags');

module.exports = {
  name: 'ember-compatibility-helpers',

  included(appOrParentAddon) {
    this._super.included.apply(this, arguments);

    const host = this._findHost();

    // Create a root level version checker for checking the Ember version later on
    this.projectChecker = new VersionChecker(this.project);
    this.emberVersion = this.projectChecker.forEmber().version;

    // Create a parent checker for checking the parent app/addons dependencies (for things like polyfills)
    this.parentChecker = new VersionChecker(this.parent);
    const emberBabelChecker = this.parentChecker.for('ember-cli-babel', 'npm');

    this._usingBabel6 = emberBabelChecker.satisfies('^6.0.0-beta.1');
    this._usingBabel7 = emberBabelChecker.satisfies('^7.0.0-beta.1');

    if (!this._usingBabel6 && !this._usingBabel7) {
      host.project.ui.writeWarnLine(
        'ember-compatibility-helpers: You are using an unsupported ember-cli-babel version, ' +
        'compatibility helper tranforms will not be included automatically'
      );

      this._registeredWithBabel = true;
    }

    this.registerTransformWithParent(appOrParentAddon);
  },

  /**
   * Registers the compatibility transforms with the parent addon or application
   *
   * @param {Addon|EmberAddon|EmberApp} parent
   */
  registerTransformWithParent(parent) {
    if (this._registeredWithBabel) return;

    const parentOptions = parent.options = parent.options || {};

    // Create babel options if they do not exist
    parentOptions.babel = parentOptions.babel || {};

    const plugins = parentOptions.babel.plugins = parentOptions.babel.plugins || [];
    const comparisonPlugin = this._getComparisonPlugin(this.emberVersion);
    const debugPlugin = this._getDebugPlugin(this.emberVersion, this.parentChecker);

    plugins.push(comparisonPlugin, debugPlugin);

    this._registeredWithBabel = true;
  },

  _getComparisonPlugin() {
    const trueEmberVersion = extractTrueVersion(this.emberVersion);

    const parentName = typeof this.parent.name === 'function' ? this.parent.name() : this.parent.name;

    return [require.resolve('./comparision-plugin.js'), { emberVersion: trueEmberVersion, root: this.project.root, name:  parentName }];
  },

  _getDebugPlugin(emberVersion, parentChecker) {
    const options = {
      debugTools: {
        isDebug: process.env.EMBER_ENV !== 'production',
        source: 'ember-compatibility-helpers'
      },

      flags: [
        {
          name: 'ember-compatibility-helpers',
          source: 'ember-compatibility-helpers',
          flags: getFlags(emberVersion, parentChecker)
        }
      ]
    };

    const plugin = [require.resolve('babel-plugin-debug-macros'), options];

    if (this._usingBabel7) {
      plugin.push('ember-compatibility-helpers:debug-macros');
    }

    return plugin;
  },

  _findHost() {
    let current = this;
    let app;

    do {
      app = current.app || app;
    } while (current.parent.parent && (current = current.parent));

    return app;
  }
};
