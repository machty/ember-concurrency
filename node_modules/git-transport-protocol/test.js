var test = require('tape')
  , transport = require('./index')
  , through = require('through')
  , binary = require('bops')

test('works as expected', function(assert) {

  var client = transport(through())
    , message = 'hi there random-'+Math.random()

  client.on('data', function(d) {
    assert.equal(binary.to(d.data, 'utf8'), message+'\n')
    assert.end()
  })

  client.write(binary.from(message, 'utf8'))
})

