'use strict';

const emberUtils = require('../utils/ember');

const ERROR_MESSAGE = 'Dependent keys should not be repeated';
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Disallow repeating dependent keys',
      category: 'Possible Errors',
      recommended: true,
      url:
        'https://github.com/ember-cli/eslint-plugin-ember/tree/master/docs/rules/no-duplicate-dependent-keys.md',
    },
    fixable: null,
  },

  ERROR_MESSAGE,

  create(context) {
    return {
      CallExpression(node) {
        if (emberUtils.hasDuplicateDependentKeys(node)) {
          context.report(node, ERROR_MESSAGE);
        }
      },
    };
  },
};
