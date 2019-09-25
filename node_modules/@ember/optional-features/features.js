'use strict';

const glob = require('glob');
const path = require('path');

const FEATURES_PATH = path.resolve(__dirname, './features');
const FEATURES = {};

glob.sync('*.js', { cwd: FEATURES_PATH }).sort().forEach(filename => {
  let key = filename.slice(0, -3);
  let value = Object.assign({}, require(`./features/${key}`));

  FEATURES[key] = Object.freeze(value);
});

module.exports = Object.freeze(FEATURES);
