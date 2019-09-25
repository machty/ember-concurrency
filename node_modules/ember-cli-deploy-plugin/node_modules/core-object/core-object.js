'use strict';

var assignProperties = require('./lib/assign-properties');
var deprecation = require('./lib/deprecation');

function needsNew() {
  throw new TypeError("Failed to construct: Please use the 'new' operator, this object constructor cannot be called as a function.");
}

function CoreObject(options) {
  if (!(this instanceof CoreObject)) {
    needsNew()
  }
  this.init(options);
}

CoreObject.prototype.init = function(options) {
  if (options) {
    for (var key in options) {
      this[key] = options[key];
    }
  }
};

CoreObject.extend = function(options) {
  var constructor = this;

  function Class() {
    var length = arguments.length;

    if (length === 0)      this.init();
    else if (length === 1) this.init(arguments[0]);
    else                   this.init.apply(this, arguments);
  }

  Class.__proto__ = CoreObject;

  Class.prototype = Object.create(constructor.prototype);

  if (options) {
    if (shouldCallSuper(options.init)) {

      if (hasArgs(options.init)) {
        deprecation(
          'Overriding init without calling this._super is deprecated. ' +
            'Please call this._super(), addon: `' + options.name + '`'
        );
        options.init = forceSuperWithoutApply(options.init);
      } else {

        // this._super.init && is to make sure that the deprecation message
        // works for people who are writing addons supporting before 2.6.
        deprecation(
          'Overriding init without calling this._super is deprecated. ' +
            'Please call `this._super.init && this._super.init.apply(this, arguments);` addon: `' + options.name + '`'
        );
        options.init = forceSuper(options.init);
      }
    }
    assignProperties(Class.prototype, options);
  }

  return Class;
};

function hasArgs(fn) {
  // Takes arguments, assume disruptive override
  return /^function *\( *[^ )]/.test(fn);
}

/* global define:true module:true window: true */
if (typeof define === 'function' && define['amd'])      { define(function() { return CoreObject; }); }
if (typeof module !== 'undefined' && module['exports']) { module['exports'] = CoreObject; }
if (typeof window !== 'undefined')                      { window['CoreObject'] = CoreObject; }

function shouldCallSuper(fn) {
  // No function, no problem
  if (!fn) { return false; }

  // Calls super already, good to go
  if (/this\._super\(/.test(fn)) { return false; }
  if (/this\._super\./.test(fn)) { return false; }

  return true;
}

function forceSuper(fn) {
  return function() {
    this._super.apply(this, arguments);
    fn.apply(this, arguments);
  }
}

function forceSuperWithoutApply(fn) {
  return function() {
    this._super.call(this);
    fn.apply(this, arguments);
  }
}
