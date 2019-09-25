'use strict';

const UI      = require('./');
const through = require('through2');

module.exports = class MockUI extends UI {
  constructor(options) {
    super({
      inputStream: through(),
      outputStream: through((data, enc, callback) => {
        if (options && options.outputStream) {
          options.outputStream.push(data);
        }

        this.output += data;

        callback();
      }),
      errorStream: through((data, enc, callback) => {
        this.errors += data;

        callback();
      })
    });

    this.output = '';
    this.errors = '';
    this.errorReport = '';
    this.errorLog = options && options.errorLog || [];
  }

  clear() {
    this.output = '';
    this.errors = '';
    this.errorLog = [];
  }
}
