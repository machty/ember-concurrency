'use strict';

let semver = require('semver');

module.exports = function findSatisfyingVersions(possibleVersions, statement) {
  let versions = possibleVersions.filter(versionNumber => {
    let result = false;
    try {
      result = semver.satisfies(versionNumber, statement);
    } catch (e) {
      // Swallow any invalid versions
    }

    return result;
  });

  return findHighestPointVersionForEachMinorVersion(versions);
};

function findHighestPointVersionForEachMinorVersion(versions) {
  let highestPointVersions = { };
  versions.forEach(versionString => {
    let majorMinor = majorMinorVersion(versionString);
    let patch = patchVersion(versionString);

    if (!highestPointVersions[majorMinor] || highestPointVersions[majorMinor] < patch) {
      highestPointVersions[majorMinor] = patch;
    }
  });

  return versions.filter(versionString => {
    let majorMinor = majorMinorVersion(versionString);
    let patch = patchVersion(versionString);
    return patch === highestPointVersions[majorMinor];
  });
}

function majorMinorVersion(versionString) {
  return `${semver.major(versionString)}.${semver.minor(versionString)}`;
}

function patchVersion(versionString) {
  return semver.patch(versionString);
}
