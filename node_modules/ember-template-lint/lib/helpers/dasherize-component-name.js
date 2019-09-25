'use strict';

/*
  This diverges from `Ember.String.dasherize` so that`<XFoo />` can resolve to `x-foo`.
  `Ember.String.dasherize` would resolve it to `xfoo`..
*/
const SIMPLE_DASHERIZE_REGEXP = /[A-Z]/g;
const ALPHA = /[A-Za-z]/;

module.exports = function(key) {
  return key.replace(SIMPLE_DASHERIZE_REGEXP, (char, index) => {
    if (index === 0 || !ALPHA.test(key[index - 1])) {
      return char.toLowerCase();
    }

    return `-${char.toLowerCase()}`;
  });
};
