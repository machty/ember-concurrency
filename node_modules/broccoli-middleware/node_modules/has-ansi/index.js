'use strict';
const ansiRegex = require('ansi-regex');

// Remove the `g` flag
const re = new RegExp(ansiRegex().source);

module.exports = input => re.test(input);
