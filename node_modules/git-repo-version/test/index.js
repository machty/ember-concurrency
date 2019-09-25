var assert = require('assert');
var getVersion = require('../index.js');
var packageVersion = require('../package.json').version;

describe('getVersion', function () {
  it('should return default output (version number + sha)', function () {
    var result = getVersion();
    var revision = require('child_process').execSync('git rev-parse HEAD').toString().trim().substring(0, 8);
    var expected = packageVersion + '+' + revision;

    assert.equal(result, expected);
  });

  it('should return custom sha length', function () {
    const shaLength = 5;
    var result = getVersion({ shaLength: shaLength });
    var revision = require('child_process').execSync('git rev-parse HEAD').toString().trim().substring(0, 5);
    var expected = packageVersion + '+' + revision;

    assert.equal(result, expected);
  });

  it('should return full sha', function () {
    const shaLength = 40;
    var result = getVersion({ shaLength: shaLength });
    var revision = require('child_process').execSync('git rev-parse HEAD').toString().trim();
    var expected = packageVersion + '+' + revision;

    assert.equal(result, expected);
  });

  it('should not include sha when shaLength set to zero', function () {
    const shaLength = 0;
    var result = getVersion({ shaLength: shaLength });
    var expected = packageVersion;

    assert.equal(result, expected);
  });

  it('should include date', function () {
    var result = getVersion({ includeDate: true });
    var revision = require('child_process').execSync('git rev-parse HEAD').toString().trim().substring(0, 8);
    var lastCommitDate = require('child_process').execSync('git log -1 --format=%ai').toString().trim();
    var isoDate = new Date(lastCommitDate).toISOString();
    var expected = packageVersion + '+' + revision + ' ' + isoDate;

    assert.equal(result, expected);
  });
});
