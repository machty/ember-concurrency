'use strict';

module.exports = {
  displayName: 'lint',
  runner: 'jest-runner-eslint',
  testMatch: [
    '<rootDir>/bin/**/*.js',
    '<rootDir>/lib/**/*.js',
    '<rootDir>/test/**/*-test.js',
  ],
};
