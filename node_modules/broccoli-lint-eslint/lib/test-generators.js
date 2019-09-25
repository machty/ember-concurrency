'use strict';

const testGenerators = require('aot-test-generators');

let _generators = {};

Object.keys(testGenerators).forEach(name => {
  let testGenerator = testGenerators[name];

  _generators[name] = function(relativePath, errors, results) {
    let passed = hasPassed(results);
    let message = createAssertionMessage(relativePath, results);

    return (
      testGenerator.suiteHeader(`ESLint | ${relativePath}`) +
      testGenerator.test('should pass ESLint', passed, message) +
      testGenerator.suiteFooter()
    );
  };

  _generators[name].testOnly = function(relativePath, errors, results) {
    let passed = hasPassed(results);
    let message = createAssertionMessage(relativePath, results);

    return testGenerator.test(relativePath, passed, message);
  };

  _generators[name].header = function(group) {
    return testGenerator.suiteHeader(`ESLint | ${group}`);
  };

  _generators[name].footer = function() {
    return testGenerator.suiteFooter();
  };
});

function render(errors) {
  return errors.map(error => `${error.line}:${error.column} - ${error.message} (${error.ruleId})`).join('\n');
}

function hasPassed(results) {
  return !results.errorCount || results.errorCount.length === 0;
}

function createAssertionMessage(relativePath, results) {
  let message = `${relativePath} should pass ESLint`;

  if (results.messages) {
    message += `\n\n${render(results.messages)}`;
  }

  return message;
}

module.exports = _generators;
