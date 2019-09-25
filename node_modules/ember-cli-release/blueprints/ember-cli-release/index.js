'use strict';

module.exports = {
  // This suppresses a silent error about needing an entity type
  normalizeEntityName: function() {
  },

  // This allows the main blueprint to install to the addon's root dir
  supportsAddon: function() {
    return true;
  }
};
