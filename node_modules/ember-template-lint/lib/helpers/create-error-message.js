'use strict';

module.exports = function(ruleName, lines, config) {
  return [
    `The ${ruleName} rule accepts one of the following values.`,
    lines,
    `You specified \`${JSON.stringify(config)}\``,
  ].join('\n');
};
