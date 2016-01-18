/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-concurrency',
  included: function(app) {
    this._super.included(app);

    app.import('vendor/js-csp.browser.js');
  }
};
