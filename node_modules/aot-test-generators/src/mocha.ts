import TestGenerator from './test-generator';
import escape from './utils/escape';

export default class MochaTestGenerator implements TestGenerator {
  suiteHeader(suiteName: string) {
    return `describe(${escape(suiteName)}, function() {\n`;
  }

  suiteFooter() {
    return '});\n';
  }

  test(testName: string, passed: boolean, assertionMessage?: string) {
    return (
      `  it(${escape(testName)}, function() {\n` +
      this.assertion(passed, assertionMessage || testName) +
      `  });\n`
    );
  }

  assertion(passed: boolean, assertionMessage: string) {
    if (passed) {
      return `    // test passed\n`;
    }

    return (
      `    // test failed\n`+
      `    var error = new chai.AssertionError(${escape(assertionMessage)});\n` +
      `    error.stack = undefined;\n` +
      `    throw error;\n`
    );
  }
}
