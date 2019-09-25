'use strict';

var path = require('path');
var broccoliFunnel = require('broccoli-funnel');
var broccoliMergeTrees = require('broccoli-merge-trees');
var map = require('broccoli-stew').map;

module.exports = {
  name: 'ember-cli-fastclick',

  included(app) {
    this._super.included(app);
    app.import(this.treePaths.vendor + '/fastclick/fastclick.js');
  },

  treeForVendor(defaultTree) {
    var trees = [];
    if (defaultTree) {
      trees.push(defaultTree);
    }
    var libPath = path.dirname(require.resolve('fastclick'));
    var fastclickLib = new broccoliFunnel(libPath, {
      destDir: 'fastclick',
      include: ['*']
    });
    fastclickLib = map(fastclickLib, content => `if (typeof FastBoot === 'undefined') { ${content} }`);
    trees.push(fastclickLib);
    return broccoliMergeTrees(trees);
  }
};
