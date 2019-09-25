var parse = require('./index')
  , test = require('tape')
  , fs = require('fs')

var test_data = require('./example-packed-refs')
  , expect

expect = [
  { hash: '62c8aea0c531b0ba62dcc72f15d299b280ba9f00',
  name: 'refs/heads/arrayvectors',
  commit: null }
, { hash: '846913aea0d42275542aec23e5cbb9df151ba301',
  name: 'refs/heads/feature/attractors',
  commit: null }
, { hash: '98ee741299874f0dbc9478a97d7d73258a819060',
  name: 'refs/heads/master',
  commit: null }
, { hash: '62c8aea0c531b0ba62dcc72f15d299b280ba9f00',
  name: 'refs/remotes/maxogden/arrayvectors',
  commit: null }
, { hash: 'efa74713afeffb2d6ed91b2e09b053d689c6faf2',
  name: 'refs/remotes/maxogden/master',
  commit: null }
, { hash: '98ee741299874f0dbc9478a97d7d73258a819060',
  name: 'refs/remotes/origin/master',
  commit: null }
, { hash: '846913aea0d42275542aec23e5cbb9df151ba301',
  name: 'refs/remotes/richo/features/attractors',
  commit: null }
, { hash: '3037af20b9be6415495774e92c34063eea73ce31',
  name: 'refs/remotes/richo/master',
  commit: null }
, { hash: 'fe3ceaf4f165812ef6c9a83cd9a5e83a5abc20a9',
  name: 'refs/tags/v0.0.3',
  commit: 'f8f36c9fa55cf6d525d686b1010adf2b3870a4e9' }
, { hash: 'fe3ceaf4f165812ef6c9a83cd9a5e83a5abc20a9',
  name: 'refs/tags/v0.0.3',
  commit: 'f8f36c9fa55cf6d525d686b1010adf2b3870a4e9' }
, { hash: '70c92e69ab0c3953a0752e7ec79ae349027ae1e7',
  name: 'refs/tags/v0.0.4',
  commit: '95a0740f93cb22d3d0fc20cc5d616ed12136855f' }
, { hash: '70c92e69ab0c3953a0752e7ec79ae349027ae1e7',
  name: 'refs/tags/v0.0.4',
  commit: '95a0740f93cb22d3d0fc20cc5d616ed12136855f' }
, { hash: 'd8d196b3298f32976c52712c279c052e1ad72196',
  name: 'refs/tags/v0.0.5',
  commit: 'efa74713afeffb2d6ed91b2e09b053d689c6faf2' }
, { hash: 'd8d196b3298f32976c52712c279c052e1ad72196',
  name: 'refs/tags/v0.0.5',
  commit: 'efa74713afeffb2d6ed91b2e09b053d689c6faf2' }
, { hash: 'eec4bb7b7a8bd539d54398b6b81fa47c975f0fc1',
  name: 'refs/tags/v0.0.6',
  commit: '68c067c6e5910a050416127f6556ad0869343795' }
, { hash: 'eec4bb7b7a8bd539d54398b6b81fa47c975f0fc1',
  name: 'refs/tags/v0.0.6',
  commit: '68c067c6e5910a050416127f6556ad0869343795' }
, { hash: 'a886d739baeae0a8da8823d8c0c6c9452d058837',
  name: 'refs/tags/v0.0.7',
  commit: '98ee741299874f0dbc9478a97d7d73258a819060' }
, { hash: 'a886d739baeae0a8da8823d8c0c6c9452d058837',
  name: 'refs/tags/v0.0.7',
  commit: '98ee741299874f0dbc9478a97d7d73258a819060' }] 

test('works as expected', function(assert) {
  var parser = parse()
    , seen = []

  parser
    .on('data', ondata)
    .on('end', onend)

  parser.write(test_data)
  parser.end()

  function ondata(data) {
    seen.push(data)
  }

  function onend() {
    assert.deepEqual(seen, expect)
    assert.end()
  }
})

