'use strict';

const ember = require('../utils/ember');

//------------------------------------------------------------------------------
// Components rule - Avoid leaking state
// (Don't use arrays or objects as default props)
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Avoids state leakage in components',
      category: 'Possible Errors',
      recommended: false,
      replacedBy: ['avoid-leaking-state-in-ember-objects'],
      url:
        'https://github.com/ember-cli/eslint-plugin-ember/tree/master/docs/rules/avoid-leaking-state-in-components.md',
    },
    fixable: null, // or "code" or "whitespace"
    deprecated: true,
    schema: [
      {
        type: 'array',
        items: { type: 'string' },
      },
    ],
  },

  create(context) {
    let ignoredProperties = context.options[0] || [];

    const message = {
      array: 'Avoid using arrays as default properties',
      object: 'Avoid using objects as default properties',
    };

    const report = function(node, messageType) {
      context.report(node, message[messageType]);
    };

    const filePath = context.getFilename();

    ignoredProperties = ignoredProperties.concat([
      'classNames',
      'classNameBindings',
      'actions',
      'concatenatedProperties',
      'mergedProperties',
      'positionalParams',
      'attributeBindings',
    ]);

    return {
      CallExpression(node) {
        if (!ember.isEmberComponent(node, filePath)) return;

        const properties = ember.getModuleProperties(node);

        properties
          .filter(property => ignoredProperties.indexOf(property.key.name) === -1)
          .forEach(property => {
            if (ember.isObjectProp(property)) {
              report(property, 'object');
            } else if (ember.isArrayProp(property)) {
              report(property, 'array');
            }
          });
      },
    };
  },
};
