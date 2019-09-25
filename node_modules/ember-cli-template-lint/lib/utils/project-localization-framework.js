'use strict';

const debug = require('debug')('ember-cli-template-lint:localization-framework');

module.exports = function(project) {
  if (!project || !project.addons) {
    return undefined;
  }

  let localizationAddon;

  debug('Addons found in project: %s', project.addons.map(addon => addon.name));

  for (let i = 0; i < project.addons.length; i++) {
    let addon = project.addons[i];

    if (addon.isLocalizationFramework) {
      localizationAddon = addon;
      break;
    }
  }

  debug('Localization addon found: %s', localizationAddon);

  return localizationAddon;
};
