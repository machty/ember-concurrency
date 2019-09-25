'use strict';

const path = require('path');
const fs = require('fs');
const extend = require('extend');
const RSVP = require('rsvp');
const findByName = require('./find-by-name');
const debug = require('debug')('ember-try:utils:config');

const IMPLICIT_BOWER_VERSION = '^1.8.2';

function getBaseConfig(options) {
  let relativePath = options.configPath || path.join('config', 'ember-try.js');
  let configFile = path.join(options.project.root, relativePath);
  let configData;

  if (fs.existsSync(configFile)) {
    configData = require(configFile);

    if (typeof configData === 'function') {
      configData = configData(options.project);
    }
  } else {
    debug('Config file does not exist %s', configFile);
  }

  return RSVP.resolve(configData).then((data) => {
    if (data && data.scenarios && !data.useVersionCompatibility && !options.versionCompatibility) {
      return RSVP.resolve(data);
    }

    let versionCompatibility = options.versionCompatibility || versionCompatibilityFromPackageJSON(options.project.root);

    if (versionCompatibility) {
      // Required lazily to improve startup speed.
      let autoScenarioConfigForEmber = require('ember-try-config');
      return autoScenarioConfigForEmber({ versionCompatibility, project: options.project }).then((autoConfig) => {
        return mergeAutoConfigAndConfigFileData(autoConfig, data);
      });
    } else {
      return RSVP.reject(new Error('No ember-try configuration found. Please see the README for configuration options'));
    }
  });
}

function config(options) {
  return getBaseConfig(options).then((configData) => {
    return addImplicitBowerToScenarios(configData);
  });
}

module.exports = config;

function addImplicitBowerToScenarios(configData) {
  configData.scenarios.forEach((scenario) => {
    if (!('bower' in scenario)) {
      // Don't do anything for scenarios that don't include bower
      return;
    }

    if ('npm' in scenario) {
      let npm = scenario.npm;
      if ((npm.dependencies && npm.dependencies.bower) ||
          (npm.devDependencies && npm.devDependencies.bower)) {
        // Dont' do anything for scenarios that already include bower in npm,
        // either as a dependency or a dev dependency
        return;
      }
    }

    // add an implicit bower dev dependency to npm for this scenario
    scenario.npm = scenario.npm || {};
    scenario.npm.devDependencies = scenario.npm.devDependencies || {};
    scenario.npm.devDependencies.bower = IMPLICIT_BOWER_VERSION;
  });
  return configData;
}

function mergeAutoConfigAndConfigFileData(autoConfig, configData) {
  configData = configData || {};
  configData.scenarios = configData.scenarios || [];

  let conf = extend({}, autoConfig, configData);

  let overriddenScenarios = autoConfig.scenarios.map((scenario) => {
    let overriddenScenario = findByName(configData.scenarios, scenario.name);
    return extend({}, scenario, overriddenScenario);
  });

  let additionalScenarios = configData.scenarios.filter((scenario) => {
    return !findByName(autoConfig.scenarios, scenario.name);
  });

  conf.scenarios = [].concat(overriddenScenarios, additionalScenarios);
  return conf;
}

function versionCompatibilityFromPackageJSON(root) {
  let packageJSONFile = path.join(root, 'package.json');
  if (fs.existsSync(packageJSONFile)) {
    let packageJSON = JSON.parse(fs.readFileSync(packageJSONFile));
    return packageJSON['ember-addon'] ? packageJSON['ember-addon'].versionCompatibility : null;
  }
}

// Used for internal testing purposes.
module.exports._addImplicitBowerToScenarios = addImplicitBowerToScenarios;
