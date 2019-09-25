'use strict';

const ember = require('../utils/ember');

//------------------------------------------------------------------------------
// General rule - Don't create new mixins
//------------------------------------------------------------------------------

const ERROR_MESSAGE = "Don't create new mixins";

module.exports = {
  meta: {
    docs: {
      description: 'Prevents creation of new mixins',
      category: 'Best Practices',
      recommended: false,
    },
    fixable: null, // or "code" or "whitespace"
  },

  ERROR_MESSAGE,

  create(context) {
    const filePath = context.getFilename();

    return {
      CallExpression(node) {
        if (ember.isEmberMixin(node, filePath)) {
          context.report(node, ERROR_MESSAGE);
        }
      },
    };
  },
};
