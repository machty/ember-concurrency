'use strict';

// eslint-disable-next-line node/no-deprecated-api
if (!require.extensions['.ts']) {
  let options = { project: `${__dirname}/ts/tsconfig.json` };

  // If we're operating in the context of another project, which might happen
  // if someone has installed ember-cli-typescript from git, only perform
  // transpilation and skip the default ignore glob (which prevents anything
  // in node_modules from being transpiled)
  if (process.cwd() !== __dirname) {
    options.skipIgnore = true;
    options.transpileOnly = true;
  }

  // eslint-disable-next-line node/no-unpublished-require
  require('ts-node').register(options);
}
