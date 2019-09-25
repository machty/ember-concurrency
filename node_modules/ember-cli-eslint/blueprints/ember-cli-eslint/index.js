/*eslint-env node*/

var unlink = require('fs').unlink;
var resolve = require('path').resolve;

var RSVP = require('rsvp');
var walkSync = require('walk-sync');

/**
 * For each item in the array, call the callback, passing the item as the argument.
 * However, only call the next callback after the promise returned by the previous
 * one has resolved.
 *
 * @param {*[]} items the elements to iterate over
 * @param {Function} cb called for each item, with the item as the parameter. Should return a promise
 * @return {Promise}
 */
function synchronize(items, cb) {
  return items.reduce(function(promise, item) {
    return promise.then(function() {
      return cb.call(this, item);
    });
  }, RSVP.resolve());
}

module.exports = {
  name: 'ember-cli-eslint',

  normalizeEntityName() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall() {
    var removeJSHintDep;
    if (this.removePackageFromProject && 'ember-cli-jshint' in this.project.dependencies()) {
      removeJSHintDep = this.removePackageFromProject('ember-cli-jshint');
    } else {
      removeJSHintDep = Promise.resolve();
    }

    var removeJSHintConfig = this._removeJSHintConfig.bind(this);

    return removeJSHintDep.then(function() {
      return removeJSHintConfig();
    });
  },

  /**
   * Find JSHint configuration files and offer to remove them
   *
   * @return {RSVP.Promise}
   */
  _removeJSHintConfig() {
    var promptRemove = this._promptRemove.bind(this);
    var removeFile = this._removeFile.bind(this);
    var ui = this.ui;

    return this._findJSHintConfigFiles()
      .then(function(files) {

        if (files.length === 0) {
          return RSVP.resolve({
            result: {
              deleteFiles: 'none'
            }
          });
        }

        ui.writeLine('\nThe following JSHint config files were found:');
        files.forEach(function(file) {
          ui.writeLine('  ' + file);
        });

        var promptPromise = ui.prompt({
          type: 'list',
          name: 'deleteFiles',
          message: 'What would you like to do?',
          choices: [
            { name: 'Remove them all', value: 'all' },
            { name: 'Remove individually', value: 'each' },
            { name: 'Nothing', value: 'none' }
          ]
        });

        return RSVP.hash({
          result: promptPromise,
          files: files
        });
      }).then(function(data) {
        var value = data.result.deleteFiles;
        var files = data.files;

        // Noop if we're not deleting any files
        if (value === 'none') {
          return RSVP.resolve();
        }

        if (value === 'all') {
          return RSVP.all(files.map(function(fileName) {
            return removeFile(fileName);
          }));
        }

        if (value === 'each') {
          return synchronize(files, function(fileName) {
            return promptRemove(fileName);
          });
        }
      });
  },

  /**
   * Find JSHint configuration files
   *
   * @return {Promise->string[]} found file names
   */
  _findJSHintConfigFiles() {
    var projectRoot = this.project.root;
    var ui = this.ui;

    ui.startProgress('Searching for JSHint config files');
    return new RSVP.Promise(function(resolve) {
      var files = walkSync(projectRoot, {
        globs: ['**/.jshintrc'],
        ignore: [
          '**/bower_components',
          '**/dist',
          '**/node_modules',
          '**/tmp'
        ]
      });

      ui.stopProgress();
      resolve(files);
    });
  },

  /**
   * Prompt the user about whether or not they want to remove the given file
   *
   * @param {string} filePath the path to the file
   * @return {RSVP.Promise}
   */
  _promptRemove(filePath) {
    var removeFile = this._removeFile.bind(this);
    var message = 'Should I remove `' + filePath + '`?';

    var promptPromise = this.ui.prompt({
      type: 'confirm',
      name: 'answer',
      message: message,
      choices: [
        { key: 'y', name: 'Yes, remove it', value: 'yes' },
        { key: 'n', name: 'No, leave it there', value: 'no' }
      ]
    });

    return promptPromise.then(function(response) {
      if (response.answer) {
        return removeFile(filePath);
      } else {
        return RSVP.resolve();
      }
    });
  },

  /**
   * Remove the specified file
   *
   * @param {string} filePath the relative path (from the project root) to remove
   * @return {RSVP.Promise}
   */
  _removeFile(filePath) {
    var projectRoot = this.project.root;
    var fullPath = resolve(projectRoot, filePath);

    return RSVP.denodeify(unlink)(fullPath);
  }
};
