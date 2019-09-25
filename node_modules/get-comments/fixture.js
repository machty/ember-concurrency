/*!
 * koa-ip-filter <https://github.com/tunnckoCore/koa-ip-filter>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var ipFilter = require('ip-filter')

/**
 * > Filtering incoming request with glob patterns
 * array, regexp, string or matcher function
 *
 * **Example**
 * ```js
 * 'use strict'
 *
 * var koa = require('koa')
 * var ipFilter = require('koa-ip-filter')
 * var helloWorld = require('koa-hello-world')
 *
 * var app = koa()
 *
 * app
 * .use(ipFilter({
 *   forbidden: '403: Get out of here!',
 *   filter: ['127.??.6*.12', '!1.2.*.4']
 * }))
 * .use(helloWorld())
 *
 * app.listen(1234)
 * console.log('koa server start listening on http://localhost:1234')
 *
 * // if your IP is `127.43.65.12` you will see `Hello World`
 * // otherwise you will see `403: Get out of here!`
 * ```
 *
 * @name koaIpFilter
 * @param {Object} `options`
 *   @option {Function} [options] `id` custom identifier, defaults to `this.ip`
 *   @option {Boolean} [options] `strict` to throw when not valid IPv4/IPv6? default `true`
 *   @option {Array|String|RegExp|Function} [options] `filter` black/white list filter
 *   @option {String|Function} [options] `forbidden` custom message when `403 Forbidden` response
 * @return {GeneratorFunction}
 * @api public
 */

module.exports = function koaIpFilter (options) {
  options = typeof options === 'object' ? options : {}

  return function * (next) {
    var id = typeof options.id === 'function' ? options.id.call(this, this) : this.ip

    if (!id || !options.filter) {
      return yield * next
    }

    // always strict
    var strict = typeof options.strict === 'boolean' ? options.strict : true
    var forbidden = options.forbidden || '403 Forbidden'

    /**
     * [identifier description]
     * @type {Object}
     */
    var identifier = ipFilter(id, options.filter, !strict)
    if (identifier === null) {
      this.status = 403
      this.body = typeof forbidden === 'function' ? forbidden.call(this, this) : forbidden
      return
    }

    this.filter = ipFilter
    this.identifier = identifier

    return yield * next
  }
}

/**
 * abcd description
 *
 * @name koaIpFilter
 * @param {Object} `options`
 */
exports.data = function () {
  return true
}
