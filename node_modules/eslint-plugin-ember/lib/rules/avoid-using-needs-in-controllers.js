'use strict';

const ember = require('../utils/ember');

//------------------------------------------------------------------------------
// Ember object rule - Avoid using needs in controllers
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Avoids using needs in controllers',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: null, // or "code" or "whitespace"
  },

  create(context) {
    const report = function(node) {
      const message =
        '`needs` API has been deprecated, `Ember.inject.controller` should be used instead';
      context.report(node, message);
    };
    const filePath = context.getFilename();

    return {
      CallExpression(node) {
        const isReopenNode = ember.isReopenObject(node) || ember.isReopenClassObject(node);

        if (!ember.isEmberController(node, filePath) && !isReopenNode) return;

        const properties = ember.getModuleProperties(node);

        properties.forEach(property => {
          if (property.key.name === 'needs') {
            report(property);
          }
        });
      },
    };
  },
};
