'use strict';

const SilentError = require('silent-error');

const FEATURES = require('./features');
const getConfigPath = require('./utils').getConfigPath;

module.exports = {
  name: '@ember/optional-features',

  includedCommands() {
    return require('./commands');
  },

  init() {
    this._super && this._super.init.apply(this, arguments);
    this._features = this._validateFeatures(this._loadFeatures());
  },

  _loadFeatures() {
    let features = {};

    let configPath = getConfigPath(this.project);

    try {
      Object.assign(features, this.project.require(configPath));
    } catch(err) {
      if (err.code !== 'MODULE_NOT_FOUND') {
        throw err;
      }
    }

    if (process.env.EMBER_OPTIONAL_FEATURES) {
      Object.assign(features, JSON.parse(process.env.EMBER_OPTIONAL_FEATURES));
    }

    return features;
  },

  _validateFeatures(features) {
    let validated = {};
    let keys = Object.keys(features);
    keys.forEach(key => {
      if (FEATURES[key] === undefined) {
        throw new SilentError(`Unknown feature "${key}" found in config/optional-features.json`);
      } else if (features[key] !== null && typeof features[key] !== 'boolean') {
        throw new SilentError(`Unsupported value "${String(features[key])}" for "${key}" found in config/optional-features.json`);
      }
    });

    Object.keys(FEATURES).forEach(key => {
      if (typeof features[key] === 'boolean') {
        validated[key] = features[key];
      }
    });

    return validated;
  },

  isFeatureEnabled(name) {
    let value = this._features[name];
    return  value !== undefined ? value : FEATURES[name].default;
  },

  config() {
    let EmberENV = {};
    let features = this._features;

    Object.keys(FEATURES).forEach(key => {
      let value = features[key];

      if (value !== undefined) {
        let KEY = `_${key.toUpperCase().replace(/-/g, '_')}`;
        EmberENV[KEY] = value;
      }

    });

    return { EmberENV };
  }
};
