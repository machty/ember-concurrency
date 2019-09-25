/* eslint-disable node/no-unpublished-require */

'use strict';

const fs = require('fs-extra');
const { PRECOMPILE_MANIFEST } = require('ember-cli-typescript/js/lib/commands/precompile');

const PREFIX = 'test-support/@ember/test-helpers/';

let manifest = fs.readJsonSync(PRECOMPILE_MANIFEST);
let newManifest = [];

for (let file of manifest) {
  if (file.endsWith('.d.ts') && file.startsWith(PREFIX)) {
    // test-support/@ember/test-helpers/dom/fill-in.d.ts
    // -> dom/fill-in.d.ts

    let newPath = file.slice(PREFIX.length);

    fs.moveSync(file, newPath, { overwrite: true });

    newManifest.push(newPath);
  } else {
    newManifest.push(file);
  }
}

fs.writeJsonSync(PRECOMPILE_MANIFEST, newManifest);
