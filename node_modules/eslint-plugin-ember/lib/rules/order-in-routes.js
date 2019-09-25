'use strict';

const ember = require('../utils/ember');
const propOrder = require('../utils/property-order');

const reportUnorderedProperties = propOrder.reportUnorderedProperties;
const addBackwardsPosition = propOrder.addBackwardsPosition;

const ORDER = [
  'service',
  'inherited-property',
  'property',
  'init',
  'single-line-function',
  'multi-line-function',
  'beforeModel',
  'model',
  'afterModel',
  'serialize',
  'redirect',
  'activate',
  'setupController',
  'renderTemplate',
  'resetController',
  'deactivate',
  'actions',
  ['method', 'empty-method'],
];

//------------------------------------------------------------------------------
// Organizing - Organize your routes and keep order in objects
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforces proper order of properties in routes',
      category: 'Stylistic Issues',
      recommended: false,
      url:
        'https://github.com/ember-cli/eslint-plugin-ember/tree/master/docs/rules/order-in-routes.md',
    },
    fixable: 'code', // or "code" or "whitespace"
  },

  create(context) {
    const options = context.options[0] || {};
    let order = options.order
      ? addBackwardsPosition(options.order, 'empty-method', 'method')
      : ORDER;
    order = order.slice(0);
    const indexOfLifecycleHook = order.indexOf('lifecycle-hook');

    if (indexOfLifecycleHook !== -1) {
      order.splice(indexOfLifecycleHook, 1, [
        'beforeModel',
        'afterModel',
        'serialize',
        'redirect',
        'activate',
        'setupController',
        'renderTemplate',
        'resetController',
        'deactivate',
      ]);
    }

    const filePath = context.getFilename();

    return {
      CallExpression(node) {
        if (!ember.isEmberRoute(node, filePath)) return;

        reportUnorderedProperties(node, context, 'route', order);
      },
    };
  },
};
