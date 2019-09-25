/* jshint node: true */
"use strict";

var Filter = require('broccoli-persistent-filter');
var fs = require('fs');

module.exports = class FastbootManifestRewrite extends Filter {
  constructor(inputNode, assetMap) {
    super(inputNode, { annotation: 'broccoli-asset-rev/fastboot-manifest-rewrite'});
    this.assetMap = assetMap;
    this.extensions = ['json'];
  }

  getDestFilePath(relativePath) {
    if (relativePath === 'package.json') {
      return relativePath;
    }
  }

  processString(contents, relativePath) {
    var pkg = JSON.parse(contents);
    if (pkg.fastboot && pkg.fastboot.manifest) {
      var manifest = pkg.fastboot.manifest;
      this._process(manifest, 'appFiles', true);
      this._process(manifest, 'vendorFiles', true);
      this._process(manifest, 'htmlFile', false);
      return JSON.stringify(pkg);
    }
    return contents;
  }

  _process(manifest, key, asArray) {
    if (manifest[key]) {
      if (asArray) {
        var assetMap = this.assetMap;
        manifest[key] = manifest[key].map(function(filename){ return assetMap[filename] || filename; });
      } else {
        manifest[key] = this.assetMap[manifest[key]] || manifest[key];
      }
    }
  }
};
