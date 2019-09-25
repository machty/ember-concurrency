'use strict';

const EMBER_VERSION_WITH_JQUERY_DEPRECATION = '3.9.0-alpha.1';

module.exports = {
  name: require('./package').name,
  included() {
    this._super.included.apply(this, arguments);

    const VersionChecker = require('ember-cli-version-checker');

    let app = this._findHost();
    let optionalFeatures = app.project.findAddonByName("@ember/optional-features");

    if (!app.vendorFiles || !app.vendorFiles['jquery.js']) {
      app.import('vendor/jquery/jquery.js', { prepend: true });
    }

    app.import('vendor/shims/jquery.js');

    let checker = new VersionChecker(this);
    let ember = checker.forEmber();

    if (ember.gte(EMBER_VERSION_WITH_JQUERY_DEPRECATION)) {
      app.import('vendor/jquery/component.dollar.js');
    }

    if (optionalFeatures && !optionalFeatures.isFeatureEnabled('jquery-integration')) {
      app.project.ui.writeDeprecateLine('You have disabled the `jquery-integration` optional feature. You now have to delete `@ember/jquery` from your package.json');
    }
  },

  treeForVendor: function(tree) {
    const BroccoliMergeTrees = require('broccoli-merge-trees');
    const Funnel = require('broccoli-funnel');
    const resolve = require('resolve');
    const path = require('path');

    let jqueryPath;
    try {
      jqueryPath = path.dirname(
        resolve.sync('jquery/package.json', { basedir: this.project.root })
      );
    } catch(error) {
      jqueryPath = path.dirname(require.resolve('jquery/package.json'));
    }

    let jquery = new Funnel(jqueryPath + '/dist', {
      destDir: 'jquery',
      files: ['jquery.js'],
    });

    let babelAddon = this.project.findAddonByName('ember-cli-babel');
    let transpiledTree = babelAddon.transpileTree(tree, {
      'ember-cli-babel': {
        compileModules: false
      }
    });

    return new BroccoliMergeTrees([jquery, transpiledTree]);
  },
};
