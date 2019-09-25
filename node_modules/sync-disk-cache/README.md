# sync-disk-cache [![Build status](https://ci.appveyor.com/api/projects/status/fjm3xhxs492x32wp?svg=true)](https://ci.appveyor.com/project/embercli/sync-disk-cache) [![Build Status](https://travis-ci.org/stefanpenner/sync-disk-cache.svg)](https://travis-ci.org/stefanpenner/sync-disk-cache)

A sync disk cache. inspired by [jgable/cache-swap](https://github.com/jgable/cache-swap)

An async sibling version is also available: [stefanpenner/async-disk-cache](https://github.com/stefanpenner/async-disk-cache/)

By default, this will usge `TMPDIR/<username>/` for storage, but this can be changed by setting the `$TMPDIR` environment variable.

All stored values become strings.

## Example

```js
var Cache = require('sync-disk-cache');
var cache = new Cache('my-cache');
// 'my-cache' also serves as the global key for the cache.
// if you have multiple programs with this same `cache-key` they will share the
// same backing store. This by design.

// checking
cache.has('foo') === wasFooFound;

// retrieving (cache hit)
cache.get('foo') === {
  isCached: true,
  path: 'foo',
  content: 'content of foo'
}

// retrieving (cache miss)
cache.get('foo') === {
  isCached: false,
  path: 'foo',
  content: undefined
}

// retrieving (cache miss)
cache.set('foo', 'content of foo'); // was set

// remove a key
cache.remove('foo');

// clearing the cache
cache.clear(); // cache was cleared
```


Enable compression:

note: node 0.10.x does not support the synchronous zlib method variants, so compression is only available > 0.10.x

```js
var Cache = require('sync-disk-cache');
var cache = new Cache('my-cache', {
  compression: 'gzip' | 'deflate' | 'deflateRaw' // basically just what nodes zlib's ships with
})
```

## License

Licensed under the MIT License, Copyright 2015 Stefan Penner
