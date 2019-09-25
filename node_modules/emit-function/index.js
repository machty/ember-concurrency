var EE = require('events').EventEmitter
  , emit = EE.prototype.emit

module.exports = emit.bind.bind(emit)
