#!/usr/bin/env node

'use strict';

let fs = require('fs');
let array = require('lodash/array');
let fetchVersions = require('../lib/fetch-ember-versions');

console.log('Updating list of versions');
fetchVersions({ logErrors: true })
  .then(versions => {

    let uniqVersions = array.uniq(versions);
    console.log('versions found: ', uniqVersions.length);

    fs.writeFileSync('lib/known-ember-source-versions.json', JSON.stringify(uniqVersions, null, 2), { encoding: 'utf-8' });
  });
