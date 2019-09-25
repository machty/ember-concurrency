var fs = require('fs')

exports.findFileSync = function findFileSync (relativePath, includePaths) {
  var matches = []
  for (var i = 0; i < includePaths.length; i++) {
    // We avoid path.join because it's slow
    var fullPath = includePaths[i] + '/' + relativePath
    if (fs.existsSync(fullPath)) {
      return fullPath
    }
  }
  throw new Error('File not found: ' + relativePath +
    '\nin any of the following include paths:\n' +
    includePaths.map(function (includePath) { return '  ' + includePath }).join('\n'))
}
