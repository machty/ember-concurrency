'use strict';

/*
 Disallows nested of interactive elements

 ```
 {{! good }}
 <button>Click here</button> <a href="/">and a link</a>

 {{! bad}}
 <button>Click here <a href="/">and a link</a></button>
 ```

 The following values are valid configuration:

   * boolean -- `true` for enabled / `false` for disabled
 */

const Rule = require('./base');
const isInteractiveElement = require('../helpers/is-interactive-element');
const parseConfig = require('../helpers/parse-interactive-element-config');

const ARRAY_DEPRECATION_MESSAGE =
  'Specifying an array as the configurate for the `no-nested-interactive` rule is deprecated and will be removed in future versions.  Please update `.template-lintrc.js` to use the newer object format.';

function convertConfigArrayToObject(config) {
  let base = {
    ignoredTags: [],
    ignoreTabindex: false,
    ignoreUsemapAttribute: false,
  };

  for (let i = 0; i < config.length; i++) {
    let value = config[i];

    switch (value) {
      case 'tabindex':
        base.ignoreTabindex = true;
        break;
      case 'usemap':
        base.ignoreUsemapAttribute = true;
        break;
      default:
        base.ignoredTags.push(value);
    }
  }

  return base;
}

module.exports = class LogNestedInteractive extends Rule {
  parseConfig(config) {
    if (Array.isArray(config)) {
      this.log({
        message: ARRAY_DEPRECATION_MESSAGE,
        source: JSON.stringify(config),
        severity: 1,
      });

      return convertConfigArrayToObject(config);
    }

    return parseConfig(this.ruleName, config);
  }

  getConfigWhiteList() {
    if (Array.isArray(this.config)) {
      return this.config;
    } else {
      return [];
    }
  }

  visitor() {
    this._parentInteractiveNode = null;

    let visitor = {
      enter(node) {
        let isInteractive = isInteractiveElement(node);

        if (this.isCustomInteractiveElement(node)) {
          isInteractive = true;
        }

        if (!isInteractive) {
          return;
        }
        if (this.isInteractiveExcluded(node)) {
          return;
        }

        if (this.hasLabelParentNode()) {
          if (this._seenInteractiveChild) {
            this.log({
              message: 'Do not use multiple interactive elements inside a single `<label>`',
              line: node.loc && node.loc.start.line,
              column: node.loc && node.loc.start.column,
              source: this.sourceForNode(this._parentInteractiveNode),
            });
          } else {
            this._seenInteractiveChild = true;
          }
        } else if (this.hasParentNode()) {
          this.log({
            message: this.getLogMessage(node, this._parentInteractiveNode),
            line: node.loc && node.loc.start.line,
            column: node.loc && node.loc.start.column,
            source: this.sourceForNode(node),
          });
        } else if (this.isInteractiveFromTabindex(node)) {
          // do not consider a thing a "parent interactive node" for
          // tabindex alone
          return;
        } else {
          this._parentInteractiveNode = node;
        }
      },

      exit(node) {
        if (this._parentInteractiveNode === node) {
          this._parentInteractiveNode = null;
          this._seenInteractiveChild = false;
        }
      },
    };

    return {
      ElementNode: visitor,
      ComponentNode: visitor,
    };
  }

  hasLabelParentNode() {
    return this._parentInteractiveNode && this._parentInteractiveNode.tag === 'label';
  }

  hasParentNode() {
    return this._parentInteractiveNode;
  }

  isCustomInteractiveElement(node) {
    let additionalInteractiveTags = this.config.additionalInteractiveTags || [];

    if (additionalInteractiveTags.indexOf(node.tag) > -1) {
      return true;
    } else {
      return false;
    }
  }

  isInteractiveFromTabindex(node) {
    let reason = isInteractiveElement.reason(node);

    if (reason && reason.indexOf('tabindex') > -1) {
      return true;
    } else {
      return false;
    }
  }

  isInteractiveExcluded(node) {
    let reason = isInteractiveElement.reason(node);
    let ignoredTags = this.config.ignoredTags || [];
    let ignoreTabindex = this.config.ignoreTabindex;
    let ignoreUsemapAttribute = this.config.ignoreUsemapAttribute;

    if (ignoredTags.indexOf(node.tag) > -1) {
      return true;
    }

    if (ignoreTabindex && reason.indexOf('tabindex') > -1) {
      return true;
    }

    if (ignoreUsemapAttribute && reason.indexOf('usemap') > -1) {
      return true;
    }
  }

  getLogMessage(node, parentNode) {
    let parentReason = isInteractiveElement.reason(parentNode);
    let childReason = isInteractiveElement.reason(node);

    // `reason` for `additionalInteractiveTags` would be `null`
    // so we need to handle that and update the reason correctly
    if (this.isCustomInteractiveElement(parentNode)) {
      parentReason = `<${parentNode.tag}>`;
    }

    if (this.isCustomInteractiveElement(node)) {
      childReason = `<${node.tag}>`;
    }

    return `Do not use ${childReason} inside ${parentReason}`;
  }
};

module.exports.ARRAY_DEPRECATION_MESSAGE = ARRAY_DEPRECATION_MESSAGE;
