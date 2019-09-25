'use strict';

const utils = require('../utils/utils');

function makeErrorMessageForGet(property, isImportedGet) {
  return isImportedGet
    ? `Use \`this.${property}\` instead of \`get(this, '${property}')\``
    : `Use \`this.${property}\` instead of \`this.get('${property}')\``;
}

const ERROR_MESSAGE_GET_PROPERTIES =
  "Use `{ prop1: this.prop1, prop2: this.prop2, ... }` instead of Ember's `getProperties` function";

module.exports = {
  makeErrorMessageForGet,
  ERROR_MESSAGE_GET_PROPERTIES,
  meta: {
    docs: {
      description: "Require ES5 getters instead of Ember's `get` / `getProperties` functions",
      category: 'Best Practices',
      recommended: false,
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        // **************************
        // get
        // **************************

        if (
          utils.isMemberExpression(node.callee) &&
          utils.isThisExpression(node.callee.object) &&
          utils.isIdentifier(node.callee.property) &&
          node.callee.property.name === 'get' &&
          node.arguments.length === 1 &&
          utils.isStringLiteral(node.arguments[0]) &&
          !node.arguments[0].value.includes('.')
        ) {
          // Example: this.get('foo');
          context.report(node, makeErrorMessageForGet(node.arguments[0].value), false);
        }

        if (
          utils.isIdentifier(node.callee) &&
          node.callee.name === 'get' &&
          node.arguments.length === 2 &&
          utils.isThisExpression(node.arguments[0]) &&
          utils.isStringLiteral(node.arguments[1]) &&
          !node.arguments[1].value.includes('.')
        ) {
          // Example: get(this, 'foo');
          context.report(node, makeErrorMessageForGet(node.arguments[1].value, true));
        }

        // **************************
        // getProperties
        // **************************

        if (
          utils.isMemberExpression(node.callee) &&
          utils.isThisExpression(node.callee.object) &&
          utils.isIdentifier(node.callee.property) &&
          node.callee.property.name === 'getProperties' &&
          validateGetPropertiesArguments(node.arguments)
        ) {
          // Example: this.getProperties('foo', 'bar');
          context.report(node, ERROR_MESSAGE_GET_PROPERTIES);
        }

        if (
          utils.isIdentifier(node.callee) &&
          node.callee.name === 'getProperties' &&
          utils.isThisExpression(node.arguments[0]) &&
          validateGetPropertiesArguments(node.arguments.slice(1))
        ) {
          // Example: getProperties(this, 'foo', 'bar');
          context.report(node, ERROR_MESSAGE_GET_PROPERTIES);
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
