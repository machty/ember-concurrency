var assert = require('assert')
var duplex = require('..')

function test(message, func) {
  console.log('#', message)
  func(duplex())
}


test("write(data) -> emit('_data', data)", function (d) {
  var a = null
  d.on('_data', function (d) {
    a = d
  })
  var e = Math.random()
  d.write(e)
  assert.equal(a, e)  
})

test("emit('pause') -> write(data) === false", function (d) {
  var a = null
  assert.equal(d.write(1), true)
  d.emit('pause')
  assert.equal(d.write(2), false)
  d.emit('drain')
  assert.equal(d.write(3), true)
})

test("_data(data) -> emit('data', data)", function (d) {

  var a = null, e
  d.on('data', function (d) {
    a = d
  })
  d.pause()
  assert.equal(a, null)  
  d._data(e = Math.random())
  assert.equal(a, null)
  d.resume()
  assert.equal(a, e) 
})

test("_end(data) -> emit('end', data)", function (d) {

  var a = false

  d.on('end', function (d) {
    a = true
  })

  d.pause()
  d._end()
  assert.equal(a, false, 'pause should buffer end')
  d.resume()
  assert.equal(a, true, 'resume should drain end')
  assert.equal(d.readable, false, 'emitting end should set readable = false')
})

test('end() -> emit(\'_end\')', function (d) {

  var a = false
  d.on('_end', function (d) {
    a = true
  })

  assert.equal(d.writable, true,'writable should start true')
  d.end()
  assert.equal(d.writable, false,'emitEnd should set writable=false')
  d.resume()
  assert.equal(a, true) 

})

test('end() & emit(\'end\') -> emit(\'close\')', function(d){
  var a = false

  d.on('close', function () {
    a = true
  })

  assert.equal(a, false)
  d._end()
  d.end()
  d.resume()
  process.nextTick(function () {
    assert(a, true, 'destroy is called after both ends finish')
  })
})

test('start in nextTick', function () {
  var a = null, e = null
  process.nextTick(function () {
    assert.equal(a, null)
  })
  //use this d, so I have a chance to set an earlier nextTick. 
  d = duplex()

  d.on('data', function (data) {
    a = data
  })

  d._data(e = Math.random())
  
  process.nextTick(function () {
    assert.equal(a, e)
  }) 

})
