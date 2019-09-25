'use strict';

const ERROR_MESSAGE = 'Do not use array or object proxies.';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Disallows using array or object proxies',
      category: 'Ember Object',
      recommended: false,
    },
    fixable: null,
  },

  ERROR_MESSAGE,

  create(context) {
    return {
      ImportDeclaration(node) {
        if (
          node.source.value === '@ember/object/proxy' ||
          node.source.value === '@ember/array/proxy'
        ) {
          context.report(node, ERROR_MESSAGE);
        }
      },
    };
  },
};
