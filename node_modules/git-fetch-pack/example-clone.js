var net = require('net')
  , fs = require('fs')

var gitclient = require('./index')
  , transport = require('git-transport-protocol')
  , load = require('git-fs-repo')
  , walk = require('git-walk-refs')

// replace this with a path to a repo you've got locally!
var dir = '/Users/chris/projects/experiments/plate/.git'

load(dir, function(err, git) {
  var refs = git.refs()
    , hashes = refs.map(function(x) { return x.hash })
    , tcp = net.connect({host: 'github.com', port: 9418})
    , client

  // given a want(ref, ready) function and a stream
  // of all of the commits the repo has in reverse
  // chronological order, we can negotiate a sweet
  // packfile from the remote!
  function want(ref, ready) {
    if(ref.name === 'refs/heads/master') {
      return ready(true)
    }
    return ready(false)
  }
  client = gitclient(
      'git://github.com/chrisdickinson/plate.git'
    , want
  )
 
  // output ref data from the remote server! `refs`
  // is a readable stream. 
  client.refs.on('data', console.log)

  // pipe client to the transport and back to client.
  client
    .pipe(transport(tcp))
    .pipe(client)

  // when we get packfile data, it'll come out of this
  // readable stream.
  client.pack.pipe(fs.createWriteStream('client-output'))

  return
})

