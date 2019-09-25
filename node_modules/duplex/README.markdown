# duplex

<img src=https://secure.travis-ci.org/dominictarr/duplex.png?branch=master>


Simple base class for [duplex](https://github.com/dominictarr/stream-spec#duplex) streams, that automatically handles pausing and buffering.

``` js

var duplex = require('duplex')

var d = duplex()
  .on('_data', function (data) {
    d.sendData(data)
  })
  .on('_end', function () {
    d.sendEnd()
  })
```

## API

### on('_data', function (data))

Emitted when `write(data)` is called.

### on('_end', function ())

Emitted when `end()` is called

### _data(data)

Add `data` to the output buffer. 
`'data'` will be emitted if the stream is not paused.

### _end()

Cap the output buffer. no more data events may be added.
`'end'` will be emitted after the buffer drains, 
or immediately, if the stream is unpaused.

### pause()

Pause the readable side of the stream.  
This will prevent it from emitting 'data' or or 'end'
until resume is called.

### resume()
Unpause the readable side of the stream.  
This will allow it to emit `'data'` and `'end'` events.  
If there there is any data in the output buffer,  
It will start draining immediately.  

## _pause(), emit('pause')

Pause the writable side of the stream. this will cause write() to return false,
so any streams piping into this stream will pause after thier next write.

## emit('drain')

Unpause the writable side of the stream. This will cause `Stream#pipe` to call `resume()`
on any streams piping to this stream.

## Automatic Behaviours

`destroy()` is called automatically after both sides of the stream have ended.
`write()==false` after the stream emits `'pause'`,  
and `write()==true` after the stream emits `'drain'`.
The user is responsible for emitting `'pause'` and `'drain'`.

`resume()` will be called on `nextTick`, unless `pause()` was called manually.
If `resume()` is manually called before the `nextTick`, the stream will start emitting data
immediately.

## License

MIT / APACHE 2
