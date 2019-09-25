'use strict';

function isString(x) {
  return toString.call(x) === '[object String]';
}

module.exports = isString;
