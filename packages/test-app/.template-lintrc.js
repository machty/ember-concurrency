'use strict';

module.exports = {
  plugins: [
    'ember-template-lint-plugin-prettier',
  ],

  extends: ["recommended", "ember-template-lint-plugin-prettier:recommended"],
  rules: {
    'no-whitespace-for-layout': false,
    'require-input-label': false,
  },
};
