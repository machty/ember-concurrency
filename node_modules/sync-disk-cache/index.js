'use strict';

var path = require('path');
var fs = require('fs');
var readFile = fs.readFileSync;
var writeFile = fs.writeFileSync;
var mkdirp = require('mkdirp').sync;
var rimraf = require('rimraf').sync;
var unlink = fs.unlinkSync;
var chmod = fs.chmodSync;
var debug = require('debug')('sync-disk-cache');
var zlib = require('zlib');
var heimdall =  require('heimdalljs');
var os = require('os');
var username = require('username-sync')();
var tmpdir = path.join(os.tmpdir(), username);
var crypto = require('crypto');
var mode = {
  mode: parseInt('0777', 8)
};

var CacheEntry = require('./lib/cache-entry');
var Metric = require('./lib/metric');

if (!heimdall.hasMonitor('sync-disk-cache')) {
  heimdall.registerMonitor('sync-disk-cache', function SyncDiskCacheSchema() {});
}

/*
 * @private
 *
 * Defines a function on the given object at the given property name. Wraps
 * the function with metric recording for heimdalljs.
 *
 * @method defineFunction
 * @param Object obj the object on which to define the function
 * @param String name the name to use for the function
 * @param Function fn
 * @returns Void
 */
function defineFunction(obj, name, fn) {
  obj[name] = function() {
    var stats = heimdall.statsFor('sync-disk-cache');
    var metrics = stats[name] = stats[name] || new Metric();

    metrics.start();

    var result;
    try {
      result = fn.apply(this, arguments);
    } finally {
      metrics.stop();
    }

    return result;
  };
}

/*
 * @private
 * @method processFile
 * @param String filePath the path of the cached file
 * @returns CacheEntry an object representing that cache entry
 */
function processFile(filePath, fileStream) {
  return new CacheEntry(true, filePath, fileStream.toString());
}

/*
 * @private
 *
 * When we encounter a rejection with reason of ENOENT, we actually know this
 * should be a cache miss, so the rejection is handled as the CacheEntry.MISS
 * singleton is the result.
 *
 * But if we encounter anything else, we must assume a legitimate failure an
 * re-throw
 *
 * @method handleENOENT
 * @param Error reason
 * @returns CacheEntry returns the CacheEntry miss singleton
 */
function handleENOENT(reason) {
  if (reason && reason.code === 'ENOENT') {
    return CacheEntry.MISS;
  }
  throw reason;
}

var COMPRESSIONS = {
  deflate: {
    in: zlib.deflateSync,
    out: zlib.inflateSync,
  },

  deflateRaw: {
    in: zlib.deflateRawSync,
    out: zlib.inflateRawSync,
  },

  gzip: {
    in: zlib.gzipSync,
    out: zlib.gunzipSync,
  },
};

function hasCompression(compression) {
  if (/^v0\.10\.\d+/.test(process.version) && compression) {
    throw new Error('node: [version:' +
                    process.version +
                    '] does not support synchronous zlib compression APIs');
  }
}
/*
 *
 * @class Cache
 * @param {String} key the global key that represents this cache in its final location
 * @param {String} options optional string path to the location for the
 *                          cache. If omitted the system tmpdir is used
 */
function Cache(key, _) {
  var options = _ || {};
  this.tmpdir = options.location|| tmpdir;

  if (options.compression) {
    hasCompression(options.compression)
  }
  this.compression = options.compression;


  this.key = key || 'default-disk-cache';
  this.root = path.join(this.tmpdir, 'if-you-need-to-delete-this-open-an-issue-sync-disk-cache', this.key);

  debug('new Cache { root: %s, compression: %s }', this.root, this.compression);
}

/*
 * @public
 *
 * @method clear
 */
defineFunction(Cache.prototype, 'clear', function() {
  debug('clear: %s', this.root);

  return rimraf(
    path.join(this.root)
  );
});

/*
 * @public
 *
 * @method has
 * @param {String} key the key to check existence of
 * @return {Boolean} - whether the key was found or not
 */
defineFunction(Cache.prototype, 'has', function(key) {
  var filePath = this.pathFor(key);
  debug('has: %s', filePath);

  return fs.existsSync(filePath);
});

/*
 * @public
 *
 * @method get
 * @param {String} key they key to retrieve
 * @return {CacheEntry} - either the cache entry, or a cache miss entry
 */
defineFunction(Cache.prototype, 'get', function(key) {
  var filePath = this.pathFor(key);
  debug('get: %s', filePath);

  try {
    return processFile(filePath, this.decompress(readFile(filePath)));
  } catch(e) {
    return handleENOENT(e);
  }
});

/*
 * @public
 *
 * @method set
 * @param {String} key the key we wish to store
 * @param {String} value the value we wish the key to be stored with
 * @returns {String} filePath of the stored value
 */
defineFunction(Cache.prototype, 'set', function(key, value) {
  var filePath = this.pathFor(key);
  debug('set : %s', filePath);

  try {
    writeFile(filePath, this.compress(value), mode);
  } catch (e) {
    if (e.code === 'ENOENT') {
      mkdirp(path.dirname(filePath), mode);
      writeFile(filePath, this.compress(value), mode);
    } else {
      throw e;
    }
  }
  chmod(filePath, mode.mode);

  return filePath;
});

/*
 * @public
 *
 * @method remove
 * @param {String} key the key to remove from the cache
 * @returns {Boolean} - whether the key was removed
 */
defineFunction(Cache.prototype, 'remove', function(key) {
  var filePath = this.pathFor(key);
  debug('remove : %s', filePath);

  try {
    return unlink(filePath);
  } catch(e) {
    handleENOENT(e);
  }
});

/*
 * @public
 *
 * @method pathFor
 * @param {String} key the key to generate the final path for
 * @returns the path where the key's value may reside
 */
defineFunction(Cache.prototype, 'pathFor', function(key) {
  return path.join(this.root, crypto.createHash('sha1').update(key).digest('hex'));
});

/*
 * @public
 *
 * @method decompress
 * @param {String} compressedValue
 * @returns decompressedValue
 */
defineFunction(Cache.prototype, 'decompress', function(value) {
  if (!this.compression) { return value; }
  return COMPRESSIONS[this.compression].out(value);
});

/*
 * @public
 *
 * @method compress
 * @param {String} value
 * @returns compressedValue
 */
defineFunction(Cache.prototype, 'compress', function(value) {
  if (!this.compression) { return value; }
  return COMPRESSIONS[this.compression].in(value);
});

module.exports = Cache;
