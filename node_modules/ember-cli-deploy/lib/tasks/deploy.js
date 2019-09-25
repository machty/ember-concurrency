var Task         = require('../models/task');
var PipelineTask = require('../tasks/pipeline');

module.exports = Task.extend({
  init: function() {
    if (this._super.init) {
      this._super.init.apply(this, arguments);
    }

    this.commandOptions = this.commandOptions || {};
    this.shouldActivate = this.shouldActivate || this._shouldActivate(this.commandOptions);
  },

  run: function() {
    var pipeline = this._pipeline || new PipelineTask({
      project: this.project,
      ui: this.ui,
      deployTarget: this.deployTarget,
      config: this.config,
      commandOptions: this.commandOptions,
      hooks: this._hooks(this.shouldActivate)
    });
    return pipeline.run();
  },

  _shouldActivate: function(options) {
    var pipelineConfig = this.config['pipeline'] || {};
    var shouldReferToPipelineConfig = (options.activate === undefined);
    return shouldReferToPipelineConfig ? pipelineConfig.activateOnDeploy : options.activate;
  },

  _hooks: function(shouldActivate) {
    var hooks = ['configure',
      'setup',
      'willDeploy',
      'willBuild', 'build', 'didBuild',
      'willPrepare', 'prepare', 'didPrepare',
      'fetchInitialRevisions',
      'willUpload', 'upload', 'didUpload'];

    if (shouldActivate) {
      hooks.push('willActivate', 'activate', 'fetchRevisions', 'didActivate');
    } else {
      hooks.push('fetchRevisions');
    }

    hooks.push('didDeploy', 'teardown');

    return hooks;
  }
});
