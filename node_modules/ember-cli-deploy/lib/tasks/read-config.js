var Task        = require('../models/task');
var RSVP        = require('rsvp');
var SilentError = require('silent-error');

var existsSync  = require('fs').existsSync;
var path        = require('path');
var dotenv      = require('dotenv');

module.exports = Task.extend({
  init: function() {
    if (this._super.init) {
      this._super.init.apply(this, arguments);
    }

    if (!this.project) {
      throw new SilentError('No project passed to read-config task');
    }

    if(!this.deployTarget) {
      throw new SilentError('No deployTarget passed to read-config task');
    }

    this.root = this.project.root;

    this.deployConfigPath = this.deployConfigFile || 'config/deploy.js';
    this.absoluteDeployConfigPath = path.resolve(this.root, this.deployConfigPath);

    if (!existsSync(this.absoluteDeployConfigPath)) {
      throw new SilentError('Deploy config does not exist at `' + this.deployConfigPath + '`');
    }
  },

  run: function() {
    this._loadDotEnv();
    return this._readDeployConfig();
  },

  _loadDotEnv: function() {
    var root         = this.root;

    var deployDotEnvFilename = '.env.deploy.' + this.deployTarget;
    var deployDotEnvFilePath = path.join(root, deployDotEnvFilename);

    var dotEnvFilename = '.env';
    var dotEnvFilePath = path.join(root, dotEnvFilename);

    // order is important here. vars defined in files loaded first
    // will override files loaded after.
    var paths = [deployDotEnvFilePath, dotEnvFilePath];
    paths.forEach(function(path) {
      if (existsSync(path)) {
        dotenv.load({
          path: path
        });
      }
    });
  },

  _readDeployConfig: function() {
    var deployConfigFn  = require(this.absoluteDeployConfigPath);
    var deployConfig = deployConfigFn(this.deployTarget);

    if (!deployConfig) {
      return RSVP.reject('Config is undefined for ' + this.deployTarget + ', did you forget to return the `ENV` var from `config/deploy.js`?');
    }
    return RSVP.resolve(deployConfig);
  }
});
