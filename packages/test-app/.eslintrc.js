'use strict';

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    requireConfigFile: false,
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  plugins: ['ember'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',

    // This invokes "eslint-config-prettier" to disable ESLint rules that conflict with Prettier.
    // Not to be confused with "eslint-plugin-prettier" which runs Prettier as an ESLint rule
    // (which we no longer use)
    'prettier',
  ],
  env: {
    browser: true,
  },
  rules: {
    'require-yield': 0,
    'ember/no-classic-components': 0,
    'ember/no-classic-classes': 0,
    'ember/no-computed-properties-in-native-classes': 0,
  },
  overrides: [
    // node files
    {
      files: [
        './.eslintrc.js',
        './.prettierrc.js',
        './.template-lintrc.js',
        './ember-cli-build.js',
        './testem.js',
        './blueprints/*/index.js',
        './config/**/*.js',
        './lib/*/index.js',
        './server/**/*.js',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
      },
      extends: ['plugin:n/recommended'],
    },
    {
      // test files
      files: ['tests/**/*-test.{js,ts}'],
      extends: ['plugin:qunit/recommended'],
    },
  ],
};
