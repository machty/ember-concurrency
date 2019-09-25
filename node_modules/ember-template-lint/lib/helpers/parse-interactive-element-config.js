'use strict';

const createErrorMessage = require('./create-error-message');

function configValid(config) {
  for (let key in config) {
    let value = config[key];

    switch (key) {
      case 'ignoredTags':
      case 'additionalInteractiveTags':
        if (!Array.isArray(value)) {
          return false;
        }
        break;
      case 'ignoreTabindex':
      case 'ignoreUsemapAttribute':
        if (typeof value !== 'boolean') {
          return false;
        }
        break;
      default:
        return false;
    }
  }

  return true;
}

module.exports = function(ruleName, config) {
  let configType = typeof config;

  switch (configType) {
    case 'boolean':
      return config;
    case 'object':
      if (configValid(config)) {
        return config;
      }
      break;
    case 'undefined':
      return false;
  }

  let errorMessage = createErrorMessage(
    ruleName,
    [
      '  * boolean - `true` to enable / `false` to disable',
      '  * object - Containing the following values:',
      '    * `ignoredTags` - An array of element tag names that should be whitelisted. Default to `[]`.',
      '    * `ignoreTabindex` - When `true` tabindex will be ignored. Defaults to `false`.',
      '    * `ignoreUsemapAttribute` - When `true` ignores the `usemap` attribute on `img` and `object` elements. Defaults `false`.',
      '    * `additionalInteractiveTags` - An array of element tag names that should also be considered as interactive. Defaults to `[]`.',
    ],
    config
  );

  throw new Error(errorMessage);
};
