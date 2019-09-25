/* globals describe beforeEach it */
var najax = require('../lib/najax.js')
var expect = require('chai').expect
var nock = require('nock')
var zlib = require('zlib')

describe('method overloads', function (next) {
  najax.defaults({ error: error })

  beforeEach(function () {
    nock('http://www.example.com').get('/').reply(200, 'ok')
  })

  it('should accept argument order: (url, callback)', function (done) {
    najax('http://www.example.com/', createSuccess(done))
  })

  it('should accept argument order: (url, opts, callback)', function (done) {
    najax('http://www.example.com', {}, createSuccess(done))
  })

  it('should accept argument order: (opts, callback)', function (done) {
    najax({ url: 'http://www.example.com' }, createSuccess(done))
  })

  it('should accept single argument object: (opts)', function (done) {
    najax({
      url: 'http://www.example.com',
      success: createSuccess(done),
      error: error
    })
  })

  it('should default to "GET" for the method if not specified', function () {
    var debug = najax({
      url: 'http://www.example.com',
      getopts: true
    })
    expect(debug[1].method).to.eql('GET')
  })
})

describe('url', function (next) {
  var username = 'user'
  var password = 'test'
  var authString = username + ':' + password
  var encrypted = (new Buffer(authString)).toString('base64')

  najax.defaults({ error: error })

  function mockPlain (method) {
    nock('http://www.example.com')[method]('/').reply(200, 'ok')
  }

  function mockHttps (method) {
    nock('https://www.example.com')[method]('/').reply(200, 'ok')
  }

  function mockAuth (method) {
    nock('http://www.example.com')[method]('/')
      .matchHeader('authorization', 'Basic ' + encrypted)
      .reply(200, 'ok')
  }

  function mockGzip (method) {
    nock('http://www.example.com')[method]('/')
      .reply(200, zlib.gzipSync('ok'), { 'Content-Encoding': 'gzip' })
  }

  function mockDeflate (method) {
    nock('http://www.example.com')[method]('/')
      .reply(200, zlib.deflateSync('ok'), { 'Content-Encoding': 'deflate' })
  }

  it('should accept plain URL', function (done) {
    mockPlain('get')
    najax('http://www.example.com', createSuccess(done))
  })

  it('should accept url as property of options object', function (done) {
    mockPlain('get')
    najax({ url: 'http://www.example.com' }, createSuccess(done))
  })

  it('should parse auth from the url', function (done) {
    mockAuth('get')
    najax({ url: 'http://' + authString + '@www.example.com' }, createSuccess(done))
  })

  it('should accept auth as property of options object', function (done) {
    mockAuth('get')
    najax({ url: 'http://www.example.com', auth: authString }, createSuccess(done))
  })

  it('should accept username, password as properties of options object', function (done) {
    mockAuth('get')
    najax({
      url: 'http://www.example.com',
      username: username,
      password: password
    }, createSuccess(done))
  })

  it('should set port to 443 for https URLs', function (done) {
    mockHttps('get')
    najax('https://www.example.com', createSuccess(done))
  })

  it('should set port to the port in the URL string', function (done) {
    nock('http://www.example.com:66').get('/').reply(200, 'ok')
    najax('http://www.example.com:66', createSuccess(done))
  })

  it('should set path to the path in the URL string', function (done) {
    nock('http://www.example.com:66').get('/blah').reply(200, 'ok')
    najax('http://www.example.com:66/blah', createSuccess(done))
  })

  it('supports legacy jQuery `type` instead of `method`', function (done) {
    nock('http://www.example.com').post('/').reply(201, 'ok')
    najax({url: 'http://www.example.com/', type: 'POST'}, createSuccess(done))
  })

  ;['get', 'post', 'put', 'delete'].forEach(function (m) {
    var M = m.toUpperCase()

    it(M + ' should accept plain URL', function (done) {
      mockPlain(m)
      najax[m]('http://www.example.com', createSuccess(done))
    })

    it(M + ' should accept url as property of options object', function (done) {
      mockPlain(m)
      najax[m]({
        url: 'http://www.example.com'
      }, createSuccess(done))
    })

    it(M + ' should parse auth from the url', function (done) {
      mockAuth(m)
      najax[m]({
        url: 'http://' + authString + '@www.example.com'
      }, createSuccess(done))
    })

    it(M + ' should accept auth as property of options object', function (done) {
      mockAuth(m)
      najax[m]({
        url: 'http://www.example.com',
        auth: authString
      }, createSuccess(done))
    })

    it(M + ' should accept username, password as properties of options object', function (done) {
      mockAuth(m)
      najax[m]({
        url: 'http://www.example.com',
        username: username,
        password: password
      }, createSuccess(done))
    })

    it(M + ' should set port to 443 for https URLs', function (done) {
      mockHttps(m)
      najax[m]('https://www.example.com', createSuccess(done))
    })

    it(M + ' should set port to the port in the URL string', function (done) {
      nock('http://www.example.com:66')[m]('/').reply(200, 'ok')
      najax[m]('http://www.example.com:66', createSuccess(done))
    })

    it(M + ' should set path to the path in the URL string', function (done) {
      nock('http://www.example.com:66')[m]('/blah').reply(200, 'ok')
      najax[m]('http://www.example.com:66/blah', createSuccess(done))
    })

    it(M + ' should handle gzipped response', function (done) {
      mockGzip(m)
      najax[m]('http://www.example.com', createSuccess(done))
    })

    it(M + ' should handle deflated response', function (done) {
      mockDeflate(m)
      najax[m]('http://www.example.com', createSuccess(done))
    })
  })
})

describe('data', function (next) {
  var data = { a: 1 }
  var encodedData = '?a=1'

  najax.defaults({ error: error })

  it('should encode data passed in options object', function (done) {
    nock('http://www.example.com').get('/' + encodedData).reply(200, 'ok')
    najax.get('http://www.example.com', {
      data: data
    }, createSuccess(done))
  })

  describe('data containing array', function () {
    var arrayData = {a: [1, 2, 3]}
    // url encoded: ?a[]=1&a[]=2&a[]=3
    var encodedArrayData = '?a%5B%5D=1&a%5B%5D=2&a%5B%5D=3'

    it('should encode array with empty bracket syntax', function (done) {
      nock('http://www.example.com').get('/' + encodedArrayData).reply(200, 'ok')
      najax.get('http://www.example.com', {
        data: arrayData
      }, createSuccess(done))
    })
  })

  it('should pass correct headers for x-www-form-urlencoded data', function (done) {
    nock('http://www.example.com')
      .post('/', 'a=1')
      .matchHeader('Content-Type', 'application/x-www-form-urlencoded')
      .matchHeader('Content-Length', 3)
      .reply(200, 'ok')

    najax.post('http://www.example.com', { data: data }, createSuccess(done))
  })

  it('should encode data for x-www-form-urlencoded with charset', function (done) {
    nock('http://www.example.com')
      .post('/', 'a=1')
      .matchHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8')
      .reply(200, 'ok')

    najax.post('http://www.example.com', {
      data: data,
      contentType: 'application/x-www-form-urlencoded; charset=utf-8'
    }, createSuccess(done))
  })

  it('should support nested urlencoded objects, because you could just content-type=json but yolo', function (done) {
    nock('http://www.example.com')
      .post('/', 'a=1&b%5Bc%5D=1')
      .matchHeader('Content-Type', 'application/x-www-form-urlencoded')
      .reply(200, 'ok')
    najax.post('http://www.example.com', { data: { a: 1, b: { c: 1 } } }, createSuccess(done))
  })

  it('should pass correct headers for json data', function (done) {
    nock('http://www.example.com')
      .post('/', data)
      .matchHeader('Content-Type', 'application/json')
      .matchHeader('Content-Length', 7)
      .reply(200, 'ok')

    najax.post('http://www.example.com', {
      data: data,
      contentType: 'application/json'
    }, createSuccess(done))
  })

  it('should pass correct headers for xml data', function (done) {
    nock('http://www.example.com')
      .post('/', data)
      .matchHeader('Content-Type', 'application/xml')
      .matchHeader('Content-Length', 7)
      .reply(200, 'ok')

    najax.post('http://www.example.com', {
      data: JSON.stringify(data),
      contentType: 'application/xml'
    }, createSuccess(done))
  })

  it('should pass custom headers (Cookie)', function (done) {
    var cookie = 'connect.sid=s%3ATESTCOOKIE'

    nock('http://www.example.com')
      .post('/', data)
      .matchHeader('Content-Type', 'application/xml')
      .matchHeader('Content-Length', 7)
      .matchHeader('Cookie', cookie)
      .reply(200, 'ok')

    najax.post('http://www.example.com', {
      data: JSON.stringify(data),
      contentType: 'application/xml',
      headers: {
        'Cookie': cookie
      }
    }, createSuccess(done))
  })

  it('should support beforeSend and setRequestHeader', function (done) {
    nock('http://www.example.com')
      .post('/', data)
      .matchHeader('Content-Type', 'application/xml')
      .matchHeader('Content-Length', 7)
      .matchHeader('Accepts', 'application/vnd.json+api')
      .reply(200, 'ok')

    najax.post('http://www.example.com', {
      data: JSON.stringify(data),
      contentType: 'application/xml',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Accepts', 'application/vnd.json+api')
      }
    }, createSuccess(done))
  })
})

describe('timeout', function () {
  it('should timeout', function (done) {
    nock('http://www.example.com')
      .post('/')
      .socketDelay(1000)
      .reply(200, 'ok')
    var opts = { timeout: 1, error: false }
    return najax.post('http://www.example.com', opts)
      .error(function (data, statusText, e) {
        expect(statusText).to.eql('timeout')
        done()
      })
  })
  it('should call complete with status when finished', function (done) {
    nock('http://www.example.com')
      .post('/')
      .socketDelay(1000)
      .reply(200, 'ok')
    var opts = { timeout: 1, error: false, complete: function (jqXHR, statusText) {
      expect(statusText).to.eql('timeout')
      done()
    }}
    najax.post('http://www.example.com', opts)
  })
})

describe('headers', function () {
  beforeEach(function () {
    nock('http://www.example.com')
      .post('/')
      .reply(200, 'ok', {
        'content-type': 'application/json; charset=utf-8',
        'server': 'Test Server'
      })
  })

  it('should return the concatenated headers from getAllResponseHeaders', function (done) {
    najax.post('http://www.example.com')
      .then(function (data, statusText, jqXHR) {
        expect(jqXHR.getAllResponseHeaders())
          .to.equal('content-type: application/json; charset=utf-8\nserver: Test Server')
        done()
      })
  })

  it('should return the value for the header passed to getResponseHeader', function (done) {
    najax.post('http://www.example.com')
      .then(function (data, statusText, jqXHR) {
        expect(jqXHR.getResponseHeader('server')).to.equal('Test Server')
        done()
      })
  })
})

describe('defaults', function () {
  function mockResponse () {
    nock('http://www.example.com')
      .get('/')
      .reply(function (uri, requestBody) {
        if (this.req.headers.accessible) {
          return [200, 'ok', {}]
        } else {
          return [401, 'Unauthorized', {}]
        }
      })
  }

  it('should dispose of request headers after each request', function (done) {
    mockResponse()
    najax.get('http://www.example.com', {
      beforeSend: function (xhr) {
        xhr.setRequestHeader('accessible', 'true')
      },
      complete: function (data, statusText, jqXHR) {
        expect(jqXHR.status).to.equal(200)
      }
    })

    mockResponse()
    najax.get('http://www.example.com', {
      error: null,
      complete: function (jqXHR, statusText, error) {
        expect(jqXHR, 'request should not succeed').to.be.an('object')
        expect(jqXHR.status).to.equal(401)
        done()
      }
    })
  })
})

describe('errors', function () {
  describe('error response codes', function () {
    [400, 422, 500, 502].forEach(function (code) {
      describe('Status code: ' + code, function () {
        describe('error callback given', function () {
          it('should trigger callback', function (done) {
            nock('http://example.com').post('/').reply(code, 'An Error Occurred... Details here')

            najax({
              url: 'http://example.com',
              type: 'POST',
              error: function (jqXHR, statusText, error) {
                expect(jqXHR.status).to.equal(code)
                expect(jqXHR.responseText).to.equal('An Error Occurred... Details here')

                expect(statusText).to.equal('error')
                expect(error).to.be.an('error')

                done()
              }
            })
          })
        })
      })
    })
  })

  describe('error parsing json response', function () {
    var options = {
      url: 'http://example.com',
      dataType: 'json',
      method: 'POST'
    }

    var response = '<div>Not Json</div>'

    describe('error callback given', function () {
      it('should trigger callback', function (done) {
        nock('http://example.com').post('/').reply(200, response)

        najax(Object.assign({}, options, {
          error: function (jqXHR, statusText, error) {
            expect(jqXHR.status).to.equal(200)
            expect(jqXHR.responseText).to.equal(response)

            expect(statusText).to.equal('parseerror')
            expect(error).to.be.instanceOf(SyntaxError)

            done()
          }
        }))
      })
    })
  })
})

function createSuccess (done) {
  return function (data, statusText) {
    expect(data).to.equal('ok')
    expect(statusText).to.equal('success')
    done()
  }
}

function error (e) {
  throw e
}
