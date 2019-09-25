'use strict';

let semver = require('semver');

module.exports = function sortVersions(versions) {
  return versions.sort((a, b) => {
    let aValid = semver.valid(a);
    let bValid = semver.valid(b);

    if (aValid && bValid) {
      return -semver.compare(a, b);
    } else if (aValid) {
      return -1;
    } else if (bValid) {
      return 1;
    } else {
      return a.localeCompare(b);
    }
  });
};
