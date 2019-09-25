'use strict';

const utils = require('../utils/utils');
const emberUtils = require('../utils/ember');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

function getErrorMessage(debugFunction) {
  return `Usage of Ember's \`${debugFunction}\` function has its arguments passed in the wrong order. \`String description\` should come before \`Boolean condition\`.`;
}

const DEBUG_FUNCTIONS = ['assert', 'deprecate', 'warn'];

module.exports = {
  meta: {
    docs: {
      description:
        "Catch usages of Ember's `assert()` / `warn()` / `deprecate()` functions that have the arguments passed in the wrong order.",
      category: 'Possible Errors',
      recommended: false,
    },
    fixable: null,
  },

  getErrorMessage,
  DEBUG_FUNCTIONS,

  create(context) {
    return {
      CallExpression(node) {
        if (isDebugFunctionWithReversedArgs(node)) {
          context.report({
            node,
            message: getErrorMessage(getDebugFunction(node)),
          });
        }
      },
    };
  },
};

function isDebugFunctionWithReversedArgs(node) {
  return (
    isDebugFunction(node) &&
    node.arguments.length >= 2 &&
    !utils.isString(node.arguments[0]) &&
    utils.isString(node.arguments[1])
  );
}

function isDebugFunction(node) {
  return getDebugFunction(node) !== undefined;
}

function getDebugFunction(node) {
  return DEBUG_FUNCTIONS.find(
    debugFunction =>
      emberUtils.isModule(node, debugFunction) &&
      (!node.callee.property || node.callee.property.name === debugFunction)
  );
}
