'use strict';

const utils = require('../utils/utils');
const ember = require('../utils/ember');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const ERROR_MESSAGE = 'Use kebab-case in route path.';

module.exports = {
  meta: {
    docs: {
      description:
        'Enforces usage of kebab-case (instead of snake_case or camelCase) in route paths',
      category: 'Best Practices',
      recommended: false,
    },
    fixable: null,
  },

  ERROR_MESSAGE,

  create(context) {
    return {
      CallExpression(node) {
        if (!ember.isRoute(node)) {
          return;
        }

        // Retrieve the path based on the call format used:
        // 1. this.route('route-and-path');
        // 2. this.route('route', { path: 'path' });

        const hasExplicitPathOption =
          utils.isObjectExpression(node.arguments[1]) &&
          hasPropertyWithKeyName(node.arguments[1], 'path');
        const pathValueNode = hasExplicitPathOption
          ? getPropertyByKeyName(node.arguments[1], 'path').value
          : node.arguments[0];
        const pathValue = pathValueNode.value;

        const urlSegments = getStaticURLSegments(pathValue);

        if (urlSegments.some(urlPart => !isKebabCase(urlPart))) {
          context.report(pathValueNode, ERROR_MESSAGE);
        }
      },
    };
  },
};

function hasPropertyWithKeyName(objectExpression, keyName) {
  return getPropertyByKeyName(objectExpression, keyName) !== undefined;
}

function getPropertyByKeyName(objectExpression, keyName) {
  return objectExpression.properties.find(property => property.key.name === keyName);
}

function getStaticURLSegments(path) {
  return path
    .split('/')
    .filter(segment => !isDynamicSegment(segment) && !isWildcardSegment(segment) && segment !== '');
}

function isDynamicSegment(segment) {
  return segment.includes(':');
}

function isWildcardSegment(segment) {
  return segment.includes('*');
}

const KEBAB_CASE_REGEXP = /^[0-9a-z-]+$/;
function isKebabCase(str) {
  return str.match(KEBAB_CASE_REGEXP);
}
