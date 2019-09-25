var test = require('tape')
  , send = require('./index')
  , binary = require('bops')

test('works as expected', function(assert) {
  var stream = send()
    , idx = 0
    , expect
    , data
      
  data = [
      '0007hi\n'
    , '0032want 0000000000000000000000000000000000000000\n'
    , '0000'
    , '001bhi\0ofs-delta hat party\n'
    , 'PACK0123456678999'
  ]
  expect = [
      {size:3, data:'hi\n', type:'pkt-line', caps:null}
    , {size:0x2e, data:'want 0000000000000000000000000000000000000000\n', type:'pkt-line', caps:null}
    , {size:0, data:null, type:'pkt-flush', caps:null}
    , {size:3, data:'hi\n', type:'pkt-line', caps:['ofs-delta', 'hat', 'party']}
    , {size:17, data:'PACK0123456678999', type:'packfile', caps:['ofs-delta', 'hat', 'party']}
  ]


  stream.on('data', function(d) {
    d.data = d.data === null ? d.data : binary.to(d.data, 'utf8')
    assert.deepEqual(d, expect[idx++]) 
  })

  do {
    if(data[idx]) {
      stream.write(binary.from(data[idx], 'utf8'))
    } else {
      stream.end()
    }
  } while(idx !== expect.length)
  assert.end()
})
