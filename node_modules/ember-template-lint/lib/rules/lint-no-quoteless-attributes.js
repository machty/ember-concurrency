'use strict';

const Rule = require('./base');

module.exports = class NoPartial extends Rule {
  visitor() {
    return {
      ElementNode(node) {
        node.attributes.forEach(attribute => {
          let value = attribute.value;

          if (value.type !== 'TextNode') {
            return;
          }

          let isValueless =
            value.loc &&
            value.loc.start.line === value.loc.end.line &&
            value.loc.start.column === value.loc.end.column;

          if (isValueless) {
            return;
          }

          let source = this.sourceForNode(attribute.value);
          let isQuoted = source[0] === '"' || source[0] === "'";

          if (!isQuoted) {
            this.log({
              message: `Attribute ${attribute.name} should be either quoted or wrapped in mustaches`,
              line: value.loc && value.loc.start.line,
              column: value.loc && value.loc.start.column,
              source: this.sourceForNode(node),
            });
          }
        });
      },
    };
  }
};
