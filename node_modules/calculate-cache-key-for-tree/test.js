'use strict';

var calculateCacheKeyForTree = require('./index');
var cacheKeyForStableTree = calculateCacheKeyForTree.cacheKeyForStableTree;
var chai = require('chai');
var expect = chai.expect;

describe('calculateCacheKeyForTree', function() {
  it('should return same value for same input', function() {
    var addon = {
      root: 'hoy',
      pkg: { name: 'foo', dependencies: { bar: '1.2.3' } }
    };

    var first = calculateCacheKeyForTree('app', addon);
    var second = calculateCacheKeyForTree('app', addon);

    expect(first).to.equal(second);
  });

  it('should return same value for different instances but same package.json content', function() {
    var firstAddon = {
      name: 'derp',
      root: 'hoy',
      pkg: { name: 'foo', dependencies: { bar: '2.0.1' } }
    };

    var secondAddon = {
      name: 'derp',
      root: 'hoy',
      pkg: { name: 'foo', dependencies: { bar: '2.0.1' } }
    };

    var first = calculateCacheKeyForTree('app', firstAddon);
    var second = calculateCacheKeyForTree('app', secondAddon);

    expect(first).to.equal(second);
  });

  it('should return different value for addons with custom non-underscored keys in package.json', function() {
    var firstAddon = {
      name: 'huzzah',
      root: 'hoy',
      pkg: { name: 'foo', specialThing: 'quux', dependencies: { bar: '2.0.1' } }
    };

    var secondAddon = {
      name: 'huzzah',
      root: 'hoy',
      pkg: { name: 'foo', specialThing: 'qux', dependencies: { bar: '2.0.1' } }
    };

    var first = calculateCacheKeyForTree('app', firstAddon);
    var second = calculateCacheKeyForTree('app', secondAddon);

    expect(first).to.not.equal(second);
  });

  it('should return different value for different addons', function() {
    var firstAddon = {
      name: 'derp',
      root: 'hoy',
      pkg: { name: 'baz', dependencies: { bar: '2.0.1' } }
    };

    var secondAddon = {
      name: 'huzzah',
      root: 'hoy',
      pkg: { name: 'foo', dependencies: { bar: '1.2.3' } }
    };

    var first = calculateCacheKeyForTree('app', firstAddon);
    var second = calculateCacheKeyForTree('app', secondAddon);

    expect(first).to.not.equal(second);
  });

  it('should not return same value for same addon with different tree type', function() {
    var addon = {
      root: 'hoy',
      pkg: { name: 'foo', dependencies: { bar: '1.2.3' } }
    };

    var first = calculateCacheKeyForTree('addon', addon);
    var second = calculateCacheKeyForTree('app', addon);

    expect(first).not.to.equal(second);
  });

  it('should allow additional custom values to be passed', function() {
    var addon = {
      root: 'hoy',
      pkg: { name: 'foo', dependencies: { bar: '1.2.3' } }
    };

    var first = calculateCacheKeyForTree('addon', addon);
    var second = calculateCacheKeyForTree('addon', addon, ['foo']);

    expect(first).not.to.equal(second);
  });

  it('cache key parts are stable sorted', function() {
    var addon = {
      root: 'hoy',
      pkg: { name: 'foo', dependencies: { bar: '1.2.3' } }
    };

    var first = calculateCacheKeyForTree('addon', addon, [ { foo: 'bar', baz: 'derp' }]);
    var second = calculateCacheKeyForTree('addon', addon, [ { baz: 'derp', foo: 'bar' }]);

    expect(first).to.equal(second);
  });
});

describe('cacheKeyForStableTree', function() {
  it('should pass the tree type to calculateCacheKeyForTree', function() {
    let addon = {
      cacheKeyForTree: cacheKeyForStableTree
    };
    let firstKey = addon.cacheKeyForTree('foo');
    let secondKey = addon.cacheKeyForTree('bar');
    let thirdKey = addon.cacheKeyForTree('foo');

    expect(firstKey).not.to.equal(secondKey);
    expect(firstKey).to.equal(thirdKey);
  });

  it('should use the context as the addon argument to calculateCacheKeyForTree', function() {
    let addon = {
      name: 'derp',
      root: 'hoy',
      pkg: { name: 'baz', dependencies: { bar: '2.0.1' } },
      cacheKeyForTree: cacheKeyForStableTree
    };
    let firstKey = addon.cacheKeyForTree('foo');

    addon.name = 'herp';
    let secondKey = addon.cacheKeyForTree('foo');

    expect(firstKey).not.to.equal(secondKey);
  });
});
