'use strict';

var RSVP      = require('rsvp');
var path      = require('path');
var fs        = require('fs');
var writeFile = RSVP.denodeify(fs.writeFile);

module.exports = {
  description: 'Updates baseURL in config to work on gh-pages',
  normalizeEntityName: function() { },

  afterInstall: function() {
    return this.updateBaseURL().then(function() {
      return this.updateLocationType();
    }.bind(this)).then(function() {
      this.ui.writeLine('Updated config/environment.js baseURL and locationType.');
    }.bind(this));
  },

  updateLocationType: function() {
    var search  = "locationType: 'auto'";
    var replace = "locationType: 'hash'";

    return this.replaceEnvironment(search, replace);
  },

  updateBaseURL: function() {
    var name    = this.project.config('production').modulePrefix;
    var search  = "baseURL: '/'";
    var replace = "baseURL: '/" + name + "'";

    return this.replaceEnvironment(search, replace);
  },

  replaceEnvironment: function(search, replace) {
    return this.replaceInFile('config/environment.js', search, replace);
  },

  replaceInFile: function(pathRelativeToProjectRoot, searchTerm, contentsToInsert) {
    var fullPath          = path.join(this.project.root, pathRelativeToProjectRoot);
    var originalContents  = '';

    if (fs.existsSync(fullPath)) {
      originalContents = fs.readFileSync(fullPath, { encoding: 'utf8' });
    }

    var contentsToWrite = originalContents.replace(searchTerm, contentsToInsert);

    var returnValue = {
      path: fullPath,
      originalContents: originalContents,
      contents: contentsToWrite,
      inserted: false
    };

    if (contentsToWrite !== originalContents) {
      returnValue.inserted = true;

      return writeFile(fullPath, contentsToWrite)
        .then(function() {
          return returnValue;
        });
    } else {
      return RSVP.resolve(returnValue);
    }
  }
}
