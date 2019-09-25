'use strict';

const BowerAdapter = require('../dependency-manager-adapters/bower');
const NpmAdapter = require('../dependency-manager-adapters/npm');
const WorkspaceAdapter = require('../dependency-manager-adapters/workspace');

module.exports = {
  generateFromConfig(config, root) {
    let hasNpm = false;
    let hasBower = false;
    let adapters = [];
    if (!config || !config.scenarios) {
      return [];
    }

    config.scenarios.forEach((scenario) => {
      if (scenario.npm) {
        hasNpm = true;
      }
      if (scenario.bower || scenario.dependencies || scenario.devDependencies) {
        hasBower = true;
      }
    });

    if (config.useWorkspaces) {
      if (hasBower) {
        throw new Error('bower is not supported when using workspaces');
      }

      adapters.push(
        new WorkspaceAdapter({
          cwd: root,
          managerOptions: config.npmOptions,
          useYarnCommand: config.useYarn
        })
      );
    } else if (hasNpm || hasBower) {
      adapters.push(new NpmAdapter({ cwd: root, managerOptions: config.npmOptions, useYarnCommand: config.useYarn }));
      adapters.push(new BowerAdapter({ cwd: root, managerOptions: config.bowerOptions }));
    }

    return adapters;
  },
};
