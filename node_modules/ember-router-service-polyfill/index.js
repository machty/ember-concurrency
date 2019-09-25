/* eslint-env node */
'use strict';

const VersionChecker = require('ember-cli-version-checker');
let hasBeenWarned = false;

module.exports = {
  name: 'ember-router-service-polyfill',

  included() {
    this._super.included.apply(this, arguments);

    this._ensureThisImport();

    var checker = new VersionChecker(this);
    var emberVersion = checker.forEmber();

    if (emberVersion.lt('2.16.0-alpha.1')) {
      this.import('vendor/ember-router-service-polyfill/index.js');
    } else if (this.parent === this.project && !hasBeenWarned && !this.project.isEmberCLIAddon()) {
      this.ui.writeWarnLine('ember-router-service-polyfill is not required for Ember 2.16.0-beta.1 and later, please remove from your `package.json`.');
      hasBeenWarned = true;
    }
  },

  treeForVendor(rawVendorTree) {
    let babelAddon = this.addons.find(addon => addon.name === 'ember-cli-babel');

    let transpiledVendorTree = babelAddon.transpileTree(rawVendorTree, {
      'ember-cli-babel': {
        compileModules: false
      }
    });

    return transpiledVendorTree;
  },

  _ensureThisImport: function() {
    if (!this.import) {
      this._findHost = function findHostShim() {
        var current = this;
        var app;
        do {
          app = current.app || app;
        } while (current.parent.parent && (current = current.parent));
        return app;
      };
      this.import = function importShim(asset, options) {
        var app = this._findHost();
        app.import(asset, options);
      };
    }
  }
};
