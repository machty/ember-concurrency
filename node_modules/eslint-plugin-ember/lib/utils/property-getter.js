const utils = require('./utils');

/**
 * Checks if a MemberExpression node looks like `this.x` or `this.x.y`.
 *
 * @param {Node} node The MemberExpression node to check.
 * @returns {boolean} Whether the node looks like `this.x` or `this.x.y`.
 */
function isSimpleThisExpression(node) {
  if (!utils.isMemberExpression(node)) {
    return false;
  }

  let current = node;
  while (current !== null) {
    if (utils.isMemberExpression(current) && !current.computed) {
      if (!utils.isIdentifier(current.property)) {
        return false;
      }
      current = current.object;
    } else if (utils.isThisExpression(current)) {
      return true;
    } else {
      return false;
    }
  }

  return false;
}

/**
 * Converts a Node containing a ThisExpression to its dependent key.
 *
 * Example Input:   A Node with this source code: `this.x.y`
 * Example Output:  'x.y'
 *
 * @param {Node} node a MemberExpression node that looks like `this.x` or `this.x.y`.
 * @returns {String} The dependent key of the input node (without `this.`).
 */
function nodeToDependentKey(nodeWithThisExpression, context) {
  const sourceCode = context.getSourceCode();
  return sourceCode.getText(nodeWithThisExpression).replace(/^this\./, '');
}

module.exports = {
  isSimpleThisExpression,
  nodeToDependentKey,
};
