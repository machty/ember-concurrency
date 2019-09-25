/* jshint node: true */
'use strict';

var path = require('path');

module.exports = {
  name: 'ember-disable-prototype-extensions',

  included: function() {
    this.app.import(path.join('vendor', 'disable-prototype-extensions.js'), { type: 'vendor', prepend: true });
  }
};
