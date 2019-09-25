'use strict';

const ember = require('../utils/ember');
const propOrder = require('../utils/property-order');

const reportUnorderedProperties = propOrder.reportUnorderedProperties;
const addBackwardsPosition = propOrder.addBackwardsPosition;

const ORDER = ['attribute', 'relationship', 'single-line-function', 'multi-line-function'];

//------------------------------------------------------------------------------
// Organizing - Organize your models
// Attributes -> Relations -> Computed Properties
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforces proper order of properties in models',
      category: 'Stylistic Issues',
      recommended: false,
      url:
        'https://github.com/ember-cli/eslint-plugin-ember/tree/master/docs/rules/order-in-models.md',
    },
    fixable: 'code', // or "code" or "whitespace"
  },

  create(context) {
    const options = context.options[0] || {};
    const order = options.order
      ? addBackwardsPosition(options.order, 'empty-method', 'method')
      : ORDER;
    const filePath = context.getFilename();

    return {
      CallExpression(node) {
        if (!ember.isDSModel(node, filePath)) return;

        reportUnorderedProperties(node, context, 'model', order);
      },
    };
  },
};
