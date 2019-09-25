module.exports = client

var through = require('through')
  , parseref = require('git-packed-ref-parse')
  , emit = require('emit-function')
  , binary = require('bops')
  , url = require('url')

var _ = 0
  , STATE_ADVERTISE = _++
  , STATE_ACKNAK = _++
  , STATE_SENDPACK = _++

// to fetch, we need to know:
//  * the hostinfo
//  * what caps we have
//  * the refs we have
//  * what refs we want

function client(hostinfo, want_function, have_stream, capabilities) {
  hostinfo = typeof hostinfo === 'string' ? url.parse(hostinfo) : hostinfo || {}
  capabilities = capabilities || ['thin-pack', 'include-tag', 'side-band-64k', 'multi_ack_detailed', 'ofs-delta']
  have_stream = have_stream || none_stream()
  want_function = want_function || function(ref, ready) { return ready(false) }


  var stream = through(recv, end)
    , packstream = through(writepack)
    , progress = through(sideband)
    , error = through(sideband)
    , refparser = parseref()
    , refstream = through()
    , state = STATE_ADVERTISE
    , server_flushed = false
    , pending_wants = 0
    , negotiated = null
    , sent_caps = false
    , last_have = null
    , wrotehave = 0
    , wants = []

  if(have_stream) {
    have_stream.setMaxListeners(Infinity)
  }

  have_stream.pause()
  have_stream
    .on('data', gothave)
    .on('end', function() {
      state = STATE_SENDPACK
      write({
          type: 'pkt-line'
        , data: 'done'
      })
    })

  refparser
    .on('data', on_ref)
    .on('error', emit(stream, 'error'))

  stream.pack = packstream
  stream.progress = progress
  stream.error = error
  stream.refs = refstream
  process.nextTick(start)

  return stream

  function start() {
    if(stream.paused) {
      return stream.once('drain', start)
    }

    stream.queue({
        type: 'pkt-line'
      , data:
          'git-upload-pack '+
          hostinfo.pathname+
          '\0host='+hostinfo.hostname+'\0'
    })
  }

  function gothave(commit) {
    write({
        type: 'pkt-line'
      , data: 'have '+commit.hash
    })
    ++wrotehave
    if(wrotehave % 16 === 0) {
      write({type: 'pkt-flush'})
    } 

    if(wrotehave === 256) {
      write({type: 'pkt-flush'})
      have_stream.end()
    }
  }

  function writepack(packet) {
    if(packet.type !== 'packfile') {
      return
    }
    packstream.queue(packet.data)
  }

  function sideband(packet) {
    this.queue(packet.data)
  }

  function write(what) {
    if(negotiated && !sent_caps && what.type === 'pkt-line') {
      what.data += ' '+negotiated.join(' ')
      console.log(what.data)
      sent_caps = true
    }
    if(what.type === 'pkt-line') {
      what.data += '\n'
    }
    if(what.data) {
      what.data = binary.from(what.data, 'utf8')
    }
    stream.queue(what)
  }

  function recv(packet) {
    if(!negotiated && packet.caps) {
      negotiated = []
      for(var i = 0, len = capabilities.length; i < len; ++i) {
        if(packet.caps.indexOf(capabilities[i]) > -1) {
          negotiated[negotiated.length] = capabilities[i]
        }
      }
    }

    if(state === STATE_ADVERTISE) {
      return state_advertise(packet)
    }

    if(state === STATE_ACKNAK) {
      return state_acknak(packet)
    }

    if(state === STATE_SENDPACK) {
      var to = packet.type === 'packfile' ? packstream :
               packet.type === 'error' ? error :
               packet.type === 'progress' ? progress : through()

      to.write(packet)
    }
  }

  function end() {
    stream.queue(null)
  }

  function state_advertise(packet) {
    if(packet.type === 'pkt-flush') {
      server_flushed = true
      if(!pending_wants) {
        wants.length ? enter_acknak() : stream.queue(null)
      }
      return
    }

    refparser.write(binary.to(packet.data, 'utf8'))
  }

  function on_ref(ref) {
    refstream.queue(ref)
    ++pending_wants
    want_function(ref, function(want_ref) {
      if(want_ref) {
        wants.push(ref)
      }
      --pending_wants 
      if(!pending_wants && server_flushed) {
        enter_acknak()
      }
    })
  }

  function enter_acknak() {
    state = STATE_ACKNAK

    for(var i = 0, len = wants.length; i < len; ++i) {
      write({
          type: 'pkt-line'
        , data: 'want '+wants[i].hash
      })
    }

    write({
      type: 'pkt-flush'
    })

    have_stream.resume()
  }

  function state_acknak(packet) {
    if(packet.type === 'pkt-flush') {
      return
    }
    var acknak = parse_acknak(packet.data)
    if(acknak.acked) {
      have_stream.write(acknak.hash)
    }
  }
}

function parse_ref(data) {
  data = (data+'').split(' ')

  return {
    hash: data[0].replace(/\n$/, '')
  , name: data[1].replace(/\n$/, '')
  }
}

function parse_acknak(data) {
  data = (data+'').split(' ')

  return {
    acked: data[0] === 'ACK'
  , hash: data[1] ? data[1].replace(/\n$/, '') : null
  , mode: data[2] ? data[2].replace(/\n$/, '') : null
  }
}

function none_stream() {
  var stream = through()
  stream.pause()
  stream.once('drain', function() {
    stream.queue(null)
  })
  return stream
}
