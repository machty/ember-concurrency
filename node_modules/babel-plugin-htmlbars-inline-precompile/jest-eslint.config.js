module.exports = {
  runner: 'jest-runner-eslint',
  displayName: 'lint',
  testMatch: [
    '<rootDir>/index.js',
    '<rootDir>/tests/**/*.js',
  ],
};
