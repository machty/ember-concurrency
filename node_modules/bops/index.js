var proto = {}
module.exports = proto

proto.from = require('./from')
proto.to = require('./to')
proto.subarray = require('./subarray')
proto.join = require('./join')
proto.copy = require('./copy')
proto.create = require('./create')

mix(require('./read'), proto)
mix(require('./write'), proto)

function mix(from, into) {
  for(var key in from) {
    into[key] = from[key]
  }
}
