/* eslint-env mocha */
var expect = require('chai').expect
var failingVersionsRef = require('./failing-versions.js')
var failingVersions = require('./versions-reporting.js')

describe('Versions', function () {
  it('QUnit versions', function () {
    expect(failingVersions['qunitjs']).to.be.deep
      .equal(failingVersionsRef['qunitjs'])
  })

  it('Jasmine versions', function () {
    expect(failingVersions['jasmine']).to.be.deep
      .equal(failingVersionsRef['jasmine'])
  })

  it('Mocha versions', function () {
    expect(failingVersions['mocha']).to.be.deep
      .equal(failingVersionsRef['mocha'])
  })
})
