'use strict';

const Rule = require('./base');

const ERROR_MESSAGE_OBSOLETE_ELEMENT = element =>
  `Use of <${element}> detected. Do not use deprecated elements.`;

// https://html.spec.whatwg.org/multipage/obsolete.html#non-conforming-features
const OBSOLETE_ELEMENTS = [
  'applet',
  'acronym',
  'bgsound',
  'dir',
  'frame',
  'frameset',
  'noframes',
  'isindex',
  'listing',
  'menuitem',
  'nextid',
  'noembed',
  'plaintext',
  'rb',
  'rtc',
  'strike',
  'xmp',
  'basefont',
  'big',
  'blink',
  'center',
  'font',
  'marquee',
  'multicol',
  'nobr',
  'spacer',
  'tt',
];

module.exports = class NoObsoleteElements extends Rule {
  visitor() {
    return {
      ElementNode(node) {
        if (!this.isLocal(node) && OBSOLETE_ELEMENTS.includes(node.tag)) {
          this.log({
            message: ERROR_MESSAGE_OBSOLETE_ELEMENT(node.tag),
            line: node.loc && node.loc.start.line,
            column: node.loc && node.loc.start.column,
            source: this.sourceForNode(node),
          });
        }
      },
    };
  }
};

module.exports.ERROR_MESSAGE_OBSOLETE_ELEMENT = ERROR_MESSAGE_OBSOLETE_ELEMENT;
module.exports.OBSOLETE_ELEMENTS = OBSOLETE_ELEMENTS;
