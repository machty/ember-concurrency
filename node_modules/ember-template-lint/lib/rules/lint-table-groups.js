'use strict';

const AstNodeInfo = require('../helpers/ast-node-info');
const Rule = require('./base');
const message = 'Tables must have a table group (thead, tbody or tfoot).';

const ALLOWED_TABLE_CHILDREN = ['thead', 'tbody', 'tfoot', 'caption', 'colgroup'];

// For effective children, we skip over any control flow helpers,
// since we know that they don't render anything on their own
function getEffectiveChildren(node) {
  const unflattenedEffectiveChildren = AstNodeInfo.childrenFor(node).map(node => {
    if (AstNodeInfo.isControlFlowHelper(node)) {
      return getEffectiveChildren(node);
    } else {
      return [node];
    }
  });

  return [].concat.apply([], unflattenedEffectiveChildren);
}

function isAllowedTableChild(node) {
  let tagNamePair;
  let tagNameAttribute;
  switch (node.type) {
    case 'BlockStatement':
    case 'MustacheStatement':
      tagNamePair = node.hash.pairs.find(pair => pair.key === 'tagName');
      if (tagNamePair) {
        return ALLOWED_TABLE_CHILDREN.includes(tagNamePair.value.value);
      } else if (node.path.original === 'yield') {
        return true;
      }
      break;
    case 'ElementNode':
      if (ALLOWED_TABLE_CHILDREN.includes(node.tag)) {
        return true;
      }
      tagNameAttribute = node.attributes.find(attribute => attribute.name === '@tagName');
      if (tagNameAttribute) {
        return ALLOWED_TABLE_CHILDREN.includes(tagNameAttribute.value.chars);
      }
      break;
    case 'CommentStatement':
    case 'MustacheCommentStatement':
      return true;
    case 'TextNode':
      return !/\S/.test(node.chars);
  }

  return false;
}

module.exports = class TableGroups extends Rule {
  visitor() {
    return {
      ElementNode(node) {
        if (node.tag === 'table') {
          if (!getEffectiveChildren(node).every(isAllowedTableChild)) {
            this.log({
              message,
              line: node.loc && node.loc.start.line,
              column: node.loc && node.loc.start.column,
              source: this.sourceForNode(node),
            });
          }
        }
      },
    };
  }
};

module.exports.message = message;
