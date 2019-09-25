'use strict';

const AstNodeInfo = require('../helpers/ast-node-info');
const Rule = require('./base');

const ERROR_MESSAGE = 'Concatenated styles must be marked as `htmlSafe`.';

module.exports = class StyleConcat extends Rule {
  visitor() {
    return {
      ElementNode(node) {
        let style = AstNodeInfo.findAttribute(node, 'style');
        if (
          style &&
          (AstNodeInfo.isConcatStatement(style.value) ||
            (AstNodeInfo.isMustacheStatement(style.value) && isConcatHelper(style.value.path)))
        ) {
          this.log({
            message: ERROR_MESSAGE,
            line: style.loc && style.loc.start.line,
            column: style.loc && style.loc.start.column,
            source: this.sourceForNode(style),
          });
        }
      },
    };
  }
};

function isConcatHelper(node) {
  return node && AstNodeInfo.isPathExpression(node) && node.original === 'concat';
}

module.exports.ERROR_MESSAGE = ERROR_MESSAGE;
