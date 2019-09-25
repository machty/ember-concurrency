/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-github-pages',

  includedCommands: function() {
    return {
      'github-pages:commit': require('./lib/commands/commit')
    };
  }
};
