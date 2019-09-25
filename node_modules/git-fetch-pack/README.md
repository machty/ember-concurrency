# git-fetch-pack

git's smart fetch pack protocol (the one that
calls `upload-pack` on the server).

can be used to download packfiles (fetch or clone!) or to list remote branches.

```javascript
var net = require('net')
  , fs = require('fs')

var gitclient = require('git-fetch-pack')()
  , transport = require('git-transport-protocol')
  , load = require('git-fs-repo')
  , walk = require('git-walk-refs')

load('/path/to/repo/.git', function(err, git) {
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
    , walk(git.find, hashes)
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
})
```

## API

#### client(hostinfo[, want_function][, have_stream][, capabilities]) -> client duplex stream

create a client for communicating with `hostinfo` that uses `want_function`
to determine which branches to ask for, and can provide a list of already-present
commits using `have_stream`.

by providing the `want_function` argument (which takes a `ref` object and a `ready` callback) but no others, you may emulate a `git clone`.

by additionally providing a `have_stream` (usually using [git-walk-refs](http://npm.im/git-walk-refs)), you can emulate a `git fetch`.

by providing `capabilities`, you enable the ability to blow your foot off, mostly; since by default this module does not support either side-band protocol.


#### Ref objects

```javascript
{ "hash": "git hash"
, "name": "refs/heads/master" // for example
, "commit": null | "hash" }   // for annotated tags
```

#### `want_function`

```javascript
function want(ref, ready) {
  // do you want this ref object?
  ready(true) // sure do
  ready() || ready(false) || ready('') // sure don't.
}
```

#### stream.pack

A readable stream of packfile data.

#### stream.refs

A readable stream of remote references.

## License

MIT
