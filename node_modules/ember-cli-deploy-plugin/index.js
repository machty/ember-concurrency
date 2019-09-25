var CoreObject     = require('core-object');
var chalk = require('chalk');
var cloneDeep = require('lodash.clonedeep');

function _pluginHelper() {
  return {
    readConfigDefault: function(property) {
      var configuredValue = this.defaultConfig[property];
      if (typeof configuredValue === 'function') {
        return cloneDeep(configuredValue.call(this, this.context));
      }
      return cloneDeep(configuredValue);
    }.bind(this),

    readConfig: function(property) {
      return cloneDeep(this.readConfig(property));
    }.bind(this)
  };
}

var DeployPluginBase = CoreObject.extend({
  context: null,
  ui: null,
  project: null,
  pluginConfig: null,
  defaultConfig: {},
  beforeHook: function(context) {
    this.context = context;
    this.ui = context.ui;
    this.project = context.project;
    context.config[this.name] = context.config[this.name] || {};
    this.pluginConfig = context.config[this.name];
  },
  configure: function(/* context */) {
    this.log('validating config', { verbose: true});
    var defaultProps = Object.keys(this.defaultConfig || {});
    defaultProps.forEach(this.applyDefaultConfigProperty.bind(this));
    var requiredProps = this.requiredConfig || [];
    requiredProps.forEach(this.ensureConfigPropertySet.bind(this));
    this.log('config ok', { verbose: true });
  },
  applyDefaultConfigProperty: function(propertyName){
    if (this.pluginConfig[propertyName] === undefined) {
      var value = this.defaultConfig[propertyName];
      this.pluginConfig[propertyName] = value;
      var description = value;
      if (typeof description === "function") {
        description = "[Function]";
      }
      this.log('Missing config: `' + propertyName + '`, using default: `' + description + '`', { color: 'yellow', verbose: true });
    }
  },
  ensureConfigPropertySet: function(propertyName){
    if (!this.pluginConfig[propertyName]) {
      var message = 'Missing required config: `' + propertyName + '`';
      this.log(message, { color: 'red' });
      throw new Error(message);
    }
  },
  readConfig: function(property){
    var configuredValue = this.pluginConfig[property];
    if (typeof configuredValue === 'function') {
      return configuredValue.call(this.pluginConfig, this.context, _pluginHelper.call(this));
    }
    return configuredValue;
  },

  logRaw: function(message) {
    var ui = this.ui;
    ui.writeLine(message);
  },

  log: function(message, opts) {
    opts = opts || {};
    var ui = this.ui;
    var color = opts.color || ui.logInfoColor || 'blue';
    var chalkColor = chalk[color];

    // the following accomodates a spelling error in ember-cli
    var actualStream = ui.actualOutputStream || ui.actualOuputStream;

    if (!opts.verbose || (opts.verbose && ui.verbose)) {
      if (ui.verbose) {
        ui.write(chalkColor('|    '));
      } else if (actualStream && actualStream.cursorTo) {
        // on a real terminal we want to reset the cursor position
        // to avoid overlap with other outputs
        actualStream.clearLine();
        actualStream.cursorTo(0);
      }

      this.logRaw(chalkColor('- ' + message));
    }
  }
});

module.exports = DeployPluginBase;
