'use strict';

var fs = require('fs');

module.exports = function keyForFile(fullPath) {
  var stats = fs.statSync(fullPath);

  if (stats.isDirectory()) {
    throw new Error('cannot diff directory');
  }

  return {
    mode: stats.mode,
    mtime: stats.mtime.getTime(),
    size: stats.size
  };
};
