'use strict';

const workerpool = require('workerpool');

const processFile = require('./process-file');

// TODO - with an option to disable this parallelism
function processFileParallel(inFile, outFile, relativePath, outDir, silent, _options) {
  return processFile(inFile, outFile, relativePath, outDir, silent, _options);
}

// create worker and register public functions
workerpool.worker({
  processFileParallel,
});
