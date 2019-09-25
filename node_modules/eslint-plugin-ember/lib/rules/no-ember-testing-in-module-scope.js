'use strict';

const ember = require('../utils/ember');
const utils = require('../utils/utils');

const ERROR_MESSAGES = [
  'Ember.testing is not set in module scope',
  'Ember.testing should not be assigned to a variable, use in place instead',
  'Can not use destructuring to reference Ember.testing',
];

module.exports = {
  meta: {
    docs: {
      description: 'Prevents use of Ember.testing in module scope',
      category: 'Possible Errors',
      recommended: true,
      url:
        'https://github.com/ember-cli/eslint-plugin-ember/tree/master/docs/rules/no-ember-testing-in-module-scope.md',
    },
    fixable: null,
  },

  ERROR_MESSAGES,

  create(context) {
    let emberImportAliasName = 'Ember';
    let hasFoundImport = false;

    return {
      ImportDeclaration(node) {
        if (!hasFoundImport) {
          const aliasName = ember.getEmberImportAliasName(node);
          if (aliasName) {
            emberImportAliasName = aliasName;
            hasFoundImport = true;
          }
        }
      },

      'Identifier[name="testing"]'(node) {
        if (
          node.parent.type === 'MemberExpression' &&
          node.parent.object.name === emberImportAliasName
        ) {
          if (context.getScope().variableScope.type === 'module') {
            context.report(node.parent, ERROR_MESSAGES[0]);
          }
          const nodeGrandParent = utils.getPropertyValue(node, 'parent.parent.type');
          if (
            nodeGrandParent === 'AssignmentExpression' ||
            nodeGrandParent === 'VariableDeclarator'
          ) {
            context.report(node.parent.parent, ERROR_MESSAGES[1]);
          }
        }
      },

      'Property[key.name="testing"]'(node) {
        if (
          utils.getParent(
            node,
            parentNode =>
              parentNode.type === 'VariableDeclarator' &&
              parentNode.init.name === emberImportAliasName
          )
        ) {
          context.report(node.parent.parent.parent, ERROR_MESSAGES[2]);
        }
      },
    };
  },
};
