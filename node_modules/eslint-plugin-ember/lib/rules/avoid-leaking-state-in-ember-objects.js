'use strict';

const ember = require('../utils/ember');
const utils = require('../utils/utils');

const DEFAULT_IGNORED_PROPERTIES = [
  'classNames',
  'classNameBindings',
  'actions',
  'concatenatedProperties',
  'mergedProperties',
  'positionalParams',
  'attributeBindings',
  'queryParams',
  'attrs',
];

const isAllowed = function(property) {
  const value = property.value;
  return (
    ember.isFunctionExpression(value) ||
    utils.isLiteral(value) ||
    utils.isIdentifier(value) ||
    utils.isCallExpression(value) ||
    utils.isBinaryExpression(value) ||
    utils.isTemplateLiteral(value) ||
    utils.isTaggedTemplateExpression(value) ||
    utils.isMemberExpression(value) ||
    utils.isUnaryExpression(value)
  );
};

//------------------------------------------------------------------------------
// Ember object rule - Avoid leaking state
// (Don't use arrays or objects as default props)
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Avoids state leakage',
      category: 'Ember Object',
      recommended: true,
      url:
        'https://github.com/ember-cli/eslint-plugin-ember/tree/master/docs/rules/avoid-leaking-state-in-ember-objects.md',
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      {
        type: 'array',
        items: { type: 'string' },
      },
    ],
  },

  DEFAULT_IGNORED_PROPERTIES,

  create(context) {
    const ignoredProperties = context.options[0] || DEFAULT_IGNORED_PROPERTIES;

    const report = function(node) {
      const message =
        'Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties';
      context.report(node, message);
    };

    return {
      CallExpression(node) {
        if (!(ember.isEmberObject(node) || ember.isReopenObject(node))) return;

        const properties = ember.getModuleProperties(node);

        properties
          .filter(property => property.key && ignoredProperties.indexOf(property.key.name) === -1)
          .forEach(property => {
            if (!isAllowed(property)) {
              report(property);
            }
          });
      },
    };
  },
};
