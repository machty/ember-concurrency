/* global describe, it */

it('global test', function () {

})

describe('suite with passing test', function () {
  it('should pass', function () {

  })
})

describe('suite with skipped test', function () {
  it.skip('should skip', function () {

  })
})

describe('suite with failing test', function () {
  it('should fail', function () {
    throw new Error('error')
  })
})

describe('suite with tests', function () {
  it('should pass', function () {

  })

  it.skip('should skip', function () {

  })

  it('should fail', function () {
    throw new Error('error')
  })
})

describe('outter suite', function () {
  describe('inner suite', function () {
    it('inner test', function () {

    })
  })

  it('outter test', function () {

  })
})
