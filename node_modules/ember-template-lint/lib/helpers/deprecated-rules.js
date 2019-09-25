'use strict';

let DEPRECATED_RULES = new Map([
  // deprecated in the 0.8.x cycle, can be removed just before 0.9.0
  ['inline-styles', 'no-inline-styles'],
  ['bare-strings', 'no-bare-strings'],
  ['html-comments', 'no-html-comments'],
  ['invalid-interactive', 'no-invalid-interactive'],
  ['nested-interactive', 'no-nested-interactive'],
  ['triple-curlies', 'no-triple-curlies'],
  ['unused-block-params', 'no-unused-block-params'],
  ['no-attr-in-components', 'no-attrs-in-components'],
  ['img-alt-attributes', 'require-valid-alt-text'],
]);

module.exports = DEPRECATED_RULES;
