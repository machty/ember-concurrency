'use strict';

const utils = require('../utils/utils');
const emberUtils = require('../utils/ember');

const ERROR_MESSAGE = 'Do not use arrow functions in computed properties';

module.exports = {
  ERROR_MESSAGE,

  meta: {
    docs: {
      description: 'Disallows arrow functions in computed properties',
      category: 'Possible Errors',
      recommended: false,
    },
  },

  create(context) {
    return {
      CallExpression(node) {
        if (
          emberUtils.isComputedProp(node) &&
          node.arguments.length > 0 &&
          utils.isArrowFunctionExpression(node.arguments[node.arguments.length - 1])
        ) {
          context.report(node.arguments[node.arguments.length - 1], ERROR_MESSAGE);
        }
      },
    };
  },
};
