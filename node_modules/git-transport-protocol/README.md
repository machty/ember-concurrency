# git-transport-protocol

wrap a r/w stream in this transport r/w stream
for transforming writes into valid git packet lines,
and reads from git packet lines into [JS objects](http://npm.im/git-read-pkt-line).

```javascript
var net = require('net')
  , transport = require('git-transport-protocol')
  , client
  , tcp

tcp = net.connect({host: 'github.com', port: 9418})

client = transport(tcp)

client.on('data', function(data) {
  // data will be JS objects
})

// start a fetch
client.write('git-upload-pack /chrisdickinson/plate.git\0host=github.com\0')

```

## API

#### transport(connection) -> client

wrap any readable/writable stream with git-packet-line senders and receivers.

#### client.setRawMode([true]) -> rawmode boolean

enter or exit "raw" mode -- this makes writes skip the
pkt-write portion of the stream and go directly to the 
connection.

this is useful for, e.g., sending packfile data.

## License

MIT
