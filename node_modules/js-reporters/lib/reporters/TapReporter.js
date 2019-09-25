import chalk from 'chalk'

export default class TapReporter {
  constructor (runner) {
    this.testCount = 0

    runner.on('runStart', this.onRunStart.bind(this))
    runner.on('testEnd', this.onTestEnd.bind(this))
    runner.on('runEnd', this.onRunEnd.bind(this))
  }

  static init (runner) {
    return new TapReporter(runner)
  }

  onRunStart (globalSuite) {
    console.log('TAP version 13')
  }

  onTestEnd (test) {
    this.testCount = this.testCount + 1

    if (test.status === 'passed') {
      console.log(`ok ${this.testCount} ${test.fullName.join(' > ')}`)
    } else if (test.status === 'skipped') {
      console.log(chalk.yellow(`ok ${this.testCount} # SKIP ${test.fullName.join(' > ')}`))
    } else if (test.status === 'todo') {
      console.log(chalk.cyan(`not ok ${this.testCount} # TODO ${test.fullName.join(' > ')}`))
      test.errors.forEach((error) => this.logError(error, 'todo'))
    } else {
      console.log(chalk.red(`not ok ${this.testCount} ${test.fullName.join(' > ')}`))
      test.errors.forEach((error) => this.logError(error))
    }
  }

  onRunEnd (globalSuite) {
    console.log(`1..${globalSuite.testCounts.total}`)
    console.log(`# pass ${globalSuite.testCounts.passed}`)
    console.log(chalk.yellow(`# skip ${globalSuite.testCounts.skipped}`))
    console.log(chalk.cyan(`# todo ${globalSuite.testCounts.todo}`))
    console.log(chalk.red(`# fail ${globalSuite.testCounts.failed}`))
  }

  logError (error, severity) {
    console.log('  ---')
    console.log(`  message: "${error.message || 'failed'}"`)
    console.log(`  severity: ${severity || 'failed'}`)

    if (error.hasOwnProperty('actual')) {
      var actualStr = error.actual !== undefined ? JSON.stringify(error.actual, null, 2) : 'undefined'
      console.log(`  actual: ${actualStr}`)
    }

    if (error.hasOwnProperty('expected')) {
      var expectedStr = error.expected !== undefined ? JSON.stringify(error.expected, null, 2) : 'undefined'
      console.log(`  expected: ${expectedStr}`)
    }

    if (error.stack) {
      console.log(`  stack: ${error.stack}`)
    }

    console.log('  ...')
  }
}
