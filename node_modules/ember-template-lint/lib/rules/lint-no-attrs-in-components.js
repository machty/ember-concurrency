'use strict';

const Rule = require('./base');
const componentTemplateRegex = new RegExp(
  'templates/components|components/.*/template|ui/components|-components/'
);

module.exports = class LinkNoAttrComponent extends Rule {
  isComponentTemplate() {
    return componentTemplateRegex.test(this.templateEnvironmentData.moduleName);
  }
  visitor() {
    return {
      PathExpression(node) {
        if (!this.isComponentTemplate()) {
          return;
        }
        if (node.parts && node.parts[0] === 'attrs') {
          this.log({
            message: 'Component templates should not contain `attrs`.',
            line: node.loc && node.loc.start.line,
            column: node.loc && node.loc.start.column,
            source: this.sourceForNode(node),
          });
        }
      },
    };
  }
};
