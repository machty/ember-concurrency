'use strict';

const utils = require('../utils/utils');
const emberUtils = require('../utils/ember');

const ERROR_MESSAGE = 'Do not use volatile computed properties';

module.exports = {
  ERROR_MESSAGE,

  meta: {
    docs: {
      description: 'Disallows volatile computed properties',
      category: 'Best Practices',
      recommended: false,
    },
  },

  create(context) {
    return {
      CallExpression(node) {
        if (
          utils.isMemberExpression(node.callee) &&
          utils.isCallExpression(node.callee.object) &&
          emberUtils.isComputedProp(node.callee.object) &&
          utils.isIdentifier(node.callee.property) &&
          node.callee.property.name === 'volatile'
        ) {
          context.report(node.callee.property, ERROR_MESSAGE);
        }
      },
    };
  },
};
