var JsReporters = require('../../dist/js-reporters.js')
var SuiteStart = JsReporters.SuiteStart
var SuiteEnd = JsReporters.SuiteEnd
var TestStart = JsReporters.TestStart
var TestEnd = JsReporters.TestEnd

var noErrors = []
var noAssertions = []

/**
 * All props are undefined, except "passed", because we don't know what they
 * will contain, which is depending from framework to framework. The props are
 * anyway verified one by one, see "adapters.js" file.
 */
var errors = [{
  passed: false,
  actual: undefined,
  expected: undefined,
  message: undefined,
  stack: undefined,
  todo: undefined
}]

var failedAssertions = [{
  passed: false,
  actual: undefined,
  expected: undefined,
  message: undefined,
  stack: undefined,
  todo: undefined
}]

var passedAssertions = [{
  passed: true,
  actual: undefined,
  expected: undefined,
  message: undefined,
  stack: undefined,
  todo: undefined
}]

var globalTestStart = new TestStart('global test', undefined, ['global test'])
var globalTestEnd = new TestEnd('global test', undefined, ['global test'],
    'passed', 0, noErrors, passedAssertions)

var passingTestStart1 = new TestStart('should pass', 'suite with passing test',
    ['suite with passing test', 'should pass'])
var passingTestEnd1 = new TestEnd('should pass', 'suite with passing test',
    ['suite with passing test', 'should pass'], 'passed', 0, noErrors,
    passedAssertions)

var passingTestStart2 = new TestStart('should pass', 'suite with tests',
    ['suite with tests', 'should pass'])
var passingTestEnd2 = new TestEnd('should pass', 'suite with tests',
    ['suite with tests', 'should pass'], 'passed', 0, noErrors,
    passedAssertions)

var skippedTestStart1 = new TestStart('should skip', 'suite with skipped test',
    ['suite with skipped test', 'should skip'])
var skippedTestEnd1 = new TestEnd('should skip', 'suite with skipped test',
    ['suite with skipped test', 'should skip'], 'skipped', undefined, noErrors,
    noAssertions)

var skippedTestStart2 = new TestStart('should skip', 'suite with tests',
    ['suite with tests', 'should skip'])
var skippedTestEnd2 = new TestEnd('should skip', 'suite with tests',
    ['suite with tests', 'should skip'], 'skipped', undefined, noErrors,
    noAssertions)

var failingTestStart1 = new TestStart('should fail', 'suite with failing test',
    ['suite with failing test', 'should fail'])
var failingTestEnd1 = new TestEnd('should fail', 'suite with failing test',
    ['suite with failing test', 'should fail'], 'failed', 0, errors,
    failedAssertions)

var failingTestStart2 = new TestStart('should fail', 'suite with tests',
    ['suite with tests', 'should fail'])
var failingTestEnd2 = new TestEnd('should fail', 'suite with tests',
    ['suite with tests', 'should fail'], 'failed', 0, errors,
    failedAssertions)

var innerTestStart = new TestStart('inner test', 'inner suite',
    ['outter suite', 'inner suite', 'inner test'])
var innerTestEnd = new TestEnd('inner test', 'inner suite', ['outter suite',
    'inner suite', 'inner test'], 'passed', 0, noErrors, passedAssertions)

var outterTestStart = new TestStart('outter test', 'outter suite',
    ['outter suite', 'outter test'])
var outterTestEnd = new TestEnd('outter test', 'outter suite', ['outter suite',
    'outter test'], 'passed', 0, noErrors, passedAssertions)

var passingSuiteStart = new SuiteStart('suite with passing test',
    ['suite with passing test'], [passingTestStart1], [])
var passingSuiteEnd = new SuiteEnd('suite with passing test',
    ['suite with passing test'], [passingTestEnd1], [])

var skippedSuiteStart = new SuiteStart('suite with skipped test',
    ['suite with skipped test'], [skippedTestStart1], [])
var skippedSuiteEnd = new SuiteEnd('suite with skipped test',
    ['suite with skipped test'], [skippedTestEnd1], [])

var failingSuiteStart = new SuiteStart('suite with failing test',
    ['suite with failing test'], [failingTestStart1], [])
var failingSuiteEnd = new SuiteEnd('suite with failing test',
    ['suite with failing test'], [failingTestEnd1], [])

var testSuiteStart = new SuiteStart('suite with tests', ['suite with tests'], [
  passingTestStart2,
  skippedTestStart2,
  failingTestStart2
], [])
var testSuiteEnd = new SuiteEnd('suite with tests', ['suite with tests'], [
  passingTestEnd2,
  skippedTestEnd2,
  failingTestEnd2
], [])

var innerSuiteStart = new SuiteStart('inner suite',
  ['outter suite', 'inner suite'], [innerTestStart], [])
var innerSuiteEnd = new SuiteEnd('inner suite', ['outter suite', 'inner suite'],
  [innerTestEnd], [])

var outterSuiteStart = new SuiteStart('outter suite', ['outter suite'],
  [outterTestStart], [innerSuiteStart])
var outterSuiteEnd = new SuiteEnd('outter suite', ['outter suite'],
  [outterTestEnd], [innerSuiteEnd])

var globalSuiteStart = new SuiteStart(undefined, [], [globalTestStart], [
  passingSuiteStart,
  skippedSuiteStart,
  failingSuiteStart,
  testSuiteStart,
  outterSuiteStart
])
var globalSuiteEnd = new SuiteEnd(undefined, [], [globalTestEnd], [
  passingSuiteEnd,
  skippedSuiteEnd,
  failingSuiteEnd,
  testSuiteEnd,
  outterSuiteEnd
])

module.exports = [
  ['runStart', globalSuiteStart, 'global suite starts'],
  ['testStart', globalTestStart, 'global test starts'],
  ['testEnd', globalTestEnd, 'global test ends'],
  ['suiteStart', passingSuiteStart, 'suite with one passing test starts'],
  ['testStart', passingTestStart1, 'passing test starts'],
  ['testEnd', passingTestEnd1, 'passing test ends'],
  ['suiteEnd', passingSuiteEnd, 'suite with one passing test ends', 'passed'],
  ['suiteStart', skippedSuiteStart, 'suite with one skipped test starts'],
  ['testStart', skippedTestStart1, 'skipped test starts'],
  ['testEnd', skippedTestEnd1, 'skipped test ends'],
  ['suiteEnd', skippedSuiteEnd, 'suite with one skipped test ends', 'skipped'],
  ['suiteStart', failingSuiteStart, 'suite with one failing tests'],
  ['testStart', failingTestStart1, 'failing test starts'],
  ['testEnd', failingTestEnd1, 'failing test ends'],
  ['suiteEnd', failingSuiteEnd, 'suite with one failing test ends', 'failed'],
  ['suiteStart', testSuiteStart, 'suite with multiple tests starts'],
  ['testStart', passingTestStart2, 'passing test starts'],
  ['testEnd', passingTestEnd2, 'passing test ends'],
  ['testStart', skippedTestStart2, 'skipped test starts'],
  ['testEnd', skippedTestEnd2, 'skipped test ends'],
  ['testStart', failingTestStart2, 'failing test starts'],
  ['testEnd', failingTestEnd2, 'failing test ends'],
  ['suiteEnd', testSuiteEnd, 'suite with multiple tests ends', 'failed'],
  ['suiteStart', outterSuiteStart, 'outter suite starts'],
  ['testStart', outterTestStart, 'outter test starts'],
  ['testEnd', outterTestEnd, 'outter test ends'],
  ['suiteStart', innerSuiteStart, 'inner suite starts'],
  ['testStart', innerTestStart, 'inner test starts'],
  ['testEnd', innerTestEnd, 'inner test ends'],
  ['suiteEnd', innerSuiteEnd, 'inner suite ends', 'passed'],
  ['suiteEnd', outterSuiteEnd, 'outter suite ends', 'passed'],
  ['runEnd', globalSuiteEnd, 'global suite ends', 'failed']
]
