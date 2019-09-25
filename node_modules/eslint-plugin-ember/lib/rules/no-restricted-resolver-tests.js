'use strict';

const utils = require('../utils/utils');

//------------------------------------------------------------------------------------------------
// General Rule - Don't use constructs or configuration that use the restricted resolver in tests.
//------------------------------------------------------------------------------------------------

function getNoUnitTrueMessage(fn) {
  return `Do not use ${fn} with \`unit: true\``;
}

function getNoNeedsMessage(fn) {
  return `Do not use ${fn} with \`needs: [...]\``;
}

function getSingleStringArgumentMessage(fn) {
  return `Do not use ${fn} with a single string argument (implies unit: true)`;
}

function getNoPOJOWithoutIntegrationTrueMessage(fn) {
  return `Do not use ${fn} whose last parameter is an object unless used in conjunction with \`integration: true\``;
}

function hasOnlyStringArgument(node) {
  const parentMethodCall = getParentCallExpression(node);
  const args = parentMethodCall.arguments;

  return args.length === 1 && utils.isLiteral(args[0]);
}

function hasUnitTrue(node) {
  return node.properties.some(
    property => property.key.name === 'unit' && property.value.value === true
  );
}

function hasNeeds(node) {
  return node.properties.some(
    property => property.key.name === 'needs' && property.value.type === 'ArrayExpression'
  );
}

function hasIntegrationTrue(node) {
  return node.properties.some(
    property => property.key.name === 'integration' && property.value.value === true
  );
}

function getParentCallExpression(node) {
  return utils.getParent(node, parent => parent.type === 'CallExpression');
}

function getLastArgument(node) {
  const parentMethodCall = utils.getParent(node, parent => parent.type === 'CallExpression');
  const args = parentMethodCall.arguments;
  const lastArgument = args[args.length - 1];

  return lastArgument;
}

module.exports = {
  meta: {
    docs: {
      description: 'Prevents the use of patterns that use the restricted resolver in tests.',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: null, // or "code" or "whitespace",
  },

  ERROR_MESSAGES: {
    getNoUnitTrueMessage,
    getNoNeedsMessage,
    getSingleStringArgumentMessage,
    getNoPOJOWithoutIntegrationTrueMessage,
  },

  create(context) {
    let importedNames = [];

    function addToImportedNames(node) {
      importedNames = importedNames.concat(
        node.parent.specifiers.map(specifier => specifier.imported.name)
      );
    }

    const visitors = {
      'ImportDeclaration > Literal[value="ember-qunit"]': addToImportedNames,
      'ImportDeclaration > Literal[value="ember-mocha"]': addToImportedNames,
    };

    [
      'moduleFor',
      'moduleForComponent',
      'moduleForModel',
      'setupTest',
      'setupComponentTest',
      'setupModelTest',
    ].forEach(fn => {
      visitors[`CallExpression > Identifier[name="${fn}"]`] = function(node) {
        if (!importedNames.includes(fn)) {
          return;
        }

        if (hasOnlyStringArgument(node)) {
          context.report(node, getSingleStringArgumentMessage(fn));
          return;
        }

        const lastArgument = getLastArgument(node);
        const lastArgumentIsObject = utils.isObjectExpression(lastArgument);

        if (lastArgumentIsObject && hasUnitTrue(lastArgument)) {
          context.report(lastArgument, getNoUnitTrueMessage(fn));
          return;
        }

        if (lastArgumentIsObject && hasNeeds(lastArgument)) {
          context.report(lastArgument, getNoNeedsMessage(fn));
          return;
        }

        if (lastArgumentIsObject && !hasIntegrationTrue(lastArgument)) {
          context.report(lastArgument, getNoPOJOWithoutIntegrationTrueMessage(fn));
        }
      };
    });

    return visitors;
  },
};
