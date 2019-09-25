module.exports = function parseOptions (url, options, callback) {
  var opts = {}
  if (typeof url === 'string') {
    opts.url = url
  } else {
    opts = Object.assign(opts, url)
  }
  if (typeof options === 'function') {
    opts.success = options
  } else {
    if (typeof callback === 'function') opts.success = callback
    opts = Object.assign(opts, options)
  }

  // support legacy jquery options.type
  if (!opts.method && opts.type) {
    opts.method = opts.type
  }

  return opts
}
