'use strict';

const utils = require('../utils/utils');

//------------------------------------------------------------------------------
// General rule - Use named functions defined on objects to handle promises
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforces usage of named functions in promises',
      category: 'Best Practices',
      recommended: false,
      url:
        'https://github.com/ember-cli/eslint-plugin-ember/tree/master/docs/rules/named-functions-in-promises.md',
    },
    fixable: null, // or "code" or "whitespace"
  },

  create(context) {
    const options = context.options[0] || {};
    const allowSimpleArrowFunction = options.allowSimpleArrowFunction || false;

    const message = 'Use named functions defined on objects to handle promises';

    const report = function(node) {
      context.report(node, message);
    };

    return {
      CallExpression(node) {
        const firstArg = node.arguments[0];

        if (hasPromiseExpression(node)) {
          if (
            allowSimpleArrowFunction &&
            utils.isConciseArrowFunctionWithCallExpression(firstArg)
          ) {
            return;
          }
          if (utils.isFunctionExpression(firstArg) || utils.isArrowFunctionExpression(firstArg)) {
            report(node);
          }
        }
      },
    };

    function hasPromiseExpression(node) {
      const callee = node.callee;
      const promisesMethods = ['then', 'catch', 'finally'];

      return (
        utils.isCallExpression(callee.object) &&
        utils.isIdentifier(callee.property) &&
        promisesMethods.indexOf(callee.property.name) > -1
      );
    }
  },
};
