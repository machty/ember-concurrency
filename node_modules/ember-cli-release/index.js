/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-release',

  includedCommands: function() {
    return {
      release: require('./lib/commands/release')
    };
  }
};
