"use strict";

const EmberApp = require("ember-cli/lib/broccoli/ember-app");
const { maybeEmbroider } = require("@embroider/test-setup");
const urls = require("./lib/prember-urls");

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    minifyJS: {
      enabled: false,
    },

    snippetPaths: ["snippets"],
    snippetSearchPaths: ["tests/dummy/app"],

    "ember-prism": {
      components: ["javascript", "typescript", "bash", "markup"],
    },

    emberCliFontAwesome: {
      useScss: true,
    },

    autoImport: {
      forbidEval: true,
      webpack: {
        // Webpack won't auto-detect, because of "maintained node versions" in config/targets.js
        target: "web",
      },
    },

    prember: {
      urls,
      // GitHub Pages uses this filename to serve 404s
      emptyFile: "404.html",
    },
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return maybeEmbroider(app, {
    packageRules: [
      {
        package: "dummy",
        components: {
          "{{e-c-test}}": {
            safeToIgnore: true,
          },
          "{{inner-component}}": {
            safeToIgnore: true,
          },
          "{{my-component}}": {
            safeToIgnore: true,
          },
          "{{test-swallow-error}}": {
            safeToIgnore: true,
          },
          "{{test-async-arrow-task}}": {
            safeToIgnore: true,
          },
        },
      },
    ],
    skipBabel: [
      {
        package: "qunit",
      },
    ],
  });
};
