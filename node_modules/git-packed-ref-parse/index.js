module.exports = parse

var lines = require('line-stream')
  , through = require('through')

function parse() {
  var stream = through(write, end)
    , line_number = 0
    , internal = lines()
    , last

  stream.on('pipe', function(source) {
    source.setEncoding('utf8')
  })

  internal.on('data', parse_line)

  internal.on('end', function() {
    if(last) {
      stream.queue(last)
    }
    stream.queue(null)
  })

  return stream

  function write(data) {
    internal.write(data)
  }

  function end() {
    internal.end()
  }

  function parse_line(data) {
    ++line_number
    data = data.replace(/^\s+/, '').replace(/\s+$/, '')

    if(data.charAt(0) === '#') {
      return
    }

    if(data.charAt(0) === '^') {
      if(!last) {
        return stream.emit(
            'error'
          , new Error('unexpected tag commit ref on line '+line_number)
        )
      }
      last.commit = data.slice(1, 41)
      stream.queue(last)
      return
    }

    if(last) {
      stream.queue(last)
    }

    last = {
        hash: data.slice(0, 40)
      , name: data.slice(41)
      , commit: null
    }
  }

}
