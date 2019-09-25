'use strict';

const utils = require('../utils/utils');

//------------------------------------------------------------------------------
// Components - Closure actions
//------------------------------------------------------------------------------

const ERROR_MESSAGE = 'Use closure actions';

module.exports = {
  meta: {
    docs: {
      description: 'Enforces usage of closure actions',
      category: 'Best Practices',
      recommended: true,
      url:
        'https://github.com/ember-cli/eslint-plugin-ember/tree/master/docs/rules/closure-actions.md',
    },
    fixable: null, // or "code" or "whitespace"
  },

  ERROR_MESSAGE,

  create(context) {
    const report = function(node) {
      context.report(node, ERROR_MESSAGE);
    };

    return {
      MemberExpression(node) {
        const isSendAction =
          utils.isThisExpression(node.object) &&
          utils.isIdentifier(node.property) &&
          node.property.name === 'sendAction';

        if (isSendAction) {
          report(node);
        }
      },
    };
  },
};
