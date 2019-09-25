'use strict';

const transpiler = require('babel-core');
const workerpool = require('workerpool');
const Promise = require('rsvp').Promise;
const ParallelApi = require('./parallel-api');

// transpile the input string, using the input options
function transform(string, options) {
  return new Promise(resolve => {
    let result = transpiler.transform(string, ParallelApi.deserialize(options));
    // this is large, not used, and can't be serialized anyway
    delete result.ast;

    resolve(result);
  });
}

// create worker and register public functions
workerpool.worker({
  transform: transform
});
