var test = require('tape')
  , EE = require('events').EventEmitter
  , emit = require('./index')

test('works as expected', function(assert) {
  var ee_1 = new EE
    , ee_2 = new EE
    , ev = 'data-'+Math.random()
    , curried = Math.random()
    , called = Math.random()

  ee_1.on(ev, emit(ee_2, ev, curried))

  ee_2.once(ev, function(arg1, arg2) {
    assert.equal(arguments.length, 2)
    assert.equal(arg1, curried)
    assert.equal(arg2, called)
    assert.end()
  }) 

  ee_1.emit(ev, called)
})
