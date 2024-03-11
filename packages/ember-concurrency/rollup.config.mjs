import babel from "@rollup/plugin-babel";
import copy from "rollup-plugin-copy";
import { Addon } from "@embroider/addon-dev/rollup";
import { execaCommand } from "execa";
import { fixBadDeclarationOutput } from "fix-bad-declaration-output";

const addon = new Addon({
  srcDir: "src",
  destDir: "dist",
});

export default {
  // This provides defaults that work well alongside `publicEntrypoints` below.
  // You can augment this if you need to.
  output: addon.output(),

  plugins: [
    // These are the modules that users should be able to import from your
    // addon. Anything not listed here may get optimized away.
    addon.publicEntrypoints(["**/*.js", "index.js", "template-registry.js"]),

    // These are the modules that should get reexported into the traditional
    // "app" tree. Things in here should also be in publicEntrypoints above, but
    // not everything in publicEntrypoints necessarily needs to go here.
    addon.appReexports(["helpers/**/*.js"]),

    // Follow the V2 Addon rules about dependencies. Your code can import from
    // `dependencies` and `peerDependencies` as well as standard Ember-provided
    // package names.
    addon.dependencies(),

    // This babel config should *not* apply presets or compile away ES modules.
    // It exists only to provide development niceties for you, like automatic
    // template colocation.
    //
    // By default, this will load the actual babel config from the file
    // babel.config.json.
    babel({
      extensions: [".js", ".gjs", ".ts", ".gts"],
      babelHelpers: "bundled",
    }),

    // Ensure that standalone .hbs files are properly integrated as Javascript.
    addon.hbs(),

    // Remove leftover build artifacts when starting a new build.
    addon.clean(),

    // Copy Readme and License into published package
    copy({
      targets: [
        { src: "../../README.md", dest: "." },
        { src: "../../LICENSE.md", dest: "." },
      ],
    }),

    {
      name: "fix-bad-declaration-output",
      closeBundle: async () => {
        /**
         * Generate the types (these include /// <reference types="ember-source/types"
         * but our consumers may not be using those, or have a new enough ember-source that provides them.
         */
        console.log("Building types");
        await execaCommand(`pnpm glint --declaration`, { stdio: "inherit" });

        /**
         * Copy our homegrown index.d.ts over to declarations;
         * NOTE: I _think_ `glint --declaration` should already be doing this, possible bug?
         */
        console.log("Overwriting declarations/index.d.ts with our own");
        await execaCommand(`cp ./src/index.d.ts declarations/index.d.ts`, { stdio: "inherit" });

        /**
         * https://github.com/microsoft/TypeScript/issues/56571#
         * README: https://github.com/NullVoxPopuli/fix-bad-declaration-output
         */
        console.log("Fixing types");
        await fixBadDeclarationOutput("declarations/**/*.d.ts", [
          "TypeScript#56571",
          "Glint#628",
        ]);
        console.log(
          "⚠️ Dangerously (but neededly) fixed bad declaration output from typescript",
        );
      },
    },
  ],
};
