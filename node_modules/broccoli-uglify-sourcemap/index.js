'use strict';

const walkSync = require('walk-sync');
const Plugin = require('broccoli-plugin');
const path = require('path');
const defaults = require('lodash.defaultsdeep');
const symlinkOrCopy = require('symlink-or-copy');
const mkdirp = require('mkdirp');
const MatcherCollection = require('matcher-collection');
const debug = require('debug')('broccoli-uglify-sourcemap');
const queue = require('async-promise-queue');
const workerpool = require('workerpool');

const processFile = require('./lib/process-file');

module.exports = UglifyWriter;

UglifyWriter.prototype = Object.create(Plugin.prototype);
UglifyWriter.prototype.constructor = UglifyWriter;

const silent = process.argv.indexOf('--silent') !== -1;

const worker = queue.async.asyncify(doWork => doWork());

const MatchNothing = {
  match() {
    return false;
  },
};

function UglifyWriter(inputNodes, options) {
  if (!(this instanceof UglifyWriter)) {
    return new UglifyWriter(inputNodes, options);
  }

  inputNodes = Array.isArray(inputNodes) ? inputNodes : [inputNodes];

  Plugin.call(this, inputNodes, options);

  this.options = defaults(options, {
    uglify: {
      sourceMap: {},
    },
  });

  // consumers of this plugin can opt-in to async and concurrent behavior
  this.async = (this.options.async === true);
  this.concurrency = Number(process.env.JOBS) || this.options.concurrency || Math.max(require('os').cpus().length - 1, 1);

  // create a worker pool using an external worker script
  this.pool = workerpool.pool(path.join(__dirname, 'lib', 'worker.js'), { maxWorkers: this.concurrency });

  this.inputNodes = inputNodes;

  let exclude = this.options.exclude;
  if (Array.isArray(exclude)) {
    this.excludes = new MatcherCollection(exclude);
  } else {
    this.excludes = MatchNothing;
  }
}

UglifyWriter.prototype.build = function() {
  let writer = this;

  // when options.async === true, allow processFile() operations to complete asynchronously
  let pendingWork = [];

  this.inputPaths.forEach(inputPath => {
    walkSync(inputPath).forEach(relativePath => {
      if (relativePath.slice(-1) === '/') {
        return;
      }
      let inFile = path.join(inputPath, relativePath);
      let outFile = path.join(writer.outputPath, relativePath);

      mkdirp.sync(path.dirname(outFile));

      if (relativePath.slice(-3) === '.js' && !writer.excludes.match(relativePath)) {
        // wrap this in a function so it doesn't actually run yet, and can be throttled
        let uglifyOperation = function() {
          return writer.processFile(inFile, outFile, relativePath, writer.outputPath);
        };
        if (writer.async) {
          pendingWork.push(uglifyOperation);
          return;
        }
        return uglifyOperation();
      } else if (relativePath.slice(-4) === '.map') {
        if (writer.excludes.match(`${relativePath.slice(0, -4)}.js`)) {
          // ensure .map files for excluded JS paths are also copied forward
          symlinkOrCopy.sync(inFile, outFile);
        }
        // skip, because it will get handled when its corresponding JS does
      } else {
        symlinkOrCopy.sync(inFile, outFile);
      }
    });
  });

  return queue(worker, pendingWork, writer.concurrency)
    .then((/* results */) => {
      // files are finished processing, shut down the workers
      writer.pool.terminate();
      return writer.outputPath;
    })
    .catch(e => {
      // make sure to shut down the workers on error
      writer.pool.terminate();
      throw e;
    });
};

UglifyWriter.prototype.processFile = function(inFile, outFile, relativePath, outDir) {
  // don't run this in the workerpool if concurrency is disabled (can set JOBS <= 1)
  if (this.async && this.concurrency > 1) {
    debug('running in workerpool, concurrency=%d', this.concurrency);
    // each of these arguments is a string, which can be sent to the worker process as-is
    return this.pool.exec('processFileParallel', [inFile, outFile, relativePath, outDir, silent, this.options]);
  }
  debug('not running in workerpool');
  return processFile(inFile, outFile, relativePath, outDir, silent, this.options);
};
