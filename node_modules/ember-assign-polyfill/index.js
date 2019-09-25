'use strict';

const VersionChecker = require('ember-cli-version-checker');
let hasBeenWarned = false;

module.exports = {
  name: require('./package').name,
  included() {
    this._super.included.apply(this, arguments);
    this._ensureThisImport();

    const checker = new VersionChecker(this);
    const emberVersion = checker.forEmber();

    if (emberVersion.lt('2.5.0')) {
      this.import('vendor/ember-assign-polyfill/index.js');
    } else if (this.parent === this.project && !hasBeenWarned){
      console.warn('ember-assign-polyfill is not required for Ember 2.5.0 and later, please remove from your `package.json`.');
      hasBeenWarned = true;
    }
  },

  _ensureThisImport() {
    if (!this.import) {
      this._findHost = function findHostShim() {
        let current = this;
        let app;
        do {
          app = current.app || app;
        } while (current.parent.parent && (current = current.parent));
        return app;
      };
      this.import = function importShim(asset, options) {
        const app = this._findHost();
        app.import(asset, options);
      };
    }
  }
};
