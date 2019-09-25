'use strict';

var map = require('broccoli-stew').map;
var convert = require('convert-source-map');

/**
 * Utility that makes a given browser library complaint in FastBoot environment.
 */
module.exports = function(tree) {
  if (!tree) {
    throw new Error('`fastboot-transform` requires broccoli tree as input.');
  }

  return map(tree, '**/*.js', (content) => {
    content = convert.removeMapFileComments(content);
    return `if (typeof FastBoot === 'undefined') {\n${content}\n}`;
  });
}
