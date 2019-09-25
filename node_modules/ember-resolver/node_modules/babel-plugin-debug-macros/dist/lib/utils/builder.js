'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Builder = function () {
  function Builder(t, options) {
    _classCallCheck(this, Builder);

    this.t = t;
    this.module = options.module;
    this.global = options.global;
    this.assertPredicateIndex = options.assertPredicateIndex;
    this.expressions = [];
  }

  /**
   * Expands:
   *
   * assert($PREDICATE, $MESSAGE)
   *
   * into
   *
   * ($DEBUG && console.assert($PREDICATE, $MESSAGE));
   *
   * or
   *
   * ($DEBUG && assert($PREDICATE, $MESSAGE));
   *
   * or
   *
   * ($DEBUG && $GLOBAL_NS.assert($PREDICATE, $MESSAGE));
   */


  _createClass(Builder, [{
    key: 'assert',
    value: function assert(path) {
      var _this = this;

      var predicate = void 0;
      if (this.assertPredicateIndex !== undefined) {
        predicate = function predicate(expression, args) {
          return args[_this.assertPredicateIndex];
        };
      }

      this._createMacroExpression(path, {
        predicate
      });
    }

    /**
     * Expands:
     *
     * warn($MESSAGE)
     *
     * into
     *
     * ($DEBUG && console.warn($MESSAGE));
     *
     * or
     *
     * ($DEBUG && warn($MESSAGE));
     *
     * or
     *
     * ($DEBUG && $GLOBAL_NS.warn($MESSAGE));
     */

  }, {
    key: 'warn',
    value: function warn(path) {
      this._createMacroExpression(path);
    }

    /**
     * Expands:
     *
     * log($MESSAGE)
     *
     * into
     *
     * ($DEBUG && console.log($MESSAGE));
     *
     * or
     *
     * ($DEBUG && log($MESSAGE));
     *
     * or
     *
     * ($DEBUG && $GLOBAL_NS.log($MESSAGE));
     */

  }, {
    key: 'log',
    value: function log(path) {
      this._createMacroExpression(path);
    }
  }, {
    key: '_createMacroExpression',
    value: function _createMacroExpression(path, _options) {
      var options = _options || {};

      var t = this.t,
          module = this.module,
          global = this.global;

      var expression = path.node.expression;
      var callee = expression.callee,
          args = expression.arguments;

      var callExpression = void 0;

      if (options.validate) {
        options.validate(expression, args);
      }

      if (module || global) {
        if (global) {
          callExpression = this._createGlobalExternalHelper(callee, args, global);
        } else {
          callExpression = expression;
        }
      } else if (options.buildConsoleAPI) {
        callExpression = options.buildConsoleAPI(expression, args);
      } else {
        callExpression = this._createConsoleAPI(options.consoleAPI || callee, args);
      }

      var identifiers = this._getIdentifiers(args);
      var prefixedIdentifiers = [];

      if (options.predicate) {
        var predicate = options.predicate(expression, args) || t.identifier('false');
        var negatedPredicate = t.unaryExpression('!', t.parenthesizedExpression(predicate));
        prefixedIdentifiers.push(negatedPredicate);
      }

      this.expressions.push([path, this._buildLogicalExpressions(prefixedIdentifiers, callExpression)]);
    }

    /**
     * Expands:
     *
     * deprecate($MESSAGE, $PREDICATE)
     *
     * or
     *
     * deprecate($MESSAGE, $PREDICATE, {
     *  $ID,
     *  $URL,
     *  $UNIL
     * });
     *
     * into
     *
     * ($DEBUG && $PREDICATE && console.warn($MESSAGE));
     *
     * or
     *
     * ($DEBUG && $PREDICATE && deprecate($MESSAGE, $PREDICATE, { $ID, $URL, $UNTIL }));
     *
     * or
     *
     * ($DEBUG && $PREDICATE && $GLOBAL_NS.deprecate($MESSAGE, $PREDICATE, { $ID, $URL, $UNTIL }));
     */

  }, {
    key: 'deprecate',
    value: function deprecate(path) {
      var _this2 = this;

      this._createMacroExpression(path, {
        predicate: function predicate(expression, args) {
          return args[1];
        },

        buildConsoleAPI: function buildConsoleAPI(expression, args) {
          var _args = _slicedToArray(args, 1),
              message = _args[0];

          return _this2._createConsoleAPI(_this2.t.identifier('warn'), [message]);
        },

        validate: function validate(expression, args) {
          var _args2 = _slicedToArray(args, 3),
              meta = _args2[2];

          if (meta && meta.properties && !meta.properties.some(function (prop) {
            return prop.key.name === 'id';
          })) {
            throw new ReferenceError(`deprecate's meta information requires an "id" field.`);
          }

          if (meta && meta.properties && !meta.properties.some(function (prop) {
            return prop.key.name === 'until';
          })) {
            throw new ReferenceError(`deprecate's meta information requires an "until" field.`);
          }
        }
      });
    }

    /**
     * Performs the actually expansion of macros
     */

  }, {
    key: 'expandMacros',
    value: function expandMacros(debugFlag) {
      var t = this.t;

      var flag = t.booleanLiteral(debugFlag);
      for (var i = 0; i < this.expressions.length; i++) {
        var _expressions$i = _slicedToArray(this.expressions[i], 2),
            exp = _expressions$i[0],
            logicalExp = _expressions$i[1];

        exp.replaceWith(t.parenthesizedExpression(logicalExp(flag)));
      }
    }
  }, {
    key: '_getIdentifiers',
    value: function _getIdentifiers(args) {
      var _this3 = this;

      return args.filter(function (arg) {
        return _this3.t.isIdentifier(arg);
      });
    }
  }, {
    key: '_createGlobalExternalHelper',
    value: function _createGlobalExternalHelper(identifier, args, ns) {
      var t = this.t;

      return t.callExpression(t.memberExpression(t.identifier(ns), identifier), args);
    }
  }, {
    key: '_createConsoleAPI',
    value: function _createConsoleAPI(identifier, args) {
      var t = this.t;

      return t.callExpression(t.memberExpression(t.identifier('console'), identifier), args);
    }
  }, {
    key: '_buildLogicalExpressions',
    value: function _buildLogicalExpressions(identifiers, callExpression) {
      var t = this.t;


      return function (debugIdentifier) {
        identifiers.unshift(debugIdentifier);
        identifiers.push(callExpression);
        var logicalExpressions = void 0;

        for (var i = 0; i < identifiers.length; i++) {
          var left = identifiers[i];
          var right = identifiers[i + 1];
          if (!logicalExpressions) {
            logicalExpressions = t.logicalExpression('&&', left, right);
          } else if (right) {
            logicalExpressions = t.logicalExpression('&&', logicalExpressions, right);
          }
        }

        return logicalExpressions;
      };
    }
  }]);

  return Builder;
}();

exports.default = Builder;