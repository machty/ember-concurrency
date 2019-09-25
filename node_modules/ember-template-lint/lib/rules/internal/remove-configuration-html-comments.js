'use strict';

// this Babel plugin removes configuration comments such as:
//   <!-- template-lint no-triple-curlies=false -->
//   <!-- template-lint enabled=false -->

const AstNodeInfo = require('../../helpers/ast-node-info');

module.exports = function() {
  return class RemoveConfigurationHtmlCommentsRule {
    transform(ast) {
      let walker = new this.syntax.Walker();
      let bodyEntry;

      walker.visit(ast, node => {
        if (node.type === 'Program') {
          for (let i = 0; i < node.body.length; i++) {
            bodyEntry = node.body[i];

            if (AstNodeInfo.isConfigurationHtmlComment(bodyEntry)) {
              // remove the entry
              node.body.splice(i, 1);
            }
          }
        }
      });

      return ast;
    }
  };
};
