import EventEmitter from 'events'
import {Assertion, TestEnd, SuiteStart} from '../Data.js'
import * as helpers from '../helpers.js'

/**
 * Limitations:
 *  - Errors in afterAll are ignored.
 */
export default class JasmineAdapter extends EventEmitter {
  constructor (jasmine) {
    super()

    this.jasmine = jasmine
    // NodeJS/browser
    this.env = jasmine.env || jasmine.getEnv()
    this.suites = {}
    this.tests = {}

    var reporter = {
      jasmineStarted: this.onJasmineStarted.bind(this),
      specDone: this.onSpecDone.bind(this),
      specStarted: this.onSpecStarted.bind(this),
      suiteStarted: this.onSuiteStarted.bind(this),
      suiteDone: this.onSuiteDone.bind(this),
      jasmineDone: this.onJasmineDone.bind(this)
    }

    // For NodeJS env use the "addReporter" function from the node package.
    if (this.jasmine.addReporter) {
      this.jasmine.addReporter(reporter)
    } else {
      // For browser env use the "addReporter" function from the jasmine-core.
      this.env.addReporter(reporter)
    }
  }

  createAssertion (expectation) {
    let stack = expectation.stack !== '' ? expectation.stack : undefined

    return new Assertion(expectation.passed, expectation.actual,
      expectation.expected, expectation.message, stack)
  }

  saveTestDetails (jasmineSpec) {
    var test = this.tests[jasmineSpec.id]

    test.errors = []
    test.assertions = []

    jasmineSpec.failedExpectations.forEach((expectation) => {
      test.errors.push(this.createAssertion(expectation))
      test.assertions.push(this.createAssertion(expectation))
    })

    jasmineSpec.passedExpectations.forEach((expectation) => {
      test.assertions.push(this.createAssertion(expectation))
    })

    if (jasmineSpec.status === 'pending') {
      test.status = 'skipped'
    } else {
      test.status = jasmineSpec.status
      test.runtime = new Date() - this.startTime
    }
  }

  isJasmineGlobalSuite (suite) {
    return suite.description === 'Jasmine__TopLevel__Suite'
  }

  /**
   * Jasmine provides details about childSuites and tests only in the structure
   * returned by "this.env.topSuite()".
   *
   * This function creates the global suite for the runStart event, as also
   * saves the created suites and tests compliant with the CRI standard in an
   * object using as key their unique ids provided by Jasmine.
   */
  createGlobalSuite (jasmineSuite, fullName) {
    var childSuites = []
    var tests = []
    var isGlobalSuite = this.isJasmineGlobalSuite(jasmineSuite)

    if (!isGlobalSuite) {
      fullName.push(jasmineSuite.description)
    }

    jasmineSuite.children.forEach((child) => {
      if (child.id.indexOf('suite') === 0) {
        childSuites.push(this.createGlobalSuite(child, fullName))
      } else {
        let test
        let suiteName = !isGlobalSuite ? jasmineSuite.description : undefined

        fullName.push(child.description)

        test = new TestEnd(child.description, suiteName, fullName.slice())

        fullName.pop()

        tests.push(test)
        this.tests[child.id] = test
      }
    })

    let name = !isGlobalSuite ? jasmineSuite.description : undefined
    let suite = new SuiteStart(name, fullName.slice(), tests, childSuites)

    this.suites[jasmineSuite.id] = suite

    fullName.pop()

    return suite
  }

  onJasmineStarted () {
    this.globalSuite = this.createGlobalSuite(this.env.topSuite(), [])
    this.emit('runStart', helpers.createSuiteStart(this.globalSuite))
  }

  onSpecStarted (details) {
    this.startTime = new Date()
    this.emit('testStart', helpers.createTestStart(this.tests[details.id]))
  }

  onSpecDone (details) {
    this.saveTestDetails(details)
    this.emit('testEnd', helpers.createTestEnd(this.tests[details.id]))
  }

  onSuiteStarted (details) {
    this.emit('suiteStart', helpers.createSuiteStart(this.suites[details.id]))
  }

  onSuiteDone (details) {
    this.emit('suiteEnd', helpers.createSuiteEnd(this.suites[details.id]))
  }

  onJasmineDone () {
    this.emit('runEnd', helpers.createSuiteEnd(this.globalSuite))
  }
}
