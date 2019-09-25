'use strict';

const Rule = require('../base');

const DEPRECATION_URL = 'http://emberjs.com/deprecations/v1.x/#toc_ember-view';

const message =
  'The inline form of `view` is deprecated. Please use the `Ember.Component` instead. ' +
  'See the deprecation guide at ' +
  DEPRECATION_URL;

function asElementAsAttributeString(tag, attributeName, value) {
  return `<${tag} ${attributeName}={{${value}}}></${tag}>`;
}

function asPassedPropertyString(componentName, keyName, value) {
  return `{{${componentName} ${keyName}=${value}}}`;
}

function inBlockStatementString(componentName, keyName, value) {
  return `{{#${componentName} ${keyName}=${value}}}{{/${componentName}}}`;
}

function logMessage(context, loc, actual, expected) {
  return context.log({
    message,
    line: loc && loc.start.line,
    column: loc && loc.start.column,
    source: actual,
    fix: {
      text: expected,
    },
  });
}

function manageMustacheViewInvocation(context, node, isBlockStatement) {
  let pairs = node.hash.pairs;

  if (pairs.length > 0) {
    for (let i = 0; i < pairs.length; i++) {
      let currentPair = pairs[i];
      let originalValue = currentPair.value.original;

      if (typeof originalValue === 'string' && originalValue.split('.')[0] == 'view') {
        if (isBlockStatement) {
          context.processInBlockStatement(node, currentPair);
        } else {
          context.processAsPassedProperty(node, currentPair);
        }
      }
    }
  }
}

module.exports = class DeprecatedInlineViewHelper extends Rule {
  visitor() {
    return {
      ElementNode(node) {
        let attributes = node.attributes;

        for (let i = 0; i < attributes.length; i++) {
          let currentAttribute = attributes[i];
          let value = currentAttribute.value;

          if (value.type === 'MustacheStatement') {
            let originalValue = value.path.original;

            if (typeof originalValue === 'string' && originalValue.split('.')[0] == 'view') {
              this.processAsElementAttribute(node, currentAttribute);
            }
          }
        }
      },

      MustacheStatement(node) {
        // this MustachStatement was already processed by ElementNode
        if (node._processedByInlineViewHelper === true) {
          return;
        }

        if (node.path.type === 'PathExpression' && node.path.parts[0] === 'view') {
          if (node.params.length === 1) {
            this.processWithArgument(node);
          } else if (node.loc.start.line !== null) {
            this.processWithProperty(node);
          }
        } else {
          manageMustacheViewInvocation(this, node, false);
        }
      },

      BlockStatement(node) {
        manageMustacheViewInvocation(this, node, true);
      },
    };
  }

  processAsElementAttribute(node, attribute) {
    let loc = node.loc;
    let tag = node.tag;
    let originalValue = attribute.value.path.original;
    let strippedValue = originalValue.replace('view.', '');
    let actual = asElementAsAttributeString(tag, attribute.name, originalValue);
    let expected = asElementAsAttributeString(tag, attribute.name, strippedValue);

    attribute.value._processedByInlineViewHelper = true;

    logMessage(this, loc, actual, expected);
  }

  processWithProperty(node) {
    let loc = node.loc;
    let originalValue = node.path.original;
    let strippedValue = originalValue.replace('view.', '');
    let actual = `{{${originalValue}}}`;
    let expected = `{{${strippedValue}}}`;

    logMessage(this, loc, actual, expected);
  }

  processWithArgument(node) {
    let loc = node.loc;
    let originalValue = node.params[0].original;
    let actual = `{{view '${originalValue}'}}`;
    let expected = `{{${originalValue}}}`;

    logMessage(this, loc, actual, expected);
  }

  processAsPassedProperty(node, pair) {
    let loc = pair.loc;
    let componentName = node.path.original;
    let keyName = pair.key;
    let originalValue = pair.value.original;
    let strippedValue = originalValue.replace('view.', '');
    let actual = asPassedPropertyString(componentName, keyName, originalValue);
    let expected = asPassedPropertyString(componentName, keyName, strippedValue);

    logMessage(this, loc, actual, expected);
  }

  processInBlockStatement(node, pair) {
    let loc = pair.loc;
    let componentName = node.path.original;
    let keyName = pair.key;
    let originalValue = pair.value.original;
    let strippedValue = originalValue.replace('view.', '');
    let actual = inBlockStatementString(componentName, keyName, originalValue);
    let expected = inBlockStatementString(componentName, keyName, strippedValue);

    logMessage(this, loc, actual, expected);
  }
};

module.exports.DEPRECATION_URL = DEPRECATION_URL;
