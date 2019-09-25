'use strict';

const path = require('path');
const fs = require('fs');
function readFile(path){
  if (fs.existsSync(path)) {
    return fs.readFileSync(path);
  }
}

module.exports = function readPackageJSON(projectRoot) {
  const filePath = path.join(projectRoot, 'package.json');
  try {
    return JSON.parse(readFile(filePath));
  } catch (e) {
    return null;
  }
};
