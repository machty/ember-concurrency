'use strict';

const Rule = require('./base');
const message = 'Unexpected block usage. The {{input}} helper may only be used inline.';

module.exports = class NoInputBlock extends Rule {
  _checkForInput(node) {
    if (node.path.original === 'input') {
      this.log({
        message,
        line: node.loc && node.loc.start.line,
        column: node.loc && node.loc.start.column,
        source: this.sourceForNode(node),
      });
    }
  }

  visitor() {
    return {
      BlockStatement(node) {
        this._checkForInput(node);
      },
    };
  }
};

module.exports.message = message;
