'use strict';

const ember = require('../utils/ember');
const utils = require('../utils/utils');

/**
 * Locates nodes with either an ExpressionStatement or ReturnStatement
 * given name.
 * @param {Node[]} nodeBody Array of nodes.
 * @returns {Node[]} Array of nodes with given names.
 */
function findStmtNodes(nodeBody) {
  const nodes = [];
  const fnExpressions = utils.findNodes(nodeBody, 'ExpressionStatement');
  const returnStatement = utils.findNodes(nodeBody, 'ReturnStatement');

  if (fnExpressions.length !== 0) {
    fnExpressions.forEach(item => {
      nodes.push(item);
    });
  }

  if (returnStatement.length !== 0) {
    returnStatement.forEach(item => {
      nodes.push(item);
    });
  }

  return nodes;
}

/**
 * Checks whether a node has the '_super' property.
 * @param {Node[]} nodes An array of nodes.
 * @returns {Boolean}
 */
function checkForSuper(nodes) {
  if (nodes.length === 0) return false;

  return nodes.some(n => {
    if (utils.isCallExpression(n.expression)) {
      const fnCallee = n.expression.callee;
      return (
        utils.isMemberExpression(fnCallee) &&
        utils.isThisExpression(fnCallee.object) &&
        utils.isIdentifier(fnCallee.property) &&
        fnCallee.property.name === '_super'
      );
    } else if (utils.isReturnStatement(n)) {
      if (!n.argument || !utils.isCallExpression(n.argument)) return false;

      const fnCallee = n.argument.callee;
      return fnCallee.property.name === '_super';
    }

    return false;
  });
}

//----------------------------------------------
// General rule - Call _super in init lifecycle hooks
//----------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforces super calls in init hooks',
      category: 'Possible Errors',
      recommended: true,
      url:
        'https://github.com/ember-cli/eslint-plugin-ember/tree/master/docs/rules/require-super-in-init.md',
    },
    fixable: null, // or "code" or "whitespace"
  },

  create(context) {
    const message = 'Call this._super(...arguments) in init hook';

    const filePath = context.getFilename();

    const report = function(node) {
      context.report(node, message);
    };

    return {
      CallExpression(node) {
        if (
          !ember.isEmberComponent(node, filePath) &&
          !ember.isEmberController(node, filePath) &&
          !ember.isEmberRoute(node, filePath) &&
          !ember.isEmberMixin(node, filePath) &&
          !ember.isEmberService(node, filePath)
        )
          return;

        const initProperty = ember
          .getModuleProperties(node)
          .find(property => property.key.name === 'init');

        if (initProperty) {
          const initPropertyBody = initProperty.value.body.body;
          const nodes = findStmtNodes(initPropertyBody);
          const hasSuper = checkForSuper(nodes);
          if (!hasSuper) {
            report(initProperty);
          }
        }
      },
    };
  },
};
