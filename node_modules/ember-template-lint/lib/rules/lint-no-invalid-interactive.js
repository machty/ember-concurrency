'use strict';

const Rule = require('./base');
const isInteractiveElement = require('../helpers/is-interactive-element');
const isAngleBracketComponent = require('../helpers/is-angle-bracket-component');
const parseConfig = require('../helpers/parse-interactive-element-config');

const DISALLOWED_DOM_EVENTS = [
  // Mouse events:
  'click',
  'dblclick',
  'mousedown',
  'mousemove',
  'mouseover',
  'mouseout',
  'mouseup',

  // Keyboard events:
  'keydown',
  'keypress',
  'keyup',

  // TODO: add any more relevant events.
];

function isDisallowedDomEvent(name) {
  const nameLower = name.toLowerCase();
  return nameLower.startsWith('on') && DISALLOWED_DOM_EVENTS.includes(name.substring(2));
}

module.exports = class InvalidInteractive extends Rule {
  parseConfig(config) {
    return parseConfig(this.ruleName, config);
  }

  isCustomInteractiveElement(node) {
    let additionalInteractiveTags = this.config.additionalInteractiveTags || [];

    if (additionalInteractiveTags.indexOf(node.tag) > -1) {
      return true;
    } else {
      return false;
    }
  }

  visitor() {
    this._element = null;

    let visitor = {
      enter(node) {
        let isInteractive =
          isInteractiveElement(node) ||
          this.isCustomInteractiveElement(node) ||
          isAngleBracketComponent(this.scope, node);
        this._element = !isInteractive ? node : null;
      },

      exit(node) {
        if (this._element === node) {
          this._element = null;
        }
      },
    };

    return {
      ElementModifierStatement(node) {
        if (!this._element) {
          return;
        }

        let modifierName = node.path.original;

        if (modifierName === 'action') {
          // Allow {{action "foo" on="submit"}} on form tags
          if (this._element.tag === 'form' && isSubmitAction(node)) {
            return;
          }

          // Allow {{action "foo" on="reset"}} on form tags
          if (this._element.tag === 'form' && isResetAction(node)) {
            return;
          }

          this.log({
            message: 'Interaction added to non-interactive element',
            line: node.loc && node.loc.start.line,
            column: node.loc && node.loc.start.column,
            source: this.sourceForNode(this._element),
          });
        }
      },

      AttrNode(node) {
        if (!this._element) {
          return;
        }

        if (node.value.type !== 'MustacheStatement') {
          return;
        }

        let helperName = node.value.path.original;

        // Allow onsubmit={{action "foo"}} on form tags
        if (this._element.tag === 'form' && node.name === 'onsubmit') {
          return;
        }

        // Allow onreset={{action "foo"}} on form tags
        if (this._element.tag === 'form' && node.name === 'onreset') {
          return;
        }

        // Allow onerror={{action "foo"}} and onload={{action "foo"}} on any tag
        if (this._element.tag === 'img' && ['onerror', 'onload'].includes(node.name)) {
          return;
        }

        if (helperName === 'action') {
          this.log({
            message: 'Interaction added to non-interactive element',
            line: node.loc && node.loc.start.line,
            column: node.loc && node.loc.start.column,
            source: this.sourceForNode(this._element),
          });
        } else if (isDisallowedDomEvent(node.name)) {
          this.log({
            message: 'Interaction added to non-interactive element',
            line: node.loc && node.loc.start.line,
            column: node.loc && node.loc.start.column,
            source: this.sourceForNode(this._element),
          });
        }
      },

      ElementNode: visitor,
      ComponentNode: visitor,
    };
  }
};

function isActionName(node, name) {
  let hashPairs = node.hash.pairs || [];
  let i;
  let l = hashPairs.length;
  let hashItem;

  for (i = 0; i < l; i++) {
    hashItem = hashPairs[i];
    if (hashItem.key === 'on' && hashItem.value.value === name) {
      return true;
    }
  }

  return false;
}

function isSubmitAction(node) {
  return isActionName(node, 'submit');
}

function isResetAction(node) {
  return isActionName(node, 'reset');
}
