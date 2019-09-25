'use strict';

class VersionChecker {
  static satisfies(versionSpecified, versionInstalled) {
    if (!versionInstalled) {
      return false;
    }

    let version = versionSpecified;
    const isGitRepo = require('is-git-url');
    const semver = require('semver');
    const isTarGz = require('./utils/is-tar-gz');
    const unknownVersion = require('./utils/unknown-version');

    if (version === '*') {
      return true;
    } else if (isGitRepo(version)) {
       const parts = version.split('#');
       if (parts.length === 2) {
         version = semver.valid(parts[1]);
         if (!version) {
           return true;
         }
       }
    } else if (isTarGz(version) && versionInstalled !== unknownVersion) {
       const resolve = require('path').resolve;
       return resolve(version) === resolve(versionInstalled);
    }

    if (!semver.validRange(version)) {
      return true;
    }

    return semver.satisfies(versionInstalled, version);
  }
}

module.exports = VersionChecker;
