# Plugins for ember-cli-deploy

This document describes the API related to plugins in the next
version of ember-cli-deploy.

### Overview of plugins

A plugin is an ember-cli addon that hooks into the ember-cli-deploy
pipeline in order to add functionality to a deploy. Example addon
functionality would be uploading assets to S3, writing the index.html to
Redis, or notifying a Slack channel a deploy has completed.

In general, OSS plugins should focus on doing a specific task. Most
Ember developers with common deployment targets will compose multiple
plugins to fine tune their deployment process. Developers with very
custom needs might create a single private plugin that implements all
aspects of their deployment process within the structure provided by
ember-cli-deploy.

Because plugins are implemented via addons, they may be included via
node_module dependencies or via in-repo-addons.

### Identifying plugins

Plugins are ember-cli addons. They will also have the keyword
`ember-cli-deploy-plugin`. An example `package.json` for a plugin:

```
{
  "name": "ember-cli-deploy-example-plugin",
  "version": "0.4.0",
  // ...
  "devDependencies": {
    "ember-cli": "0.2.0",
    "ember-cli-deploy": "0.4.1"
    // ...
  },
  "keywords": [
    "ember-addon",
    "ember-cli-deploy-plugin"
  ]
}
```

By default, any plugin that is installed will be loaded, similar to
ember-cli addons. The plugin order is determined by how ember-cli orders
addons (based on `before:`/`after:` properties). To override this, see
Advanced Plugin Configuration and Ordering below.

### Plugins are provided by ember-cli addons

Plugins are ember-cli addons which implement an `createDeployPlugin()` method
to return an object which implements one or more methods that are called by
ember-cli-deploy. For example:

```javascript
module.exports = {
  name: 'ember-cli-deploy-example-plugin',
  createDeployPlugin: function(options){
    return {
      name: options.name,
      willDeploy: function:(deployment){
        // do something during the willDeploy phase of the pipeline
      },
      didDeploy: function:(deployment){
        // do something during the didDeploy phase of the pipeline
      },
      // etc, see hooks section for a complete list of methods that
      // may be implemented by a plugin
    }
  }
}
```

This approach limits the risk of name conflicts at the top-level of the addon.
It also allows for the plugin author to consult the addon instance during
creation of the plugin object to make any contextual decisions necessary.
Finally, it is agnostic with respect to the type of object the plugin is.
It may be a POJO, a subclass of CoreObject, or maybe an ES6 class.

The `options` argument passed to `createDeployPlugin` will have a `name`
property. Usually, the `name` will be the plugin name sans the `ember-cli-deploy-`
prefix, unless a name has been specified as described in Advanced Plugin
Configuration below.

### The `context` object

For each high-level ember-cli-deploy operation, a `context` object is created.
This object is passed to each hook that is invoked on the plugins. It has a number
of properties that may be of use to a plugin:

Property | file | info
--- | --- | ---
`ui` | - | The ember-cli UI object that can be used to write to stdout.
`config` | stored in `config/deploy.js` | The configuration portion of `config/deploy.js` for the active environment
`data` | - | Runtime information about the current operation. Plugins can set properties on this object for later use by themselves or another plugin.

### Async operations in hooks

Hook functions can return a promise to block the deployment pipeline.
Since most deployment involves some sort of IO it makes senses that most
plugins will want an async function to complete before continuing to the
next step. If a plugin does not return a promise, then ember-cli-deploy
proceeds immediately.

If a promise from any of the plugins is rejected then the deployment
pipeline will stop and ember-cli-deploy will exit. Returned promises that are
rejected are treated as unrecoverable errors.

### Configuration

By convention, plugin configuration should be kept in `config/deploy.js` and scoped by
the plugin's name. e.g. for an `ember-cli-deploy-example` plugin, the configuration might look like:

```javascript
// config/deploy.js
module.exports = return function(environment) {
  return {
    "example": {
      bucket: "my-app-" + environment,
      awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
      awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  };
};
```

### Hooks

These hooks (part of a typical deployment process) are available for plugins to implement:

```
configure: ---> runs before anything happens

setup: -------> the first hook for every command

willDeploy: --> runs before anything happens. good opportunity for plugins to validate
                configuration or other preconditions

           /-- willBuild    confirm environment
          /
build --------> builds app assets, documentation, etc.
          \
           \-- didBuild     manipulate index.html, validate assets

           /-- willPrepare  confirm deployment info
          /
prepare --------> prepare information about the deploy, eg revisonKey, timestamp, commit message
          \
           \-- didPrepare   notify APIS (slack etc)

           /-- willUpload   confirm remote servers(S3, Redis, Azure, etc.)
          /
upload -------> puts the assets somewhere(S3, Redis, Azure, Rackspace, etc.)
          |     Note: a plugin that implements upload of the HTML file and
          |           wants to support version activation should set
          |           `currentVersion` on the `deployment` object to the ID
          |           of the newly deployed version.
          \
           \-- didUpload    notify APIs (slack, pusher, etc.), warm cache

           /-- willActivate   create backup of assets, notify APIs, uninstall earlier versions
          /
activate -------> make a new version live (clear cache, swap Redis values, etc.)
          \
           \-- didActivate    notify APIs, warm cache

  Note: when hooks in the activate series of hooks are called, the plugin can assume the
        presence of a `currentVersion` property on the deployment object, that is set to
        the ID of the version to be activated.

didDeploy: --> runs at the end of a full deployment operation.

teardown: ---> always the last hook being run
```

In addition, there are a few more specialized hooks that plugins may implement:

```
discoverVersions: --> should return a promise resolving to an array of version objects. Each
                      version object _must_ have an `id` property. Each version _may_ have one
                      or more of the following properties:

                      `timestamp`:   (Date) when the version was created
                      `revision`:    (String) reference of version in SCM
                      `creator`:     (String) email address of developer who deployed the version
                      `description`: (String) summary of the version

```

### Hooks by command

Depending on the command you're running the hooks that are called vary

#### `ember deploy`
```
- configure
- setup
- willDeploy
- willBuild, build, didBuild,
- willPrepare, prepare, didPrepare,
- willUpload, upload, didUpload,
- willActivate, activate, didActivate, (only if --activate flag is passed)
- didDeploy,
- teardown
```

#### `ember deploy:activate`
```
- configure
- setup
- willActivate, activate, didActivate
- teardown
```

#### `ember deploy:list`
```
- configure
- setup
- fetchRevisions
- displayRevisions
- teardown
```

### Advanced Plugin Configuration

As mentioned above, by default, all plugins from installed addons will be loaded, and
ordered based on ember-cli's order of the addons. Developers may have advanced use cases
for specifying the order of plugins, disabling plugins, or configuring a single plugin to
be configured and used twice.

If you want to opt-into this configuration, you can set the `plugins` property in your `config/deploy.js` file at either the top-level (for global configuration), or under an environment (for per-environment configuration).

```
plugins: ["s3-assets", "s3-index", "notify-slack"]
```

Any plugins not included in the list will not have their hooks executed.

#### Aliasing plugins

To include a plugin twice, alias it using a colon.

```
plugins: ["s3-assets:foo-assets", "s3-assets:bar-assets", "s3-index", "notify-slack"]
```

The name specified after the colon will be passed as the `name` property
of the `options` argument to the addon's `createDeployPlugin` method. Plugins
should use their name to retrieve configuration values. In this example,
the foo-assets instance of the s3-assets plugin could have different configuration
than the bar-assets instance does.

### Another take on configuration

Convention-over-configuration is of utmost importance. For golden path use cases, including the packages and doing unavoidable configuration (e.g. credentials and connection info) should be all it takes. Of course, it should be possible to wire together plugins in ways beside the golden path, too.

Here's how we should accomplish this.

Goals:

1) A great out-of-the-box app developer experience for common deployment scenarios.
2) An API for app developers to define deployment pipeline configuration synchronously or asynchronously.
3) An API for plugin developers to provide static default configuration values.
4) An API for plugin developers to provide default configuration values that are derived at run-time from the data produced by plugin running prior to it in the pipeline.
5) An API for plugin developers to allow ap developers to interact with plugin settings via command line flags.
6) An API for app developers to specify configuration of a plugin to use data produced by a plugin running prior to it in the pipeline.

Approach:

* App developers use `config/deploy.js` to return a function that receives the build environment as a string and returns either a config object or a Promise that fulfills with a config object. The config object has properties corresponding to the name of the plugin (e.g. for ember-cli-deploy-redis, the property is “redis”). Supports goal No. 2 above. (This is implemented in the 0.5.0 WIP already.)

Examples:

```js
// deploy.js (sync)
module.export function(environment){
  var ENV = {
    redis: {
      url: process.env.REDIS_URL
    }
  }
  return ENV;
};

// deploy.js (async)
module.export function(environment){
  var ENV = {
    redis: {
    }
  }
  return someAsyncDataRetrieval(environment).then(function(data){
    ENV.redis = data.redisUrl;
    return ENV;
  }
};
```

* Plugin developers can implement a `configure` hook that runs at the beginning of pipeline execution (because “configure” is the first step of the pipeline). This hook has read/write access to the config object. It can specify default configuration values, as well as throw an Error in the case that a required configuration property was not provided. Supports goal No. 3 above. (This is implemented in the 0.5.0 WIP already, although we should provide plugins with helper to define defaults and enforce required properties more expressively and more consistently with other plugins.)

Example:

```js
// some-ember-cli-deploy-plugin/index.js
module.exports = {
  name: 'ember-cli-deploy-myplugin',

  createDeployPlugin: function(options) {
    return {
      name: options.name,
      configure: function(context) {
        var deployment = context.deployment;
        var config = deployment.config[this.name] = deployment.config[this.name] || {};
        config.filePattern = config.filePattern || “**/*.html”; // provide default

      },
      // ...
  }
};
```

* Plugin developers can also use `configure` hook specify a default configuration property as a function, which will be called at run-time, when a plugin wishes to read and use the configuration value. The function will receive the context and must return a value or throw an Error. The context would allow access to data added to pipeline by previous plugins, as well as flags set on command line. Supports goal No. 4 and No. 5 above. (This is not yet implemented.)

Example:

```js
// some-ember-cli-deploy-plugin/index.js
module.exports = {
  name: 'ember-cli-deploy-myplugin',

  createDeployPlugin: function(options) {
    return {
      name: options.name,
      configure: function(context) {
        var deployment = context.deployment;
        var config = deployment.config[this.name] = deployment.config[this.name] || {};
        config.revision = config.revision || function(context){
          return context.deployment.revision;
        };
        // we could also provide a helper for this, e.g.
        // config.revision = config.revision || fromPipelineData(context, “revision”);
        config.shouldActivate = config.shouldActivate || function(context){
         return !!context.flags.activate; // set via `--activate on command line
       };
      },
      // ...
  }
};
```

* App developers can also use this `function`-style configuration in `config/deploy.js` in order to wire together plugins. The function will receive the context and must return a value or throw an Error. Supports goal No. 6 above. (No additional implementation would be necessary if the above were implemented.)

Example:

```js
// deploy.js
module.export function(environment){
  var ENV = {
    redis: {
      revisionKey: function(context) { return context.deployment.tag; },
      forceUpdate: function(context) { return context.flags.force; }
    }
  }
  return ENV;
};
```

These approaches all combine to achieve goal No. 1 above.

### Plugin packs

A "plugin pack" is an ember-cli addon with the keyword
"ember-cli-deploy-plugin-pack" and one or more dependent
addons that are ember-cli-deploy-plugins.

Note that the plugin pack’s dependent addons should be listed as
dependencies in the pack’s package.json, not as devDependencies.

Plugin packs may also implement a config/deploy.js blueprint that
is auto-executed upon `ember install` of the pack to make
configuration easy for end-developers.
