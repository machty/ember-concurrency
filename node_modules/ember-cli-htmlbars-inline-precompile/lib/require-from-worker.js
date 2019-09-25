'use strict';

const AstPlugins = require('./ast-plugins');
let astPlugin = {};

module.exports = {
  build(options, cacheKey) {
    // Caching the plugin info so that call to setUp functions will be made once per worker
    // and not once per module tranformation
    let plugin = astPlugin[cacheKey];
    if (!plugin) {
      const pluginInfo = AstPlugins.setupDependentPlugins(options.parallelConfig);
      plugin = AstPlugins.setup(pluginInfo, {
        templateCompilerPath: options.templateCompilerPath,
      });
      // if cacheKey is not undefined cache it.
      if(cacheKey) {
        astPlugin[cacheKey] = plugin;
      }
    }
    return plugin;
  }
}