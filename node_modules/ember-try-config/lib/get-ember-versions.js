'use strict';

let array = require('lodash/array');
let RSVP = require('rsvp');

let sortVersions = require('./sort-versions');
let fetchEmberVersions = require('./fetch-ember-versions');

module.exports = function getEmberVersions() {
  let fetchVersionsPromise;
  if (arguments[0]) {
    fetchVersionsPromise = RSVP.resolve(arguments[0]);
  } else {
    fetchVersionsPromise = fetchEmberVersions();
  }
  return fetchVersionsPromise.then(versions => sortVersions(array.uniq([].concat(versionsFromBower(), versionsFromNpm(), versions))));
};

function versionsFromBower() {
  return require('./known-bower-ember-versions');
}

function versionsFromNpm() {
  return require('./known-ember-source-versions');
}
