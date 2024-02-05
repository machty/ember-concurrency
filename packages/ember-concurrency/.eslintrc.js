'use strict';

module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
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
    'ember/no-computed-properties-in-native-classes': 0,
  },
  overrides: [
    {
      // Tutorial components (where specific formatting matters)
      files: ['packages/test-app/app/components/tutorial-*/**/*.js'],
      rules: {
        'prettier/prettier': 'off',
      },
    },
    {
      // Docs site
      files: ['packages/test-app/app/**/*.js'],
      rules: {
        // Can't use Glimmer components or tracked due to 3.8 support
        'ember/no-classic-classes': 'off',
        'ember/no-classic-components': 'off',
        'ember/no-component-lifecycle-hooks': 'off',
        'ember/classic-decorator-no-classic-methods': 'off',
        'ember/no-computed-properties-in-native-classes': 'off',

        // allow while(true) in async task fns
        'no-constant-condition': 'off',
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
        './packages/test-app/config/**/*.js',
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
      files: ['addon/index.d.ts', 'tests/types/**/*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        // Need to support classic ember
        'ember/no-classic-classes': 'off',
        'ember/no-classic-components': 'off',
        'ember/no-get': 'off',

        // Used in type testing
        'prefer-const': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
    {
      // test files
      files: ['tests/**/*-test.{js,ts}'],
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
