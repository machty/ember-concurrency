/* eslint-env node */
'use strict';

const VersionChecker = require('ember-cli-version-checker');
const clone = require('clone');
const path = require('path');
const semver = require('semver');

let count = 0;

module.exports = {
  name: 'ember-cli-babel',
  configKey: 'ember-cli-babel',

  init() {
    this._super.init && this._super.init.apply(this, arguments);

    let checker = new VersionChecker(this);
    let dep = this.emberCLIChecker = checker.for('ember-cli', 'npm');

    this._shouldShowBabelDeprecations = !dep.lt('2.11.0-beta.2');
  },

  buildBabelOptions(_config) {
    let config = _config || this._getAddonOptions();

    return this._getBabelOptions(config);
  },

  _debugTree() {
    if (!this._cachedDebugTree) {
      this._cachedDebugTree = require('broccoli-debug').buildDebugCallback(`ember-cli-babel:${this._parentName()}`);
    }

    return this._cachedDebugTree.apply(null, arguments);
  },

  transpileTree(inputTree, config) {
    let description = `000${++count}`.slice(-3);
    let postDebugTree = this._debugTree(inputTree, `${description}:input`);

    let options = this.buildBabelOptions(config);
    let output;
    if (this._shouldDoNothing(options)) {
      output = postDebugTree;
    } else {
      let BabelTranspiler = require('broccoli-babel-transpiler');
      output = new BabelTranspiler(postDebugTree, options);
    }

    return this._debugTree(output, `${description}:output`);
  },

  setupPreprocessorRegistry(type, registry) {
    registry.add('js', {
      name: 'ember-cli-babel',
      ext: 'js',
      toTree: (tree) => this.transpileTree(tree)
    });
  },

  _shouldIncludePolyfill() {
    let addonOptions = this._getAddonOptions();
    let babelOptions = addonOptions.babel;
    let customOptions = addonOptions['ember-cli-babel'];

    if (this._shouldShowBabelDeprecations && !this._polyfillDeprecationPrinted &&
      babelOptions && 'includePolyfill' in babelOptions) {

      this._polyfillDeprecationPrinted = true;

      // we can use writeDeprecateLine() here because the warning will only be shown on newer Ember CLIs
      this.ui.writeDeprecateLine(
        'Putting the "includePolyfill" option in "babel" is deprecated, please put it in "ember-cli-babel" instead.');
    }

    if (customOptions && 'includePolyfill' in customOptions) {
      return customOptions.includePolyfill === true;
    } else if (babelOptions && 'includePolyfill' in babelOptions) {
      return babelOptions.includePolyfill === true;
    } else {
      return false;
    }
  },

  _importPolyfill(app) {
    let polyfillPath = 'vendor/babel-polyfill/polyfill.js';

    if (this.import) {  // support for ember-cli >= 2.7
      this.import(polyfillPath, { prepend: true });
    } else if (app.import) { // support ember-cli < 2.7
      app.import(polyfillPath, { prepend: true });
    } else {
      // eslint-disable-next-line no-console
      console.warn('Please run: ember install ember-cli-import-polyfill');
    }
  },

  treeForVendor() {
    if (!this._shouldIncludePolyfill()) { return; }

    const Funnel = require('broccoli-funnel');
    const UnwatchedDir = require('broccoli-source').UnwatchedDir;

    // Find babel-core's browser polyfill and use its directory as our vendor tree
    let polyfillDir = path.dirname(require.resolve('babel-polyfill/dist/polyfill'));

    return new Funnel(new UnwatchedDir(polyfillDir), {
      destDir: 'babel-polyfill'
    });
  },

  included: function(app) {
    this._super.included.apply(this, arguments);
    this.app = app;

    if (this._shouldIncludePolyfill()) {
      this._importPolyfill(app);
    }
  },

  isPluginRequired(pluginName) {
    let targets = this._getTargets();

    // if no targets are setup, assume that all plugins are required
    if (!targets) { return true; }

    const isPluginRequired = require('babel-preset-env').isPluginRequired;
    const pluginList = require('babel-preset-env/data/plugins');

    return isPluginRequired(targets, pluginList[pluginName]);
  },

  _getAddonOptions() {
    return (this.parent && this.parent.options) || (this.app && this.app.options) || {};
  },

  _parentName() {
    let parentName;

    if (this.parent) {
      if (typeof this.parent.name === 'function') {
        parentName = this.parent.name();
      } else {
        parentName = this.parent.name;
      }
    }

    return parentName;
  },

  _getAddonProvidedConfig(addonOptions) {
    let babelOptions = clone(addonOptions.babel || {});

    // used only to support using ember-cli-babel@6 at the
    // top level (app or addon during development) on ember-cli
    // older than 2.13
    //
    // without this, we mutate the same shared `options.babel.plugins`
    // that is used to transpile internally (via `_prunedBabelOptions`
    // in older ember-cli versions)
    let babel6Options = clone(addonOptions.babel6 || {});

    let options;
    // options.modules is set only for things assuming babel@5 usage
    if (babelOptions.modules) {
      // using babel@5 configuration with babel@6
      // without overriding here we would trigger
      // an error
      options = Object.assign({}, babel6Options);
    } else {
      // shallow merge both babelOptions and babel6Options
      // (plugins/postTransformPlugins are handled separately)
      options = Object.assign({}, babelOptions, babel6Options);
    }

    let plugins = [].concat(babelOptions.plugins, babel6Options.plugins).filter(Boolean);
    let postTransformPlugins = [].concat(babelOptions.postTransformPlugins, babel6Options.postTransformPlugins).filter(Boolean);

    return {
      options,
      plugins,
      postTransformPlugins
    };
  },

  _getBabelOptions(config) {
    let addonProvidedConfig = this._getAddonProvidedConfig(config);
    let shouldCompileModules = this._shouldCompileModules(config);

    let emberCLIBabelConfig = config['ember-cli-babel'];
    let shouldRunPresetEnv = true;
    let providedAnnotation;
    let throwUnlessParallelizable;

    if (emberCLIBabelConfig) {
      providedAnnotation = emberCLIBabelConfig.annotation;
      shouldRunPresetEnv = !emberCLIBabelConfig.disablePresetEnv;
      throwUnlessParallelizable = emberCLIBabelConfig.throwUnlessParallelizable;
    }

    let sourceMaps = false;
    if (config.babel && 'sourceMaps' in config.babel) {
      sourceMaps = config.babel.sourceMaps;
    }

    let options = {
      annotation: providedAnnotation || `Babel: ${this._parentName()}`,
      sourceMaps,
      throwUnlessParallelizable
    };

    let userPlugins = addonProvidedConfig.plugins;
    let userPostTransformPlugins = addonProvidedConfig.postTransformPlugins;

    options.plugins = [].concat(
      userPlugins,
      this._getDebugMacroPlugins(config),
      this._getEmberModulesAPIPolyfill(config),
      shouldCompileModules && this._getModulesPlugin(),
      userPostTransformPlugins
    ).filter(Boolean);

    options.presets = [
      shouldRunPresetEnv && this._getPresetEnvPlugins(addonProvidedConfig),
    ].filter(Boolean);

    if (shouldCompileModules) {
      options.moduleIds = true;
      options.resolveModuleSource = require('amd-name-resolver').moduleResolve;
    }

    options.highlightCode = false;
    options.babelrc = false;

    return options;
  },

  _getDebugMacroPlugins(config) {
    let addonOptions = config['ember-cli-babel'] || {};

    if (addonOptions.disableDebugTooling) { return; }

    const isProduction = process.env.EMBER_ENV === 'production';

    let options = {
      flags: [
        {
          source: '@glimmer/env',
          flags: { DEBUG: !isProduction, CI: !!process.env.CI }
        }
      ],

      externalizeHelpers: {
        global: 'Ember'
      },

      debugTools: {
        isDebug: !isProduction,
        source: '@ember/debug',
        assertPredicateIndex: 1
      }
    };

    return [[require.resolve('babel-plugin-debug-macros'), options]];
  },

  _getEmberModulesAPIPolyfill(config) {
    let addonOptions = config['ember-cli-babel'] || {};

    if (addonOptions.disableEmberModulesAPIPolyfill) { return; }

    if (this._emberVersionRequiresModulesAPIPolyfill()) {
      const blacklist = this._getEmberModulesAPIBlacklist();

      return [[require.resolve('babel-plugin-ember-modules-api-polyfill'), { blacklist }]];
    }
  },

  _getPresetEnvPlugins(config) {
    let options = config.options;

    let targets = this._getTargets();
    let presetOptions = Object.assign({}, options, {
      modules: false,
      targets
    });

    let presetEnvPlugins = this._presetEnv(presetOptions);
    return presetEnvPlugins;
  },

  _presetEnv(presetOptions) {
    return [require.resolve('babel-preset-env'), presetOptions];
  },

  _getTargets() {
    let targets = this.project && this.project.targets;

    let parser = require('babel-preset-env/lib/targets-parser').default;
    if (typeof targets === 'object' && targets !== null) {
      return parser(targets);
    } else {
      return targets;
    }
  },

  _getModulesPlugin() {
    return [
      [require.resolve('babel-plugin-transform-es2015-modules-amd'), { noInterop: true }]
    ];
  },

  /*
   * Used to discover if the addon's current configuration will compile modules
   * or not.
   *
   * @public
   * @method shouldCompileModules
   */
  shouldCompileModules() {
    return this._shouldCompileModules(this._getAddonOptions());
  },

  // will use any provided configuration
  _shouldCompileModules(options) {
    let addonOptions = options['ember-cli-babel'];
    let babelOptions = options.babel;

    if (addonOptions && 'compileModules' in addonOptions) {
      return addonOptions.compileModules;
    } else if (babelOptions && 'compileModules' in babelOptions) {
      if (this._shouldShowBabelDeprecations && !this._compileModulesDeprecationPrinted) {
        this._compileModulesDeprecationPrinted = true;
        // we can use writeDeprecateLine() here because the warning will only be shown on newer Ember CLIs
        this.ui.writeDeprecateLine('Putting the "compileModules" option in "babel" is deprecated, please put it in "ember-cli-babel" instead.');
      }

      return babelOptions.compileModules;
    } else {
      return semver.gt(this.project.emberCLIVersion(), '2.12.0-alpha.1');
    }
  },

  _emberVersionRequiresModulesAPIPolyfill() {
    // once a version of Ember ships with the
    // emberjs/rfcs#176 modules natively this will
    // be updated to detect that and return false
    return true;
  },

  _getEmberModulesAPIBlacklist() {
    const blacklist = {
      '@ember/debug': ['assert', 'deprecate', 'warn'],
    };

    if (this._emberStringDependencyPresent()) {
      blacklist['@ember/string'] = [
        'fmt', 'loc', 'w',
        'decamelize', 'dasherize', 'camelize',
        'classify', 'underscore', 'capitalize',
      ];
    }

    return blacklist;
  },

  _emberStringDependencyPresent() {
    let checker = new VersionChecker(this.parent).for('@ember/string', 'npm');

    return checker.exists();
  },

  // detect if running babel would do nothing... and do nothing instead
  _shouldDoNothing(options) {
    return !options.sourceMaps && !options.plugins.length;
  }
};
