'use strict';

const MAPPINGS = require('@ember-data/rfc395-data');
const { buildFix, buildMessage, getFullNames, isInitImportedFrom } = require('../utils/new-module');

/**
 * This function returns an object like this:
 * {
 *   'ember-data/model': {
 *     default: ['@ember-data/model'],
 *   },
 * }
 */
function oldDataImportsReducer(acc, mapping) {
  let obj = Object.create(null);
  obj[mapping.export] = [mapping.replacement.module, mapping.replacement.export];
  acc[mapping.module] = obj; // eslint-disable-line no-param-reassign

  return acc;
}

const OLD_DATA_IMPORTS = MAPPINGS.reduce(oldDataImportsReducer, Object.create(null));

/**
 * This function returns an object like this:
 * {
 *   "DS.Model": {
 *     global: "DS.Model",
 *     export: "default",
 *     localName: "Model",
 *     module: "@ember-data/model" <- replacement
 *   }
 * }
 */
function globalsReducer(acc, mapping) {
  const { global } = mapping;
  if (global in acc) {
    return acc;
  }

  let obj = {
    global,
    export: mapping.replacement.export,
    localName: mapping.localName,
    module: mapping.replacement.module,
  };

  acc[global] = obj;

  return acc;
}

const GLOBALS = MAPPINGS.reduce(globalsReducer, Object.create(null));

const ERROR_MESSAGE =
  'Imports from @ember-data packages should be prefered over imports from ember-data';

//------------------------------------------------------------------------------
// Rule Definition - Use "Ember Data Packages" from Ember RFC #395
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Use "Ember Data Packages" from Ember RFC #395',
      category: 'Ember Data',
      recommended: false,
      url:
        'https://github.com/ember-cli/eslint-plugin-ember/tree/master/docs/rules/use-ember-data-rfc-395-imports.md',
    },
    fixable: 'code',
  },

  ERROR_MESSAGE,

  create(context) {
    //----------------------------------------------------------------------
    // Variables
    //----------------------------------------------------------------------

    const message = ERROR_MESSAGE;

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      /**
       * turn `import Model from "ember-data/model"`
       * into `import Model from "@ember-data/model"`
       * or
       * `import attr from "ember-data/attr"`
       * into `import { attr } from "@ember-data/attr"`
       */
      ImportDeclaration(node) {
        if (node.source.value in OLD_DATA_IMPORTS) {
          const fix = buildFix(node, OLD_DATA_IMPORTS);
          context.report({ node, message, fix });
          return;
        }

        if (node.source.value === 'ember-data' || node.source.value.startsWith('ember-data/')) {
          context.report(node, message);
        }
      },

      /**
       * warn against `const { Model } = DS`
       * and against `const { Model } = ED` (only) if ED is imported from ember-data
       */
      VariableDeclarator(node) {
        if (!node.init) return;

        // Filter out non-DS variable declarations
        if (node.init.name !== 'DS' && !isInitImportedFrom(node, 'ember-data')) {
          return;
        }

        const properties = node.id.properties;
        // Iterate through the destructured properties and report them
        properties.forEach(item => {
          const key = item.key.name;
          const match = GLOBALS[`DS.${key}`];
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
        });
      },

      /**
       * warn against DS usage in `name: DS.attr('string')`
       * taken from
       * https://github.com/ember-cli/eslint-plugin-ember/blob/v6.7.1/lib/rules/new-module-imports.js#L63
       */
      'MemberExpression > Identifier[name=DS]'(node) {
        // filter out "foo.DS"
        if (node.parent.object !== node) return;

        // build an array of full expression names
        // e.g. [DS.Model, DS.JSONSerializer]

        let fullName = 'DS';
        const fullNames = getFullNames(fullName, node);

        // find a matching expression starting at the end
        for (let i = 0; i < fullNames.length; i++) {
          fullName = fullNames[i];

          const key = fullName.replace(/^DS\./, '');
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
