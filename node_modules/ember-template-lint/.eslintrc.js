module.exports = {
  parserOptions: {
    ecmaVersion: 2019,
  },
  env: {
    node: true
  },
  plugins: ['node', 'prettier'],
  extends: ['eslint:recommended', 'plugin:node/recommended', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
  },

  overrides: [
    {
      files: ['test/**/*.js'],
      env: {
        mocha: true,
      }
    }
  ],
};
