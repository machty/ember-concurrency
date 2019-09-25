'use strict';

const AstNodeInfo = require('../helpers/ast-node-info');
const Rule = require('./base');

/**
 Disallow usage of `<img>` without an `alt` attribute.

 Good:

 ```
 <img alt="some stuff">
 ```

 Bad:

 ```
 <img>
 ```
*/
module.exports = class ImgAltAttributes extends Rule {
  visitor() {
    return {
      ElementNode(node) {
        let isImg = AstNodeInfo.isImgElement(node);
        if (!isImg) {
          return;
        }

        let ariaHidden = AstNodeInfo.hasAttribute(node, 'aria-hidden');
        let splattributes = AstNodeInfo.hasAttribute(node, '...attributes');
        let altPresent = isAltPresent(node);

        if (!ariaHidden && !splattributes && !altPresent) {
          this.log({
            message: 'img tags must have an alt attribute',
            line: node.loc && node.loc.start.line,
            column: node.loc && node.loc.start.column,
            source: this.sourceForNode(node),
          });
        }
      },
    };
  }
};

function isAltPresent(node) {
  let altAttribute = AstNodeInfo.findAttribute(node, 'alt');

  return !!altAttribute;
}
