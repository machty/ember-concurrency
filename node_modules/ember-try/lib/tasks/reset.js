'use strict';

const CoreObject = require('core-object');
const debug = require('debug')('ember-try:commands:reset');
const ScenarioManager = require('../utils/scenario-manager');
const DependencyManagerAdapterFactory = require('./../utils/dependency-manager-adapter-factory');

module.exports = CoreObject.extend({
  run() {
    let dependencyAdapters = this.dependencyManagerAdapters || DependencyManagerAdapterFactory.generateFromConfig(this.config, this.project.root);
    debug('DependencyManagerAdapters: %s', dependencyAdapters.map((item) => { return item.configKey; }));
    return new ScenarioManager({ dependencyManagerAdapters: dependencyAdapters }).cleanup();
  },
});
