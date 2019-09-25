# git-read-pkt-line

Read [git smart protocol packet lines](https://www.kernel.org/pub/software/scm/git/docs/v1.7.0.5/technical/pack-protocol.txt).

```javascript
var recv = require('git-write-pkt-line')()

recv.on('data', function(d) {
  console.log(d)
})

send.write('0032want 0000000000000000000000000000000000000000\n')

```

## API

this module presents a `through` stream; when written to it removes the
length header; but it leaves the newline ending. if an empty string or buffer is written, it will
emit a git "flush packet", which is just a size-0 packet. 

after each line received, it checks to see if the next line starts with `PACK`; and if so will enter recv-pack mode. 

## data event

```javascript
{ type: 'packfile' | 'pkt-line' | 'pkt-flush' | 'progress' | 'error'
, data: null | Buffer()
, caps: ['list', 'of', 'capabilities'] }
```

> ## Warning
>
> This module simply passes pack data through.
> If the source is set to emit `side-band` or `side-band-64k`
> type data, you'll have to use another module to separate
> that multiplexed data out.

## License

MIT
