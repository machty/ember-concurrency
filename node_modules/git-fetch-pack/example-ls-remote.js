var net = require('net')

var gitclient = require('./index')
  , transport = require('git-transport-protocol')
  , tcp = net.connect({host: 'github.com', port: 9418})

client = gitclient(
  'git://github.com/chrisdickinson/plate.git'
)

// output ref data from the remote server! `refs`
// is a readable stream. 
client.refs.on('data', console.log)

// pipe client to the transport and back to client.
client
  .pipe(transport(tcp))
  .pipe(client)

// this won't output anything, since we're just
// listing remotes:
client.pack.on('data', console.log)
