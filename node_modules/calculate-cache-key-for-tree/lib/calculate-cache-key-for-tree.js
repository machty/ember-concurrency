'use strict';

const crypto = require('crypto');
const stringify = require('json-stable-stringify');

/*
  Calculates the cache key for a given type of tree (e.g., addon, app, etc.) for
  a given instance of an Addon. By default, uses members of the addon's
  package.json and name to generate the cache key.

  @public
  @method calculateCacheKeyForTree
  @param {String} treeType
  @param {Addon} addonInstance
  @param {Array<any>} additionalCacheKeyParts
  @return {String} cacheKey
*/
module.exports = function calculateCacheKeyForTree(treeType, addonInstance, additionalCacheKeyParts) {
  let pkg = addonInstance.pkg || {};

  let cacheKeyParts = Object.keys(pkg)
    .filter(k => k[0] !== '_' && k[0] !== '$')
    .map(k => pkg[k])
    .concat(
      addonInstance.name,
      treeType,
      additionalCacheKeyParts
    );

  return crypto.createHash('md5').update(stringify(cacheKeyParts), 'utf8').digest('hex');
};
