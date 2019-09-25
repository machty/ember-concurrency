'use strict';

const Rule = require('./base');
const createErrorMessage = require('../helpers/create-error-message');

function message(original) {
  return (
    `Ambiguous path '${original}' is not allowed. ` +
    `Use '@${original}' if it is a named argument ` +
    `or 'this.${original}' if it is a property on 'this'. ` +
    'If it is a helper or component that has no arguments ' +
    "you must manually add it to the 'no-implicit-this' rule configuration, e.g. " +
    `'no-implicit-this': { allow: ['${original}'] }.`
  );
}

function isString(value) {
  return typeof value === 'string';
}

function isRegExp(value) {
  return value instanceof RegExp;
}

function allowedFormat(value) {
  return isString(value) || isRegExp(value);
}

// Allow Ember's builtin argless syntaxes
const ARGLESS_BUILTINS = [
  'debugger',
  'has-block',
  'hasBlock',
  'input',
  'outlet',
  'textarea',
  'yield',
];

// arg'less Components / Helpers in default ember-cli blueprint
const ARGLESS_DEFAULT_BLUEPRINT = ['welcome-page'];

module.exports = class StrictPaths extends Rule {
  parseConfig(config) {
    if (config === false || config === undefined) {
      return false;
    }

    switch (typeof config) {
      case 'undefined':
        return false;

      case 'boolean':
        if (config) {
          return {
            allow: [].concat(ARGLESS_BUILTINS, ARGLESS_DEFAULT_BLUEPRINT),
          };
        } else {
          return false;
        }

      case 'object':
        if (Array.isArray(config.allow) && config.allow.every(allowedFormat)) {
          return {
            allow: [].concat(ARGLESS_BUILTINS, ARGLESS_DEFAULT_BLUEPRINT, config.allow),
          };
        }
        break;
    }

    let errorMessage = createErrorMessage(
      this.ruleName,
      [
        '  * boolean - `true` to enable / `false` to disable',
        '  * object -- An object with the following keys:',
        '    * `allow` -- An array of component / helper names for that may be called without arguments',
      ],
      config
    );

    throw new Error(errorMessage);
  }

  // The way this visitor works is a bit sketchy. We need to lint the PathExpressions
  // in the callee position differently those in an argument position.
  //
  // Unfortunately, the current visitor API doesn't give us a good way to differentiate
  // these two cases. Instead, we rely on the fact that the _first_ PathExpression that
  // we enter after entering a MustacheStatement/BlockStatement/... will be the callee
  // and we track this using a flag called `nextPathIsCallee`.
  visitor() {
    let nextPathIsCallee = false;

    return {
      PathExpression(path) {
        if (nextPathIsCallee) {
          // All paths are valid callees so there's nothing to check.
        } else {
          let valid =
            path.data ||
            path.this ||
            this.isLocal(path) ||
            this.config.allow.some(item => {
              return isRegExp(item) ? item.test(path.original) : item === path.original;
            });

          if (!valid) {
            this.log({
              message: message(path.original),
              line: path.loc && path.loc.start.line,
              column: path.loc && path.loc.start.column,
              source: this.sourceForNode(path),
            });
          }
        }

        nextPathIsCallee = false;
      },

      SubExpression() {
        nextPathIsCallee = true;
      },

      ElementModifierStatement() {
        nextPathIsCallee = true;
      },

      MustacheStatement(node) {
        let isCall = node.params.length > 0 || node.hash.pairs.length > 0;

        nextPathIsCallee = isCall;
      },

      BlockStatement: {
        enter() {
          nextPathIsCallee = true;
        },
      },
    };
  }
};

module.exports.message = message;
