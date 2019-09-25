'use strict';
let semver = require('semver');
let RSVP = require('rsvp');
let getEmberVersions = require('./get-ember-versions');
let findSatisfyingVersions = require('./find-satisfying-versions');
let getChannelURL = require('ember-source-channel-url');
const firstEmberSourceVersion = '2.11.0';

module.exports = function generateConfig(options) {
  return RSVP.hash({
    fromSemver: generateScenariosFromSemver(options.versionCompatibility, options.availableVersions),
    base: generateBaseScenarios(options.getChannelURL),
  }).then(scenarios => {
    return {
      scenarios: [].concat(scenarios.base, scenarios.fromSemver),
    };
  });
};

function generateScenariosFromSemver(semverStatements, availableVersions) {
  let statement = semverStatements.ember;
  let versionPromise;

  if (availableVersions) {
    versionPromise = RSVP.resolve(availableVersions);
  } else {
    versionPromise = getEmberVersions();
  }

  return versionPromise.then(possibleVersions => {
    let versions = findSatisfyingVersions(possibleVersions, statement);

    return versions.map(version => {
      let versionNum = semver.clean(version);
      if (semver.gte(versionNum, firstEmberSourceVersion)) {
        return {
          name: `ember-${versionNum}`,
          npm: {
            devDependencies: {
              'ember-source': versionNum,
            },
          },
        };
      } else {
        return {
          name: `ember-${versionNum}`,
          bower: {
            dependencies: {
              ember: versionNum,
            },
          },
          npm: {
            devDependencies: {
              'ember-source': null,
            },
          },
        };
      }
    });
  });
}

function generateBaseScenarios() {
  let _getChannelURL = arguments[0] || getChannelURL;

  return RSVP.hash({
    release: _getChannelURL('release'),
    beta: _getChannelURL('beta'),
    canary: _getChannelURL('canary'),
  }).then(releaseUrls => {
    return baseScenarios(releaseUrls);
  });
}
function baseScenarios(urls) {
  return [
    {
      name: 'default',
      npm: {
        devDependencies: {},
      },
    },
    {
      name: 'ember-beta',
      allowedToFail: true,
      npm: {
        devDependencies: {
          'ember-source': urls.beta,
        },
      },
    },
    {
      name: 'ember-canary',
      allowedToFail: true,
      npm: {
        devDependencies: {
          'ember-source': urls.canary,
        },
      },
    },
    {
      name: 'ember-release',
      npm: {
        devDependencies: {
          'ember-source': urls.release,
        },
      },
    },
  ];
}
