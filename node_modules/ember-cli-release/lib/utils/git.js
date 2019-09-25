/* jshint node:true */

'use strict';

var Repo = require('git-tools');
var RSVP = require('rsvp');

var RepoPrototype = Repo.prototype;

/**
 * Add methods to the git-tools class, these should eventually be made into a PR
 */

RepoPrototype.currentTag = function(callback) {
  var self = this;

  this.exec("rev-parse", "HEAD", function(error, data) {
    if (error) {
      return callback(error);
    }

    // Look up the tag name using the current SHA
    self.exec("name-rev", "--tags", "--name-only", data, function(error, data) {
      var tagName = null;

      if (error) {
        return callback(error);
      }

      // Git outputs 'undefined' if the SHA does not match a tag (not JS related)
      if (data !== 'undefined') {
        // Annotated tags will be appendded with the distance from the tag using
        // ~ notation, in which case sha^0 is distance zero
        var match = data.match(/(.*?)(\^0|~\d+)?$/);

        if (!match[2] || match[2] === '^0') {
          tagName = match[1];
        }
      }

      callback(null, tagName);
    });
  });
};

RepoPrototype.createTag = function(tagName, message, callback) {
  if (typeof message === 'function') {
    callback = message;
    message = null;
  }

  // Create an annotated tag if a message is supplied
  if (message) {
    this.exec("tag", "--annotate", "--message", message, tagName, callback);
  } else {
    this.exec("tag", tagName, callback);
  }
};

RepoPrototype.pushTags = function(remote, callback) {
  this.exec("push", remote, "--tags", callback);
};

RepoPrototype.push = function(remote, treeish, callback) {
  this.exec("push", remote, treeish, callback);
};

RepoPrototype.status = function(callback) {
  this.exec("status", "--porcelain", callback);
};

RepoPrototype.addAll = function(callback) {
  this.exec("add", "--all", callback);
};

RepoPrototype.commit = function(message, callback) {
  this.exec("commit", "--message", message, callback);
};

RepoPrototype.commitAll = function(message, callback) {
  this.exec("commit", "--all", "--message", message, callback);
};

/**
 * Create promise-aware wrapper for git-tools class
 */

function DenodeifiedRepo(path) {
  this._repo = new Repo(path);
}

DenodeifiedRepo.toString = function() {
  return 'DenodeifiedRepo';
};

var DenodeifiedRepoPrototype = DenodeifiedRepo.prototype = Object.create(null);

DenodeifiedRepoPrototype.constructor = DenodeifiedRepo;

// Cherry-pick only the methods needed, since some are only used internally (e.g. `exec`)
var repoMethods = [
  'tags',
  'status',
  'currentBranch',
  'currentTag',
  'createTag',
  'commitAll',
  'push'
];

repoMethods.forEach(function(methodName) {
  var func = RSVP.denodeify(RepoPrototype[methodName]);

  DenodeifiedRepoPrototype[methodName] = function denodeifiedMethod() {
    return func.apply(this._repo, arguments);
  };
});

module.exports = DenodeifiedRepo;
