var Task           = require('../models/task');
var SilentError    = require('silent-error');
var Pipeline       = require('../models/pipeline');
var PluginRegistry = require('../models/plugin-registry');
var DeprecatedPluginRegistry = require('../models/deprecated-plugin-registry');

module.exports = Task.extend({
  init: function() {
    if (this._super.init) {
      this._super.init.apply(this, arguments);
    }

    if (!this.project) {
      throw new SilentError('No project passed to pipeline task');
    }

    if (!this.ui) {
      throw new SilentError('No ui passed to pipeline task');
    }

    if(!this.deployTarget) {
      throw new SilentError('You need to provide a deployTarget: `ember deploy production`');
    }

    if(!this.config) {
      throw new SilentError('No config passed to pipeline task');
    }

    this._pipeline = this.pipeline || new Pipeline(this.hooks, {
      ui: this.ui
    });

    this.commandOptions = this.commandOptions || {};
  },

  setup: function() {
    this._pluginInstances().forEach(function(instance) {
      this._registerPipelineHooks(instance);
    }.bind(this));

    this._validatePresenceOfRequiredHooks();
  },

  _validatePresenceOfRequiredHooks: function() {
    (this.requiredHooks || []).forEach(function(hook) {
      if (!this._pipeline.hasHandlersForHook(hook)) {
        var error = new SilentError(hook + ' not implemented by any registered plugin');
        throw error;
      }
    }.bind(this));
  },

  run: function() {
    var pipeline       = this._pipeline;
    var ui             = this.ui;
    var project        = this.project;
    var commandOptions = this.commandOptions;

    this.setup();
    var context = {
      commandOptions: commandOptions,
      config: this.config,
      deployTarget: this.deployTarget,
      project: project,
      ui: ui
    };
    return pipeline.execute(context);
  },

  _pluginInstances: function() {
    var registry;
    if (this.config.plugins) {
      registry = new DeprecatedPluginRegistry(this.project, this.ui, this.config);
    } else {
      registry = new PluginRegistry(this.project, this.ui, this.config);
    }
    return registry.pluginInstances();
  },

  _registerPipelineHooks: function(deployPlugin) {
    this._pipeline.hookNames().forEach(function(hookName) {
      var fn = deployPlugin[hookName];
      if (typeof fn !== 'function') {
        return;
      }

      this._pipeline.register(hookName, {
        name: deployPlugin.name,
        fn: function(context){
          if (deployPlugin.beforeHook && typeof deployPlugin.beforeHook === 'function') {
            deployPlugin.beforeHook(context);
          }
          return fn.call(deployPlugin, context);
        }
      });
    }.bind(this));
  },
});
