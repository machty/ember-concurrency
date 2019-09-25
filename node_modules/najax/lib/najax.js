/* najax
 * jquery ajax-stye http requests in node
 * https://github.com/alanclarke/najax
 */

var https = require('https')
var http = require('http')
var querystring = require('qs')
var url = require('url')
var zlib = require('zlib')
var $ = require('jquery-deferred')
var defaultsDeep = require('lodash.defaultsdeep')
var parseOptions = require('./parse-options')
var defaults = {
  method: 'GET',
  rejectUnauthorized: true,
  processData: true,
  data: '',
  contentType: 'application/x-www-form-urlencoded',
  headers: {},
  setRequestHeader: function (name, value) {
    this.headers[name] = value
  }
}

/*
  method overloading, can use:
  -function(url, opts, callback) or
  -function(url, callback)
  -function(opts)
*/
function najax (uri, options, callback) {
  var dfd = new $.Deferred()
  var o = defaultsDeep({}, parseOptions(uri, options, callback), defaults)
  var l = url.parse(o.url)
  var ssl = l.protocol.indexOf('https') === 0

  // DATA
  // Per jquery docs / source: encoding is only done
  // if processData is true (defaults to true)
  // and the data is not already a string
  // https://github.com/jquery/jquery/blob/master/src/ajax.js#L518
  if (o.data && o.processData && o.method === 'GET') {
    o.data = querystring.stringify(o.data, { arrayFormat: 'brackets' })
  } else if (o.data && o.processData && typeof o.data !== 'string' && o.method !== 'GET') {
    switch (true) {
      case o.contentType.startsWith('application/json'):
        o.data = JSON.stringify(o.data)
        break
      case o.contentType.startsWith('application/x-www-form-urlencoded'):
        o.data = querystring.stringify(o.data)
        break
      default:
        o.data = String(o.data)
    }
  }

  /* if get, use querystring method for data */
  if (o.data) {
    if (o.method === 'GET') {
      if (l.search) {
        l.search += '&' + o.data
      } else {
        l.search = '?' + o.data
      }
    } else {
      /* set data content type */
      o.headers = Object.assign({
        'Content-Type': o.contentType,
        'Content-Length': Buffer.byteLength(o.data)
      }, o.headers)
    }
  }

  if (o.beforeSend) o.beforeSend(o)

  options = {
    host: l.hostname,
    path: l.pathname + (l.search || ''),
    method: o.method,
    port: Number(l.port) || (ssl ? 443 : 80),
    headers: o.headers,
    rejectUnauthorized: o.rejectUnauthorized
  }

  // AUTHENTICATION
  /* add authentication to http request */
  if (l.auth) {
    options.auth = l.auth
  } else if (o.username && o.password) {
    options.auth = o.username + ':' + o.password
  } else if (o.auth) {
    options.auth = o.auth
  }
  /* pass keep-alive agent if provided */
  if (o.agent) options.agent = o.agent

  /* for debugging, method to get options and return */
  if (o.getopts) {
    var getopts = [ssl, options, o.data || false, o.success || false, o.error || false]
    return getopts
  }

  // REQUEST
  function notImplemented (name) {
    return function () {
      console.error('najax: method jqXHR."' + name + '" not implemented')
      console.trace()
    }
  }

  var jqXHR = {
    readyState: 0,
    status: 0,
    statusText: 'error', // one of: "success", "notmodified", "error", "timeout", "abort", or "parsererror"
    setRequestHeader: notImplemented('setRequestHeader'),
    getAllResponseHeaders: notImplemented('getAllResponseHeaders'),
    statusCode: notImplemented('statusCode'),
    abort: notImplemented('abort')
  }

  var req = (ssl ? https : http).request(options, function (res) {
    // Allow getting Response Headers from the XMLHTTPRequest object
    dfd.getResponseHeader = jqXHR.getResponseHeader = function getResponseHeader (header) {
      return res.headers[header.toLowerCase()]
    }
    dfd.getAllResponseHeaders = jqXHR.getAllResponseHeaders = function getAllResponseHeaders () {
      var headers = []
      for (var key in res.headers) {
        headers.push(key + ': ' + res.headers[key])
      }
      return headers.join('\n')
    }

    function dataHandler (data) {
      jqXHR.responseText = data

      var statusCode = res.statusCode
      //
      // Determine if successful
      // (per https://github.com/jquery/jquery/blob/master/src/ajax.js#L679)
      var isSuccess = statusCode >= 200 && statusCode < 300 || statusCode === 304
        // Set readyState
      jqXHR.readyState = statusCode > 0 ? 4 : 0
      jqXHR.status = statusCode

      if (o.dataType === 'json' || o.dataType === 'jsonp') {
        // replace control characters
        try {
          data = JSON.parse(data.replace(/[\cA-\cZ]/gi, ''))
        } catch (e) {
          jqXHR.statusText = 'parseerror'
          return onError(e)
        }
      }

      if (isSuccess) {
        jqXHR.statusText = 'success'

        if (statusCode === 204 || options.method === 'HEAD') {
          jqXHR.statusText = 'nocontent'
        } else if (statusCode === 304) {
          jqXHR.statusText = 'notmodified'
        }

        // success, statusText, jqXHR
        dfd.resolve(data, jqXHR.statusText, jqXHR)
      } else {
        // jqXHR, statusText, error
        // When an HTTP error occurs, errorThrown receives the textual portion of the
        // HTTP status, such as "Not Found" or "Internal Server Error."
        jqXHR.statusText = 'error'
        onError(new Error(http.STATUS_CODES[statusCode]))
      }
    }
    var chunks = []
    res.on('data', function (chunk) { chunks.push(chunk) })
    res.on('end', function () {
      var buffer = Buffer.concat(chunks)
      var encoding = res.headers['content-encoding']
      if (encoding === 'gzip') {
        zlib.gunzip(buffer, function (err, buffer) {
          if (err) {
            onError(err)
          } else {
            dataHandler(buffer.toString())
          }
        })
      } else if (encoding === 'deflate') {
        zlib.inflate(buffer, function (err, buffer) {
          if (err) {
            onError(err)
          } else {
            dataHandler(buffer.toString())
          }
        })
      } else {
        dataHandler(buffer.toString())
      }
    })
  })

  // ERROR
  req.on('error', onError)

  function onError (e) {
    // jqXHR, statusText, error
    dfd.reject(jqXHR, jqXHR.statusText, e)
  }

  // SET TIMEOUT
  if (o.timeout && o.timeout > 0) {
    req.setTimeout(o.timeout, function () {
      req.abort()
      jqXHR.statusText = 'timeout'
      onError(new Error('timeout'))
    })
  }

  // SEND DATA
  if (o.method !== 'GET' && o.data) req.write(o.data, 'utf-8')
  req.end()

  // DEFERRED
  dfd.done(o.success)
  dfd.done(o.complete)
  dfd.fail(o.error)
  dfd.fail(o.complete)
  dfd.success = dfd.done
  dfd.error = dfd.fail
  return dfd
}

najax.defaults = function mergeDefaults (opts) {
  return defaultsDeep(defaults, opts)
}

/* auto rest interface go! */
;['GET', 'POST', 'PUT', 'DELETE'].forEach(handleMethod)

function handleMethod (method) {
  najax[method.toLowerCase()] = function methodHandler (uri, options, callback) {
    return najax(defaultsDeep(parseOptions(uri, options, callback), { method: method }))
  }
}

module.exports = najax
