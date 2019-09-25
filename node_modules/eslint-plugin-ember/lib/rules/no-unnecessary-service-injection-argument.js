'use strict';

const utils = require('../utils/utils');
const emberUtils = require('../utils/ember');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const ERROR_MESSAGE =
  "Don't specify injected service name as an argument when it matches the property name.";

module.exports = {
  meta: {
    docs: {
      description: 'Disallow unnecessary argument when injecting service',
      category: 'Best Practices',
      recommended: false,
    },
    fixable: 'code',
  },

  ERROR_MESSAGE,

  create(context) {
    return {
      Property(node) {
        if (
          !emberUtils.isInjectedServiceProp(node.value) ||
          node.value.arguments.length !== 1 ||
          !utils.isLiteral(node.value.arguments[0])
        ) {
          return;
        }

        const keyName = node.key.name;
        const firstArgValue = node.value.arguments[0].value;
        if (keyName === firstArgValue) {
          context.report({
            node: node.value.arguments[0],
            message: ERROR_MESSAGE,
            fix(fixer) {
              return fixer.remove(node.value.arguments[0]);
            },
          });
        }
      },
    };
  },
};
