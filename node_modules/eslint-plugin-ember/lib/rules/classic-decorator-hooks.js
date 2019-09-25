const ERROR_MESSAGE_INIT_IN_NON_CLASSIC =
  'You cannot use define the init() lifecycle hook in non-classic classes, it is a classic lifecycle hook. Convert to using the constructor instead, or add the @classic decorator to the class to mark it as classic.';
const ERROR_MESSAGE_DESTROY_IN_NON_CLASSIC =
  'You cannot use define the destroy() lifecycle hook in non-classic classes, it is a classic lifecycle hook. Convert to using the willDestroy() lifecycle hook instead, or add the @classic decorator to the class to mark it as classic.';
const ERROR_MESSAGE_CONSTRUCTOR_IN_CLASSIC =
  'You cannot use the constructor in a classic class. If the class can be converted, you can convert it to remove all classic APIs and remove the @classic decorator, then switch to the constructor.';

module.exports = {
  ERROR_MESSAGE_INIT_IN_NON_CLASSIC,
  ERROR_MESSAGE_DESTROY_IN_NON_CLASSIC,
  ERROR_MESSAGE_CONSTRUCTOR_IN_CLASSIC,

  meta: {
    docs: {
      description: 'Ensure correct hooks are used for both classic and non-classic classes',
      category: 'Ember Object',
      recommended: false,
      url:
        'https://github.com/ember-cli/eslint-plugin-ember/tree/master/docs/rules/classic-decorator-hooks.md',
    },
    fixable: null, // or "code" or "whitespace"
    schema: [],
  },

  create(context) {
    let inClassicClass = false;
    let inNonClassicClass = false;

    return {
      ClassDeclaration(node) {
        if (node.superClass) {
          if (node.decorators && node.decorators.find(d => d.expression.name === 'classic')) {
            inClassicClass = true;
          } else {
            inNonClassicClass = true;
          }
        }
      },

      'ClassDeclaration:exit'() {
        inClassicClass = inNonClassicClass = false;
      },

      MethodDefinition(node) {
        if (!inClassicClass && !inNonClassicClass) return;

        if (inClassicClass && node.key.name === 'constructor') {
          context.report({
            node,
            message: ERROR_MESSAGE_CONSTRUCTOR_IN_CLASSIC,
          });
        }

        if (inNonClassicClass && node.key.name === 'init') {
          context.report({
            node,
            message: ERROR_MESSAGE_INIT_IN_NON_CLASSIC,
          });
        }

        if (inNonClassicClass && node.key.name === 'destroy') {
          context.report({
            node,
            message: ERROR_MESSAGE_DESTROY_IN_NON_CLASSIC,
          });
        }
      },
    };
  },
};
