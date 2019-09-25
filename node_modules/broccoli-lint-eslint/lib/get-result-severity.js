'use strict';

/**
 * Calculates the severity of a eslint.linter.verify result
 * @param {Array} messages ESLint's verify() result array
 *    @see: http://eslint.org/docs/developer-guide/nodejs-api#linter
 *
 * @returns {Number} accumulatedSeverity The total severity from of the list of results
 *    0 indicates all-clear
 *    1 indicates a warning-level result
 *    > 1 indicates an error-level result
 */
function getResultSeverity(messages) {
  if (!messages) {
    return 0;
  }

  return messages
    .map(it => it.severity)
    .reduce((maxSeverity, severity) => Math.max(maxSeverity, severity), 0);
}

module.exports = getResultSeverity;
