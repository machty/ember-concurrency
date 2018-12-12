'use strict';

const browsers = [
  'last 1 Chrome versions',
  'last 1 Firefox versions',
  'last 1 Safari versions'
];

const isCI = !!process.env.CI && process.env.EMBER_TRY_SCENARIO !== "ember-canary-dev-browser";
const isProduction = process.env.EMBER_ENV === 'production';

if (isCI || isProduction) {
  browsers.push('ie 9');
}

module.exports = {
  browsers
};
