'use strict';

let packageJSON = require('package-json');
let RSVP = require('rsvp');

module.exports = function fetchEmberVersions(options) {
  options = options || {};
  let _packageJSON = options.packageJSON || packageJSON;

  return RSVP.resolve(_packageJSON('ember-source', { allVersions: true })).then(data => {
    return Object.keys(data.versions);
  }).catch(err => {
    if (options.logErrors) {
      console.log(err.stack);
      throw err;
    }
    return [];
  });
};
