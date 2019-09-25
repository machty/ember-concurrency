'use strict';

const Rule = require('./base');

module.exports = class NoUnnecessaryConcat extends Rule {
  visitor() {
    return {
      ConcatStatement(node) {
        if (node.parts.length === 1) {
          let source = this.sourceForNode(node);
          let innerSource = this.sourceForNode(node.parts[0]);
          let message = `Unnecessary string concatenation. Use ${innerSource} instead of ${source}.`;

          this.log({
            message,
            line: node.loc && node.loc.start.line,
            column: node.loc && node.loc.start.column,
            source,
          });
        }
      },
    };
  }
};
