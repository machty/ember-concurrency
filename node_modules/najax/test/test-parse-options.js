/* globals describe it */
var parseOptions = require('../lib/parse-options.js')
var expect = require('chai').expect

const exampleUrl = 'http://www.example.com/'

describe('method parsing', function () {
  it('should not define a method by default', function () {
    var opts = parseOptions({ url: exampleUrl })
    expect(Object.keys(opts).indexOf('method')).to.eql(-1)
  })

  it('should support legacy "type" option', function () {
    var opts = parseOptions({ type: 'DELETE', url: exampleUrl })
    expect(opts.method).to.eql('DELETE')
  })
})

describe('mixed argument support', function () {
  it('should support urls as the 1st argument', function () {
    var opts = parseOptions(exampleUrl)
    expect(opts.url).to.eql(exampleUrl)
  })

  it('should support a success callback as the 2nd argument', function () {
    var opts = parseOptions(exampleUrl, function () {})
    expect(typeof opts.success).to.eql('function')
  })
})
