var chooseOptionValue = require('../helpers/option-value');

module.exports = {
  name: 'deploy:activate',
  description: 'Activates a passed deploy-revision',
  works: 'insideProject',

  availableOptions: [
    { name: 'revision', type: String, required: true },
    { name: 'verbose', type: Boolean },
    { name: 'deploy-config-file', type: String, description: '(Default: config/deploy.js)' },
    { name: 'log-info-color', type: String, description: '(Default: "blue")'},
    { name: 'log-error-color', type: String, description: '(Default: "red")'}
  ],

  anonymousOptions: [
    '<deployTarget>'
  ],

  run: function(commandOptions, rawArgs) {
    commandOptions.deployTarget = rawArgs.shift();

    this.ui.verbose = chooseOptionValue(commandOptions.verbose, this.settings, 'verbose');
    this.ui.logInfoColor = chooseOptionValue(commandOptions.logInfoColor, this.settings, 'logInfoColor', 'blue');
    this.ui.logErrorColor = chooseOptionValue(commandOptions.logErrorColor, this.settings, 'logErrorColor', 'red');
    commandOptions.deployConfigFile = chooseOptionValue(commandOptions.deployConfigFile, this.settings, 'deploy-config-file', 'config/deploy.js');

    process.env.DEPLOY_TARGET = commandOptions.deployTarget;

    var ReadConfigTask = require('../tasks/read-config');
    var readConfig = new ReadConfigTask({
      project: this.project,
      deployTarget: commandOptions.deployTarget,
      deployConfigFile: commandOptions.deployConfigFile
    });
    var self = this;
    return readConfig.run().then(function(config){
      var PipelineTask = require('../tasks/pipeline');
      var pipeline = new PipelineTask({
        project: self.project,
        ui: self.ui,
        config: config,
        deployTarget: commandOptions.deployTarget,
        commandOptions: commandOptions,
        hooks: [
          'configure',
          'setup',
          'fetchInitialRevisions',
          'willActivate',
          'activate',
          'fetchRevisions',
          'didActivate',
          'teardown'
        ],
        requiredHooks: [
          'activate'
        ]
      });

      return pipeline.run();
    });
  }
};
