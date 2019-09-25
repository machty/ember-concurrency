'use strict';

const Rule = require('./base');
const AstNodeInfo = require('../helpers/ast-node-info');

const ERROR_MESSAGE = 'Invoke component directly instead of using `component` helper';

module.exports = class NoUnnecessaryComponentHelper extends Rule {
  visitor() {
    function checkNode(node) {
      if (
        AstNodeInfo.isPathExpression(node.path) &&
        node.path.original === 'component' &&
        node.params.length > 0 &&
        AstNodeInfo.isStringLiteral(node.params[0]) &&
        !node.params[0].value.includes('@')
      ) {
        this.log({
          message: ERROR_MESSAGE,
          line: node.loc && node.loc.start.line,
          column: node.loc && node.loc.start.column,
          source: this.sourceForNode(node),
        });
      }
    }

    return {
      BlockStatement: checkNode,
      MustacheStatement: checkNode,
    };
  }
};

module.exports.ERROR_MESSAGE = ERROR_MESSAGE;
