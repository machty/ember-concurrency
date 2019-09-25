'use strict';

const Rule = require('../base');

const DEPRECATION_URL =
  'http://emberjs.com/deprecations/v1.x/#toc_code-in-code-syntax-for-code-each-code';

module.exports = class DeprecatedEachSyntax extends Rule {
  visitor() {
    return {
      BlockStatement(node) {
        if (node.path.original === 'each') {
          this.process(node);
        }
      },
    };
  }

  process(node) {
    let isEachIn = node.params.length > 1 && node.params[1].original === 'in';
    let isEachContextShifting = node.params.length === 1 && node.program.blockParams.length === 0;

    if (isEachIn) {
      this.processEachIn(node);
    } else if (isEachContextShifting) {
      this.processEachContextShifting(node);
    }
  }

  processEachIn(node) {
    let params = node.params;
    let singular = params[0].original;
    let collection = params[2].original;

    let actual = `{{#each ${singular} in ${collection}}}`;
    let expected = `{{#each ${collection} as |${singular}|}}`;

    let message = `Deprecated {{#each}} usage. See the deprecation guide at ${DEPRECATION_URL}`;

    this.log({
      message,
      line: node.loc && node.loc.start.line,
      column: node.loc && node.loc.start.column,
      source: actual,
      fix: {
        text: expected,
      },
    });
  }

  processEachContextShifting(node) {
    let params = node.params;
    let collection = params[0].original;

    let actual = `{{#each ${collection}}}`;
    let expected = `{{#each ${collection} as |item|}}`;

    let message = `Deprecated {{#each}} usage. See the deprecation guide at ${DEPRECATION_URL}`;

    this.log({
      message,
      line: node.loc && node.loc.start.line,
      column: node.loc && node.loc.start.column,
      source: actual,
      fix: {
        text: expected,
      },
    });
  }
};

module.exports.DEPRECATION_URL = DEPRECATION_URL;
