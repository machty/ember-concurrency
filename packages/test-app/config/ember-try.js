'use strict';

// eslint-disable-next-line n/no-missing-require
const getChannelURL = require('ember-source-channel-url');
const { embroiderSafe, embroiderOptimized } = require('@embroider/test-setup');

module.exports = async function () {
  return {
    usePnpm: true,
    scenarios: [
      {
        name: 'ember-lts-4.8',
        npm: {
          devDependencies: {
            'ember-source': '~4.8.0',
            '@glimmer/component': '^1.1.2',
          },
        },
      },
      {
        name: 'ember-lts-4.12',
        npm: {
          devDependencies: {
            'ember-source': '~4.12.0',
          },
        },
      },
      {
        name: 'ember-5.0',
        npm: {
          devDependencies: {
            'ember-source': '~5.0.0',
          },
        },
      },
      {
        name: 'ember-lts-6.4',
        npm: {
          devDependencies: {
            'ember-source': '~6.4.0',
          },
        },
      },
      {
        name: 'ember-release',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('release'),
          },
        },
      },
      {
        name: 'ember-release-with-coverage',
        env: {
          COVERAGE: true,
        },
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('release'),
          },
        },
      },
      {
        name: 'ember-beta',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('beta'),
          },
        },
      },
      {
        name: 'ember-canary',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('canary'),
          },
        },
      },
      {
        name: 'ember-default',
        npm: {
          devDependencies: {},
        },
      },
      {
        name: 'tsc',
        command: 'pnpm tsc --project tsconfig.types-tests.json',
      },
      embroiderSafe({
        npm: {
          devDependencies: {
            '@embroider/core': '^3.5.7',
            '@embroider/compat': '^3.8.5',
            '@embroider/webpack': '^4.1.1',
          },
        },
      }),
      embroiderOptimized({
        npm: {
          devDependencies: {
            '@embroider/core': '^3.5.7',
            '@embroider/compat': '^3.8.5',
            '@embroider/webpack': '^4.1.1',
          },
        },
      }),
    ],
  };
};
