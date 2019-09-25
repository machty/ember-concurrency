/* jshint node:true, eqnull:true */

'use strict';

var path       = require('path');
var getGitInfo = require('git-repo-info');

module.exports = function version(options) {
  options = options || {};
  var shaLength = options.shaLength != null ? options.shaLength : 8;
  var includeDate = options.includeDate || false;
  var projectPath = options.projectPath || process.cwd();
  var info = getGitInfo(projectPath);
  var packageVersion  = require(path.join(projectPath, 'package.json')).version;

  var prefix;
  if (info.tag && !(packageVersion && info.tag.includes(packageVersion))) {
    prefix = info.tag;
  } else if (packageVersion) {
    prefix = packageVersion;
  } else if (info.branch) {
    prefix = info.branch;
  } else {
    prefix = 'DETACHED_HEAD';
  }

  var sha = '';
  if (shaLength > 0 && info.sha) {
    sha = '+' +  info.sha.substring(0, shaLength);
  }

  var authorDate = includeDate ? ' ' + info.authorDate : '';

  return prefix + sha + authorDate;
};
