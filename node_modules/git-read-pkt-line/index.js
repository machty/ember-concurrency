module.exports = readline


var through = require('through')
  , binary = require('bops')
  , SIZE = binary.create(4)

var _ = 0
  , STATE_READY_CHANNEL = _++
  , STATE_READY = _++
  , STATE_RECV = _++
  , STATE_MAYBE_PACK = _++
  , STATE_PACK = _++

function readline(server_mode) {
  var stream = through(write)
    , caps = null
    , expect = 0
    , size = 0
    , accum = []
    , got = 0
    , seen = 0
    , state = parse_size
    , done = false
    , type

  server_mode = !!server_mode

  var divine_capabilities = server_mode ?
    divine_server_capabilities :
    divine_client_capabilities

  return stream

  function write(buf) {
    accum[accum.length] = buf
    got += buf.length

    done = false
    while(!done) {
      state()
    }
    done = false 
  }

  function parse_packfile() {
    stream.queue({
      type: 'packfile'
    , data: take(got)
    , caps: null
    })
    done = true
  }

  function parse_size() {
    type = 'pkt-line'
    if(got < 4) {
      done = true
      return
    }

    var bits = take(4)
      , human = binary.to(bits, 'utf8')

    if(human === 'PACK') {
      accum.unshift(bits)
      got += 4
      state = parse_packfile
      return
    }
 
    size = parseInt(human, 16)
    if(!size) {
      return stream.queue({
        type: 'pkt-flush'
      , data: null
      , caps: null
      })
    }
    size -= 4
    state = parse_first_byte
  }

  function parse_first_byte() {
    if(got < 1) {
      done = true
      return
    }

    state = parse_packet_line

    var peek = accum[0][0]
    type = peek === 1 ? 'packfile' :
          peek === 2 ? 'progress' : 
          peek === 3 ? 'error' : 'pkt-line'
  }

  function parse_packet_line() {
    if(got < size) {
      done = true
      return
    }

    var buf = take(size)
      , check_caps_on = server_mode ? 2 : 1

    ++seen
    if(!caps && seen === check_caps_on) {
      caps = divine_capabilities(buf) 
      if(caps) {
        buf = binary.subarray(buf, 0, caps.idx + 1)
        buf[buf.length - 1] = 0x0A
        caps = caps.caps
      }
    }

    if(type !== 'pkt-line') {
      buf = binary.subarray(buf, 1)
    }
    stream.queue({
        data: buf
      , type: type
      , caps: caps
    })
    state = parse_size
    caps = null 
  }

  function take(num) {
    var portion = []
      , have = 0

    if(num < 0) {
      throw new Error
    }

    while(have < num) {
      var sum = have + accum[0].length
      if(sum > num) {
        portion[portion.length] = binary.subarray(accum[0], 0, num - have)
        accum[0] = binary.subarray(accum[0], num - have)
        break
      }
      portion[portion.length] = accum.shift()
      have += portion[portion.length - 1].length
    }

    got -= num

    return binary.join(portion)
  }
}

function divine_client_capabilities(buf) {
  for(var i = 0, len = buf.length; i < len; ++i) {
    if(buf[i] === 0) {
      break
    }
  }

  if(i === len) {
    return null
  }

  return {
      idx: i
    , caps: binary.to(binary.subarray(buf, i+1, buf.length - 2), 'utf8').split(' ')
  }
}

function divine_server_capabilities(buf) {
  var is_fetch = binary.to(binary.subarray(buf, 0, 4)) === 'want'

  if(is_fetch) {
    for(var i = 45, len = buf.length; i < len; ++i) {
      if(buf[i] === 32) {
        break
      }
    }
  } else {
    for(var i = 0, len = buf.length; i < len; ++i) {
      if(buf[i] === 0) {
        break
      }
    }
  }

  if(i === len) {
    return null
  }

  return {
      idx: i
    , caps: binary.to(binary.subarray(buf, i+1, buf.length - 1), 'utf8').split(' ')
  }
}
