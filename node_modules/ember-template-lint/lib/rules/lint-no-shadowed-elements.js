'use strict';

const Rule = require('./base');
const isAngleBracketComponent = require('../helpers/is-angle-bracket-component');

module.exports = class NoShadowedElements extends Rule {
  visitor() {
    return {
      ElementNode(node) {
        // not a local, so cannot be shadowing native element
        if (!this.isLocal(node)) {
          return;
        }

        // not an angle bracket invocation at all, can't be shadowing
        if (!isAngleBracketComponent(this.scope, node)) {
          return;
        }

        let firstChar = node.tag.charAt(0);
        let startsWithUpperCase =
          firstChar === firstChar.toUpperCase() && firstChar !== firstChar.toLowerCase();
        let containsDot = node.tag.includes('.');

        if (!startsWithUpperCase && !containsDot) {
          this.log({
            message: `Ambiguous element used (\`${node.tag}\`)`,
            line: node.loc && node.loc.start.line,
            column: node.loc && node.loc.start.column,
            source: this.sourceForNode(node),
          });
        }
      },
    };
  }
};
