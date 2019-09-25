/* jshint node:true */

var npm = require('npm');
var RSVP = require('rsvp');
var slice = require('./slice');

var resolve = RSVP.resolve;
var denodeify = RSVP.denodeify;
var load = denodeify(npm.load);

// Promise friendly wrapper around the singleton `npm` module. Does not attempt
// to maintain same API (commands are top level).
function DenodeifiedNPM(options) {
  this.options = options;
}

DenodeifiedNPM.toString = function() {
  return 'DenodeifiedNPM';
};

var DenodeifiedNPMPrototype = DenodeifiedNPM.prototype = Object.create(null);

DenodeifiedNPMPrototype.constructor = DenodeifiedNPM;

// No sense in wrapping every single method (including aliases)
var commandNames = [
  'whoami',
  'publish',
];

// Properties in `npm.commands` throw when they are accessed before `npm.load` is called
commandNames.forEach(function(commandName) {
  DenodeifiedNPMPrototype[commandName] = function() {
    var args = slice(arguments);
    var promise = this.config ? resolve() : load(this.options);

    return promise.then(function() {
      var fn = denodeify(npm.commands[commandName]);

      return fn.apply(npm.commands, args);
    });
  };
});

// The `config` property changes when `npm.load` is called, make sure it's always up to date
Object.defineProperty(DenodeifiedNPMPrototype, 'config', {
  get: function() {
    return npm.config.loaded ? npm.config : null;
  },
  enumerable: true,
});

module.exports = DenodeifiedNPM;
