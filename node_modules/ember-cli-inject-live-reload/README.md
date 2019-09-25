# ember-cli-inject-live-reload

Plugin for ember-cli that injects live-reload script into HTML content.

## Overview

This plugin injects a script tag to load `ember-cli-live-reload.js` in the head of your application's html.

The contents of `ember-cli-live-reload.js` are dynamically generated to configure and inject `livereload.js`, which is served by Ember CLI courtesy of its `tiny-lr` dependency.

`livereload.js` initiates a websocket connection back to Ember CLI. This allows Ember CLI to notify the browser to trigger a refresh after JavaScript or style changes.

## Configuration

For vanilla Ember CLI apps, no configuration is required.

The following options are supported via command line arguments or the `.ember-cli` file:

|Option|Purpose|
|------|-------|
| `liveReload` | Defaults to `true` during `ember serve`. Set to `false` to prevent the livereload script tag from being injected. |
| `liveReloadPort` | Specifies the port that `ember-cli-live-reload.js` and `livereload.js` are loaded from  |
| `liveReloadHost` | The host that `ember-cli-live-reload.js` will be loaded from |

The following options are supported via the `.ember-cli` file:

|Option|Purpose|
|------|-------|
| `liveReloadJsUrl` | The absolute URL used to load `livereload.js`. If specified, this overrides the `liveReloadPort` option.  |
| `liveReloadOptions` | JavaScript object for LiveReload options. LiveReload supports a number of [options](https://github.com/livereload/livereload-js#options) for configuring websocket communication, including `https`, `host`, `port`, and others. See advanced example below. |

## Advanced Example Configuration

**NOTE:** Most apps will be fine with _no_ special configuration. Only use this sort of configuration if you have reason to override the default LiveReload websocket behavior. A use case for this is serving Ember CLI apps in development via a reverse proxy such as nginx.

##### .ember-cli

```javascript
{
  "liveReloadPort": 37531,

  // This `liveReloadOptions` property becomes `window.LiveReloadOptions`
  "liveReloadOptions": {
    "port": 37631,
    "https": true,
    "host": "your-hostname.dev"
  },

  "liveReloadJsUrl": "https://your-hostname.dev/livereload.js"
}
```
