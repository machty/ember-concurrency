'use strict';

const utils = require('../utils/utils');
const ember = require('../utils/ember');

//------------------------------------------------------------------------------
// General rule - Don't introduce side-effects in computed properties
//------------------------------------------------------------------------------

function isUnallowedMethod(name) {
  return ['set', 'setProperties'].indexOf(name) > -1;
}

module.exports = {
  meta: {
    docs: {
      description: 'Warns about unexpected side effects in computed properties',
      category: 'Possible Errors',
      recommended: true,
      url:
        'https://github.com/ember-cli/eslint-plugin-ember/tree/master/docs/rules/no-side-effects.md',
    },
    fixable: null, // or "code" or "whitespace"
  },

  create(context) {
    let emberImportAliasName;

    const message = "Don't introduce side-effects in computed properties";

    const report = function(node) {
      context.report(node, message);
    };

    return {
      ImportDeclaration(node) {
        if (!emberImportAliasName) {
          emberImportAliasName = ember.getEmberImportAliasName(node);
        }
      },

      CallExpression(node) {
        const callee = node.callee;
        const isEmberSet =
          (utils.isIdentifier(callee) && isUnallowedMethod(callee.name)) ||
          (utils.isMemberExpression(callee) &&
            (utils.isThisExpression(callee.object) ||
              callee.object.name === 'Ember' ||
              callee.object.name === emberImportAliasName) &&
            utils.isIdentifier(callee.property) &&
            isUnallowedMethod(callee.property.name));

        if (isEmberSet) {
          const ancestors = context.getAncestors();
          const computedIndex = ancestors.findIndex(ember.isComputedProp);
          const setPropertyFunctionIndex = ancestors.findIndex(
            ancestor =>
              ancestor.type === 'Property' &&
              ancestor.key.name === 'set' &&
              utils.isFunctionExpression(ancestor.value)
          );

          if (
            computedIndex > -1 &&
            (setPropertyFunctionIndex === -1 || setPropertyFunctionIndex < computedIndex)
          ) {
            report(node);
          }
        }
      },
    };
  },
};
