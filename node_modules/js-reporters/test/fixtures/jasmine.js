/* global describe, it, xit, expect */

it('global test', function () {
  expect(true).toBeTruthy()
})

describe('suite with passing test', function () {
  it('should pass', function () {
    expect(true).toBeTruthy()
  })
})

describe('suite with skipped test', function () {
  xit('should skip', function () {

  })
})

describe('suite with failing test', function () {
  it('should fail', function () {
    throw new Error('error')
  })
})

describe('suite with tests', function () {
  it('should pass', function () {
    expect(true).toBeTruthy()
  })

  xit('should skip', function () {

  })

  it('should fail', function () {
    throw new Error('error')
  })
})

describe('outter suite', function () {
  it('outter test', function () {
    expect(true).toBeTruthy()
  })

  describe('inner suite', function () {
    it('inner test', function () {
      expect(true).toBeTruthy()
    })
  })
})
