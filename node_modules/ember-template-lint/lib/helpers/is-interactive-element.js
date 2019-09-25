'use strict';

const ast = require('./ast-node-info');

const INTERACTIVE_TAG_NAMES = [
  'button',
  'details',
  'embed',
  'iframe',
  'input',
  'keygen',
  'label',
  'select',
  'textarea',
];

// Spec: https://www.w3.org/TR/wai-aria/complete#widget_roles

const ARIA_WIDGET_ROLES = [
  'button',
  'checkbox',
  'link',
  'menuitem',
  'menuitemcheckbox',
  'menuitemradio',
  'option',
  'radio',
  'scrollbar',
  'slider',
  'spinbutton',
  'tab',
  'textbox',
  'tooltip',
  'treeitem',
];

function isAudioVideoWithControls(node) {
  return (node.tag === 'audio' || node.tag === 'video') && ast.hasAttribute(node, 'controls');
}

function isHyperLink(node) {
  return node.tag === 'a' && ast.hasAttribute(node, 'href');
}

function isHiddenInput(node) {
  if (node.tag !== 'input') {
    return false;
  }

  let type = ast.findAttribute(node, 'type');
  if (type && type.value && type.value.chars === 'hidden') {
    return true;
  }

  return false;
}

function getInteractiveAriaRole(node) {
  let role = ast.findAttribute(node, 'role');
  if (role && role.value && ARIA_WIDGET_ROLES.indexOf(role.value.chars) > -1) {
    return `role="${role.value.chars}"`;
  }

  return false;
}

/*
 Spec: https://html.spec.whatwg.org/multipage/dom.html#interactive-content-2

 `<label>` was omitted due to the ability nesting a label with an input tag.
 `<audio>` and `<video>` also omitted because use legacy browser support
 there is a need to use it nested with `<object>` and `<a>`
 */
function reason(node) {
  if (isAudioVideoWithControls(node)) {
    return `an <${node.tag}> element with the \`controls\` attribute`;
  }

  if (!ast.isElementNode(node) && !ast.isComponentNode(node)) {
    return null;
  }

  if (isHiddenInput(node)) {
    return null;
  }

  if (INTERACTIVE_TAG_NAMES.indexOf(node.tag) > -1) {
    return `<${node.tag}>`;
  }

  let role = getInteractiveAriaRole(node);
  if (role) {
    return `an element with \`${role}\``;
  }

  if (isHyperLink(node)) {
    return 'an <a> element with the `href` attribute';
  }

  if (ast.hasAttribute(node, 'tabindex')) {
    return 'an element with the `tabindex` attribute';
  }

  if ((node.tag === 'img' || node.tag === 'object') && ast.hasAttribute(node, 'usemap')) {
    return `an <${node.tag}> element with the \`usemap\` attribute`;
  }

  return null;
}

module.exports = function isInteractive(node) {
  return reason(node) !== null;
};

module.exports.reason = reason;
