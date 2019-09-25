/* global QUnit, mocha, jasmine */

import QUnitAdapter from './adapters/QUnitAdapter.js'
import MochaAdapter from './adapters/MochaAdapter.js'
import JasmineAdapter from './adapters/JasmineAdapter.js'
import {TestStart, TestEnd, SuiteStart, SuiteEnd} from './Data.js'

/**
 * Auto registers the adapter for the respective testing framework and
 * returns the runner for event listening.
 */
export function autoRegister () {
  var runner

  if (QUnit) {
    runner = new QUnitAdapter(QUnit)
  } else if (mocha) {
    runner = new MochaAdapter(mocha)
  } else if (jasmine) {
    runner = new JasmineAdapter(jasmine)
  } else {
    throw new Error('Failed to register js-reporters adapater. Supported ' +
      'frameworks are: QUnit, Mocha, Jasmine')
  }

  return runner
}

export function createSuiteStart (suite) {
  return new SuiteStart(
    suite.name,
    suite.fullName.slice(),
    suite.tests.map(createTestStart),
    suite.childSuites.map(createSuiteStart)
  )
}

export function createSuiteEnd (suite) {
  return new SuiteEnd(
    suite.name,
    suite.fullName.slice(),
    suite.tests.map(createTestEnd),
    suite.childSuites.map(createSuiteEnd)
  )
}

export function createTestStart (test) {
  return new TestStart(test.name, test.suiteName, test.fullName.slice())
}

export function createTestEnd (test) {
  return new TestEnd(test.name, test.suiteName, test.fullName.slice(),
    test.status, test.runtime, test.errors.slice(), test.assertions.slice())
}
