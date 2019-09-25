# git-write-pkt-line

Write [git smart protocol packet lines](https://www.kernel.org/pub/software/scm/git/docs/v1.7.0.5/technical/pack-protocol.txt).

```javascript
var send = require('git-write-pkt-line')()

send.on('data', function(d) {
  console.log(d)
})

send.write('want 0000000000000000000000000000000000000000')

```

## API

this module presents a `through` stream; when written to it adds the appropriate
length header and newline ending. if an empty string or buffer is written, it will
send a git "flush packet", which is just a size-0 packet.

## License

MIT
