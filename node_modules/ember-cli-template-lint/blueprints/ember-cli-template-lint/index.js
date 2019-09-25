'use strict';
/*eslint-env node */

const path = require('path');
const projectLocalizationFramework = require('../../lib/utils/project-localization-framework');

module.exports = {
  description: 'Generate default configuration for ember-cli-template-lint.',

  normalizeEntityName() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  supportsAddon() {
    return true;
  },

  filesPath() {
    let type;

    if (projectLocalizationFramework(this.project) || process.env.FORCE_LOCALIZED_FOR_TESTING) {
      type = 'recommended-with-bare-strings';
    } else {
      type = 'recommended';
    }

    return path.join(this.path, type + '-files');
  }
};
