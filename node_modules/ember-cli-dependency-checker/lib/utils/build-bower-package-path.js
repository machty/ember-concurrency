const path = require('path');

module.exports = function buildBowerPackagePath(project, name) {
  return path.join(project.bowerDirectory, name);
};
