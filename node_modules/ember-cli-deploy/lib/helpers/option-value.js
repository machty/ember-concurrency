module.exports = function(commandOption, settings, optionKey, defaultValue) {
  if (commandOption !== undefined) {
    return commandOption;
  }
  if (settings && settings['ember-cli-deploy'] && settings['ember-cli-deploy'][optionKey] !== undefined) {
    return settings['ember-cli-deploy'][optionKey];
  }
  return defaultValue;
};
