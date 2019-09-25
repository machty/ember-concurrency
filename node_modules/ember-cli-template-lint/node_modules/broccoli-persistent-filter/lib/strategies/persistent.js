/// @ts-check
'use strict';

const AsyncDiskCache = require('async-disk-cache');
const SyncDiskCache = require('sync-disk-cache');
const Promise = require('rsvp').Promise;
const Dependencies = require('../dependencies');
const rimraf = require('rimraf').sync;

module.exports = {

  _cache: {},

  init(ctx) {
    if (!ctx.constructor._persistentCacheKey) {
      ctx.constructor._persistentCacheKey = this.cacheKey(ctx);
    }

    this._cache = new AsyncDiskCache(ctx.constructor._persistentCacheKey, {
      location: process.env['BROCCOLI_PERSISTENT_FILTER_CACHE_ROOT'],
      compression: 'deflate'
    });

    this._syncCache = new SyncDiskCache(ctx.constructor._persistentCacheKey, {
      location: process.env['BROCCOLI_PERSISTENT_FILTER_CACHE_ROOT']
    });

    if (process.env['CLEAR_BROCCOLI_PERSISTENT_FILTER_CACHE'] === 'true') {
      // this._cache.clear is async and can result in race conditions here.
      // TODO: update async-disk-cache to have a synchronous `clearSync` method.
      rimraf(this._cache.root);
      rimraf(this._syncCache.root);
    }
  },

  cacheKey(ctx) {
    return ctx.cacheKey();
  },

  processString(ctx, contents, relativePath, forceInvalidation, instrumentation) {
    let key = ctx.cacheKeyProcessString(contents, relativePath);
    let cache = this._cache;
    let string;

    return cache.get(key).then(entry => {
      if (entry.isCached && !forceInvalidation) {
        instrumentation.persistentCacheHit++;

        string = Promise.resolve(entry.value).then(value => {
          return JSON.parse(value);
        });
      } else {
        instrumentation.persistentCachePrime++;

        string = new Promise(resolve => {
          resolve(ctx.processString(contents, relativePath));
        }).then(result => {
          if (typeof result === 'string') {
            return { output: result };
          } else {
            return result;
          }
        }).then(value => {
          let stringValue = JSON.stringify(value);

          return cache.set(key, stringValue).then(() => value);
        });
      }

      return string.then(object => {
        return new Promise(resolve =>  {
          resolve(ctx.postProcess(object, relativePath));
        }).then(result => {
          if (result === undefined) {
            throw new Error('You must return an object from `Filter.prototype.postProcess`.');
          }

          return result.output;
        });
      });
    });
  },

  /**
   * By default initial dependencies are empty.
   * @returns {Dependencies}
   */
  initialDependencies(srcDir) {
    let result = this._syncCache.get('__dependencies__');
    let dependencies;
    if (result.isCached) {
      /** @type {ReturnType<Dependencies['serialize']>} */
      let data = JSON.parse(result.value);
      dependencies = Dependencies.deserialize(data, srcDir);
    } else {
      // Dependencies start out empty; they are sealed as if they came from
      // the previous build iteration.
      dependencies = new Dependencies(srcDir);
      dependencies.seal().captureDependencyState();
    }
   return dependencies;
  },

  /**
   * Seals the dependencies and captures the dependency state.
   * @param dependencies {Dependencies} The dependencies to seal.
   */
  sealDependencies(dependencies) {
    dependencies.seal().captureDependencyState();
    let data = dependencies.serialize();
    this._syncCache.set('__dependencies__', JSON.stringify(data));
  }
};
