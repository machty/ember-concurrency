# Changelog

## v5.1.0 (2019-01-18)

#### :rocket: Enhancement
* [#240](https://github.com/ember-cli/ember-cli-eslint/pull/240) Expose `format` property. ([@UTurista](https://github.com/UTurista))

#### :bug: Bug Fix
* [#335](https://github.com/ember-cli/ember-cli-eslint/pull/335) Fix `VersionChecker` construction. ([@Turbo87](https://github.com/Turbo87))

#### :house: Internal
* [#311](https://github.com/ember-cli/ember-cli-eslint/pull/311) TravisCI: Remove deprecated `sudo: false` option. ([@Turbo87](https://github.com/Turbo87))

#### Committers: 3
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))
- Vasco ([UTurista](https://github.com/UTurista))


## v5.0.0 (2018-11-09)

#### :boom: Breaking Change
* [#284](https://github.com/ember-cli/ember-cli-eslint/pull/284) Upgrade `broccoli-lint-eslint` to v5.0.0 ([@Gaurav0](https://github.com/Gaurav0))
* [#256](https://github.com/ember-cli/ember-cli-eslint/pull/256) Drop support for IE9 and IE10 ([@Gaurav0](https://github.com/Gaurav0))
* [#254](https://github.com/ember-cli/ember-cli-eslint/pull/254) Drop support for Node.js 4 ([@Gaurav0](https://github.com/Gaurav0))

#### :house: Internal
* [#251](https://github.com/ember-cli/ember-cli-eslint/pull/251) Upgrade to ember cli 3.4 via ember-cli-update ([@Gaurav0](https://github.com/Gaurav0))
* [#255](https://github.com/ember-cli/ember-cli-eslint/pull/255) Use Chrome instead of PhantomJS to run tests ([@Gaurav0](https://github.com/Gaurav0))
* [#263](https://github.com/ember-cli/ember-cli-eslint/pull/263) Remove obsolete `es6-promise` dev dependency ([@Turbo87](https://github.com/Turbo87))
* [#262](https://github.com/ember-cli/ember-cli-eslint/pull/262) yarn: Add `integrity` hashes ([@Turbo87](https://github.com/Turbo87))

#### Committers: 2
- Gaurav Munjal ([@Gaurav0](https://github.com/Gaurav0))
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))


## 4.2.3

- Extend test framework detection to `ember-qunit` and `ember-mocha` ([#225](https://github.com/ember-cli/ember-cli-eslint/pull/225))

## 4.2.2

- Fix file deletion bug. ([#222](https://github.com/ember-cli/ember-cli-eslint/pull/222))

## 4.2.1

- Fix detection of test frameworks for prerelease versions. ([#215](https://github.com/ember-cli/ember-cli-eslint/pull/215))

## 4.2.0

- Make extensions configurable ([#203](https://github.com/ember-cli/ember-cli-eslint/pull/203))

## 4.1.0

- Allow passthrough of `rulesDir` option to `broccoli-lint-eslint` ([#197](https://github.com/ember-cli/ember-cli-eslint/pull/197))

## 4.0.0

- Update to ESLint 4 ([#191](https://github.com/ember-cli/ember-cli-eslint/pull/191))

## 3.1.0

- Use new `group` option of `broccoli-lint-eslint` by default ([#176](https://github.com/ember-cli/ember-cli-eslint/pull/176))

## 3.0.3

- Remove direct `ember-cli-babel` dependency (it was unused).

## 3.0.2

- Lazily require `eslint` (speed up non-build related commands by ~ 100ms) ([#145](https://github.com/ember-cli/ember-cli-eslint/pull/145))

## 3.0.1

- Removed noise from `ember-cli-eslint` blueprint ([#143](https://github.com/ember-cli/ember-cli-eslint/pull/143))

## 3.0.0

- Update `broccoli-lint-eslint` and ESLint to v3.x ([#101](https://github.com/ember-cli/ember-cli-eslint/pull/101))

## 2.0.1

- Removed noise from `ember-cli-eslint` blueprint ([#143](https://github.com/ember-cli/ember-cli-eslint/pull/143))

## 2.0.0

- Remove deprecated `coding-standard` files ([#108](https://github.com/ember-cli/ember-cli-eslint/pull/108))

## 1.8.0

- Respect Ember CLI `--silent` flag ([#100](https://github.com/ember-cli/ember-cli-eslint/pull/100))
- Deprecate `coding-standard` files in favor of plain `.eslintrc` files ([#107](https://github.com/ember-cli/ember-cli-eslint/pull/107))
- Use default ESLint parser unless `babel-eslint` is specifically requested ([#107](https://github.com/ember-cli/ember-cli-eslint/pull/107))
- Remove `.jshintrc` files automatically on install ([#91](https://github.com/ember-cli/ember-cli-eslint/pull/91))

## 1.7.0 / 02-07-2016

- fix blueprints, they now reference the correct coding standard by default
- upgrade build dependencies

## 1.6.0 / 15-06-2016

- [Base app configuration](/blueprints/ember-cli-eslint/files/.eslintrc.js) now just extends from `coding-standard/ember-application.js`.
- [Base test configuration](/blueprints/ember-cli-eslint/files/tests/.eslintrc.js) now just extends from `coding-standard/ember-testing.js`.

## 1.5.0 / 09-06-2016

- Utilize third argument to `testGenerator` provided to `broccoli-lint-eslint` if available.
- Do not fail tests for lint warnings.

## 1.4.1 / 30-05-2016
- Remove `eslint-config-ember` and `phantomjs` from `devDependencies`.

## 1.4.0 / 14-05-2016
- Root configuration no longer relies on `eslint-config-ember`. (Discussion around appropriate base configuration is [still ongoing](https://github.com/ember-cli/ember-cli-eslint/pull/61))
- Default blueprint now generates `.eslintrc.js` and `tests/.eslintrc.js` (`.eslintrc` has been [deprecated](http://eslint.org/docs/user-guide/configuring#configuration-file-formats).
  - **Potential Changes:** If you have a `.eslintrc` or `tests/.eslintrc` file, please reformat it to be a `.eslintrc.js` file (using `module.exports`) so that `ember-cli-eslint` can detect potential duplicates.
- Base root configuration now extends from `eslint:recommended`.
- Base `/test` configuration now defines `embertest: true` as an `env` setting.

## 1.3.0 / 13-04-2016
- `broccoli-lint-eslint@^2.0.0`
- Passing build
- Move local `eslint` config settings to `config` directory.
- Update version of `eslint-config-ember` installed by default blueprint to `0.3.0`.
- Update project to `ember-cli@2.3.0`.
- Implement `lintTree` function that calls `project.generateTestFile` -- if it's available.
- Disable `ember-cli-qunit`'s and `ember-cli-mocha`'s' lintTree hook.

## 1.2.1
- Updated to eslint@1.4.1
  - eslint-config-ember@0.1.1
  - broccoli-lint-eslint@1.1.1

## 1.2.0
- Updated to eslint@1.1.3

## 1.1.0
- Upgrading package dependencies for Ember 1.13.8

## 1.0.0
- Bumping package to publish beta to stable

## 1.0.0-beta.15
- Bumping package because npm broke index.js again

## 1.0.0-beta.14
- Bumping version for broccoli-lint-eslint and eslint-config-ember

## 1.0.0-beta.13
- Adding tmp to .npmignore

## 1.0.0-beta.12
- Upgrade broccoli-lint-eslint to 1.0.0

## 1.0.0-beta.11
- Bump package number, again

## 1.0.0-beta.10
- Update badges
- Update package call

## 1.0.0-beta.9
- Force change due to npm index.js issue
- Add badge for travis

## 1.0.0-beta.8
- Fixing linting errors for dummy app
- Moving to package install in ember blueprint

## 1.0.0-beta.7
- Remove dirs and files that are not required
- Fix testing .eslintrc blueprint file
- Consume native eslint-config-eslint for own linting
- Move afterInstall to blueprint
- Upgrade to eslint-config-ember@0.0.5
- Add .gitkeep to blueprint to be usable as an addon

## 1.0.0-beta.2
- Update blueprint to use eslint-config-ember

## 0.1.4

- Updating documentation
- Updating broccoli-lint-eslint to 0.1.3

## 0.1.3

- Removing default eslint.json to allow ESLint to use default config lookup
- Moved the generator to use .eslintrc
- Updating broccoli-lint-eslint to 0.1.2
