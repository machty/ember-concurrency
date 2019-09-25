'use strict';

const emberUtils = require('../utils/ember');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const ERROR_MESSAGE =
  'The `index` route is automatically provided and does not need to be defined.';

module.exports = {
  meta: {
    docs: {
      description: 'Disallow unnecessary `index` route definition',
      category: 'Best Practices',
      recommended: false,
    },
    fixable: null,
  },

  ERROR_MESSAGE,

  create(context) {
    return {
      CallExpression(node) {
        if (!emberUtils.isRoute(node)) {
          return;
        }

        if (node.arguments[0].value !== 'index') {
          return;
        }

        context.report({
          node,
          message: ERROR_MESSAGE,
        });
      },
    };
  },
};
