'use strict';

var flatiron = require('../index');
var expect = require('expect.js');
var fs = require('fs');
var broccoli = require('broccoli-builder');

var builder;

describe('broccoli-flatiron', function(){
  afterEach(function() {
    if (builder) {
      builder.cleanup();
    }
  });

  it('creates the files with default configuration', function(){
    var sourcePath = 'tests/fixtures/assets_one';
    var node = flatiron(sourcePath, {
      outputFile: '/assets/output.json'
    });

    builder = new broccoli.Builder(node);
    return builder.build().then(function(results) {
      var expectedOutput = {
        one: {
          'something.txt': 'Something'
        }
      };
      expectedOutput = 'export default ' + JSON.stringify(expectedOutput, null, 2) + ';';
      expect(fs.readFileSync(results.directory + '/assets/output.json', {encoding: 'utf8'})).to.eql(expectedOutput);
    });
  });

  it('creates the files with "trimExtensions" enabled', function(){
    var sourcePath = 'tests/fixtures/assets_one';
    var node = flatiron(sourcePath, {
      outputFile: '/assets/output.json',
      trimExtensions: true
    });

    builder = new broccoli.Builder(node);
    return builder.build().then(function(results) {
      var expectedOutput = {
        one: {
          something: 'Something'
        }
      };
      expectedOutput = 'export default ' + JSON.stringify(expectedOutput, null, 2) + ';';
      expect(fs.readFileSync(results.directory + '/assets/output.json', {encoding: 'utf8'})).to.eql(expectedOutput);
    });
  });

  it('creates the files with custom "prefix" and "suffix"', function(){
    var sourcePath = 'tests/fixtures/assets_one';
    var node = flatiron(sourcePath, {
      outputFile: '/assets/output.json',
      prefix: 'my-prefix ',
      suffix: 'my-suffix'
    });

    builder = new broccoli.Builder(node);
    return builder.build().then(function(results) {
      var expectedOutput = {
        one: {
          'something.txt': 'Something'
        }
      };
      expectedOutput = 'my-prefix ' + JSON.stringify(expectedOutput, null, 2) + 'my-suffix';
      expect(fs.readFileSync(results.directory + '/assets/output.json', {encoding: 'utf8'})).to.eql(expectedOutput);
    });
  });

  it('creates the files with multiple assets', function(){
    var sourcePath = 'tests/fixtures/assets_multiple';
    var node = flatiron(sourcePath, {
      outputFile: '/assets/output.json'
    });

    builder = new broccoli.Builder(node);
    return builder.build().then(function(results) {
      var expectedOutput = {
        one: {
          'something.txt': 'Something'
        },
        two: {
          'other.txt': 'Other'
        }
      };
      expectedOutput = 'export default ' + JSON.stringify(expectedOutput, null, 2) + ';';
      expect(fs.readFileSync(results.directory + '/assets/output.json', {encoding: 'utf8'})).to.eql(expectedOutput);
    });
  });
});
