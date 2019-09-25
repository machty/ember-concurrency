'use strict';

const utils = require('../utils/utils');

//----------------------------------------------------------------------------------------------
// General rule - Don't use Ember's function prototype extensions like .property() or .observe()
//----------------------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "Prevents usage of Ember's `function` prototype extensions",
      category: 'Best Practices',
      recommended: true,
      url:
        'https://github.com/ember-cli/eslint-plugin-ember/tree/master/docs/rules/no-function-prototype-extensions.md',
    },
    fixable: null, // or "code" or "whitespace"
  },

  create(context) {
    const message = "Don't use Ember's function prototype extensions";

    const functionPrototypeExtensionNames = ['property', 'observes', 'observesBefore', 'on'];

    const isFunctionPrototypeExtension = function(property) {
      return (
        utils.isIdentifier(property) &&
        functionPrototypeExtensionNames.indexOf(property.name) !== -1
      );
    };

    const report = function(node) {
      context.report(node, message);
    };

    return {
      CallExpression(node) {
        const callee = node.callee;

        if (
          utils.isCallExpression(node) &&
          utils.isMemberExpression(callee) &&
          utils.isFunctionExpression(callee.object) &&
          isFunctionPrototypeExtension(callee.property)
        ) {
          report(node);
        }
      },
    };
  },
};
