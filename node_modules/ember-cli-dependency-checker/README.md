Ember CLI Dependency Checker [![Build Status](https://travis-ci.org/quaertym/ember-cli-dependency-checker.svg?branch=master)](https://travis-ci.org/quaertym/ember-cli-dependency-checker) [![Build status](https://ci.appveyor.com/api/projects/status/1tt9nvrkd7jtv1a0/branch/master?svg=true)](https://ci.appveyor.com/project/quaertym/ember-cli-dependency-checker/branch/master) [![Code Climate](https://codeclimate.com/github/quaertym/ember-cli-dependency-checker/badges/gpa.svg)](https://codeclimate.com/github/quaertym/ember-cli-dependency-checker) [![Ember Observer Score](http://emberobserver.com/badges/ember-cli-dependency-checker.svg)](http://emberobserver.com/addons/ember-cli-dependency-checker)
============================

An Ember CLI addon that checks for missing npm and bower dependencies before running ember commands.

### Installation

```bash
ember install ember-cli-dependency-checker
```

### Usage

Upon being included in a project (when running `ember build` for example), the dependency checker
will confirm versions according to several signals of intent:

* `bower.json` will be compared to the contents of `bower_components` (or your Ember-CLI
  configured bower directory)
* `package.json` will be compared to the contents of `node_modules`. This check only
  takes the top-level of dependencies into account. Nested dependencies are not confirmed.
* `npm-shrinkwrap.json`, if present, will be compared to the contents of `node_modules`. This
  is done only if a `package.json` check does not find any unsatisfied dependencies. Nested
  dependencies are confirmed.

### Shrinkwrap Workflow

**This workflow presumes npm v2.7.6 - v3.0.0**, though it may work well for earlier versions.

When installing dependencies, it is important that `npm shrinkwrap --dev` is run and the resulting
`npm-shrinkwrap.json` file committed. For example, to install the [Torii](https://github.com/Vestorly/torii)
library:

```
npm install --save-dev torii
npm shrinkwrap --dev
git add package.json npm-shrinkwrap.json
git commit -m "Install Torii"
```

**If the npm-shrinkwrap.json file is not committed, nested dependencies cannot be confirmed**.
Remembering to execute `npm shrinkwrap --dev` and commit `npm-shrinkwrap.json` is akin to committing
the `Gemfile.lock` file when using Ruby's Bundler library.

If `ember` is run and the contents of `node_modules/` differs from the contents of `package.json`
and `npm-shrinkwrap.json` an error will be raised. To resolve a difference in dependencies,
you must destroy the `node_modules/` directory and re-run `npm install`. With a blank
directory, `npm install` will respect the versions pinned in `npm-shrinkwrap.json`.

In some rare cases there may be un-resolvable conflicts between installable versions of
dependencies and those pinned. Upgrading packages after deleting the `npm-shrinkwrap.json`
file or changing the version of a dependency requested in `package.json` may be the only
way to resolve theses cases.

### Deployment with Shrinkwrap

Ember-CLI projects may be built on Travis or another dedicated build tool like Jenkins. To
ensure that versions of dependencies (including of nested dependencies) are the same during
builds as they are on the authoring developer's computer, it is recommended
that you confirm dependencies before a build. Do this by running `ember version` to
begin a dependency check, then if needed clearing the `node_modules/` and `bower_components/` folder
and installing dependencies. For example:

```
([ -f node_modules/ember-cli/bin/ember ] && node_modules/ember-cli/bin/ember version) || (rm -rf node_modules/ bower_components/ && npm install && bower install)
ember build -e production
```

### Caveats

Due to the limited information available in configuration files and packages, git
dependencies may fall out of sync. Using shrinkwrap will confirm that they are correct
upon installation, but they cannot be confirmed at runtime until improvements are
made to the `npm-shrinkwrap.json` file.

Pinning solely to versioned releases should be preferred.

### Tests

To run tests:

`npm test`

### LICENSE

MIT
