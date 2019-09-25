'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _builder = require('./builder');

var _builder2 = _interopRequireDefault(_builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEBUG = 'DEBUG';

var SUPPORTED_MACROS = ['assert', 'deprecate', 'warn', 'log'];

var Macros = function () {
  function Macros(t, options) {
    _classCallCheck(this, Macros);

    this.localDebugBindings = [];
    this.envFlagBindings = [];
    this.hasEnvFlags = false;
    this.envFlagsSource = options.envFlags.envFlagsImport;
    this.importedDebugTools = false;
    this.envFlags = options.envFlags.flags;
    this.featureSources = options.featureSources;
    this.featuresMap = options.featuresMap;
    this.svelteMap = options.svelteMap;
    this.svelteVersions = options.svelte;
    this.featureFlags = options.features || [];
    this.debugHelpers = options.externalizeHelpers || {};
    this.builder = new _builder2.default(t, {
      module: this.debugHelpers.module,
      global: this.debugHelpers.global,
      assertPredicateIndex: options.debugTools.assertPredicateIndex
    });
  }

  /**
   * Injects the either the env-flags module with the debug binding or
   * adds the debug binding if missing from the env-flags module.
   */


  _createClass(Macros, [{
    key: 'expand',
    value: function expand(path) {
      var debugBinding = path.scope.getBinding(DEBUG);
      var builder = this.builder,
          envFlags = this.envFlags;


      if (this._hasDebugModule(debugBinding)) {
        debugBinding.path.parentPath.remove();
      }

      this._inlineFeatureFlags(path);
      this._inlineSvelteFlags(path);
      this._inlineEnvFlags(path);
      this.builder.expandMacros(envFlags.DEBUG);
      this._cleanImports(path);
    }
  }, {
    key: '_inlineFeatureFlags',
    value: function _inlineFeatureFlags(path) {
      var envFlags = this.envFlags,
          builder = this.builder,
          featureFlags = this.featureFlags,
          featuresMap = this.featuresMap;


      if (this.envFlags.DEBUG) {
        return;
      }
      Object.keys(featuresMap).forEach(function (source) {
        Object.keys(featuresMap[source]).forEach(function (flag) {
          var flagValue = featuresMap[source][flag];
          var binding = path.scope.getBinding(flag);

          if (binding && flagValue !== null) {
            binding.referencePaths.forEach(function (referencePath) {
              referencePath.replaceWith(builder.t.booleanLiteral(flagValue));
            });

            if (binding.path.parentPath.isImportDeclaration()) {
              binding.path.remove();
            }
          }
        });
      });
    }
  }, {
    key: '_inlineEnvFlags',
    value: function _inlineEnvFlags(path) {
      var _this = this;

      var envFlags = this.envFlags,
          builder = this.builder;

      Object.keys(envFlags).forEach(function (flag) {
        var binding = path.scope.getBinding(flag);
        if (binding && binding.path.isImportSpecifier() && binding.path.parent.source.value === _this.envFlagsSource) {

          binding.referencePaths.forEach(function (p) {
            return p.replaceWith(builder.t.booleanLiteral(envFlags[flag]));
          });
        }
      });
    }
  }, {
    key: '_inlineSvelteFlags',
    value: function _inlineSvelteFlags(path) {
      var svelteMap = this.svelteMap,
          envFlags = this.envFlags,
          builder = this.builder;

      var sources = Object.keys(svelteMap);
      sources.forEach(function (source) {
        Object.keys(svelteMap[source]).forEach(function (flag) {
          var binding = path.scope.getBinding(flag);
          if (binding !== undefined) {
            binding.referencePaths.forEach(function (p) {
              if (envFlags.DEBUG) {
                if (svelteMap[source][flag] === false) {
                  var t = builder.t;

                  if (!p.parentPath.isIfStatement()) {
                    return;
                  }
                  var consequent = p.parentPath.get('consequent');
                  consequent.unshiftContainer('body', builder.t.throwStatement(t.newExpression(t.identifier('Error'), [t.stringLiteral(`You indicated you don't have any deprecations, however you are relying on ${flag}.`)])));
                }
              } else {
                if (p.parentPath.isIfStatement()) {
                  p.replaceWith(builder.t.booleanLiteral(svelteMap[source][flag]));
                }
              }
            });

            if (!envFlags.DEBUG && binding) {
              binding.path.remove();
            }
          }
        });
      });
    }

    /**
     * Collects the import bindings for the debug tools.
     */

  }, {
    key: 'collectDebugToolsSpecifiers',
    value: function collectDebugToolsSpecifiers(specifiers) {
      this.importedDebugTools = true;
      this._collectImportBindings(specifiers, this.localDebugBindings);
    }
  }, {
    key: 'collectEnvFlagSpecifiers',
    value: function collectEnvFlagSpecifiers(specifiers) {
      this.hasEnvFlags = true;
      this._collectImportBindings(specifiers, this.envFlagBindings);
    }

    /**
     * Builds the expressions that the CallExpression will expand into.
     */

  }, {
    key: 'build',
    value: function build(path) {
      var expression = path.node.expression;
      var builder = this.builder,
          localDebugBindings = this.localDebugBindings;

      if (builder.t.isCallExpression(expression) && localDebugBindings.some(function (b) {
        return b.node.name === expression.callee.name;
      })) {
        var imported = path.scope.getBinding(expression.callee.name).path.node.imported.name;
        this.builder[`${imported}`](path);
      }
    }
  }, {
    key: '_collectImportBindings',
    value: function _collectImportBindings(specifiers, buffer) {
      specifiers.forEach(function (specifier) {
        if (specifier.node.imported && SUPPORTED_MACROS.indexOf(specifier.node.imported.name) > -1) {
          buffer.push(specifier.get('local'));
        }
      });
    }
  }, {
    key: '_hasDebugModule',
    value: function _hasDebugModule(debugBinding) {
      var fromModule = debugBinding && debugBinding.kind === 'module';
      var moduleName = fromModule && debugBinding.path.parent.source.value;
      return moduleName === this.envFlagsSource;
    }
  }, {
    key: '_detectForeignFeatureFlag',
    value: function _detectForeignFeatureFlag(specifiers, source) {
      var featuresMap = this.featuresMap;

      specifiers.forEach(function (specifier) {
        if (specifier.imported && featuresMap[source][specifier.imported.name] !== null) {
          throw new Error(`Imported ${specifier.imported.name} from ${source} which is not a supported flag.`);
        }
      });
    }
  }, {
    key: '_cleanImports',
    value: function _cleanImports(path) {
      var debugHelpers = this.debugHelpers,
          builder = this.builder,
          featureFlags = this.featureFlags,
          featureSources = this.featureSources;


      var body = path.get('body');

      if (!this.envFlags.DEBUG) {
        for (var i = 0; i < body.length; i++) {
          var decl = body[i];

          if (builder.t.isImportDeclaration(decl)) {
            var source = decl.node.source.value;
            if (featureSources.indexOf(source) > -1) {
              if (decl.node.specifiers.length > 0) {
                this._detectForeignFeatureFlag(decl.node.specifiers, source);
              } else {
                decl.remove();
                break;
              }
            }
          }
        }
      }

      if (!debugHelpers.module) {
        if (this.localDebugBindings.length > 0) {
          this.localDebugBindings[0].parentPath.parentPath;
          var importPath = this.localDebugBindings[0].findParent(function (p) {
            return p.isImportDeclaration();
          });
          var specifiers = importPath.get('specifiers');

          if (specifiers.length === this.localDebugBindings.length) {
            this.localDebugBindings[0].parentPath.parentPath.remove();
          } else {
            this.localDebugBindings.forEach(function (binding) {
              return binding.parentPath.remove();
            });
          }
        }
      }
    }
  }]);

  return Macros;
}();

exports.default = Macros;