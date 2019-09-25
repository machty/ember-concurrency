/// @ts-check
'use strict';

const Promise = require('rsvp').Promise;
const Dependencies = require('../dependencies');

module.exports = {
  init() { },

  /**
   * @param ctx {{processString(contents: string, relativePath: string); postProcess(v: any, relativePath: string)}}
   * @param contents {string}
   * @param relativePath {string}
   * @returns {Promise<string>};
   */
  processString(ctx, contents, relativePath) {
    let string = new Promise(resolve => {
      resolve(ctx.processString(contents, relativePath));
    });

    return string.then(value => {
      let normalizedValue = value;

      if (typeof value === 'string') {
        normalizedValue = {
          output: value
        };
      }

      return new Promise(resolve => {
        resolve(ctx.postProcess(normalizedValue, relativePath));
      })
        .then(result => {
          if (result === undefined) {
            throw new Error('You must return an object from `Filter.prototype.postProcess`.');
          }

          return result.output;
        });
    });
  },

  /**
   * By default initial dependencies are empty.
   * @returns {Dependencies}
   */
  initialDependencies(srcDir) {
    // Dependencies start out empty and sealed as if they came from
    // the previous build iteration.
    return (new Dependencies(srcDir)).seal().captureDependencyState();
  },

  /**
   * Seals the dependencies and captures the dependency state.
   * @param dependencies {Dependencies} The dependencies to seal.
   */
  sealDependencies(dependencies) {
    dependencies.seal().captureDependencyState();
  }
};
