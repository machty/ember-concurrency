/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-concurrency',

  included: function(app) {
    this._super.included.apply(this, arguments);

    this._includePolyfill(app);
  },

  /*
   Find the main including host app. We are using
   this to ensure that `includePolyfill` is only
   done once at the top level (we don't want to
   include the polyfill more than once)
   */
  _includePolyfill: function(app) {
    var hostApp = this._findApp(app);
    hostApp.options.babel.includePolyfill = true;
  },

  _findApp: function(hostApp) {
    var app = this.app || hostApp;
    while (app.app) {
      app = app.app;
    }

    return app;
  }
};
