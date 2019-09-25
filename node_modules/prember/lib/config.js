function findHost(context) {
  var current = context;
  var app;

  // Keep iterating upward until we don't have a grandparent.
  // Has to do this grandparent check because at some point we hit the project.
  do {
    app = current.app || app;
  } while (current.parent && current.parent.parent && (current = current.parent));

  return app;
}

function loadConfig(context) {
  let app = findHost(context);
  let config  = app.options.prember || {};
  if (config.enabled == null) {
    config.enabled = app.env === 'production';
  }
  if (process.env.PREMBER) {
    config.enabled = true;
  }
  return config;
}

module.exports = function() {
  if (!this._premberConfig) {
    this._premberConfig = loadConfig(this);
  }
  return this._premberConfig;
}
