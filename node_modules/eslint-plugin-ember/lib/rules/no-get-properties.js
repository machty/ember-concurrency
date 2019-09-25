'use strict';

const utils = require('../utils/utils');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const ERROR_MESSAGE =
  "Ember's `getProperties` function can be omitted in a destructuring assignment.";

module.exports = {
  meta: {
    docs: {
      description: "Disallow unnecessary usage of Ember's `getProperties` function",
      category: 'Best Practices',
      replacedBy: ['no-get'],
      recommended: false,
    },
    deprecated: true,
  },

  ERROR_MESSAGE,

  create(context) {
    return {
      VariableDeclarator(node) {
        if (!node.id || !utils.isObjectPattern(node.id)) {
          return;
        }

        if (!node.init || !utils.isCallExpression(node.init)) {
          return;
        }

        if (
          utils.isMemberExpression(node.init.callee) &&
          utils.isThisExpression(node.init.callee.object) &&
          utils.isIdentifier(node.init.callee.property) &&
          node.init.callee.property.name === 'getProperties' &&
          validateGetPropertiesArguments(node.init.arguments)
        ) {
          // Example: const { abc, def } = this.getProperties('abc', 'def');
          context.report(node.init, ERROR_MESSAGE);
        }

        if (
          utils.isIdentifier(node.init.callee) &&
          node.init.callee.name === 'getProperties' &&
          node.init.arguments.length >= 1 &&
          utils.isThisExpression(node.init.arguments[0]) &&
          validateGetPropertiesArguments(node.init.arguments.slice(1))
        ) {
          // Example: const { abc, def } = getProperties(this, 'abc', 'def');
          context.report(node.init, ERROR_MESSAGE);
        }
      },
    };
  },
};

function validateGetPropertiesArguments(args) {
  if (args.length === 1 && utils.isArrayExpression(args[0])) {
    return validateGetPropertiesArguments(args[0].elements);
  }
  // We can only handle string arguments without nested property paths.
  return args.every(argument => utils.isStringLiteral(argument) && !argument.value.includes('.'));
}
