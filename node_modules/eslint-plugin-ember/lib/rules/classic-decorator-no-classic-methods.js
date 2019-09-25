const disallowedMethods = [
  'get',
  'set',
  'getProperties',
  'setProperties',
  'getWithDefault',
  'incrementProperty',
  'decrementProperty',
  'toggleProperty',
  'addObserver',
  'removeObserver',
  'notifyPropertyChange',
  'cacheFor',
  'proto',
];

function disallowedMethodErrorMessage(name) {
  return `The this.${name}() method is a classic ember object method, and can't be used in octane classes. You can refactor this usage to use a utility version instead (e.g. get(this, 'foo')), or to use native/modern syntax instead. Alternatively, you can add the @classic decorator to this class to continue using classic APIs.`;
}

module.exports = {
  disallowedMethodErrorMessage,

  meta: {
    docs: {
      description:
        "Prevent usage of classic APIs such as get/set in classes that aren't explicitly decorated with @classic",
      category: 'Ember Object',
      recommended: false,
      url:
        'https://github.com/ember-cli/eslint-plugin-ember/tree/master/docs/rules/classic-decorator-no-classic-methods.md',
    },
    fixable: null, // or "code" or "whitespace"
    schema: [],
  },

  create(context) {
    let inClassExtends = false;

    return {
      ClassDeclaration(node) {
        if (
          node.superClass &&
          !(node.decorators && node.decorators.find(d => d.expression.name === 'classic'))
        ) {
          inClassExtends = true;
        }
      },

      'ClassDeclaration:exit'() {
        inClassExtends = false;
      },

      MemberExpression(node) {
        if (!inClassExtends) return;
        if (node.object.type !== 'ThisExpression') return;

        if (disallowedMethods.includes(node.property.name)) {
          context.report({
            node,
            message: disallowedMethodErrorMessage(node.property.name),
          });
        }
      },
    };
  },
};
