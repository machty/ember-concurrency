'use strict';

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  plugins: ['ember'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
    es6: true,
  },
  rules: {
    'require-yield': 0,
  },
  overrides: [
    {
      // Tutorial components (where specific formatting matters)
      files: ['tests/dummy/app/components/tutorial-*/**/*.js'],
      rules: {
        'prettier/prettier': 'off',
      },
    },
    {
      // Docs site
      files: ['tests/dummy/app/**/*.js'],
      rules: {
        // Can't use Glimmer components or tracked due to 3.8 support
        'ember/no-classic-classes': 'off',
        'ember/no-classic-components': 'off',
        'ember/no-component-lifecycle-hooks': 'off',
        'ember/classic-decorator-no-classic-methods': 'off',
        'ember/no-computed-properties-in-native-classes': 'off',
      },
    },
    // node files
    {
      files: [
        './.eslintrc.js',
        './.prettierrc.js',
        './.template-lintrc.js',
        './ember-cli-build.js',
        './index.js',
        './testem.js',
        './blueprints/*/index.js',
        './config/**/*.js',
        './tests/dummy/config/**/*.js',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
      },
      plugins: ['node'],
      extends: ['plugin:node/recommended'],
    },
    {
      // Test files:
      files: ['tests/**/*-test.{js,ts}'],
      excludedFiles: ['tests/types/**/*-test.ts'],
      extends: ['plugin:qunit/recommended'],
      env: {
        embertest: true,
      },
      rules: {
        // Still need these for testing compatibility with pre-Octane versions
        'ember/no-classic-classes': 'off',
        'ember/no-classic-components': 'off',
        'ember/no-computed-properties-in-native-classes': 'off',
      },
    },
  ],
};
