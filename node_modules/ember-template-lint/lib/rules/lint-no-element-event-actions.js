'use strict';

const Rule = require('./base');
const AstNodeInfo = require('../helpers/ast-node-info');

const ERROR_MESSAGE =
  'Do not use HTML element event properties like `onclick`. Instead, use the `on` modifier.';

module.exports = class NoElementEventActions extends Rule {
  visitor() {
    return {
      ElementNode(node) {
        const eventProperties = node.attributes.filter(isEventPropertyWithAction);
        eventProperties.forEach(eventProperty =>
          this.log({
            message: ERROR_MESSAGE,
            line: eventProperty.loc && eventProperty.loc.start.line,
            column: eventProperty.loc && eventProperty.loc.start.column,
            source: this.sourceForNode(eventProperty),
          })
        );
      },
    };
  }
};

function isDomEventAttributeName(name) {
  const nameLower = name.toLowerCase();
  return nameLower.startsWith('on') && nameLower !== 'on';
}

function isEventPropertyWithAction(node) {
  return (
    AstNodeInfo.isAttrNode(node) &&
    isDomEventAttributeName(node.name) &&
    AstNodeInfo.isMustacheStatement(node.value) &&
    AstNodeInfo.isPathExpression(node.value.path) &&
    node.value.path.original === 'action'
  );
}

module.exports.ERROR_MESSAGE = ERROR_MESSAGE;
