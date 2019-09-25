'use strict';

const utils = require('../utils/utils');
const ember = require('../utils/ember');

//------------------------------------------------------------------------------
// General rule - Use brace expansion
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforces usage of brace expansion',
      category: 'Stylistic Issues',
      recommended: true,
      url:
        'https://github.com/ember-cli/eslint-plugin-ember/tree/master/docs/rules/use-brace-expansion.md',
    },
    fixable: null, // or "code" or "whitespace"
  },

  create(context) {
    const message = 'Use brace expansion';

    function report(node) {
      context.report(node, message);
    }

    return {
      CallExpression(node) {
        if (!ember.isComputedProp(node) || utils.isMemberExpression(node.callee)) {
          return;
        }

        const matchesBraces = x => Boolean(x.match(/[{}]/g));
        const hasBraces = arr => arr.some(matchesBraces);
        const beforeBraces = arr => arr.slice(0, arr.indexOf(arr.find(matchesBraces)));
        const arrayDeepEqual = (a, b) =>
          a.length === b.length && a.reduce((acc, e, i) => acc && e === b[i], true);

        const problem = node.arguments
          .filter(
            arg =>
              utils.isLiteral(arg) && typeof arg.value === 'string' && arg.value.indexOf('.') >= 0
          )
          .map(e => e.value.split('.'))
          .find(
            (prop, i, props) =>
              props.filter(e => {
                const propHasBraces = hasBraces(prop);
                const eHasBraces = hasBraces(e);

                if (propHasBraces && eHasBraces) {
                  return arrayDeepEqual(beforeBraces(e), beforeBraces(prop));
                } else if (!propHasBraces && !eHasBraces) {
                  return prop[0] === e[0];
                }

                const withBraces = propHasBraces ? prop : e;
                const withoutBraces = propHasBraces ? e : prop;
                const shareable = beforeBraces(withBraces);
                return arrayDeepEqual(shareable, withoutBraces.slice(0, shareable.length));
              }).length > 1
          );

        if (problem) {
          report(node);
        }
      },
    };
  },
};
