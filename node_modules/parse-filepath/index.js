'use strict';

var path = require('path');
var isAbsolute = require('is-absolute');
var MapCache = require('map-cache');
var nativeParse = path.parse;
var cache = new MapCache();

module.exports = function parse(fp) {
  if (typeof fp !== 'string') {
    throw new Error('parse-filepath expects a string.');
  }

  if (cache.has(fp)) {
    return cache.get(fp);
  }

  var res = { path: fp, isAbsolute: isAbsolute(fp) };
  var params = {
    base: 'basename',
    dir: 'dirname',
    ext: 'extname',
    name: 'name',
    root: 'root'
  };

  res.absolute = path.resolve(res.path);

  if (typeof nativeParse === 'function') {
    var parsed = nativeParse(fp);
    for (var key in parsed) {
      if (parsed.hasOwnProperty(key)) {
        res[params[key]] = parsed[key];
      }
    }

  } else {
    var ext = path.extname(fp);
    res.name = path.basename(fp, ext);
    res.basename = res.name + ext;
    res.extname = path.extname(fp);
    res.dirname = path.dirname(fp);
    res.root = '';
  }

  cache.set(fp, res);
  return res;
};
