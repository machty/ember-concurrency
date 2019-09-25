/* jshint node:true */

var slice = require('./slice');

module.exports = function withArgs(fn /* ...args */) {
  var args = slice(arguments, 1);

  return function invoker() {
    return fn.apply(this, args);
  };
};
