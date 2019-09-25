'use strict';

const Rule = require('./base');
const createErrorMessage = require('../helpers/create-error-message');

module.exports = class EolLast extends Rule {
  parseConfig(config) {
    let configType = typeof config;

    switch (configType) {
      case 'boolean':
        if (!config) {
          return false;
        }
        break;
      case 'string':
        if (['always', 'never'].indexOf(config) > -1) {
          return config;
        }
        break;
      case 'undefined':
        return false;
    }

    let errorMessage = createErrorMessage(
      this.ruleName,
      [
        '  * "always" - enforces that files end with a newline',
        '  * "never" - enforces that files do not end with a newline',
      ],
      config
    );

    throw new Error(errorMessage);
  }

  visitor() {
    return {
      Program: {
        // implementation goes here in exit(): in the exit handler, the rule will not
        // be called if it has been disabled by any inline comments within the file.

        exit(node) {
          let line = node.loc.start.line;
          let column = node.loc.start.column;

          // yielded content makes it in here too
          //
          // `{{#my-component}}
          //   test
          // {{/my-component}}`
          //
          // becomes
          //
          // `
          //   test
          // `
          //
          // check for that case
          if (line !== 1 || column !== 0) {
            return;
          }

          let bodyLength = node.body.length;
          // if there is a block component invocation without a body
          // it will make it here too
          // check for that case
          if (bodyLength === 0) {
            return;
          }

          let source = this.sourceForNode(node);

          let lastChar = source[source.length - 1];
          let message;
          switch (this.config) {
            case 'always':
              if (lastChar !== '\n') {
                message = 'template must end with newline';
              }
              break;
            case 'never':
              if (lastChar === '\n') {
                message = 'template cannot end with newline';
              }
              break;
          }

          if (message) {
            this.log({
              message,
              line,
              column,
              source,
            });
          }
        },
      },
    };
  }
};
