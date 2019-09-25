'use strict';

const utils = require('../utils/utils');
const ember = require('../utils/ember');

//------------------------------------------------------------------------------
// Controllers - Alias your model
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforces aliasing model in controller',
      category: 'Best Practices',
      recommended: false,
      url:
        'https://github.com/ember-cli/eslint-plugin-ember/tree/master/docs/rules/alias-model-in-controller.md',
    },
    fixable: null, // or "code" or "whitespace"
  },

  create(context) {
    const message = 'Alias your model';

    const report = function(node) {
      context.report(node, message);
    };

    const filePath = context.getFilename();

    return {
      CallExpression(node) {
        if (!ember.isEmberController(node, filePath)) return;

        const properties = ember.getModuleProperties(node);
        let aliasPresent = false;

        properties.forEach(property => {
          const parsedCallee = utils.parseCallee(property.value);
          const parsedArgs = utils.parseArgs(property.value);

          if (
            parsedCallee.length &&
            ['alias', 'readOnly', 'reads'].indexOf(parsedCallee.pop()) > -1 &&
            (parsedArgs[0] === 'model' || String(parsedArgs[0]).startsWith('model.'))
          ) {
            aliasPresent = true;
          }
        });

        if (!aliasPresent) {
          report(node);
        }
      },
    };
  },
};
