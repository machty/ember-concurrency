'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { maybeEmbroider } = require('@embroider/test-setup');
const urls = require('./lib/prember-urls');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    minifyJS: {
      enabled: false,
    },

    snippetPaths: ['snippets'],
    snippetSearchPaths: ['app'],

    'ember-prism': {
      components: ['javascript', 'typescript', 'bash', 'markup'],
    },

    'ember-cli-babel': {
      enableTypeScriptTransform: true,
    },

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

    babel: {
      plugins: [
        require.resolve('ember-concurrency/async-arrow-task-transform'),
        ...require('ember-cli-code-coverage').buildBabelPlugin(),
      ],
    },
  });

  /*
    This build file specifies the options for the test app of this addon.
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return maybeEmbroider(app, {
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
  });
};
