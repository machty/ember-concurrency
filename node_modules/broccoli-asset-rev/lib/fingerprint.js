var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var Filter = require('broccoli-filter');
var Promise = require('rsvp').Promise;
// JSON.stringify is not stable
var stringify = require('json-stable-stringify');

var Minimatch = require('minimatch').Minimatch;

var MANIFEST_REGEX = /^manifest(-[0-9a-f]+)?.json$/;
var MULTIPLE_MANIFEST_FILES = 'Multiple manifest files found. Using the first one.';

function Fingerprint(inputNode, options) {
  if (!(this instanceof Fingerprint)) {
    return new Fingerprint(inputNode, options);
  }

  options = options || {};

  Filter.call(this, inputNode, {
    extensions: options.extensions || [],
    // We should drop support for `description` in the next major release
    annotation: options.description || options.annotation
  })

  this.assetMap = options.assetMap || {};
  this.fingerprintAssetMap = options.fingerprintAssetMap || false;
  this.generateAssetMap = options.generateAssetMap;
  this.generateRailsManifest = options.generateRailsManifest;
  this.assetMapPath = options.assetMapPath;
  this.railsManifestPath = options.railsManifestPath;
  this.prepend = options.prepend;
  this.onlyHash = options.onlyHash;

  if (Array.isArray(options.exclude)) {
    this.exclude = options.exclude.map(function(ex) {
      return new Minimatch(ex);
    });
  } else {
    this.exclude = [];
  }

  if (typeof options.customHash === 'function') {
    this.customHash = '';
    this.hashFn = options.customHash;
  } else {
    this.customHash = options.customHash;
    this.hashFn = md5Hash;
  }
}

function hasExtension(str, extension) {
  // ~ String.prototype.endsWith
  if (extension.length < str.length) {
    return extension === str.substr(str.length - extension.length)
  } else {
    return false;
  }
}

function includesExtension(extensions, str) {
  for (var i = 0; i < extensions.length; i++) {
    if (hasExtension(str, extensions[i])) return true;
  }
  return false;
}

Fingerprint.prototype = Object.create(Filter.prototype);
Fingerprint.prototype.constructor = Fingerprint;

Fingerprint.prototype.excludeContains = function (relativePath) {
  for (var i = 0; i < this.exclude.length; i++) {
    // glob expression
    if (this.exclude[i].match(relativePath)) {
      return true;
    }
    // allow 'fonts' and 'assets/fonts' to match 'assets/font/foo.ttf'
    if (relativePath.indexOf(this.exclude[i].pattern) !== -1) {
      return true;
    }
  }
  return false;
}

Fingerprint.prototype.canProcessFile = function (relativePath) {
  if (this.excludeContains(relativePath)) {
    return false;
  }

  if (this.onlyHash && false === includesExtension(this.onlyHash, relativePath)) {
    return false;
  }

  return Filter.prototype.getDestFilePath.apply(this, arguments) != null;
};

Fingerprint.prototype.processFile = function (srcDir, destDir, relativePath) {
  var file = fs.readFileSync(srcDir + '/' + relativePath);
  var self = this;

  return Promise.resolve().then(function () {
    var outputPath = self.getDestFilePath(relativePath);
    fs.writeFileSync(destDir + '/' + outputPath, file);
  });
};

Fingerprint.prototype.getDestFilePath = function (relativePath) {
  var destFilePath = Filter.prototype.getDestFilePath.apply(this, arguments);
  if (destFilePath) {
    if (this.assetMap[relativePath]) {
      return this.assetMap[relativePath];
    }
    if (this.customHash === null) {
      return this.assetMap[relativePath] = destFilePath;
    }

    var tmpPath = path.join(this.inputPaths[0], relativePath);
    var file = fs.readFileSync(tmpPath, { encoding: null });
    var hash;

    if (this.customHash) {
      hash = this.customHash;
    } else {
      hash = this.hashFn(file, tmpPath);
    }

    var ext = path.extname(relativePath);
    var newPath = relativePath.replace(new RegExp(ext+'$'), '-' + hash + ext);
    this.assetMap[relativePath] = newPath;

    return newPath;
  }

  return null;
};

Fingerprint.prototype.writeAssetMap = function (destDir) {
  var toWrite = {
    assets: this.assetMap,
    prepend: this.prepend
  };

  var contents = new Buffer(stringify(toWrite, {space: 2}));
  var fileName = this.assetMapPath;
  var fileNameNoHash = fileName;

  if (!fileName) {
    fileName = 'assets/' + (this.fingerprintAssetMap ? 'assetMap-' + this.hashFn(contents) + '.json' : 'assetMap.json');
    fileNameNoHash = 'assets/assetMap.json';
  }

  this.safeWrite(destDir + '/' + fileName, contents);
  this.assetMap[fileNameNoHash] = fileName;
};

Fingerprint.prototype.findExistingManifest = function(destDir) {
  var files = [];

  try{
    files = fs.readdirSync(destDir + '/assets');
  }catch(e){};

  var userPath = this.railsManifestPath;
  var manifestFiles = files.filter(function(file) {
    return file == userPath || MANIFEST_REGEX.test(file);
  });
  if(manifestFiles.length > 1) {
    console.warn(MULTIPLE_MANIFEST_FILES);
  }
  return manifestFiles[0];
}


Fingerprint.prototype.writeRailsManifest = function(destDir) {
    var assetRegex = /^assets\//,
        digestRegex = /-([0-9a-f]+)\.\w+$/,
        existingManifestPath = this.findExistingManifest(destDir),
        fullExistingManifestPath = destDir + '/assets/' + existingManifestPath,
        existingManifest = {},
        assetMap = {},
        files = {};

    if(existingManifestPath){
      existingManifest = JSON.parse(fs.readFileSync(fullExistingManifestPath));
      assetMap = existingManifest.assets;
      files = existingManifest.files;
    }

    for (var key in this.assetMap) {
      if (assetRegex.test(key)) {
        var fingerprintedPath = this.assetMap[key],
            assetlessKey = key.replace(assetRegex, ''),
            assetlessFingerprintedPath = fingerprintedPath.replace(assetRegex, ''),
            stats = fs.statSync(destDir + '/' + fingerprintedPath);

        files[assetlessFingerprintedPath] = {
          mtime: stats.mtime,
          logical_path: assetlessKey,
          digest: (fingerprintedPath.match(digestRegex) || [])[1],
          size: stats.size
        }
        assetMap[assetlessKey] = assetlessFingerprintedPath;
      }
    }

    var fileName = this.railsManifestPath;
    var assets   = { assets: assetMap, files:  files }
    var contents = new Buffer(stringify(assets, {space: 2}));

    if (!fileName){
      fileName = 'assets/manifest';

      if (!this.excludeContains('manifest.json')) {
        var hash = this.hashFn(contents);
        fileName += '-' + hash;
      }

      fileName += '.json';
    }

    if(existingManifestPath) {
      fs.unlinkSync(fullExistingManifestPath);
    }

    this.safeWrite(destDir + '/' + fileName, contents);
};

Fingerprint.prototype.build = function() {
  var self = this;

  return Filter.prototype.build.call(this).then(function() {
    if (!!self.generateAssetMap) {
      self.writeAssetMap(self.outputPath);
    }

    if (!!self.generateRailsManifest) {
      self.writeRailsManifest(self.outputPath);
    }
  });
};

Fingerprint.prototype.safeWrite = function(file, contents){
  var dir = path.dirname(file);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.writeFileSync(file, contents);
};

/*
 * Does not use the second argument (tmpPath).
 * That argument is only there for custom hash functions.
 */

function md5Hash(buf) {
  var md5 = crypto.createHash('md5');
  md5.update(buf);
  return md5.digest('hex');
}

module.exports = Fingerprint;
