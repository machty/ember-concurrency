'use strict';

const debug = require('debug')('ember-try:commands:config');

module.exports = {
  name: 'try:config',
  description: 'Displays the config that will be used',
  works: 'insideProject',
  availableOptions: [
    { name: 'config-path', type: String, default: 'config/ember-try.js' },
  ],

  run(commandOptions) {
    let command = this;
    debug('Options:\n', commandOptions);
    let getConfig = require('../utils/config')({ project: this.project, configPath: commandOptions.configPath });
    return getConfig.then((config) => {
      command.ui.writeLine(JSON.stringify(config, null, 2));
    });
  },
};
