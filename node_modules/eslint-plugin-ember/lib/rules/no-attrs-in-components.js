'use strict';

const utils = require('../utils/utils');

const MESSAGE = 'Do not use this.attrs';

//------------------------------------------------------------------------------
// General rule - Don't use this.attrs
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Disallow usage of this.attrs in components',
      category: 'Possible Errors',
      recommended: true,
      url:
        'https://github.com/ember-cli/eslint-plugin-ember/tree/master/docs/rules/no-attrs-in-components.md',
    },
    fixable: null,
  },

  create(context) {
    function isThisAttrsExpression(node) {
      return utils.isThisExpression(node.object) && node.property.name === 'attrs';
    }

    return {
      MemberExpression(node) {
        if (isThisAttrsExpression(node)) {
          context.report(node.property, MESSAGE);
        }
      },
    };
  },
};
