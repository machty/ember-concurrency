var CoreObject  = require('core-object');
var DAG         = require('dag-map').default;
var SilentError = require('silent-error');
var chalk       = require('chalk');
var _           = require('lodash');

/**
 * Glossary
 *
 * - addon: An ember-cli addon
 * - plugin: An addon that contains the `ember-cli-deploy` keyword and implements the `createDeployPlugin` function
 * - pluginInstance: An instance of a plugin created by executing `createDeployPLugin`. A single plugin can have multiple aliased instances created
 **/

module.exports = CoreObject.extend({
  init: function(project, ui, config) {
    this._super();
    this._project        = project;
    this._ui             = ui;
    this._aliasConfig    = (config.pipeline && config.pipeline.alias) || {};
    this._runOrderConfig = (config.pipeline && config.pipeline.runOrder) || {};
    this._disabledConfig = (config.pipeline && config.pipeline.disabled) || {};
  },

  pluginInstances: function() {
    var addons                 = this._project.addons || [];
    var plugins                = this._plugins(addons);
    var aliasMap               = this._buildAliasMap(plugins, this._aliasConfig);
    var disabledMap            = this._buildDisabledMap(aliasMap, this._disabledConfig);
    var pluginInstances        = this._pluginInstances(plugins, aliasMap);
    var runOrderMap            = this._buildRunOrderMap(this._runOrderConfig, aliasMap, pluginInstances);
    var enabledPluginInstances = this._applyDisabledConfig(pluginInstances, disabledMap);
    var orderedPluginInstances = this._applyRunOrderConfig(enabledPluginInstances, runOrderMap);

    if (orderedPluginInstances.length === 0) {
      this._ui.writeError('\nWARNING: No plugins installed/enabled\n');
      this._ui.writeError('ember-cli-deploy works by registering plugins in it\'s pipeline.\n');
      this._ui.writeError('In order to execute a deployment you must install at least one ember-cli-deploy compatible plugin.\n');
      this._ui.writeError('Visit http://ember-cli-deploy.com/plugins/ for a list of supported plugins.\n');
    }

    return orderedPluginInstances;
  },

  _plugins: function(addons) {
    if (!this._cachedValidAddons) {
      this._cachedValidAddons = this._discoverPlugins(addons);
    }

    return this._cachedValidAddons;
  },

  _discoverPlugins: function(addons){
    var self = this;
    return addons.reduce(function(plugins, addon) {
      if (self._isValidPlugin(addon)) {
        var pluginName = self._pluginName(addon);
        plugins[pluginName] = addon;
      }

      if (self._isDeployPluginPack(addon)) {
        var nestedAddons = self._discoverPlugins(addon.addons);
        plugins = Object.keys(nestedAddons).reduce(function(v, key) {
          v[key] = nestedAddons[key];
          return v;
        }, plugins);
      }

      return plugins;
    }, {});
  },

  /**
   * Build up a hash of the all plugin aliases, keyed by plugin name, with the value being an array of aliases.
   * This hash will contain an entry for every installed plugin.
   *
   * If a plugin has not been referenced in `config.pipeline.alias` then it will be added to the map
   * with an alias to it's original name (see `boo` below),
   *
   * Example return value:
   *
   * {
   *   foo: { as: ['bar', 'baz'] },
   *   boo: { as: ['boo'] }
   * }
   * */
  _buildAliasMap: function(plugins, config) {
    var self = this;
    var aliasMap = Object.keys(plugins)
      .reduce(function(aliases, pluginName) {
        if (!aliases[pluginName] || !aliases[pluginName].as) {
          aliases[pluginName] = { as: [pluginName] };
        }

        aliases[pluginName].as = self._castArray(aliases[pluginName].as);
        return aliases;
      }, config);

    var unknownConfigKeys = _.difference(Object.keys(aliasMap), Object.keys(plugins));

    if (unknownConfigKeys.length) {
      this._logUnknownPlugins(unknownConfigKeys, 'config.pipeline.alias');
    }

    return aliasMap;
  },

  /**
   * Build up a hash of disabled plugin instances, keyed by alias, with the value being whether it's disabled or not
   * This hash will contain an entry for every installed plugin.
   *
   * If a plugin has not been referenced in `config.pipeline.disabled` then it will be added to the map as `disabled: false`.
   *
   * Example return value:
   *
   * {
   *   foo: true,
   *   bar: false
   * }
   **/
  _buildDisabledMap: function(aliasMap, config) {
    var aliases = this._flattenAliasMap(aliasMap);
    var allExcept = null;

    if (typeof config.allExcept !== 'undefined') {
      allExcept = this._castArray(config.allExcept);
      delete config.allExcept;
    }

    var keys = Object.keys(config);

    if (allExcept) {
      keys = keys.concat(allExcept);
    }

    var unknownConfigKeys = _.difference(keys, aliases);

    if (unknownConfigKeys.length) {
      this._logUnknownPlugins(unknownConfigKeys, 'config.pipeline.disabled');
    }

    var disabledMap = aliases.reduce(function(map, alias) {
      if (map[alias] === undefined) {
        if (allExcept && allExcept.length) {
          if (allExcept.indexOf(alias) >= 0) {
            map[alias] = false;
          } else {
            map[alias] = true;
          }
        } else {
          map[alias] = false;
        }
      }

      return map;
    }, config);

    return disabledMap;
  },

  /**
   * Build up a hash of plugin instance execution order overrides.
   * This hash will only container an entry for instances that should run in a particular order. All other instances will be ordered by their natural
   * ordering.
   *
   * Ordering of plugin instances can be specified by users of ember-cli-deploy via `config.pipeline.runOrder` and by plugin authors via `run{Before,After}`.
   * This function will attempt to merge the author defined run orders with the user defined ones.
   *
   * Example return value:
   *
   * {
   *   foo: { before: ['bar'] },
   *   baz: { after: ['boo', 'bom'] }
   * }
   *
   *
   **/
  _buildRunOrderMap: function(config, aliasMap, pluginInstances) {
    var self = this;

    pluginInstances.forEach(function(instance) {
      if (instance.runBefore) {
        var befores = self._castArray(instance.runBefore);
        config = self._mergeAuthorProvidedOrderWithConfigOrder('before', instance.name, befores, config, aliasMap);
      }

      if (instance.runAfter) {
        var afters = self._castArray(instance.runAfter);
        config = self._mergeAuthorProvidedOrderWithConfigOrder('after', instance.name, afters, config, aliasMap);
      }
    });

    var aliases = this._flattenAliasMap(aliasMap);

    var configNames = Object.keys(config).reduce(function(arr, key) {
      arr.push(key);

      var befores = self._castArray(config[key].before);
      var afters = self._castArray(config[key].after);

      return arr.concat(befores).concat(afters);
    }, [])
    .reduce(function(arr, key) {
      if (arr.indexOf(key) === -1) {
        arr.push(key);
      }
      return arr;
    }, []);

    var unknownConfigKeys = _.difference(configNames, aliases);

    if (unknownConfigKeys.length) {
      this._logUnknownPlugins(unknownConfigKeys, 'config.pipeline.runOrder');
    }

    return config;
  },

  _pluginInstances: function(plugins, aliasMap) {
    return Object.keys(plugins)
      .map(function(pluginName) {
        var addon   = plugins[pluginName];
        var aliases = aliasMap[pluginName].as;

        return aliases.map(function(alias) {
          var v = addon.createDeployPlugin({ name: alias });
          return v;
        });
      })
      .reduce(function(instances, arr) {
        return instances.concat(arr);
      }, []);
  },

  _applyDisabledConfig: function(pluginInstances, disabledMap) {
    return pluginInstances.filter(function(instance) {
      return !disabledMap[instance.name];
    }) ;
  },

  _applyRunOrderConfig: function(pluginInstances, runOrderMap) {
    var self            = this;
    var graph           = new DAG();
    var sortedInstances = [];

    try {
      pluginInstances.forEach(function(instance) {
        var before = (runOrderMap[instance.name] && self._castArray(runOrderMap[instance.name].before)) || [];
        var after = (runOrderMap[instance.name] && self._castArray(runOrderMap[instance.name].after)) || [];
        graph.add(instance.name, instance, before, after);
      });

      graph.topsort(function (key, value) {
        sortedInstances.push(value);
      });
    } catch(err) {
      if (/cycle detected/.test(err)) {
        throw new SilentError('your ember-cli-deploy plugins have a circular dependency:' + err.message);
      } else {
        throw err;
      }
    }

    return sortedInstances;
  },

  _isDeployPluginPack: function(addon) {
    return this._addonHasKeyword(addon, 'ember-cli-deploy-plugin-pack');
  },

  _isValidPlugin: function(addon) {
    return this._addonHasKeyword(addon, 'ember-cli-deploy-plugin') && this._addonImplementsDeploymentHooks(addon);
  },

  _pluginName: function(addon) {
    if(addon.name.indexOf('ember-cli-deploy') > -1) {
      var pluginNameRegex = /^(ember-cli-deploy-)(.*)$/;
      return addon.name.match(pluginNameRegex)[2];
    }
    return addon.name;
  },

  _addonHasKeyword: function(addon, keyword) {
    var keywords = addon.pkg.keywords;
    return keywords.indexOf(keyword) > -1;
  },

  _addonImplementsDeploymentHooks: function(addon) {
    return addon.createDeployPlugin && typeof addon.createDeployPlugin === 'function';
  },

  _castArray: function(obj) {
    if (!obj) {
      return [];
    }

    return _.castArray(obj);
  },

  _mergeAuthorProvidedOrderWithConfigOrder: function(type, instanceName, names, config, aliasMap) {
    var self = this;
    names.forEach(function(name) {
      var aliases = aliasMap[name] && aliasMap[name].as;
      if (aliases) {
        if (!config[instanceName]) {
          config[instanceName] = {};
        }

        if (!config[instanceName][type]) {
          config[instanceName][type] = aliases;
        } else {
          var combined = self._castArray(config[instanceName][type])
            .reduce(function(all, current) {
              if (all.indexOf(current) === -1) {
                all.push(current);
              }

              return all;
            }, aliases);
          config[instanceName][type] = combined;
        }
      }
    });

    return config;
  },

  _logUnknownPlugins: function(names, key) {
    var message = chalk.yellow('Your config has referenced the following unknown plugins or aliases in `' + key + '`:\n');
    this._ui.writeLine(message, 'WARNING');
    names.forEach(function(name) {
      message = chalk.yellow('- ' + name + '\n');
      this._ui.writeLine(message, 'WARNING');
    }.bind(this));
  },

  _flattenAliasMap: function(aliasMap) {
    return Object.keys(aliasMap)
      .reduce(function(aliases, pluginName) {
        return aliases.concat(aliasMap[pluginName].as);
      }, []);
  },
});
