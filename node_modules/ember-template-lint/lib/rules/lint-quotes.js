'use strict';

const Rule = require('./base');
const createErrorMessage = require('../helpers/create-error-message');

module.exports = class Quotes extends Rule {
  parseConfig(config) {
    let configType = typeof config;

    switch (configType) {
      case 'boolean':
        if (!config) {
          return false;
        }
        break;
      case 'string':
        if (['double', 'single'].indexOf(config) > -1) {
          return config;
        }
        break;
      case 'undefined':
        return false;
    }

    let errorMessage = createErrorMessage(
      this.ruleName,
      [
        '  * "double" - requires the use of double quotes wherever possible',
        '  * "single" - requires the use of single quotes wherever possible',
      ],
      config
    );

    throw new Error(errorMessage);
  }

  visitor() {
    let badChar;
    let message;
    switch (this.config) {
      case 'double':
        badChar = "'";
        message = 'you must use double quotes in templates';
        break;
      case 'single':
        badChar = '"';
        message = 'you must use single quotes in templates';
        break;
    }

    let checkForQuotes = node => {
      let source = this.sourceForNode(node);
      if (source[0] === badChar) {
        return this.log({
          message,
          line: node.loc.start.line,
          column: node.loc.start.column,
          source,
        });
      }
    };

    return {
      AttrNode(node) {
        checkForQuotes(node.value);
      },
      StringLiteral(node) {
        checkForQuotes(node);
      },
    };
  }
};
