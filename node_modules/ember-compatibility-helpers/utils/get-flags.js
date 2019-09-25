'use strict';

const extractTrueVersion = require('./extract-true-version');
const semver = require('semver');
const satisfies = semver.satisfies;
const gte = semver.gte;

module.exports = function(emberVersion, parentChecker) {
  const trueEmberVersion = extractTrueVersion(emberVersion);
  const emberDataVersion = parentChecker.for('ember-data', 'npm').version;

  return {
    HAS_UNDERSCORE_ACTIONS: !gte(trueEmberVersion, '2.0.0'),
    HAS_MODERN_FACTORY_INJECTIONS: gte(trueEmberVersion, '2.13.0'),
    HAS_DESCRIPTOR_TRAP: satisfies(trueEmberVersion, '~3.0.0'),
    HAS_NATIVE_COMPUTED_GETTERS: gte(trueEmberVersion, '3.1.0-beta.1'),

    IS_GLIMMER_2: gte(trueEmberVersion, '2.10.0'),
    IS_RECORD_DATA: !emberDataVersion ? false : gte(emberDataVersion, '3.5.0'),

    SUPPORTS_FACTORY_FOR:
      gte(trueEmberVersion, '2.12.0') ||
      parentChecker.for('ember-factory-for-polyfill', 'npm').gte('1.0.0'),
    SUPPORTS_GET_OWNER:
      gte(trueEmberVersion, '2.3.0') ||
      parentChecker.for('ember-getowner-polyfill', 'npm').gte('1.1.0'),
    SUPPORTS_SET_OWNER: gte(trueEmberVersion, '2.3.0'),
    SUPPORTS_NEW_COMPUTED: gte(trueEmberVersion, '1.12.0-beta.1'),
    SUPPORTS_INVERSE_BLOCK: gte(trueEmberVersion, '1.13.0'),
    SUPPORTS_CLOSURE_ACTIONS: gte(trueEmberVersion, '1.13.0'),
    SUPPORTS_UNIQ_BY_COMPUTED: gte(trueEmberVersion, '2.7.0')
  };
};
