'use strict';

const emberUtils = require('../utils/ember');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const ERROR_MESSAGE =
  'Dependent keys containing `@each` only work one level deep. You cannot use nested forms like: `todos.@each.owner.name`. Please create an intermediary computed property instead.';

module.exports = {
  meta: {
    docs: {
      description:
        'Disallows usage of deeply-nested computed property dependent keys with `@each`.',
      category: 'Possible Errors',
      recommended: false,
    },
    fixable: null,
  },

  ERROR_MESSAGE,

  create(context) {
    return {
      CallExpression(node) {
        if (
          emberUtils.isComputedProp(node) &&
          (!node.callee.property || node.callee.property.name === 'computed')
        ) {
          emberUtils.parseDependentKeys(node).forEach(key => {
            const parts = key.split('.');
            const indexOfAtEach = parts.indexOf('@each');
            if (indexOfAtEach < 0) {
              return;
            }
            if (parts.length > indexOfAtEach + 2) {
              context.report({
                node,
                message: ERROR_MESSAGE,
              });
            }
          });
        }
      },
    };
  },
};
