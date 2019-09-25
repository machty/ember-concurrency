/* eslint-env node */
'use strict';

var Append = require('./lib/broccoli-append');
var path = require('path');

module.exports = {
  name: 'ember-qunit-assert-helpers',

  postprocessTree(type, tree) {
    if (this._requireBuildPackages) {
      this._requireBuildPackages();
    }

    if (type === 'all' && this.app.tests) {
      var appendPath = path.join(__dirname, '/vendor/ember-qunit-assert-helpers-loader.js');
      return new Append(tree, /test-support[A-Za-z0-9-]*/, appendPath);
    } else {
      return tree;
    }
  }
};
