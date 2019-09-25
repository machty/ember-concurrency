var test = require('tape')
var includePathSearcher = require('../index')

process.chdir('test/fixtures')

test('includePathSearcher', function (t) {
  t.test('findFileSync', function (t) {
    var findFileSync = includePathSearcher.findFileSync
    var includePaths = ['a', 'b']

    t.test('returns first match found', function (t) {
      t.equal(findFileSync('foo', includePaths), 'a/foo')
      t.equal(findFileSync('bar', includePaths), 'b/bar')
      // If ambiguous, returns first match
      t.equal(findFileSync('baz', includePaths), 'a/baz')
      t.end()
    })

    t.test('throws error if not found', function (t) {
      try {
        findFileSync('doesNotExist', includePaths)
      } catch (err) {
        t.equal(err.message, 'File not found: doesNotExist\nin any of the following include paths:\n  a\n  b')
        t.end()
      }
    })
  })
})
