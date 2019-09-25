module.exports = transport

var write_pkt = require('git-write-pkt-line')
  , read_pkt = require('git-read-pkt-line')
  , emit = require('emit-function')
  , through = require('through')
  , duplex = require('duplex')

function transport(conn, server_mode) {
  var outer = duplex()
    , send = write_pkt()
    , recv = read_pkt(server_mode)
    , raw_send = through()
    , raw = false

  outer.setRawMode = function(tf) {
    return raw = tf === undefined ? true : tf
  }

  outer
    .on('_data', recv_data)
    .on('_end', recv_end)

  raw_send
    .on('error', emit(outer, 'error'))
    .on('drain', emit(outer, 'drain'))
    .on('drain', function() { outer.resume() })

  send
    .on('error', emit(outer, 'error'))
    .on('drain', emit(outer, 'drain'))
    .on('drain', function() { outer.resume() })

  recv
    .on('error', emit(outer, 'error'))
    .on('data', output)
    .on('end', outer._end)

  send.pipe(conn).pipe(recv)
  raw_send.pipe(conn)

  return outer

  function recv_data(buf) {
    var target = raw ? raw_send : send

    if(target.write(buf) === false) {
      outer.pause()
    }
  }

  function recv_end() {
    send.end()    
  }

  function output(data) {
    outer._data(data)
  }
}
