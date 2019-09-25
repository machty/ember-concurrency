'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeOptions = normalizeOptions;

var _semver = require('semver');

function normalizeOptions(options) {
  var _options$features = options.features,
      features = _options$features === undefined ? [] : _options$features,
      debugTools = options.debugTools,
      envFlags = options.envFlags,
      externalizeHelpers = options.externalizeHelpers,
      svelte = options.svelte;


  var featureSources = [];
  var featuresMap = {};
  var svelteMap = {};
  var hasSvelteBuild = false;

  if (!Array.isArray(features)) {
    features = [features];
  }

  features = features.map(function (feature) {
    var featuresSource = feature.source;
    featureSources.push(featuresSource);
    var name = feature.name;

    var flags = {};
    featuresMap[featuresSource] = {};
    svelteMap[featuresSource] = {};

    Object.keys(feature.flags).forEach(function (flagName) {
      var value = feature.flags[flagName];

      if (svelte !== undefined && typeof value === 'string' && svelte[name]) {
        hasSvelteBuild = true;
        flags[flagName] = svelteMap[featuresSource][flagName] = (0, _semver.satisfies)(value, `>=${svelte[name]}`);
      } else if (typeof value === 'boolean' || value === null) {
        flags[flagName] = featuresMap[featuresSource][flagName] = value;
      } else {
        flags[flagName] = featuresMap[featuresSource][flagName] = true;
      }
    });

    return {
      name,
      source: feature.source,
      flags
    };
  });

  if (!debugTools) {
    throw new Error('You must specify `debugTools.source`');
  }

  var debugToolsImport = debugTools.source,
      assertPredicateIndex = debugTools.assertPredicateIndex;


  var envFlagsImport = void 0;
  var _envFlags = {};

  if (envFlags) {
    envFlagsImport = envFlags.source;
    if (envFlags.flags) {
      _envFlags = envFlags.flags;
    }
  } else {
    throw new Error('You must specify envFlags.flags.DEBUG at minimum.');
  }

  return {
    featureSources,
    externalizeHelpers,
    features,
    featuresMap,
    svelteMap,
    hasSvelteBuild,
    svelte,
    envFlags: {
      envFlagsImport,
      flags: _envFlags
    },
    debugTools: {
      debugToolsImport,
      assertPredicateIndex
    }
  };
}