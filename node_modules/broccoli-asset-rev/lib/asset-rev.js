var defaults = require('./default-options');
var Fingerprint = require('./fingerprint');
var UseRev = require('broccoli-asset-rewrite');
var FastbootManifestRewrite = require('./fastboot-manifest-rewrite');

function AssetRev(inputTree, options) {
  if (!(this instanceof AssetRev)) {
    return new AssetRev(inputTree, options);
  }

  options = options || {};
  var exclude = options.exclude || defaults.exclude;

  this.assetMap = {};
  this.inputTree = inputTree;
  this.customHash = options.customHash;
  this.extensions = options.extensions || defaults.extensions;
  this.replaceExtensions = options.replaceExtensions || defaults.replaceExtensions;
  this.exclude = exclude;
  this.fingerprintAssetMap = options.fingerprintAssetMap || defaults.fingerprintAssetMap;
  this.generateAssetMap = options.generateAssetMap;
  this.generateRailsManifest = options.generateRailsManifest;
  this.assetMapPath = options.assetMapPath || defaults.assetMapPath;
  this.railsManifestPath = options.railsManifestPath || defaults.railsManifestPath;
  this.prepend = options.prepend || defaults.prepend;
  this.ignore = options.ignore;
  this.description = options.description;

  // first pass - excludes replaceable source code
  this.exclude = exclude.slice();
  this.replaceExtensions.forEach(function(ext) { this.exclude.push('**/*.' + ext); }, this);
  var fingerprintTree = Fingerprint(inputTree, this);
  var assetRewrite = UseRev(fingerprintTree, this);

  // second pass - fingerprints replaceable source code
  this.exclude = exclude;
  this.onlyHash = this.replaceExtensions;
  var fingerprintTree2 = Fingerprint(assetRewrite, this);
  var assetRewrite2 = UseRev(fingerprintTree2, this);

  return new FastbootManifestRewrite(assetRewrite2, this.assetMap);
}

module.exports = AssetRev;
