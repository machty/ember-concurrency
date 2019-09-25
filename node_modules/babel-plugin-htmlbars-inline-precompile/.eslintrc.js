module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2016,
  },
  plugins: ['node'],
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
  ],
  env: {
    node: true,
  },
  rules: {
    'ember/new-module-imports': 'off',
  },
  overrides: [
    // test files
    {
      files: [
        'tests/**/*.js',
      ],
      env: {
        jest: true,
      },
      rules: {
        'node/no-unpublished-require': 'off',
      },
    },
  ],
};
