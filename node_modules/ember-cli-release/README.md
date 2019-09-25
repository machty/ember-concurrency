# ember-cli-release

[![Build Status](https://travis-ci.org/lytics/ember-cli-release.svg?branch=master)](https://travis-ci.org/lytics/ember-cli-release)
[![NPM Version](https://badge.fury.io/js/ember-cli-release.svg)](http://badge.fury.io/js/ember-cli-release)
[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-release.svg)](http://emberobserver.com/addons/ember-cli-release)

Ember CLI addon that defines a `release` command for bumping the version of your app or addon. It's a streamlined alternative to the [`npm version` command](https://docs.npmjs.com/cli/version), with a number of additional advantages:

- Non-SemVer tagging strategies
- Config file for:
  - Custom defaults
  - Promise-friendly hooks
- `bower.json` version replacement
- Annotated tag support

[![Introduction to ember-cli-release at Global Ember Meetup](https://i.vimeocdn.com/video/552191750_640x360.png)](https://vimeo.com/152244691)

## Installation

```sh
$ ember install ember-cli-release
```

This will also generate the config file `config/release.js` which can be used to provide default options ([see below](#options)).

## Usage

This addon revolves around git tags, and so relies heavily on shelling out to run git commands (unlike the wonderful [`git-repo-info`](https://github.com/rwjblue/git-repo-info)).

When invoked with no options:

```sh
$ ember release
```

It will:

  1. Assume that the project uses the [SemVer](http://semver.org/) versioning scheme
  2. Find the latest tag that is SemVer compliant and increment its PATCH version
  3. Replace the `version` property of `package.json` and `bower.json` with the new version
  4. Commit all changes to the working tree
  5. Create a lightweight git tag with the new version
  6. Push the branch and the new tag to `origin`

See the [examples section](#examples) for more ways to use the command.

## Options

Options can be specified on the command line or in `config/release.js` unless marked with an asterisk (`*`). Options specified on the command line **always take precedence** over options in the config file. Run `ember help` to see CLI aliases.

- `local`

  Default: `false`

  Whether to only create the git tag locally or not.

- `remote`

  Default: `'origin'`

  The git remote to push new tags to, ignored if `local` is true.

- `tag`\*

  Default: `null`

  Optional name of the tag to create, overrides versioning strategies.

- `annotation`

  Default: `null`

  Message to add when creating a tag, [indicates that the tag should be annotated](http://git-scm.com/book/tr/v2/Git-Basics-Tagging#Annotated-Tags), where `%@` is replaced with tag name.

- `message`

  Default: `'Released %@'`

  Message to use when committing changes to the working tree (including changes to `package.json` and `bower.json`), where `%@` is replaced with tag name.

- `manifest`

  Default: `[ 'package.json', 'bower.json' ]`

  A set of JSON manifest files to replace the top-level `version` key in with the new tag name.

- `publish`

  Default: `false`

  Whether to publish the package to NPM after tagging or not. Uses the currently logged in NPM user and the registry as defined in the project's [`package.json`](https://docs.npmjs.com/files/package.json#publishconfig).

- `yes`\*

  Default: `false`

  Whether to skip confirmation prompts or not (answer 'yes' to all questions).

- `strategy`

  Default: `'semver'`

  The versioning strategy to use, either `semver` or `date`.

- `major`\*

  Default: `false`

  Increment the **major** SemVer version, takes precedence over `minor`. Only used when the `strategy` option is `'semver'`.

- `minor`\*

  Default: `false`

  Increment the **minor** SemVer version, if both `major` and `minor` are false, **patch** is incremented. Only used when the `strategy` option is `'semver'`.

- `premajor`\*

  Default: `''`

  Increment the **major** SemVer version, and add given prerelease identifier with version of `0`. Only used when the `strategy` option is `'semver'`, and ignored if `major` or `minor` are specified.

- `preminor`\*

  Default: `''`

  Increment the **minor** SemVer version, and add given prerelease identifier with version of `0`. Only used when the `strategy` option is `'semver'`, and ignored if `major`, `minor`, or `premajor` are specified.

- `prerelease`\*

  Default: `false`

  When using SemVer, has multiple behaviors:

  - Latest version contains a prerelease identifier
    - If value is omitted or a string that matches the current identifier, increment the prerelease version.
    - If value is a string that differs from the current identifier, change the identifier to the one given and reset the prerelease version to `0`.
  - Latest version does not contain a prerelease identifier
    - Increment the **patch** version and append the given prerelease identifier (the value must be a string).

  Only used when the `strategy` option is `'semver'`, and ignored if `major`, `minor`, `premajor`, or `preminor` are specified.

- `format`

  Default: `'YYYY.MM.DD'`

  The format string used when creating a tag based on the current date using [`moment().format()`](http://momentjs.com/docs/#/displaying/format/). Only used when the `strategy` option is `'date'`.

- `timezone`

  Default: `'UTC'`

  The timezone to consider the current date in. Only used when the `strategy` option is `'date'`.

## Hooks

A set of lifecycle hooks exists as a means to inject additional behavior into the release process. Lifecycle hooks can be specified in `config/release.js`. All hooks can return a thenable that will be resolved before continuing the release process. Throwing from a hook or rejecting a promise returned by a hook will halt the release process and print the error.

Hooks are passed two arguments:

  - `project` - a reference to the current ember-cli project
  - `tags` - an object containing tag information, which will always have a `next` property and depending on the strategy you are using, may also have a `latest` property. Note that these values will be the exact values used for the tag, which by default includes a `v` prefix.

There are three lifecycle hooks available:

- `init`

  Called after the new version has been computed but before any changes are made to the filesystem or repository. Use this hook if you need to verify that the local environment is setup for releasing, and abort if not.

  ###### Example Usage

  Aborting:

  ```js
  // config/release.js
  module.exports = {
    init: function() {
      if (!process.env.SUPER_SECRET_KEY) {
        throw 'Super secret key missing!';
      }
    }
  };
  ```

- `beforeCommit`

  Called after the new version has been replaced in manifest files but before the changes have been committed. Use this hook if you need to update the version number in additional files, or build the project to update dist files. Note that this hook runs regardless of whether a commit will be made.

  ###### Example Usage

  Version replacement:

  ```js
  // config/release.js
  var path = require('path');
  var xmlpoke = require('xmlpoke');

  module.exports = {
    beforeCommit: function(project, tags) {
      xmlpoke(path.join(project.root, 'cordova/config.xml'), function(xml) {
        xml.errorOnNoMatches();
        xml.addNamespace('w', 'http://www.w3.org/ns/widgets');
        xml.set('w:widget/@version', tags.next);
      });
    }
  };
  ```

  Building:

  ```js
  // config/release.js
  var BuildTask = require('ember-cli/lib/tasks/build');

  module.exports = {
    // Build the project in the production environment, outputting to dist/
    beforeCommit: function(project) {
      var task = new BuildTask({
        project: project,
        ui: project.ui,
        analytics: project.cli.analytics
      });

      return task.run({
        environment: 'production',
        outputPath: 'dist/'
      });
    }
  };
  ```

- `afterPush`

  Called after successfully pushing all changes to the specified remote, but before exiting. Use this hook for post-release tasks like cleanup or sending notifications from your CI server.

  ###### Example Usage

  Notification:

  ```js
  // config/release.js
  var Slack = require('node-slack');

  // Look for slack configuration in the CI environment
  var isCI = process.env.CI;
  var hookURL = process.env.SLACK_HOOK_URL;

  module.exports = {
    // Notify the #dev channel when a new release is created
    afterPush: function(project, tags) {
      if (isCI && hookURL) {
        var slack = new Slack(hookURL);

        return slack.send({
          text: 'ZOMG, ' + project.name() + ' ' + tags.next + ' RELEASED!!1!',
          channel: '#dev',
          username: 'Mr. CI'
        });
      }
    }
  };
  ```

- `afterPublish`

  Called after successfully publishing the package to NPM, but before exiting. Use this hook exactly as `afterPush` is used when performing a publish. Note that this hook is not run when `--publish` option is not set.

## Custom Tagging Strategy

If your app does not use SemVer or date-based tags, you may specify a custom method for generating the next tag by making the `strategy` property a function in `config/release.js`. The function takes three arguments: the project instance, an array of existing git tags, and an options hash with all option values. It must return a non-empty string specifying the next tag, or a promise that resolves with the tag name. For example:

```js
// config/release.js
module.exports = {
  // Emulate Subversion-style build numbers
  strategy: function(project, tags, options) {
    var builds = tags
      .map(function(tag) { return +tag; })
      .filter(function(build) { return !isNaN(build); })
      .sort()
      .reverse();

    return builds[0] + 1;
  }
};
```

Alternatively, if the custom strategy requires additional CLI options, an object can be specified with `availableOptions`, `getLatestTag`, and `getNextTag` properties:

```js
// config/release.js
module.exports = {
  strategy: {
    availableOptions: [
      {
        name: 'channel',
        type: String,
        default: 'stable',
        description: "the release's channel"
      },
    ],

    getLatestTag: function(project, tags, options) {
      // Find the latest tag in the `tags` array
      var latest = '...';

      return latest;
    },

    getNextTag: function(project, tags, options) {
      // Generate an identifier
      var next = '...';

      // Prepend the specified channel
      return options.channel + '-' + next;
    }
  }
};
```

## Workflow

These are the steps that take place when running the `release` command:

1. Abort if HEAD is already at a tag
2. Abort if `publish` option is `true` and no NPM user is logged in or `strategy` is not 'semver'
3. Calculate new version
  1. Use `tag` option if present
  2. Invoke custom tagging strategy if specified
  3. Otherwise, generate new version using `strategy` option (default: 'semver')
    - SemVer
      1. Look for latest tag using `node-semver` ordering
      2. Increment based on `major`, `minor`, or `patch` (default: `patch`)
    - Date
      1. Create tag name based on current date and `format` option (default: `YYYY.MM.DD`)
      2. Look for existing tag of same name, append `.X` where X is an incrementing integer
  3. Print new version name
4. Invoke the `init` hook
5. If working tree is dirty, prompt user that their changes will be included in release commit
6. Replace `version` property of files specified by the `manifest` option (default: `package.json`/`bower.json`)
7. Invoke the `beforeCommit` hook
8. Commit changes
  1. Skip if working tree is unmodified
  2. Stage all changes and commit with `message` option as the commit message
9. Create tag
  1. Prompt to continue with new tag name
  2. Tag the latest commit with new version using the `annotation` option if specified
10. Push to remote
  1. Skip if `local` option is `true` (default: `false`)
  2. Push current branch and tags to remote specified by `remote` option
11. Invoke the `afterPush` hook
12. Publish package to NPM using current credentials if `publish` option is `true` (default: `false`)
13. Invoke the `afterPublish` hook

## Examples

To create a new tag based on the date in east cost time with a custom format:

```sh
> ember release --strategy=date --format="YYYY-MM-DD" --timezone="America/New_York"
```

Or to create a specific tag (no versioning strategy) with annotation, locally only:

```sh
> ember release --local --tag="what_am_i_doing" --annotation="First version wooooo!"
```

To create a series of SemVer prereleases, use the `--premajor` (or `--preminor`) option followed by any number of `--prerelease`s, and finally `--major` (or `--minor`):

```sh
# v1.3.2
> ember release --premajor alpha
# v2.0.0-alpha.0
> ember release --prerelease
# v2.0.0-alpha.1
> ember release --prerelease beta
# v2.0.0-beta.0
> ember release --prerelease
# v2.0.0-beta.1
> ember release --major
# v2.0.0
```

## Contributing

Pull requests welcome, but they must be fully tested (and pass all existing tests) to be considered. Discussion issues also welcome.

## Running Tests

```sh
$ npm test
```
