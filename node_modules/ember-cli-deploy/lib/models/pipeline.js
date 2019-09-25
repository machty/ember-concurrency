'use strict';

var RSVP  = require('rsvp');
var _     = require('lodash');
var chalk = require('chalk');

/* This is a generic implementation of a pipeline with ordered, promise-aware hooks,
 * pleasant logging, and failure handling. It should not have any "deployment" domain
 * logic or semantics, and is a candidate for extraction to its own npm module.
 */
function Pipeline(hookNames, options) {
  hookNames = hookNames || [];
  options = options || {};
  options = _.merge({
    ui: {
      logInfoColor: 'blue',
      logErrorColor: 'red'
    }
  }, options);

  this._ui = options.ui;

  this._pipelineHooks = hookNames.reduce(function(pipelineHooks, hookName) {
    pipelineHooks[hookName] = [];

    return pipelineHooks;
  }, { didFail: [] });

  this.logInfo = chalk[this._ui.logInfoColor];
  this.logError = chalk[this._ui.logErrorColor];
  this._progressBarLib = options.progressBarLib || require('ember-cli-deploy-progress');
}

Pipeline.prototype.register = function(hookName, fn) {
  var ui            = this._ui;
  var pipelineHooks = this._pipelineHooks;

  if (typeof fn === 'function') {
    fn = {
      name: 'anonymous function',
      fn: fn
    };
  }

  if (pipelineHooks[hookName]) {
    if (ui.verbose) {
      ui.write(this.logInfo('Registering hook -> ' + hookName + '[' + fn.name + ']\n'));
    }

    pipelineHooks[hookName].push(fn);
  }
};

Pipeline.prototype.hasHandlersForHook = function(hook) {
  return this._pipelineHooks[hook].length !== 0;
};

Pipeline.prototype.execute = function(context) {
  context = context || { };

  var ui = this._ui;
  var hooks = this._hooksWithoutDidFail(this.hookNames());
  var ProgressBar = this._progressBarLib;
  if (ui.verbose) {
    ui.write(this.logInfo('Executing pipeline\n'));
  } else if (ui.showProgress) {
    ui.progressBar = new ProgressBar('Deploying [:bar] :percent [plugin: :plugin -> :hook]', {
      total: this._hooksCount(this._hooksWithoutConfigure(hooks)),
      cursor: process.platform === 'darwin' ? '🚀 ' : '>'
    });
  }

  return hooks.reduce(this._addHookExecutionPromiseToPipelinePromiseChain.bind(this, ui), RSVP.resolve(context))
  .then(this._notifyPipelineCompletion.bind(this, ui))
  .catch(this._handlePipelineFailure.bind(this, ui, context))
  .catch(this._abortPipelineExecution.bind(this, ui));
};

Pipeline.prototype.hookNames = function() {
  return Object.keys(this._pipelineHooks);
};

Pipeline.prototype._addHookExecutionPromiseToPipelinePromiseChain = function(ui, promise, hookName) {
  var self = this;
  return promise.then(this._notifyPipelineHookExecution.bind(this, ui, hookName))
  .then(function(context){
    try {
      return self._executeHook(hookName, context);
    } catch(error) {
      return RSVP.reject(error);
    }
  });
};

Pipeline.prototype._hooksWithoutDidFail = function(hooks) {
  return hooks.filter(function(hook) {
    return hook !== 'didFail';
  });
};

Pipeline.prototype._hooksWithoutConfigure = function(hooks) {
  return hooks.filter(function(hook) {
    return hook !== 'configure';
  });
};

Pipeline.prototype._hooksCount = function(hooks) {
  return hooks.reduce(function(sum, hookName) {
    var hookFunctions = this._pipelineHooks[hookName];
    return sum + hookFunctions.length;
  }.bind(this), 0);
};

Pipeline.prototype._handlePipelineFailure = function(ui, context, error) {
  if (ui.verbose) {
    ui.write(this.logError('|\n'));
    ui.write(this.logError('+- didFail\n'));
  }
  ui.write(this.logError(error + '\n' + (error ? error.stack : null)));
  return this._executeHook('didFail', context)
    .then(RSVP.reject.bind(this, error));
};

Pipeline.prototype._abortPipelineExecution = function(ui/*, error */) {
  if (ui.verbose) {
    ui.write(this.logInfo('|\n'));
  }
  ui.write(this.logError('Pipeline aborted\n'));
  return RSVP.reject();
};

Pipeline.prototype._notifyPipelineCompletion = function(ui) {
  if (ui.verbose) {
    ui.write(this.logInfo('|\n'));
    ui.write(this.logInfo('Pipeline complete\n'));
  }
};

Pipeline.prototype._notifyPipelineHookExecution = function(ui, hookName, context) {
  if (ui.verbose) {
    ui.write(this.logInfo('|\n'));
    ui.write(this.logInfo('+- ' + hookName + '\n'));
  }
  return context;
};

Pipeline.prototype._executeHook = function(hookName, context) {
  var ui            = this._ui;
  var hookFunctions = this._pipelineHooks[hookName];

  return hookFunctions.reduce(this._addPluginHookExecutionPromiseToHookPromiseChain.bind(this, ui, context, hookName), RSVP.resolve(context));
};

Pipeline.prototype._addPluginHookExecutionPromiseToHookPromiseChain = function(ui, context, hookName, promise, fnObject) {
  return promise
    .then(this._notifyPipelinePluginHookExecution.bind(this, ui, fnObject, hookName))
    .then(this._mergePluginHookResultIntoContext.bind(this, context));
};

Pipeline.prototype._notifyPipelinePluginHookExecution = function(ui, fnObject, hookName, context) {
  if (ui.verbose) {
    ui.write(this.logInfo('|  |\n'));
    ui.write(this.logInfo('|  +- ' + fnObject.name + '\n'));
  } else if (ui.showProgress) {
    if (hookName !== 'configure') {
      ui.progressBar.tick({
        hook: hookName,
        plugin: fnObject.name
      });
    }
  }

  return fnObject.fn(context);
};

Pipeline.prototype._mergePluginHookResultIntoContext = function(context,result) {
  return _.mergeWith(context, result, function(a, b) {
    if (_.isArray(a)) {
      return a.concat(b);
    }
  });
};

module.exports = Pipeline;
