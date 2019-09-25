'use strict';

const CoreObject = require('core-object');
const RSVP = require('rsvp');
const mapSeries = require('promise-map-series');

module.exports = CoreObject.extend({
  init() {
    this._super.apply(this, arguments);
    this._checkDependencyManagerAdapters();
  },

  _checkDependencyManagerAdapters() {
    if (!this.dependencyManagerAdapters || this.dependencyManagerAdapters.length === 0) {
      throw new Error('No dependency manager adapter');
    }
  },

  setup() {
    let ui = this.ui;

    return mapSeries(this.dependencyManagerAdapters, (depManager) => {
      return depManager.setup({ ui });
    });
  },

  changeTo(scenario) {
    return mapSeries(this.dependencyManagerAdapters, (depManager) => {
      return depManager.changeToDependencySet(scenario);
    }).then((results) => {
      return RSVP.resolve([].concat.apply([], results));
    });
  },

  cleanup() {
    return mapSeries(this.dependencyManagerAdapters, (depManager) => {
      return depManager.cleanup();
    });
  },
});

