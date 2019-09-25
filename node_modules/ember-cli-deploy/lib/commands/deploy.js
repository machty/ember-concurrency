var chooseOptionValue = require('../helpers/option-value');

module.exports = {
  name: 'deploy',
  description: 'Deploys an ember-cli app',
  works: 'insideProject',

  anonymousOptions: [
    '<deployTarget>'
  ],

  // note: we can not use `default` from ember-cli because we need to use
  // settings from .ember-cli config-file as secondary defaults
  availableOptions: [
    { name: 'deploy-config-file', type: String, description: '(Default: config/deploy.js)' },
    { name: 'verbose', type: Boolean, description: '(Default: false)' },
    { name: 'activate', type: Boolean, description: '(Default: false)' },
    { name: 'show-progress', type: Boolean, aliases: ['p', 'progress'], description: '(Default: true)'},
    { name: 'log-info-color', type: String, description: '(Default: "blue")'},
    { name: 'log-error-color', type: String, description: '(Default: "red")'}
  ],

  run: function(commandOptions, rawArgs) {
    commandOptions.deployTarget = rawArgs.shift();

    commandOptions.deployConfigFile = chooseOptionValue(commandOptions.deployConfigFile, this.settings, 'deploy-config-file', 'config/deploy.js');
    commandOptions.activate = chooseOptionValue(commandOptions.activate, this.settings, 'activate');

    this.ui.verbose = chooseOptionValue(commandOptions.verbose, this.settings, 'verbose');
    this.ui.showProgress = chooseOptionValue(commandOptions.showProgress, this.settings, 'showProgress', process.stdout.isTTY ? true : false);
    this.ui.logInfoColor = chooseOptionValue(commandOptions.logInfoColor, this.settings, 'logInfoColor', 'blue');
    this.ui.logErrorColor = chooseOptionValue(commandOptions.logErrorColor, this.settings, 'logErrorColor', 'red');

    process.env.DEPLOY_TARGET = commandOptions.deployTarget;

    var ReadConfigTask = require('../tasks/read-config');
    var readConfig = new ReadConfigTask({
      project: this.project,
      deployTarget: commandOptions.deployTarget,
      deployConfigFile: commandOptions.deployConfigFile
    });
    var self = this;
    return readConfig.run().then(function(config){
      var DeployTask = require('../tasks/deploy');
      var deploy = new DeployTask({
        project: self.project,
        ui: self.ui,
        config: config,
        deployTarget: commandOptions.deployTarget,
        commandOptions: commandOptions
      });

      return deploy.run();
    });
  }
};
