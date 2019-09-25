'use strict';

module.exports = {
  name: 'try:reset',
  description: 'Resets dependencies to their committed state. For when things get messy.',
  works: 'insideProject',

  run() {
    let command = this;
    let getConfig = require('../utils/config')({ project: this.project });
    let ResetTask = require('../tasks/reset');
    return getConfig.then((config) => {
      let resetTask = new ResetTask({
        ui: command.ui,
        project: command.project,
        config,
      });

      return resetTask.run();
    });
  },
};
