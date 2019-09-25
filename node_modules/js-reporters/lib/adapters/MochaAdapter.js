import EventEmitter from 'events'
import {Assertion, TestStart, TestEnd, SuiteStart, SuiteEnd} from '../Data.js'

export default class MochaAdapter extends EventEmitter {
  constructor (mocha) {
    super()

    this.mocha = mocha
    this.origReporter = mocha._reporter

    mocha.reporter((runner) => {
      this.runner = runner

      // eslint-disable-next-line no-unused-vars
      let origReporterInstance = new (this.origReporter.bind(this.mocha,
        this.runner))()

      runner.on('start', this.onStart.bind(this))
      runner.on('suite', this.onSuite.bind(this))
      runner.on('test', this.onTest.bind(this))
      runner.on('pending', this.onPending.bind(this))
      runner.on('fail', this.onFail.bind(this))
      runner.on('test end', this.onTestEnd.bind(this))
      runner.on('suite end', this.onSuiteEnd.bind(this))
      runner.on('end', this.onEnd.bind(this))
    })
  }

  convertToSuiteStart (mochaSuite) {
    return new SuiteStart(
      mochaSuite.title,
      this.buildSuiteFullName(mochaSuite),
      mochaSuite.tests.map(this.convertTest.bind(this)),
      mochaSuite.suites.map(this.convertToSuiteStart.bind(this))
    )
  }

  convertToSuiteEnd (mochaSuite) {
    return new SuiteEnd(
      mochaSuite.title,
      this.buildSuiteFullName(mochaSuite),
      mochaSuite.tests.map(this.convertTest.bind(this)),
      mochaSuite.suites.map(this.convertToSuiteEnd.bind(this))
    )
  }

  convertTest (mochaTest) {
    var suiteName
    var fullName

    if (!mochaTest.parent.root) {
      suiteName = mochaTest.parent.title
      fullName = this.buildSuiteFullName(mochaTest.parent)
      // Add also the test name.
      fullName.push(mochaTest.title)
    } else {
      fullName = [mochaTest.title]
    }

    // If the test has the errors attached a "test end" must be emitted, else
    // a "test start".
    if (mochaTest.errors !== undefined) {
      var status = (mochaTest.state === undefined) ? 'skipped' : mochaTest.state
      let errors = []

      mochaTest.errors.forEach(function (error) {
        errors.push(new Assertion(false, error.actual, error.expected,
          error.message || error.toString(), error.stack))
      })

      // Test end, for the assertions property pass an empty array.
      return new TestEnd(mochaTest.title, suiteName, fullName, status,
          mochaTest.duration, errors, errors)
    }

    // Test start.
    return new TestStart(mochaTest.title, suiteName, fullName)
  }

  /**
   * Builds an array with the names of nested suites.
   */
  buildSuiteFullName (mochaSuite) {
    var fullName = []
    var parent = mochaSuite.parent

    if (!mochaSuite.root) {
      fullName.push(mochaSuite.title)
    }

    while (parent && !parent.root) {
      fullName.unshift(parent.title)
      parent = parent.parent
    }

    return fullName
  }

  onStart () {
    var globalSuiteStart = this.convertToSuiteStart(this.runner.suite)
    globalSuiteStart.name = undefined

    this.emit('runStart', globalSuiteStart)
  }

  onSuite (mochaSuite) {
    if (!mochaSuite.root) {
      this.emit('suiteStart', this.convertToSuiteStart(mochaSuite))
    }
  }

  onTest (mochaTest) {
    this.errors = []

    this.emit('testStart', this.convertTest(mochaTest))
  }

  /**
   * Emits the start of pending tests, because Mocha does not emit skipped tests
   * on its "test" event.
   */
  onPending (mochaTest) {
    this.emit('testStart', this.convertTest(mochaTest))
  }

  onFail (test, error) {
    this.errors.push(error)
  }

  onTestEnd (mochaTest) {
    // Save the errors on Mocha's test object, because when the suite that
    // contains this test is emitted on the "suiteEnd" event, it should contain
    // also this test with all its details (errors, status, runtime). Runtime
    // and status are already attached to the test, but the errors don't.
    mochaTest.errors = this.errors

    this.emit('testEnd', this.convertTest(mochaTest))
  }

  onSuiteEnd (mochaSuite) {
    if (!mochaSuite.root) {
      this.emit('suiteEnd', this.convertToSuiteEnd(mochaSuite))
    }
  }

  onEnd () {
    var globalSuiteEnd = this.convertToSuiteEnd(this.runner.suite)
    globalSuiteEnd.name = undefined

    this.emit('runEnd', globalSuiteEnd)
  }
}
