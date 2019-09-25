# ember-cli-deploy-build

> An ember-cli-deploy plugin to build your ember-cli application

[![](https://ember-cli-deploy.github.io/ember-cli-deploy-version-badges/plugins/ember-cli-deploy-build.svg)](http://ember-cli-deploy.github.io/ember-cli-deploy-version-badges/)

This plugin will build your ember-cli application files and output them to a directory.

## What is an ember-cli-deploy plugin?

A plugin is an addon that can be executed as a part of the ember-cli-deploy pipeline. A plugin will implement one or more of the ember-cli-deploy's pipeline hooks.

For more information on what plugins are and how they work, please refer to the [Plugin Documentation][1].

## Quick Start

- Install this plugin

```bash
$ ember install ember-cli-deploy-build
```

- Run the pipeline

```bash
$ ember deploy
```

## Installation
Run the following command in your terminal:

```bash
ember install ember-cli-deploy-build
```

## ember-cli-deploy Hooks Implemented

For detailed information on what plugin hooks are and how they work, please refer to the [Plugin Documentation][1].

- `configure`
- `build`

## Configuration Options

For detailed information on how configuration of plugins works, please refer to the [Plugin Documentation][1].

### environment

The environment for which you'd like to build. This relates directly to the environments in your `config/environment.js` file.

*Default:* `'production'`

### outputPath

The path to the directory you'd like the project to be built in to.

*Default:* `tmp/deploy-dist`

## Prerequisites

None

## Tests

* yarn test

## Faster iteration while authoring deploy plugins & configs

When you're working on a deploy plugin or tweaking your deploy config, you often run `ember deploy` repeatedly, and each run usually invokes this plugin to do a full rebuild of your app, even though your app has not changed and the build options are identical.

You can instead reuse the build from the previous `ember deploy` by setting the environment variable `EMBER_CLI_DEPLOY_REUSE_BUILD`. This may make your interactive testing much faster. It's safe to use during development as long as you aren't actively changing your app or altering this module's `environment` or `outputPath`.

## Why `ember test` doesn't work

Since this is a node-only ember-cli addon, we use mocha for testing and this package does not include many files and devDependencies which are part of ember-cli's typical `ember test` processes.

[1]: https://ember-cli-deploy.github.io/ember-cli-deploy/plugins/ "Plugin Documentation"
