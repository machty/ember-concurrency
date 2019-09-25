'use strict';

const ember = require('../utils/ember');

//------------------------------------------------------------------------------
// General rule - Always return a value from computed properties
//------------------------------------------------------------------------------

function isReachable(segment) {
  return segment.reachable;
}

module.exports = {
  meta: {
    docs: {
      description: 'Warns about missing return statements in computed properties',
      category: 'Possible Errors',
      recommended: false,
      url:
        'https://github.com/ember-cli/eslint-plugin-ember/tree/master/docs/rules/require-return-from-computed.md',
    },
    fixable: null, // or "code" or "whitespace"
  },

  create(context) {
    const message = 'Always return a value from computed properties';

    const report = function(node) {
      context.report(node, message);
    };

    let funcInfo = {
      upper: null,
      codePath: null,
      shouldCheck: false,
      node: null,
    };

    function checkLastSegment(node) {
      if (funcInfo.shouldCheck && funcInfo.codePath.currentSegments.some(isReachable)) {
        report(node);
      }
    }

    return {
      onCodePathStart(codePath) {
        funcInfo = {
          upper: funcInfo,
          codePath,
          shouldCheck: context.getAncestors().findIndex(ember.isComputedProp) > -1,
        };
      },

      onCodePathEnd() {
        funcInfo = funcInfo.upper;
      },

      'FunctionExpression:exit'(node) {
        if (ember.isComputedProp(node.parent) || ember.isComputedProp(node.parent.parent.parent)) {
          checkLastSegment(node);
        }
      },
    };
  },
};
