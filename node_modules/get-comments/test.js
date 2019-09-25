/*!
 * get-comments <https://github.com/tunnckoCore/get-comments>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var fs = require('fs')
var test = require('assertit')
var getComments = require('./index')

test('get-comments:', function () {
  test('should throw TypeError if not string given', function (done) {
    function fixture () {
      getComments()
    }

    test.throws(fixture, TypeError)
    test.throws(fixture, /get-comments expects a string/)
    done()
  })
  test('should extract comments as object when getComments(input)', function (done) {
    var input = fs.readFileSync('./fixture.js', 'utf8')
    var actual = getComments(input)

    test.equal(typeof actual, 'object')
    test.equal(Object.keys(actual).length, 2)
    test.ok(actual[0].after)
    test.ok(actual[0].after.indexOf('module.exports = function koaIpFilter') !== -1)
    done()
  })
  test('should extract comments as array when getComments(input, true)', function (done) {
    var input = fs.readFileSync('./fixture.js', 'utf8')
    var actual = getComments(input, true)

    test.equal(Array.isArray(actual), true)
    test.equal(actual.length, 2)
    test.ok(actual[1].after)
    test.ok(actual[1].after.indexOf('exports.data =') !== -1)
    done()
  })
})
