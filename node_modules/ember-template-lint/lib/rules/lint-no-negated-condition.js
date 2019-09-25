'use strict';

const Rule = require('./base');
const AstNodeInfo = require('../helpers/ast-node-info');

const ERROR_MESSAGE_FLIP_IF = 'Flip `if` statement to avoid `if !condition`.';
const ERROR_MESSAGE_USE_IF = 'Use `if` instead of `unless !condition`.';
const ERROR_MESSAGE_USE_UNLESS = 'Use `unless` instead of `if !condition`.';

module.exports = class NoNegatedCondition extends Rule {
  visitor() {
    function checkNode(node) {
      const isIf = AstNodeInfo.isIf(node);
      const isUnless = AstNodeInfo.isUnless(node);
      if (!isIf && !isUnless) {
        // Not a conditional statement.
        return;
      }

      if (AstNodeInfo.isBlockStatement(node)) {
        if (this.sourceForNode(node).startsWith('{{else ')) {
          // We only care about the beginning of the overall `if` / `unless` statement so ignore the `else` parts.
          return;
        }

        if (
          node.inverse &&
          node.inverse.body.length > 0 &&
          AstNodeInfo.isBlockStatement(node.inverse.body[0]) &&
          isIf &&
          AstNodeInfo.isIf(node.inverse.body[0])
        ) {
          // Ignore `if ... else if ...` statements as there may be no way to avoid negated conditions inside them.
          return;
        }
      }

      if (
        node.params.length === 0 ||
        !AstNodeInfo.isSubExpression(node.params[0]) ||
        !AstNodeInfo.isPathExpression(node.params[0].path) ||
        node.params[0].path.original !== 'not'
      ) {
        // No negation present.
        return;
      }

      if (isIf && AstNodeInfo.isSubExpression(node.params[0].params[0])) {
        // We don't want to suggest converting to `unless` when there are helpers
        // in the condition, as the `simple-unless` rule does not permit that.
        return;
      }

      // Determine what error message to show:
      const isIfElseBlockStatement = AstNodeInfo.isBlockStatement(node) && node.inverse;
      const isIfElseNonBlockStatement =
        !AstNodeInfo.isBlockStatement(node) && node.params.length === 3;
      const shouldFlipCondition = isIfElseBlockStatement || isIfElseNonBlockStatement;
      const message = isUnless
        ? ERROR_MESSAGE_USE_IF
        : shouldFlipCondition
        ? ERROR_MESSAGE_FLIP_IF
        : ERROR_MESSAGE_USE_UNLESS;

      this.log({
        message,
        line: node.loc && node.loc.start.line,
        column: node.loc && node.loc.start.column,
        source: this.sourceForNode(node),
      });
    }

    return {
      BlockStatement: checkNode,
      MustacheStatement: checkNode,
      SubExpression: checkNode,
    };
  }
};

module.exports.ERROR_MESSAGE_FLIP_IF = ERROR_MESSAGE_FLIP_IF;
module.exports.ERROR_MESSAGE_USE_IF = ERROR_MESSAGE_USE_IF;
module.exports.ERROR_MESSAGE_USE_UNLESS = ERROR_MESSAGE_USE_UNLESS;
