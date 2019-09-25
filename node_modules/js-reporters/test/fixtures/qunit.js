var QUnit = require('qunitjs')

// Add dummy assertions in passing tests, because QUnit is checking for at
// least one assertion, if there is none, then QUnit throws an error and the
// test fails.

QUnit.test('global test', function (assert) {
  assert.ok(true)
})

QUnit.module('suite with passing test')
QUnit.test('should pass', function (assert) {
  assert.ok(true)
})

QUnit.module('suite with skipped test')
QUnit.skip('should skip', function () {

})

QUnit.module('suite with failing test')
QUnit.test('should fail', function () {
  throw new Error('error')
})

QUnit.module('suite with tests')
QUnit.test('should pass', function (assert) {
  assert.ok(true)
})
QUnit.skip('should skip', function () {

})
QUnit.test('should fail', function () {
  throw new Error('error')
})

QUnit.module('outter suite', function () {
  QUnit.module('inner suite', function () {
    QUnit.test('inner test', function (assert) {
      assert.ok(true)
    })
  })

  QUnit.test('outter test', function (assert) {
    assert.ok(true)
  })
})
