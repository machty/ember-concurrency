'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const urls = require('./lib/prember-urls');

module.exports = function(defaults) {
  var app = new EmberAddon(defaults, {
    minifyJS: {
      enabled: false
    },

    snippetPaths: ['tests/dummy/snippets'],
    snippetSearchPaths: ['app', 'tests/dummy/app', 'addon'],

    emberCliFontAwesome: {
      useScss: true
    },

    'ember-cli-babel': {
      includePolyfill:
        process.env.EMBER_ENV === 'production' || Boolean(process.env.CI)
    },

    prember: {
      urls,
      // GitHub Pages uses this filename to serve 404s
      emptyFile: '404.html'
    }
  });

  /*
    This build file specifes the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  app.import('vendor/dummy-deps/rx.js');

  return app.toTree();
};
