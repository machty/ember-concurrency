/*eslint-env node*/
'use strict';

var RSVP = require('rsvp');
var glob  = require('glob');
var DeployPluginBase = require('ember-cli-deploy-plugin');
var path = require('path');

module.exports = {
  name: 'ember-cli-deploy-build',

  createDeployPlugin: function(options) {
    var DeployPlugin = DeployPluginBase.extend({
      name: options.name,
      defaultConfig: {
        environment: 'production',
        outputPath: 'tmp' + path.sep + 'deploy-dist'
      },

      build: function(/* context */) {
        var self       = this;
        var outputPath = this.readConfig('outputPath');
        if (process.env.EMBER_CLI_DEPLOY_REUSE_BUILD) {
          this.log('reusing build from `' + outputPath, { verbose: true });
          return RSVP.resolve({
            distDir: outputPath,
            distFiles: glob.sync('**/*', { cwd: outputPath, nodir: true })
          });
        }
        var buildEnv   = this.readConfig('environment');

        var Builder  = this.project.require('ember-cli/lib/models/builder');
        var builder = new Builder({
          ui: this.ui,
          outputPath: outputPath,
          environment: buildEnv,
          project: this.project
        });

        this.log('building app to `' + outputPath + '` using buildEnv `' + buildEnv + '`...', { verbose: true });
        return builder.build()
          .finally(function() {
            return builder.cleanup();
          })
          .then(this._logSuccess.bind(this, outputPath))
          .then(function(files) {
            files = files || [];

            return {
              distDir: outputPath,
              distFiles: files
            };
          })
          .catch(function(error) {
            self.log('build failed', { color: 'red' });
            return RSVP.reject(error);
          });
      },
      _logSuccess: function(outputPath) {
        var self = this;
        var files = glob.sync('**/**/*', { nonull: false, nodir: true, cwd: outputPath });

        if (files && files.length) {
          files.forEach(function(path) {
            self.log('✔  ' + path, { verbose: true });
          });
        }
        self.log('build ok', { verbose: true });

        return RSVP.resolve(files);
      }
    });
    return new DeployPlugin();
  }
};
