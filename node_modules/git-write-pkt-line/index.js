module.exports = writeline

var through = require('through')
  , binary = require('bops')
  , SIZE = binary.create(4)

function writeline() {
  var stream = through(write, end)

  return stream

  function write(message) {
    var bufs
    switch(message.type) {
      case 'pkt-line':
        bufs = pkt_line(message.data)
      break
      case 'pkt-flush':
        bufs = pkt_flush()
      break
      case 'error':
        bufs = pkt_sideband(SIDEBAND_ERROR, message.data, message.sideband || 65535)
      break
      case 'progress':
        bufs = pkt_sideband(SIDEBAND_PROGRESS, message.data, message.sideband || 65535)
      break
      case 'packfile':
        bufs = message.sideband ?
          pkt_sideband(SIDEBAND_PACKFILE, message.data, message.sideband || 65535) :
          [message.data]
      break 
    }

    while(bufs.length) {
      this.queue(bufs.shift())
    }
  }

  function end() {
    this.queue(null)
  }

}

function pkt_line(data) {
  return [fourbyte(4 + data.length, binary.create(4)), data]
}

function pkt_flush(data) {
  return [binary.from([0x30, 0x30, 0x30, 0x30])]
}

function pkt_sideband(band, data, size) {
  var output = []
    , idx = 0

  do {
    output[output.length] = fourbyte(Math.min(data.length, size - 1), binary.create(4))
    output[output.length] = binary.from([band])
    output[output.length] = binary.subarray(data, 0, Math.min(data.length, size - 1))
    data = binary.subarray(data, 0, Math.min(data.length, size - 1)) 
  } while(data.length > size - 1)

  return output
}

function fourbyte(num, into) {
  num = num.toString(16)
  while(num.length < 4) {
    num = '0'+num
  }
  into[0] = num.charCodeAt(0)
  into[1] = num.charCodeAt(1)
  into[2] = num.charCodeAt(2)
  into[3] = num.charCodeAt(3)
  return into
}
