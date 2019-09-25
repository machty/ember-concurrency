'use strict';

const ember = require('../utils/ember');
const utils = require('../utils/utils');

//------------------------------------------------------------------------------
// General rule -  Disallow usage of jQuery
//------------------------------------------------------------------------------

const ERROR_MESSAGE = 'Do not use jQuery';
const ALIASES = ['$', 'jQuery'];

module.exports = {
  meta: {
    docs: {
      description: 'Disallow any usage of jQuery',
      category: 'Best Practices',
      recommended: false,
      url: 'https://github.com/ember-cli/eslint-plugin-ember/tree/master/docs/rules/no-jquery.md',
    },
    fixable: null, // or "code" or "whitespace"
  },

  ERROR_MESSAGE,

  create(context) {
    let destructuredAssignment;
    let emberImportAliasName;
    let jqueryImportAliasName;
    const report = function(node) {
      context.report(node, ERROR_MESSAGE);
    };

    return {
      ImportDeclaration(node) {
        emberImportAliasName = ember.getEmberImportAliasName(node);

        if (!jqueryImportAliasName && node.source && node.source.value === 'jquery') {
          jqueryImportAliasName = node.specifiers[0].local.name;
        }
      },

      VariableDeclarator(node) {
        if (emberImportAliasName) {
          if (node.init && utils.isMemberExpression(node.init)) {
            // assignment of type const $ = Ember.$;
            destructuredAssignment = node.id.name;
          } else {
            destructuredAssignment = utils
              .collectObjectPatternBindings(node, {
                [emberImportAliasName]: ['$'],
              })
              .pop();
          }
        }
      },

      MemberExpression(node) {
        if (
          (node.object.name === 'Ember' ||
            node.object.name === 'Em' ||
            (emberImportAliasName && node.object.name === emberImportAliasName)) &&
          node.property.name === '$'
        ) {
          report(node);
        }

        if (jqueryImportAliasName && node.object.name === jqueryImportAliasName) {
          report(node);
        }
      },

      CallExpression(node) {
        if (utils.isGlobalCallExpression(node, destructuredAssignment, ALIASES)) {
          report(node);
        }
      },

      'CallExpression > MemberExpression > ThisExpression'(node) {
        if (node.parent.property.name === '$') {
          report(node);
        }
      },
    };
  },
};
