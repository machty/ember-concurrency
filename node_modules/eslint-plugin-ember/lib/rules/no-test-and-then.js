'use strict';

const utils = require('../utils/utils');
const emberUtils = require('../utils/ember');

const ERROR_MESSAGE = 'Use `await` instead of `andThen` test wait helper.';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Disallow use of `andThen` test wait helper.',
      category: 'Testing',
      recommended: false,
    },
    fixable: null,
  },

  ERROR_MESSAGE,

  create(context) {
    if (!emberUtils.isTestFile(context.getFilename())) {
      return {};
    }

    return {
      CallExpression(node) {
        const callee = node.callee;
        if (utils.isIdentifier(callee) && callee.name === 'andThen') {
          context.report({
            node,
            message: ERROR_MESSAGE,
          });
        }
      },
    };
  },
};
