'use strict';

module.exports = {
  name: 'ember-cli-app-version',
  config(env, baseConfig) {
    let config = this._super.config.apply(this, arguments);

    if (!baseConfig.APP) {
      return config;
    }

    baseConfig.APP.name = this.project.pkg.name;

    if (baseConfig[this.name] && baseConfig[this.name].version) {
      baseConfig.APP.version = baseConfig[this.name].version;
      return config;
    }

    let version = require('git-repo-version')(null, this.project.root);
    if (version && baseConfig.APP) {
      baseConfig.APP.version = version;
    }

    return config;
  }
};
