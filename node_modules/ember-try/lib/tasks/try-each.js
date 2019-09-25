'use strict';

const CoreObject = require('core-object');
const RSVP = require('rsvp');
const mapSeries = require('promise-map-series');
const chalk = require('chalk');
const debug = require('debug')('ember-try:task:try-each');
const runCommand = require('./../utils/run-command');

module.exports = CoreObject.extend({
  run(scenarios, options) {
    // Required lazily to improve startup speed.
    let ScenarioManager = require('./../utils/scenario-manager');
    let DependencyManagerAdapterFactory = require('./../utils/dependency-manager-adapter-factory');
    this.ResultSummary = require('./../utils/result-summary');

    let task = this;
    let dependencyManagerAdapters = task.dependencyManagerAdapters || DependencyManagerAdapterFactory.generateFromConfig(task.config, task.project.root);
    debug('DependencyManagerAdapters: %s', dependencyManagerAdapters.map((item) => { return item.configKey; }));
    task.ScenarioManager = new ScenarioManager({
      ui: task.ui,
      dependencyManagerAdapters,
    });

    task._canceling = false;
    task._on('SIGINT', () => {
      task._canceling = true;
      task.ui.writeLine('\nGracefully shutting down from SIGINT (Ctrl-C)');
      return task.ScenarioManager.cleanup();
    });

    return task.ScenarioManager.setup().then(() => {
      debug('Scenario Manager setup');
      return mapSeries(scenarios, task._runCommandForThisScenario, task);
    }).then((results) => {
      return task._optionallyCleanup(options).then(() => {
        debug('Output results');
        task._printResults(results);
        return task._exitAsAppropriate(results);
      });
    }).catch((err) => {
      task.ui.writeLine(chalk.red('Error!'));
      if (err) {
        task.ui.writeLine(chalk.red(err));
        task.ui.writeLine(chalk.red(err.stack));
      }
      return 1; // Signifies exit code
    });
  },

  _runCommandForThisScenario(scenario) {
    let task = this;

    if (task._canceling) { return; }

    return task.ScenarioManager.changeTo(scenario)
      .then((scenarioDependencyState) => {
        if (task._canceling) { return; }

        process.env.EMBER_TRY_CURRENT_SCENARIO = scenario.name;
        task._writeHeader(`Scenario: ${scenario.name}`);
        let command = task._determineCommandFor(scenario);
        let runResults = {
          scenario: scenario.name,
          allowedToFail: !!scenario.allowedToFail,
          dependencyState: scenarioDependencyState,
          envState: scenario.env,
          command: command.join(' '),
        };

        debug('With:\n', runResults);

        return task._runCommand({ commandArgs: command, commandOptions: task._commandOptions(scenario.env) }).then((result) => {
          if (task._canceling) { return; }

          runResults.result = result;
          task._writeFooter(`Result: ${result}`);
          return RSVP.resolve(runResults);
        });
      });
  },

  _writeHeader(text) {
    let task = this;
    let count = 75 - text.length;
    let separator = new Array(count + 1).join('=');
    task.ui.writeLine(chalk.blue(`\n=== ${text} ${separator}\n`));
  },

  _writeFooter(text) {
    let task = this;
    task.ui.writeLine(chalk.blue(`\n${text}`));
    task.ui.writeLine(chalk.blue('---\n'));
  },

  _determineCommandFor(scenario) {
    let task = this;

    if (task.commandArgs && task.commandArgs.length) {
      return this.commandArgs;
    }

    if (scenario.command) {
      return scenario.command.split(' ');
    }

    if (task.config.command) {
      return task.config.command.split(' ');
    }

    return this._defaultCommandArgs();
  },

  _runCommand(options) {
    return runCommand(this.project.root, options.commandArgs, options.commandOptions);
  },

  _commandOptions(env) {
    let options = this.commandOptions || {};
    if (env) {
      options.env = Object.assign({}, process.env, env);
    }
    return options;
  },

  _defaultCommandArgs() {
    return ['ember', 'test'];
  },

  _printResults(results) {
    new this.ResultSummary({ ui: this.ui, results }).print();
  },

  _exitAsAppropriate(results) {
    let outcomes = results.map((result) => {
      return result.result || result.allowedToFail;
    });

    return this._exitBasedOnCondition(outcomes.indexOf(false) > -1);
  },

  _optionallyCleanup(options) {
    debug('Cleanup');
    delete process.env.EMBER_TRY_CURRENT_SCENARIO;

    let task = this;
    let promise;
    if (options && options.skipCleanup) {
      // Create a fake promise for consistency
      debug('Skip ScenarioManager cleanup');
      promise = RSVP.Promise.resolve();
    } else {
      debug('Cleanup ScenarioManager');
      promise = task.ScenarioManager.cleanup();
    }
    return promise;
  },

  _exitBasedOnCondition(condition) {
    let exitCode = condition ? 1 : 0;
    debug('Exit %s', exitCode);
    return exitCode;
  },

  _exit(code) {
    debug('Exit %s', code);
    process.exit(code);
  },

  _on(signal, fn) {
    process.on(signal, fn);
  },

});
