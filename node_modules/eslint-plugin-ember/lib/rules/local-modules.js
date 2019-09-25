'use strict';

const utils = require('../utils/utils');

//------------------------------------------------------------------------------
// General rule - Create local version of Ember.* and DS.*
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforces usage of local modules',
      category: 'Best Practices',
      recommended: false,
      replacedBy: ['new-module-imports'],
      url:
        'https://github.com/ember-cli/eslint-plugin-ember/tree/master/docs/rules/local-modules.md',
    },
    deprecated: true,
    fixable: null, // or "code" or "whitespace"
  },

  create(context) {
    const message = 'Create local version of ';

    const report = function(node, name) {
      const msg = `${message + name}.${node.property.name}`;
      context.report(node, msg);
    };

    const allowedEmberProperties = ['$', 'Object', 'Router', 'String'];
    const allowedDSProperties = [];

    const isExpressionForbidden = function(objectName, node, allowedProperties) {
      return (
        node.object.name === objectName &&
        node.property.name.length &&
        allowedProperties.indexOf(node.property.name) === -1
      );
    };

    return {
      CallExpression(node) {
        const callee = node.callee;
        const obj = utils.isMemberExpression(callee.object) ? callee.object : callee;

        if (utils.isIdentifier(obj.object) && utils.isIdentifier(obj.property)) {
          if (isExpressionForbidden('Ember', obj, allowedEmberProperties)) {
            report(obj, 'Ember');
          }

          if (isExpressionForbidden('DS', obj, allowedDSProperties)) {
            report(obj, 'DS');
          }
        }
      },
    };
  },
};
