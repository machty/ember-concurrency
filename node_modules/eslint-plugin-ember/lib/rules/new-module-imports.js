'use strict';

const MAPPING = require('ember-rfc176-data');
const { buildMessage, getFullNames, isInitImportedFrom } = require('../utils/new-module');

const GLOBALS = MAPPING.reduce((memo, exportDefinition) => {
  if (exportDefinition.deprecated) {
    return memo;
  }

  if (exportDefinition.global in memo) {
    return memo;
  }

  memo[exportDefinition.global] = exportDefinition; // eslint-disable-line no-param-reassign

  return memo;
}, Object.create(null));

//------------------------------------------------------------------------------
// General rule - Use "New Module Imports" from Ember RFC #176
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: ' Use "New Module Imports" from Ember RFC #176',
      category: 'Best Practices',
      recommended: true,
      url:
        'https://github.com/ember-cli/eslint-plugin-ember/tree/master/docs/rules/new-module-imports.md',
    },
  },

  create(context) {
    function reportNestedProperties(properties, parent) {
      properties.forEach(item => {
        const match = GLOBALS[`Ember.${parent}.${item.key.name}`];

        if (match) {
          const message = buildMessage({
            node: item,
            key: item.key.name,
            match,
            parent,
            type: item.type,
          });

          context.report(item, message);
        }
      });
    }

    return {
      VariableDeclarator(node) {
        if (!node.init) return;

        // Filter out non-Ember variable declarations
        if (node.init.name !== 'Ember' && !isInitImportedFrom(node, 'ember')) {
          return;
        }

        const properties = node.id.properties;
        // Iterate through the destructured properties and report them
        properties.forEach(item => {
          // Locate nested destructuring
          if (item.value.properties) {
            const parent = item.key.name;
            const props = item.value.properties;
            reportNestedProperties(props, parent);
          } else {
            const key = item.key.name;
            const match = GLOBALS[`Ember.${key}`];

            if (match) {
              const message = buildMessage({
                node: item,
                customKey: key !== item.value.name ? item.value.name : null,
                key,
                match,
                type: item.type,
              });

              context.report(item, message);
            }
          }
        });
      },

      'MemberExpression > Identifier[name=Ember]'(node) {
        // filter out "foo.Ember"
        if (node.parent.object !== node) return;

        // build an array of full expression names
        // e.g. [Ember.computed, Ember.computed.or]
        let fullName = 'Ember';
        const fullNames = getFullNames(fullName, node);

        // find a matching expression starting at the end
        for (let i = 0; i < fullNames.length; i++) {
          fullName = fullNames[i];

          const key = fullName.replace(/^Ember\./, '');
          const match = GLOBALS[fullName];

          // if a given global path does not exist in `mappings.json` there is no
          // JS module import for it, so do not report the error
          if (match) {
            const message = buildMessage({ node, fullName, key, match });
            context.report(node, message);
            break;
          }
        }
      },
    };
  },
};
