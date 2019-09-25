'use strict';

const ember = require('../utils/ember');

//------------------------------------------------------------------------------
// Ember Data - Be explicit with Ember data attribute types
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevents usage of empty attributes in ember data models',
      category: 'Ember Data',
      recommended: false,
      url:
        'https://github.com/ember-cli/eslint-plugin-ember/tree/master/docs/rules/no-empty-attrs.md',
    },
    fixable: null, // or "code" or "whitespace"
  },

  create(context) {
    const message = 'Supply proper attribute type';
    const filePath = context.getFilename();

    const report = function(node) {
      context.report(node, message);
    };

    return {
      CallExpression(node) {
        if (!ember.isDSModel(node, filePath)) return;

        const allProperties = ember.getModuleProperties(node);
        const isDSAttr = allProperties.filter(property =>
          ember.isModule(property.value, 'attr', 'DS')
        );

        isDSAttr.forEach(attr => {
          if (!attr.value.arguments.length) {
            report(attr.value);
          }
        });
      },
    };
  },
};
