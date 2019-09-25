var Filter = require('broccoli-filter');
var path = require('path');
var Cache = require('broccoli-filter/lib/cache');

function normalize(str) {
  return str.replace(/[\\\/]+/g, '/');
}

function relative(a, b) {
  if (/\./.test(path.basename(a))) {
    a = path.dirname(a);
  }

  var relativePath = path.relative(a, b);
  // path.relative might have added back \-s on windows
  relativePath = normalize(relativePath);
  return relativePath.charAt(0) !== '.' ? './' + relativePath : relativePath;
}

function AssetRewrite(inputNode, options) {
  if (!(this instanceof AssetRewrite)) {
    return new AssetRewrite(inputNode, options);
  }

  options = options || {};

  Filter.call(this, inputNode, {
    extensions: options.replaceExtensions || ['html', 'css'],
    // We should drop support for `description` in the next major release
    annotation: options.description || options.annotation
  });

  this.assetMap = options.assetMap || {};
  this.prepend = options.prepend || '';
  this.ignore = options.ignore || []; // files to ignore

  this.assetMapKeys = null;
}

AssetRewrite.prototype = Object.create(Filter.prototype);
AssetRewrite.prototype.constructor = AssetRewrite;

AssetRewrite.prototype.processAndCacheFile = function (srcDir, destDir, relativePath) {
  this._cache = new Cache();

  return Filter.prototype.processAndCacheFile.apply(this, arguments);
}

/**
 * Checks that file is not being ignored and destination doesn't already have a file
 * @param relativePath
 * @returns {boolean}
 */

AssetRewrite.prototype.canProcessFile = function(relativePath) {
  if (!this.assetMapKeys) {
    this.generateAssetMapKeys();
  }

  if (!this.inverseAssetMap) {
    var inverseAssetMap = {};
    var assetMap = this.assetMap;

    Object.keys(assetMap).forEach(function(key) {
      var value = assetMap[key];
      inverseAssetMap[value] = key;
    }, this);

    this.inverseAssetMap = inverseAssetMap;
  }

  /*
   * relativePath can be fingerprinted or not.
   * Check that neither of these variations are being ignored
   */

  if (this.ignore.indexOf(relativePath) !== -1 || this.ignore.indexOf(this.inverseAssetMap[relativePath]) !== -1) {
    return false;
  }

  return Filter.prototype.canProcessFile.apply(this, arguments);
}

AssetRewrite.prototype.rewriteAssetPath = function (string, assetPath, replacementPath) {

  // Early exit: does the file contain the asset path?
  if (string.indexOf(assetPath) === -1) return string;

  var newString = string;

  /*
   * Replace all of the assets with their new fingerprint name
   *
   * Uses a regular expression to find assets in html tags, css backgrounds, handlebars pre-compiled templates, etc.
   *
   * ["\'(=] - Match one of "'(= exactly one time
   * \\s* - Any amount of white space
   * ( - Starts the first capture group
   * [^"\'()=]* - Do not match any of ^"'()= 0 or more times
   * [^"\n\'()\\>=]* - Do not match any of ^"\n'()\>= 0 or more times - Explicitly add \ here because of handlebars compilation
   * ) - End first capture group
   * (\\?[^"\')> ]*)? - Allow for query parameters to be present after the URL of an asset
   * \\s* - Any amount of white space
   * \\\\* - Allow any amount of \ - For handlebars compilation (includes \\\)
   * \\s* - Any amount of white space
   * ["\')>\s] - Match one of "'(\n> exactly one time
   */

  var re = new RegExp('["\'(=]\\s*([^"\'()=]*' + escapeRegExp(assetPath) + '[^"\n\'()\\>=]*)(\\?[^"\')> ]*)?\\s*\\\\*\\s*["\')>\s]', 'g');
  var match = null;
  
  /*
   * This is to ignore matches that should not be changed
   * Any URL encoded match that would be ignored above will be ignored by this: "'()=\
   */
  var ignoreLibraryCode = new RegExp('%(22|27|5C|28|29|3D)[^"\'()=]*' + escapeRegExp(assetPath));

  while (match = re.exec(newString)) {
    var replaceString = '';
    if (ignoreLibraryCode.exec(match[1])) {
      continue;
    }

    replaceString = match[1].replace(assetPath, replacementPath);

    if (this.prepend && replaceString.indexOf(this.prepend) !== 0) {
      var removeLeadingRelativeOrSlashRegex = new RegExp('^(\\.*/)*(.*)$');
      replaceString = this.prepend + removeLeadingRelativeOrSlashRegex.exec(replaceString)[2];
    }

    newString = newString.replace(new RegExp(escapeRegExp(match[1]), 'g'), replaceString);
  }

  var self = this;
  return newString.replace(new RegExp('sourceMappingURL=' + escapeRegExp(assetPath)), function(wholeMatch) {
    var replaceString = replacementPath;
    if (self.prepend && (!/^sourceMappingURL=(http|https|\/\/)/.test(wholeMatch))) {
      replaceString = self.prepend + replacementPath;
    }
    return wholeMatch.replace(assetPath, replaceString);
  });
};

AssetRewrite.prototype.processString = function (string, relativePath) {
  var newString = string;

  for (var i = 0, keyLength = this.assetMapKeys.length; i < keyLength; i++) {
    var key = this.assetMapKeys[i];

    if (this.assetMap.hasOwnProperty(key)) {
      /*
       * Rewrite absolute URLs
       */

      newString = this.rewriteAssetPath(newString, key, this.assetMap[key]);

      /*
       * Rewrite relative URLs. If there is a prepend, use the full absolute path.
       */

      var pathDiff = relative(relativePath, key).replace(/^\.\//, "");
      var replacementDiff = relative(relativePath, this.assetMap[key]).replace(/^\.\//, "");

      if (this.prepend && this.prepend !== '') {
        replacementDiff = this.assetMap[key];
      }

      newString = this.rewriteAssetPath(newString, pathDiff, replacementDiff);
    }
  }

  return newString;
};

AssetRewrite.prototype.generateAssetMapKeys = function () {
  var keys = Object.keys(this.assetMap);

  keys.sort(function (a, b) {
    if (a.length < b.length) {
      return 1;
    }

    if (a.length > b.length) {
      return -1;
    }

    return 0;
  });

  this.assetMapKeys = keys;
};

/*
 * /([.*+?^=!:${}()|\[\]\/\\])/g - Replace .*+?^=!:${}()|[]/\ in filenames with an escaped version for an exact name match
 */
function escapeRegExp(string) {
  return string.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
}

module.exports = AssetRewrite;
