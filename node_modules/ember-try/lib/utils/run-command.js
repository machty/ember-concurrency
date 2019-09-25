'use strict';

const RSVP = require('rsvp');
const extend = require('extend');
const findEmberPath = require('./find-ember-path');
const run = require('./run');

module.exports = function(root, commandArgs, opts) {
  let options = extend({ cwd: root }, opts);
  let runPromise;
  let command = commandArgs[0];
  let actualArgs = commandArgs.slice(1);

  if (command === 'ember') {
    runPromise = findEmberPath(root).then((emberPath) => {
      return run('node', [].concat(`"${emberPath}"`, actualArgs), options);
    });
  } else {
    runPromise = run(command, actualArgs, options);
  }

  return runPromise.then(() => {
    return RSVP.resolve(true);
  }).catch((errorCode) => {
    if (errorCode !== 1) {
      return RSVP.reject(`The command ${commandArgs.join(' ')} exited ${errorCode}`);
    } else {
      return RSVP.resolve(false);
    }
  });
};
