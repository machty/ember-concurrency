'use strict';

const utils = require('../utils/utils');
const ember = require('../utils/ember');
const snakeCase = require('snake-case');

//------------------------------------------------------------------------------
// Routing - Snake case in dynamic segments of routes
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforces usage of snake_cased dynamic segments in routes',
      category: 'Possible Errors',
      recommended: true,
      url:
        'https://github.com/ember-cli/eslint-plugin-ember/tree/master/docs/rules/routes-segments-snake-case.md',
    },
    fixable: null, // or "code" or "whitespace"
  },

  create(context) {
    const message = 'Use snake case in dynamic segments of routes';
    const routeSegmentRegex = /:([a-zA-Z0-9-_]+)/g;

    const report = function(node) {
      context.report(node, message);
    };

    const isSegment = function(property) {
      return property.key.name === 'path' && routeSegmentRegex.test(property.value.value);
    };

    const getSegmentNames = function(property) {
      if (!isSegment(property)) return [];

      return property.value.value.match(routeSegmentRegex).map(segment => segment.slice(1));
    };

    const isNotSnakeCase = function(name) {
      return snakeCase(name) !== name;
    };

    return {
      CallExpression(node) {
        if (!ember.isRoute(node)) return;

        const routeOptions = utils.isObjectExpression(node.arguments[1])
          ? node.arguments[1]
          : false;

        if (routeOptions) {
          routeOptions.properties.forEach(property => {
            const segmentNames = getSegmentNames(property);

            if (segmentNames.length && segmentNames.filter(isNotSnakeCase).length) {
              report(property.value);
            }
          });
        }
      },
    };
  },
};
