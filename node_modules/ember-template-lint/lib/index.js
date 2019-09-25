'use strict';

const precompile = require('@glimmer/compiler').precompile;
const Minimatch = require('minimatch').Minimatch;
const getConfig = require('./get-config');
const stripBom = require('strip-bom');
const chalk = require('chalk');
var path = require('path');

const TransformDotComponentInvocation = require('./plugins/transform-dot-component-invocation');

const WARNING_SEVERITY = 1;
const ERROR_SEVERITY = 2;

class Linter {
  constructor(_options) {
    let options = _options || {};

    this.options = options;
    this.console = options.console || console;

    this.loadConfig();
    this.constructor = Linter;
  }

  loadConfig() {
    this.config = getConfig(this.options);
  }

  _defaultSeverityForRule(ruleName, pendingStatus) {
    if (typeof pendingStatus === 'boolean') {
      return pendingStatus ? WARNING_SEVERITY : ERROR_SEVERITY;
    } else if (pendingStatus.only) {
      if (pendingStatus.only.indexOf(ruleName) > -1) {
        return WARNING_SEVERITY;
      } else {
        return ERROR_SEVERITY;
      }
    }

    return 2;
  }

  buildASTPlugins(config) {
    let results = config.results;

    function addToResults(result) {
      results.push(result);
    }

    let rules = this.config.loadedRules;
    let astPlugins = [TransformDotComponentInvocation];

    for (let pluginName in rules) {
      let Plugin = rules[pluginName];
      let plugin = new Plugin({
        name: pluginName,
        config: this.config.rules[pluginName],
        console: this.console,
        log: addToResults,
        defaultSeverity: this._defaultSeverityForRule(pluginName, config.pending),
        ruleNames: Object.keys(rules),
      });

      astPlugins.push(env => {
        plugin.templateEnvironmentData = env;

        let visitor = plugin.getVisitor();

        return {
          name: pluginName,
          visitor,
        };
      });
    }

    return astPlugins;
  }

  statusForModule(type, moduleId) {
    let list = this.config[type];
    let configPath = this.options.configPath || '';
    if (!list) {
      return false;
    }

    for (let i = 0; i < list.length; i++) {
      let item = list[i];

      let fullPathModuleId = path.resolve(process.cwd(), moduleId);

      if (item instanceof Minimatch && item.match(moduleId)) {
        return true;
      } else if (typeof item === 'string') {
        let fullPathItem = path.resolve(process.cwd(), path.dirname(configPath), item);
        if (fullPathModuleId === fullPathItem) {
          return true;
        }
      } else if (item.moduleId) {
        let fullPathItem = path.resolve(process.cwd(), path.dirname(configPath), item.moduleId);
        if (fullPathModuleId === fullPathItem) {
          return item;
        }
      }
    }

    return false;
  }

  verify(options) {
    let messages = [];
    let pendingStatus = this.statusForModule('pending', options.moduleId);
    let shouldIgnore = this.statusForModule('ignore', options.moduleId);

    if (shouldIgnore) {
      return messages;
    }

    let pluginConfig = {
      results: messages,
      pending: pendingStatus,
    };

    try {
      precompile(stripBom(options.source), {
        moduleName: options.moduleId,
        rawSource: stripBom(options.source),
        plugins: {
          ast: this.buildASTPlugins(pluginConfig),
        },
      });
    } catch (error) {
      let message = {
        fatal: true,
        moduleId: options.moduleId,
        message: error.message,
        source: error.stack,
        severity: 2,
      };

      if (error.location) {
        message.column = error.location.start.column;
        message.line = error.location.start.line;
      }

      messages.push(message);
    }

    if (pendingStatus && messages.length === 0) {
      messages.push({
        message: `Pending module (\`${options.moduleId}\`) passes all rules. Please remove \`${options.moduleId}\` from pending list.`,
        moduleId: options.moduleId,
        severity: 2,
      });
    }

    return messages;
  }

  logLintingError(name, moduleName, message) {
    this._messages.push({
      rule: name,
      moduleId: moduleName,
      message,
    });

    this.console.log(message);
  }

  static errorsToMessages(filePath, errors, options) {
    errors = errors || [];
    options = options || {
      verbose: false,
    };

    if (errors.length === 0) {
      return '';
    }

    let errorsMessages = errors.map(error => this._formatError(error, options)).join('\n');

    return `${chalk.underline(filePath)}\n${errorsMessages}\n`;
  }

  static _formatError(error, options) {
    let message = '';

    let line = error.line === undefined ? '-' : error.line;
    let column = error.column === undefined ? '-' : error.column;

    message += chalk.dim(`  ${line}:${column}`);

    if (error.severity === WARNING_SEVERITY) {
      message += `  ${chalk.yellow('warning')}`;
    } else {
      message += `  ${chalk.red('error')}`;
    }

    message += `  ${error.message}  ${chalk.dim(error.rule)}`;

    if (options.verbose) {
      message += `\n${error.source}`;
    }

    return message;
  }
}

module.exports = Linter;
module.exports.Rule = require('./rules/base');
module.exports.ASTHelpers = require('./helpers/ast-node-info');
module.exports.WARNING_SEVERITY = WARNING_SEVERITY;
module.exports.ERROR_SEVERITY = ERROR_SEVERITY;
