'use strict';

module.exports = {
  meta: {
    docs: {
      description: 'Prevents use of `this._super` in ES class methods',
      category: 'Possible Errors',
      recommended: false,
      url:
        'https://github.com/ember-cli/eslint-plugin-ember/tree/master/docs/rules/no-ember-super-in-es-classes.md',
    },
    fixable: 'code',
  },

  create(context) {
    return {
      'MethodDefinition MemberExpression[object.type="ThisExpression"][property.name="_super"]'(
        node
      ) {
        context.report({
          node,
          message: "Don't use `this._super` in ES classes",
          fix(fixer) {
            let method = node;
            while (method.type !== 'MethodDefinition') {
              method = method.parent;
            }

            if (method.key.type === 'Identifier') {
              return fixer.replaceText(node, `super.${method.key.name}`);
            }

            const text = context.getSourceCode().getText(method.key);
            return fixer.replaceText(node, `super[${text}]`);
          },
        });
      },
    };
  },
};
