'use strict';

const AstNodeInfo = require('../helpers/ast-node-info');
const Rule = require('./base');
const createErrorMessage = require('../helpers/create-error-message');

/**
 Disallow usage of elements with inline styles

 Good:

 ```
 <div class="class-with-inline-block-rule"></div>
 ```

 Bad:

 ```
 <div style="display:inline-block"></div>
 ```
 */

const DEFAULT_CONFIG = { allowDynamicStyles: false };

module.exports = class InlineStyles extends Rule {
  parseConfig(config) {
    let configType = typeof config;

    switch (configType) {
      case 'boolean':
        return config ? DEFAULT_CONFIG : false;
      case 'object':
        return { allowDynamicStyles: config.allowDynamicStyles };
      case 'undefined':
        return false;
    }

    let errorMessage = createErrorMessage(
      this.ruleName,
      [
        '  * boolean - `true` to enable / `false` to disable',
        '  * object -- An object with the following keys:',
        '    * `allowDynamicStyles` -- Whether dynamically-generated inline styles should be allowed (defaults to `false`)',
      ],
      config
    );

    throw new Error(errorMessage);
  }

  visitor() {
    return {
      ElementNode(node) {
        const style = AstNodeInfo.findAttribute(node, 'style');
        if (!style) {
          return;
        }

        const hasDynamicStyle = AstNodeInfo.isMustacheStatement(style.value);
        if (this.config.allowDynamicStyles && hasDynamicStyle) {
          return;
        }

        this.log({
          message: 'elements cannot have inline styles',
          line: style.loc && style.loc.start.line,
          column: style.loc && style.loc.start.column,
          source: this.sourceForNode(style),
        });
      },
    };
  }
};
