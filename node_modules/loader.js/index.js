'use strict';
var shouldUseInstrumentedBuild = require('./utils').shouldUseInstrumentedBuild;

module.exports = {
  name: 'loader.js',

  init: function() {
    this._super.init && this._super.init.apply(this, arguments);

    this.treePaths['vendor'] = 'dist';
  },

  included: function() {
    if (false /* hotfix */&& shouldUseInstrumentedBuild()) {
      this.app.import('vendor/loader/loader.instrument.js', {
        prepend: true
      })
    } else {
      this.app.import('vendor/loader/loader.js', {
        prepend: true
      });
    }
  }
};
