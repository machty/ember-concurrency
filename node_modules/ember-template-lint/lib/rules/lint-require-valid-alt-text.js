'use strict';

const AstNodeInfo = require('../helpers/ast-node-info');
const Rule = require('./base');

function hasAccessibleChild(node) {
  return AstNodeInfo.hasChildren(node);
}

const REDUNDANT_WORDS = ['image', 'photo', 'picture'];

const errorMessage =
  'Redundant alt attribute. Screen-readers already announce `img` tags as an image. You don’t need to use the words `image`, `photo,` or `picture` (or any specified custom words) in the alt attribute.';

module.exports = class A11yLintAltText extends Rule {
  logNode({ node, message }) {
    return this.log({
      message,
      line: node.loc && node.loc.start.line,
      column: node.loc && node.loc.start.column,
      source: this.sourceForNode(node),
    });
  }
  visitor() {
    return {
      ElementNode(node) {
        if (AstNodeInfo.hasAttribute(node, 'hidden')) {
          return;
        }

        if (AstNodeInfo.hasAttributeValue(node, 'aria-hidden', 'true')) {
          return;
        }

        const isImg = AstNodeInfo.isImgElement(node);
        const isObj = AstNodeInfo.isObjectElement(node);
        const isInput = AstNodeInfo.isInputElement(node);
        const isArea = AstNodeInfo.isAreaElement(node);

        if (isImg) {
          const hasAltAttribute = AstNodeInfo.hasAttribute(node, 'alt');
          const roleValue = AstNodeInfo.elementAttributeValue(node, 'role');

          if (!hasAltAttribute) {
            this.logNode({
              message: 'img tags must have an alt attribute',
              node,
            });
          } else {
            const altAttribute = AstNodeInfo.findAttribute(node, 'alt');
            if (altAttribute.value) {
              let normalizedAltValue = '';
              if (altAttribute.value.type === 'TextNode') {
                normalizedAltValue = altAttribute.value.chars.trim().toLowerCase();
              } else if (altAttribute.value.type === 'ConcatStatement') {
                normalizedAltValue = altAttribute.value.parts
                  .filter(part => part.type === 'TextNode')
                  .map(part => part.chars)
                  .join(' ')
                  .trim()
                  .toLowerCase();
                if (normalizedAltValue === '') {
                  normalizedAltValue = null;
                }
              } else {
                normalizedAltValue = null;
              }

              if (normalizedAltValue === '') {
                if (['presentation', 'none'].includes(roleValue)) {
                  return;
                }
                this.logNode({
                  message:
                    'if the `alt` attribute is present and the value is an empty string, `role="presentation"` or `role="none"` must be present',
                  node,
                });
                return;
              }

              if (normalizedAltValue !== null) {
                const existingWords = REDUNDANT_WORDS.filter(
                  word => normalizedAltValue.indexOf(word) !== -1
                );
                if (existingWords.length) {
                  this.log({
                    message: errorMessage,
                    line: node.loc && node.loc.start.line,
                    column: node.loc && node.loc.start.column,
                    source: this.sourceForNode(node),
                  });
                }
              }
            }
          }
        } else if (isInput) {
          const isImageInput = AstNodeInfo.hasAttributeValue(node, 'type', 'image');
          if (!isImageInput) {
            return;
          }
          const hasValidAttributes = AstNodeInfo.hasAnyAttribute(node, [
            'aria-label',
            'aria-labelledby',
            'alt',
          ]);

          if (!hasValidAttributes) {
            this.logNode({
              message:
                '<input> elements with type="image" must have a text alternative through the `alt`, `aria-label`, or `aria-labelledby` attribute.',
              node,
            });
          }
        } else if (isObj) {
          const roleValue = AstNodeInfo.elementAttributeValue(node, 'role');
          const hasValidAttributes = AstNodeInfo.hasAnyAttribute(node, [
            'aria-label',
            'aria-labelledby',
            'title',
          ]);

          if (
            hasValidAttributes ||
            hasAccessibleChild(node) ||
            ['presentation', 'none'].includes(roleValue)
          ) {
            return;
          }

          this.logNode({
            message:
              'Embedded <object> elements must have alternative text by providing inner text, aria-label or aria-labelledby attributes.',
            node,
          });
        } else if (isArea) {
          if (!AstNodeInfo.hasAnyAttribute(node, ['aria-label', 'aria-labelledby', 'alt'])) {
            this.logNode({
              message:
                'Each area of an image map must have a text alternative through the `alt`, `aria-label`, or `aria-labelledby` attribute.',
              node,
            });
          }
        }
      },
    };
  }
};
