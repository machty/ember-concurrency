'use strict';

const Rule = require('./base');
const createErrorMessage = require('../helpers/create-error-message');

module.exports = class LogTripleCurlies extends Rule {
  parseConfig(config) {
    let configType = typeof config;

    switch (configType) {
      case 'boolean':
        return config;
      case 'undefined':
        return false;
    }

    let errorMessage = createErrorMessage(
      this.ruleName,
      ['  * boolean - `true` to enable / `false` to disable'],
      config
    );

    throw new Error(errorMessage);
  }

  visitor() {
    return {
      MustacheStatement(node) {
        if (!node.escaped) {
          this.log({
            message: 'Usage of triple curly brackets is unsafe',
            line: node.loc && node.loc.start.line,
            column: node.loc && node.loc.start.column,
            source: `{{{${node.path.original}}}}`,
          });
        }
      },
    };
  }
};
