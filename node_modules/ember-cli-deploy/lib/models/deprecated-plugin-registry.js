var CoreObject     = require('core-object');
var SilentError    = require('silent-error');
var PluginRegistry = require('./plugin-registry');

module.exports = CoreObject.extend({
  init: function(project, ui, config) {
    this._super();
    this._registry = new PluginRegistry(project, ui, config);
    this._config  = config;
    this._project = project;

    if (this._isUsingOldPluginControl()) {
      if (this._isUsingNewPluginControl()) {
        var message = 'Use of the old and new plugin controls simultaneously does not make sense.\n' +
          'Please use the new plugin controls\n' +
          'See the following page for information:\n\n' +
          'http://ember-cli-deploy.com/docs/v1.0.x/configuration/\n';
        throw new SilentError(message);
      } else {
        ui.writeError('Use of the `config.plugins` property has been deprecated. Please use the new plugin run controls.');
        ui.writeError('See the following page for information:\n');
        ui.writeError('http://ember-cli-deploy.com/docs/v1.0.x/configuration/#advanced-plugin-configuration');
      }
    }
  },

  pluginInstances: function() {
    var addons  = this._project.addons || [];
    var plugins = this._registry._plugins(addons);

    return this._config.plugins.map(function(entry) {
      var parts = entry.split(':');
      var name = parts[0];
      var alias = parts[1] || name;
      var addon = plugins[name];

      if (addon) {
        return addon.createDeployPlugin({ name: alias });
      }
    }, [])
    .filter(function(item) {
      return !!item;
    });
  },

  _isUsingOldPluginControl: function() {
    return this._config.plugins;
  },

  _isUsingNewPluginControl: function() {
    var aliasConfig    = Object.keys(this._registry._aliasConfig).length;
    var disabledConfig = Object.keys(this._registry._disabledConfig).length;
    var runOrderConfig = Object.keys(this._registry._runOrderConfig).length;

    return aliasConfig || disabledConfig || runOrderConfig;
  },
});
