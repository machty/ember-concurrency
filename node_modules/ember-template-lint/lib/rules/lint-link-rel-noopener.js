'use strict';

const AstNodeInfo = require('../helpers/ast-node-info');
const Rule = require('./base');
const createErrorMessage = require('../helpers/create-error-message');

/**
 Disallow usage of `<a taget="_blank">` without an `rel="noopener"` attribute.

 Good:

 ```
 <a href="/some/where" target="_blank" rel="noopener"></a>
 ```

 Bad:

 ```
 <a href="/some/where" target="_blank"></a>
 ```
 */

const DEFAULT_CONFIG = {
  regexp: /no(opener|referrer)/,
  message: 'links with target="_blank" must have rel="noopener"',
};

const STRICT_CONFIG = {
  regexp: /(.*\s)?noopener\s(.*\s)?noreferrer(\s.*)?|(.*\s)?noreferrer\s(.*\s)?noopener(\s.*)?/,
  message:
    'links with target="_blank" must have rel="noopener noreferrer" or rel="noreferrer noopener"',
};

module.exports = class LinkRelNoopener extends Rule {
  parseConfig(config) {
    let configType = typeof config;

    switch (configType) {
      case 'boolean':
        return config ? DEFAULT_CONFIG : false;
      case 'string':
        if (config === 'strict') {
          return STRICT_CONFIG;
        }
        break;
      case 'undefined':
        return false;
    }

    let errorMessage = createErrorMessage(
      this.ruleName,
      [
        '  * boolean - `true` to enable / `false` to disable',
        '  * string -- `strict` to enable validation for both noopener AND noreferrer',
      ],
      config
    );

    throw new Error(errorMessage);
  }

  visitor() {
    return {
      ElementNode(node) {
        let isLink = AstNodeInfo.isLinkElement(node);
        if (!isLink) {
          return;
        }

        let targetBlank = hasTargetBlank(node);
        if (!targetBlank) {
          return;
        }

        let relNoopener = hasRelNoopener(node, this.config.regexp);
        if (relNoopener) {
          return;
        }

        this.log({
          message: this.config.message,
          line: node.loc && node.loc.start.line,
          column: node.loc && node.loc.start.column,
          source: this.sourceForNode(node),
        });
      },
    };
  }
};

function hasTargetBlank(node) {
  let targetAttribute = AstNodeInfo.findAttribute(node, 'target');
  if (!targetAttribute) {
    return false;
  }

  switch (targetAttribute.value.type) {
    case 'TextNode':
      return targetAttribute.value.chars === '_blank';
    default:
      return false;
  }
}

function hasRelNoopener(node, regexp) {
  let relAttribute = AstNodeInfo.findAttribute(node, 'rel');
  if (!relAttribute) {
    return false;
  }

  switch (relAttribute.value.type) {
    case 'TextNode':
      return regexp.test(relAttribute.value.chars);
    default:
      return false;
  }
}
