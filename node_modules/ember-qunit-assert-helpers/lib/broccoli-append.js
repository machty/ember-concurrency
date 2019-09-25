/* jshint node:true */
/* global require, module */

// `broccoli-append` will append a JS file (identified by full file path) to
// another JS file (identified by pattern) in a broccoli tree.
// This is used to inject `ember-qunit-assert-helpers-loader` at the bottom
// of the `test-support.js` file.
//
// It seems silly to create a new `broccoli-plugin` for this simple task,
// but I tried for hours to come up with another solution and just couldn't.
// I tried a solution of Funnel, Concat and MergeTree plugins, but the hitch
// was matching by pattern. When someone wants to fingerprint their dev build
// you can't always rely on it being `/test-support.js`, it'll have a fingerprint.
// Also, one plugin felt more efficent, than five. If someone has a better solution
// to this, a PR is welcome :).
//

var fs = require('fs');
var Filter = require('broccoli-filter');

Append.prototype = Object.create(Filter.prototype);
Append.prototype.constructor = Append;
function Append(inputNode, pattern, appendFilePath, options) {
  options = options || {};
  Filter.call(this, inputNode, {
    annotation: options.annotation
  });
  this.pattern = pattern;
  this.appendFilePath = appendFilePath;
}

Append.prototype.extensions = ['js'];
Append.prototype.targetExtension = 'js';

Append.prototype.processString = function(content, relativePath) {
  if (relativePath.match(this.pattern)) {
    content = content + '\n' + this.appendFileContents() + '\n';
  }
  return content;
};

Append.prototype.appendFileContents = function() {
  if (!this._fileContentsCache) {
    this._fileContentsCache = fs.readFileSync(this.appendFilePath, { encoding: 'utf8' });
  }
  return this._fileContentsCache;
};

module.exports = Append;
