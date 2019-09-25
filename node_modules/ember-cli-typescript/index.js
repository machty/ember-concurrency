'use strict';

const fs = require('fs');

// If transpiled output is present, always default to loading that first.
// Otherwise, register ts-node if necessary and load from source.
if (fs.existsSync(`${__dirname}/js/addon.js`)) {
  // eslint-disable-next-line node/no-missing-require
  module.exports = require('./js/addon').default;
} else {
  require('./register-ts-node');

  // eslint-disable-next-line node/no-unpublished-require
  module.exports = require('./ts/addon').default;
}
