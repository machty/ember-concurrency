'use strict';

const Rule = require('../base');

const DEPRECATION_URL = 'https://emberjs.com/deprecations/v2.x/#toc_code-render-code-helper';

const message = `The \`{{render}}\` helper is deprecated in favor of using components. Please see the deprecation guide at ${DEPRECATION_URL}.`;

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

module.exports = class DeprecatedRenderHelper extends Rule {
  visitor() {
    return {
      MustacheStatement(node) {
        if (node.path.type === 'PathExpression' && node.path.parts[0] === 'render') {
          if (node.params.length === 1) {
            this.processWithOneArgument(node);
          } else if (node.params.length === 2) {
            this.processWithTwoArguments(node);
          }
        }
      },
    };
  }

  processWithOneArgument(node) {
    let loc = node.loc;
    let originalValue = node.params[0].original;
    let actual = `{{render '${originalValue}'}}`;
    let expected = `{{${originalValue}}}`;

    logMessage(this, loc, actual, expected);
  }

  processWithTwoArguments(node) {
    let loc = node.loc;
    let originalValue = node.params[0].original;
    let model = node.params[1].original;
    let actual = `{{render '${originalValue}' ${model}}}`;
    let expected = `{{${originalValue} model=${model}}}`;

    logMessage(this, loc, actual, expected);
  }
};

module.exports.message = message;
