'use strict';

function DependencyError(message) {
  this.name    = 'DependencyError';
  this.message = message;

  if (process.env.EMBER_VERBOSE_ERRORS === 'true') {
    this.stack = (new Error()).stack;
    this.suppressStacktrace = false;
  } else {
    this.suppressStacktrace = true;
  }
}

DependencyError.prototype = Object.create(Error.prototype);
DependencyError.prototype.constructor = DependencyError;

DependencyError.isDependencyError = function(object) {
  return object instanceof DependencyError;
};

module.exports = DependencyError;
