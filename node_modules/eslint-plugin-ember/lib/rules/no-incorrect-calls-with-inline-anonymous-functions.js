'use strict';

const utils = require('../utils/utils');
const ERROR_MESSAGE =
  'Do not use anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`.';

function isMemberExpressionOnRun(node) {
  return utils.isMemberExpression(node.callee) && node.callee.object.name === 'run';
}

const functionRules = [
  { importPath: '@ember/runloop', importName: 'debounce' },
  { importPath: '@ember/runloop', importName: 'once' },
  { importPath: '@ember/runloop', importName: 'scheduleOnce' },
];

const allDedupingRunMethodNames = functionRules.map(rule => rule.importName);

module.exports = {
  ERROR_MESSAGE,

  meta: {
    docs: {
      description:
        'Disallows inline anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce`',
      category: 'Possible Errors',
      recommended: false,
    },
  },

  create(context) {
    function checkArgumentsForInlineFunction(node) {
      node.arguments.forEach((argument, index) => {
        if (utils.isAnyFunctionExpression(argument)) {
          context.report(node.arguments[index], ERROR_MESSAGE);
        }
      });
    }
    function checkFunctionRule(functionRule, node) {
      if (functionRule.importName === node.callee.name) {
        checkArgumentsForInlineFunction(node);
      }
    }

    let importedRun = false;
    let inactiveFunctionRules = new Set(functionRules);
    let activeFunctionRules = new Set();

    return {
      ImportDeclaration(node) {
        const importPath = node.source.value;
        const namedImports = node.specifiers
          .filter(specifier => specifier.imported)
          .map(specifier => {
            return specifier.imported.name;
          });

        [...inactiveFunctionRules].forEach(functionRule => {
          if (
            functionRule.importPath === importPath &&
            namedImports.includes(functionRule.importName)
          ) {
            inactiveFunctionRules.delete(functionRule);
            activeFunctionRules.add(functionRule);
          }
        });

        if (node.source.value === '@ember/runloop' && namedImports.includes('run')) {
          importedRun = true;
        }
      },
      CallExpression(node) {
        [...activeFunctionRules].forEach(functionRule => {
          checkFunctionRule(functionRule, node);
        });

        if (importedRun && isMemberExpressionOnRun(node)) {
          if (allDedupingRunMethodNames.includes(node.callee.property.name)) {
            checkArgumentsForInlineFunction(node);
          }
        }
      },
    };
  },
};
