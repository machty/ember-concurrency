'use strict';

const ember = require('../utils/ember');
const utils = require('../utils/utils');

const ALIASES = ['$', 'jQuery'];
const ERROR_MESSAGE = 'Do not use global `$` or `jQuery`';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevents usage of global jQuery object',
      category: 'Best Practices',
      recommended: true,
      url:
        'https://github.com/ember-cli/eslint-plugin-ember/tree/master/docs/rules/no-global-jquery.md',
    },
    fixable: null, // or "code" or "whitespace"
  },

  ERROR_MESSAGE,

  create(context) {
    let destructuredAssignment;
    let importAliasName;
    let hasJqueryImport;
    let hasEmberImport;

    return {
      ImportDeclaration(node) {
        const validImportAlias = ['ember', 'jquery'];
        // Track if the 'jquery' and/or 'ember' module (if an application
        // is not using the new modules import syntax) is being imported.
        // Will exclude non-ember or non-jquery imports such as:
        //    - `import Foo from 'bar';`
        //    - `import { readOnly } from '@ember/object/computed';`
        if (validImportAlias.indexOf(node.source.value) !== -1) {
          const isJqueryImport = node.source.value === 'jquery';
          if (isJqueryImport) {
            hasJqueryImport = true;
            importAliasName = node.source.value;
          } else {
            const emberImport = ember.getEmberImportAliasName(node);
            if (emberImport) {
              hasEmberImport = true;
              importAliasName = emberImport;
            }
          }
        }
      },

      VariableDeclarator(node) {
        // If an application is using an older version of Ember, not using
        // the new modules import syntax, then lets locate a destructured
        // jQuery assignment.
        if (hasEmberImport) {
          // Let's verify that we are dealing with an Ember MemberExpression
          // only to test against.
          if (
            node.init &&
            utils.isMemberExpression(node.init) &&
            isEmberMemberExpression(node.init)
          ) {
            const isJQueryVariable = node.init.property.name === '$';

            if (isJQueryVariable) {
              // Assignment of type const $ = Ember.$;
              destructuredAssignment = node.id.name;
            }
          } else {
            // If we are not dealing with an Ember identifier, there is no need
            // to perform the below checks/run the below code.
            if (node.init && !isEmberIdentifier(node.init)) return;

            if (!node.id.properties || !isNestedJQueryAssignment(node.id.properties)) return;
            // Assignment of type const { $: foo } = Ember;
            // It will grab/return "foo".
            destructuredAssignment = utils
              .collectObjectPatternBindings(node, {
                [importAliasName]: ['$'],
              })
              .pop();
          }
        }
      },

      CallExpression(node) {
        // In the event in which the jQuery module is being imported
        // using the new modules import syntax do not report to ESLint
        if (hasJqueryImport) return;

        if (utils.isGlobalCallExpression(node, destructuredAssignment, ALIASES)) {
          context.report(node, ERROR_MESSAGE);
        }
      },
    };

    function isNestedJQueryAssignment(props) {
      return props.filter(prop => prop.key.name === '$').length !== 0;
    }

    function isEmberIdentifier(init) {
      return init.name === 'Ember';
    }

    function isEmberMemberExpression(init) {
      return init.object.name === 'Ember';
    }
  },
};
