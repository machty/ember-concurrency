'use strict';

const fs = require('fs');
const path = require('path');
const HTMLBarsInlinePrecompilePlugin = require.resolve('babel-plugin-htmlbars-inline-precompile');
const hashForDep = require('hash-for-dep');
const debugGenerator = require('heimdalljs-logger');
const _logger = debugGenerator('ember-cli-htmlbars-inline-precompile');

module.exports = {
  purgeModule(templateCompilerPath) {
    // ensure we get a fresh templateCompilerModuleInstance per ember-addon
    // instance NOTE: this is a quick hack, and will only work as long as
    // templateCompilerPath is a single file bundle
    //
    // (╯°□°）╯︵ ɹǝqɯǝ
    //
    // we will also fix this in ember for future releases

    // Module will be cached in .parent.children as well. So deleting from require.cache alone is not sufficient.
    let mod = require.cache[templateCompilerPath];
    if (mod && mod.parent) {
      let index = mod.parent.children.indexOf(mod);
      if (index >= 0) {
        mod.parent.children.splice(index, 1);
      } else {
        throw new TypeError(`ember-cli-htmlbars-inline-precompile attempted to purge '${templateCompilerPath}' but something went wrong.`);
      }
    }

    delete require.cache[templateCompilerPath];
  },

  setup(pluginInfo, options) {
    // borrowed from ember-cli-htmlbars http://git.io/vJDrW
    let projectConfig = options.projectConfig || {};
    let templateCompilerPath = options.templateCompilerPath;

    let EmberENV = projectConfig.EmberENV || {};
    // ensure we get a fresh templateCompilerModuleInstance per ember-addon
    // instance NOTE: this is a quick hack, and will only work as long as
    // templateCompilerPath is a single file bundle
    //
    // (╯°□°）╯︵ ɹǝqɯǝ
    //
    // we will also fix this in ember for future releases
    this.purgeModule(templateCompilerPath);

    // do a full clone of the EmberENV (it is guaranteed to be structured
    // cloneable) to prevent ember-template-compiler.js from mutating
    // the shared global config
    let clonedEmberENV = JSON.parse(JSON.stringify(EmberENV));
    global.EmberENV = clonedEmberENV;

    let Compiler = require(templateCompilerPath);
    let cacheKey = this.makeCacheKey(templateCompilerPath, pluginInfo);

    let precompileInlineHTMLBarsPlugin;

    pluginInfo.plugins.forEach((plugin) => Compiler.registerPlugin('ast', plugin));

    let precompile = Compiler.precompile;
    precompile.baseDir = () => path.resolve(__dirname, '..');
    precompile.cacheKey = () => cacheKey;

    let modulePaths = ['ember-cli-htmlbars-inline-precompile', 'htmlbars-inline-precompile'];
    precompileInlineHTMLBarsPlugin = [HTMLBarsInlinePrecompilePlugin, { precompile, modulePaths }];

    this.purgeModule(templateCompilerPath);

    delete global.Ember;
    delete global.EmberENV;

    return precompileInlineHTMLBarsPlugin;
  },

  makeCacheKey(templateCompilerPath, pluginInfo, extra) {
    let templateCompilerFullPath = require.resolve(templateCompilerPath);
    let templateCompilerCacheKey = fs.readFileSync(templateCompilerFullPath, { encoding: 'utf-8' });
    let cacheItems = [templateCompilerCacheKey, extra].concat(pluginInfo.cacheKeys.sort());
    // extra may be undefined
    return cacheItems.filter(Boolean).join('|');
  },

  setupDependentPlugins(wrappers) {
    const plugins = [];
    const cacheKeys = [];

    wrappers.forEach((item) => {
      let buildInfo;
      if (item.requireFile) {
        const plugin = require(item.requireFile);
        buildInfo = plugin[item.buildUsing](item.params);
      } else {
        buildInfo = item;
      }

      plugins.push(buildInfo.plugin);

      let providesBaseDir = typeof buildInfo.baseDir === 'function';
      let augmentsCacheKey = typeof buildInfo.cacheKey === 'function';

      if (providesBaseDir || augmentsCacheKey) {
        if (providesBaseDir) {
          let pluginHashForDep = hashForDep(buildInfo.baseDir());
          cacheKeys.push(pluginHashForDep);
        }
        if (augmentsCacheKey) {
          cacheKeys.push(buildInfo.cacheKey());
        }
      } else {
        _logger.debug('ember-cli-htmlbars-inline-precompile is opting out of caching due to an AST plugin that does not provide a caching strategy: `' + buildInfo.name + '`.');
        cacheKeys.push((new Date()).getTime() + '|' + Math.random());
      }
    });

    return {
      plugins,
      cacheKeys
    };
  }
};
