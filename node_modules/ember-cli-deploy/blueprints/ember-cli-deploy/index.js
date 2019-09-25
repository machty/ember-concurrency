var chalk = require('chalk');
var green  = chalk.green;

module.exports = {
  description: 'Generate config for ember-cli deployments',
  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },
  afterInstall: function() {
    var hasPlugins = this.project.addons.some(function(addon) {
      var isPlugin = addon.pkg.keywords.indexOf('ember-cli-deploy-plugin') !== -1;
      var isPluginPack = addon.pkg.keywords.indexOf('ember-cli-deploy-plugin-pack') !== -1;
      return isPlugin || isPluginPack;
    });

    if (!hasPlugins) {
      this.ui.write(green('ember-cli-deploy needs plugins to actually do the deployment work.\nSee http://ember-cli-deploy.com/docs/v1.0.x/quickstart/\nto learn how to install plugins and see what plugins are available.\n'));
    }
  }
};
