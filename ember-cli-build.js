'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const { maybeEmbroider } = require('@embroider/test-setup');
const urls = require('./lib/prember-urls');

module.exports = function (defaults) {
  let app = new EmberAddon(defaults, {
    minifyJS: {
      enabled: false,
    },

    snippetPaths: ['tests/dummy/snippets'],
    snippetSearchPaths: ['app', 'tests/dummy/app', 'addon'],

    emberCliFontAwesome: {
      useScss: true,
    },

    autoImport: {
      forbidEval: true,
      webpack: {
        // Webpack won't auto-detect, because of "maintained node versions" in config/targets.js
        target: 'web',
      },
    },

    prember: {
      urls,
      // GitHub Pages uses this filename to serve 404s
      emptyFile: '404.html',
    },
  });

  /*
    This build file specifes the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return maybeEmbroider(app, {
    packageRules: [
      {
        package: 'dummy',
        components: {
          '{{e-c-test}}': {
            safeToIgnore: true,
          },
          '{{inner-component}}': {
            safeToIgnore: true,
          },
          '{{my-component}}': {
            safeToIgnore: true,
          },
          '{{test-swallow-error}}': {
            safeToIgnore: true,
          },
          '{{test-async-arrow-task}}': {
            safeToIgnore: true,
          },
        },
      },
    ],
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
  });
};
