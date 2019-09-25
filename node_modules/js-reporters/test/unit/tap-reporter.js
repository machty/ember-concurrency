/* eslint-env mocha */

var chai = require('chai')
var chalk = require('chalk')
var sinon = require('sinon')
var EventEmitter = require('events').EventEmitter
var JsReporters = require('../../dist/js-reporters.js')
var data = require('./data.js')
var expect = chai.expect

chai.use(require('sinon-chai'))

describe('Tap reporter', function () {
  var emitter

  before(function () {
    emitter = new EventEmitter()
    JsReporters.TapReporter.init(emitter)
  })

  it('should output the TAP header', sinon.test(function () {
    var spy = this.stub(console, 'log')

    emitter.emit('runStart', {})

    expect(spy).to.have.been.calledOnce
  }))

  it('should output ok for a passing test', sinon.test(function () {
    var spy = this.stub(console, 'log')
    var expected = 'ok 1 ' + data.passingTest.fullName.join(' > ')

    emitter.emit('testEnd', data.passingTest)

    expect(spy).to.have.been.calledWith(expected)
  }))

  it('should output ok for a skipped test', sinon.test(function () {
    var spy = this.stub(console, 'log')
    var expected = chalk.yellow('ok 2 # SKIP ' + data.skippedTest.fullName.join(' > '))

    emitter.emit('testEnd', data.skippedTest)

    expect(spy).to.have.been.calledWith(expected)
  }))

  it('should output not ok for a todo test', sinon.test(function () {
    var spy = this.stub(console, 'log')
    var expected = chalk.cyan('not ok 3 # TODO ' + data.todoTest.fullName.join(' > '))

    emitter.emit('testEnd', data.todoTest)

    expect(spy).to.have.been.calledWith(expected)
  }))

  it('should output not ok for a failing test', sinon.test(function () {
    var spy = this.stub(console, 'log')
    var expected = chalk.red('not ok 4 ' + data.failingTest.fullName.join(' > '))

    emitter.emit('testEnd', data.failingTest)

    expect(spy).to.have.been.calledWith(expected)
  }))

  it('should output all errors for a failing test', sinon.test(function () {
    var spy = this.stub(console, 'log')
    var expected = []

    data.failingTest.errors.forEach(function (error) {
      expected.push('  ---')
      expected.push('  message: "' + error.message + '"')
      expected.push('  severity: failed')
      expected.push('  stack: ' + error.stack)
      expected.push('  ...')
    })

    emitter.emit('testEnd', data.failingTest)

    for (var i = 0; i < expected.length; i++) {
      expect(spy).to.have.been.calledWith(expected[i])
    }
  }))

  it('should output actual value for failed assertions even it was undefined', sinon.test(function () {
    var spy = this.stub(console, 'log')

    emitter.emit('testEnd', data.actualUndefinedTest)

    expect(spy).to.have.been.calledWith('  actual: undefined')
  }))

  it('should output actual value for failed assertions even it was falsy', sinon.test(function () {
    var spy = this.stub(console, 'log')

    emitter.emit('testEnd', data.actualFalsyTest)

    expect(spy).to.have.been.calledWith('  actual: 0')
  }))

  it('should output expected value for failed assertions even it was undefined', sinon.test(function () {
    var spy = this.stub(console, 'log')

    emitter.emit('testEnd', data.expectedUndefinedTest)

    expect(spy).to.have.been.calledWith('  expected: undefined')
  }))

  it('should output expected value for failed assertions even it was falsy', sinon.test(function () {
    var spy = this.stub(console, 'log')

    emitter.emit('testEnd', data.expectedFalsyTest)

    expect(spy).to.have.been.calledWith('  expected: 0')
  }))

  it('should output the total number of tests', sinon.test(function () {
    var spy = this.stub(console, 'log')
    var summary = '1..6'
    var passCount = '# pass 3'
    var skipCount = chalk.yellow('# skip 1')
    var todoCount = chalk.cyan('# todo 0')
    var failCount = chalk.red('# fail 2')

    emitter.emit('runEnd', {
      testCounts: {
        total: 6,
        passed: 3,
        failed: 2,
        skipped: 1,
        todo: 0
      }
    })

    expect(spy).to.have.been.calledWith(summary)
    expect(spy).to.have.been.calledWith(passCount)
    expect(spy).to.have.been.calledWith(skipCount)
    expect(spy).to.have.been.calledWith(todoCount)
    expect(spy).to.have.been.calledWith(failCount)
  }))
})
