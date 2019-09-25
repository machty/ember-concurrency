'use strict';

const Rule = require('./base');
const message = 'Unexpected {{partial}} usage.';

module.exports = class NoPartial extends Rule {
  _checkForPartial(node) {
    if (node.path.original === 'partial') {
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
      MustacheStatement(node) {
        this._checkForPartial(node);
      },
    };
  }
};

module.exports.message = message;
