'use strict';
var assign = require('object-assign');

module.exports = {
  name: 'ember-notify',
  included: function(app) {
    this._super.included.apply(this, arguments);
    var options = assign({
      importCss: true
    }, app.options.emberNotify);
    if (options.importCss) {
      app.import('vendor/ember-notify.css');
    }
  }
};
