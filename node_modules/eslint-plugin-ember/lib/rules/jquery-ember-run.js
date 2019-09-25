'use strict';

const utils = require('../utils/utils');
const ember = require('../utils/ember');

//------------------------------------------------------------------------------
// General rule - Don’t use jQuery without Ember Run Loop
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevents usage of jQuery without Ember Run Loop',
      category: 'Possible Errors',
      recommended: true,
      url:
        'https://github.com/ember-cli/eslint-plugin-ember/tree/master/docs/rules/jquery-ember-run.md',
    },
    fixable: null, // or "code" or "whitespace"
  },

  create(context) {
    const message = "Don't use jQuery without Ember Run Loop";

    const report = function(node) {
      context.report(node, message);
    };

    const isJqueryUsed = function(node) {
      return (
        utils.isMemberExpression(node) &&
        utils.isCallExpression(node.object) &&
        ember.isModule(node.object, '$')
      );
    };

    const isRunUsed = function(node) {
      return ember.isModule(node, 'run');
    };

    return {
      CallExpression(node) {
        const callee = node.callee;
        const fnNodes = utils.findNodes(node.arguments, 'ArrowFunctionExpression');

        if (isJqueryUsed(callee) && fnNodes.length) {
          fnNodes.forEach(fnNode => {
            const fnBody = fnNode.body.body;
            const fnExpressions = utils.findNodes(fnBody, 'ExpressionStatement');

            fnExpressions.forEach(fnExpression => {
              const expression = fnExpression.expression;

              if (
                utils.isCallExpression(expression) &&
                utils.isMemberExpression(expression.callee) &&
                !isRunUsed(expression)
              ) {
                report(expression.callee);
              }
            });
          });
        }
      },
    };
  },
};
