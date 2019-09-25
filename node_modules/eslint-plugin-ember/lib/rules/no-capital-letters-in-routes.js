'use strict';

const ember = require('../utils/ember');
const utils = require('../utils/utils');

//------------------------------------------------------------------------------
// Routing - No capital letters in routes
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Raise an error when there is a route with uppercased letters in router.js',
      category: 'Possible Errors',
      recommended: true,
      url:
        'https://github.com/ember-cli/eslint-plugin-ember/tree/master/docs/rules/no-capital-letters-in-routes.md',
    },
    fixable: null, // or "code" or "whitespace"
    schema: [],
  },
  create(context) {
    const report = function(node) {
      context.report(node, "Unexpected capital letter in route's name");
    };

    return {
      CallExpression(node) {
        if (ember.isRoute(node) && node.arguments[0] && utils.isLiteral(node.arguments[0])) {
          const routeName = node.arguments[0].value;
          const hasAnyUppercaseLetter = Boolean(routeName.match('[A-Z]'));

          if (hasAnyUppercaseLetter) {
            report(node);
          }
        }
      },
    };
  },
};
