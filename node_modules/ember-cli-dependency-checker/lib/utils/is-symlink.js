const fs = require('fs');

module.exports = function isSymlink(path) {
  if (fs.existsSync(path)) {
    const stats = fs.lstatSync(path);
    return stats.isSymbolicLink();
  } else {
    return false;
  }
};
