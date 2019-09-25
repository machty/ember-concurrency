'use strict';

const buildLiveReloadPath = require('clean-base-url');
const VersionChecker = require('ember-cli-version-checker');

module.exports = {
  name: 'live-reload-middleware',

  contentFor: function(type) {
    let liveReloadPort = process.env.EMBER_CLI_INJECT_LIVE_RELOAD_PORT;
    let baseURL = process.env.EMBER_CLI_INJECT_LIVE_RELOAD_BASEURL;

    if (liveReloadPort && type === 'head') {
      return '<script src="' + baseURL + 'ember-cli-live-reload.js" type="text/javascript"></script>';
    }
  },

  dynamicScript: function(options) {
    let liveReloadOptions = options.liveReloadOptions;
    if (liveReloadOptions && liveReloadOptions.snipver === undefined) {
      liveReloadOptions.snipver = 1;
    }

    let liveReloadPath = buildLiveReloadPath(options.liveReloadPrefix) || '/';
    let liveReloadPort;
    let path = '';
    if (options.liveReloadPort !== options.port) {
      liveReloadPort = options.liveReloadPort
    }
    if (options.isLatestEmber && options.liveReloadPrefix) {
      path = `&path=${options.liveReloadPrefix}/livereload`;
    }
    return `(function() {${liveReloadOptions ? "\n  window.LiveReloadOptions = " + JSON.stringify(liveReloadOptions) + ";" : ''}
  var srcUrl = ${options.liveReloadJsUrl ? "'" + options.liveReloadJsUrl + "'" : null};
  var host= location.hostname || 'localhost';
  var liveReloadPort = ${liveReloadPort};
  var defaultPort = location.protocol === 'https:' ? 443 : 80;
  var port = liveReloadPort || location.port || defaultPort;
  var path = '${path}';
  var prefixURL = ${liveReloadPort ? "(location.protocol || 'http:') + '//' + host + ':' + " + liveReloadPort : "''"};
  var src = srcUrl || prefixURL + '${liveReloadPath + 'livereload.js?port='}' + port + '&host=' + host + path;
  var script    = document.createElement('script');
  script.type   = 'text/javascript';
  script.src    = src;
  document.getElementsByTagName('head')[0].appendChild(script);
}());`;
  },

  serverMiddleware: function(config) {
    let options = config.options;
    let app = config.app;

    let self = this;
    // maintaining `baseURL` for backwards compatibility. See: http://emberjs.com/blog/2016/04/28/baseURL.html
    let baseURL = options.liveReloadBaseUrl || options.rootURL || options.baseURL;
    if (this.parent) {
      let checker = new VersionChecker(this.parent);
      let depedency = checker.for('ember-cli');
      options.isLatestEmber = depedency.gt('3.5.0');
    }
    if (options.liveReload !== true) { return; }

    process.env.EMBER_CLI_INJECT_LIVE_RELOAD_PORT = options.liveReloadPort;
    process.env.EMBER_CLI_INJECT_LIVE_RELOAD_BASEURL = baseURL;

    let baseURLWithoutHost = baseURL.replace(/^https?:\/\/[^/]+/, '');
    app.use(baseURLWithoutHost + 'ember-cli-live-reload.js', function(request, response) {
      response.contentType('text/javascript');
      response.send(self.dynamicScript(options));
    });
  }
};
