/*!
 * get-comments <https://github.com/tunnckoCore/get-comments>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

/**
 * Get block code comments from string
 *
 * @param  {String} `<input>` string to extract from
 * @param  {Boolean} `[resType]` if true, will return array, otherwise object
 * @return {Array|Object}
 * @api public
 */
module.exports = function getComments (input, resType) {
  if (typeof input !== 'string') {
    throw new TypeError('get-comments expects a string')
  }

  var len = input.length
  var obj = {start: 0, end: 0}
  var res = resType ? [] : {}
  var raw = ''
  var column = 0
  var line = 1
  var i = 0

  while (i < len) {
    var ch = input[i]
    var prev = input[i - 1]
    var next = input[i + 1]
    var post = input[i + 2]

    raw += ch

    if (prev !== ' ' && ch === '/' && next === '*' && post === '*') {
      obj.type = 'Block'
      obj.start = i
      obj.loc = {}
      obj.loc.start = {
        line: line,
        column: column
      }
    }
    if (obj.start && prev === '*' && ch === '/') {
      var value = raw.slice(obj.start + 2, i - 1)

      obj.api = value.indexOf('@api') !== -1
      obj.end = i + 1
      obj.value = value
      obj.loc.end = {
        line: line,
        column: column
      }
    }
    if (obj.start && prev === '/' && (ch === '\n' || ch === '\r')) {
      var lines = input.split(/[\r\n]/)
      obj.after = lines[line]
      if (!lines[line].length) {
        obj.after = lines[line + 1]
      }
      if (resType) {
        res.push(obj)
      } else {
        var l = Object.keys(res).length
        var j = l > 0 ? l : 0
        res[j] = obj
      }

      // resets
      obj = {start: 0, end: 0}
    }
    if (ch === '\n' || ch === '\r') {
      line++
      column = 0
    }

    column++
    i++
  }

  return res
}
