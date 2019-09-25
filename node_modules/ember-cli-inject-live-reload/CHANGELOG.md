# Change Log

## v1.10.2 (2018-10-15)

#### :bug: Bug Fix
* [#66](https://github.com/ember-cli/ember-cli-inject-live-reload/pull/66) Update minimum ember-cli version for scoped path ([@rwjblue](https://github.com/rwjblue))
* [#65](https://github.com/ember-cli/ember-cli-inject-live-reload/pull/65) fix: syntax error in `dynamicScript` ([@buschtoens](https://github.com/buschtoens))

#### Committers: 2
- Jan Buschtöns ([@buschtoens](https://github.com/buschtoens))
- Robert Jackson ([@rwjblue](https://github.com/rwjblue))

## v1.10.1 (2018-10-13)

#### :rocket: Enhancement
* [#59](https://github.com/ember-cli/ember-cli-inject-live-reload/pull/59) package.json: Declare Node.js version requirements. ([@Turbo87](https://github.com/Turbo87))

#### :bug: Bug Fix
* [#58](https://github.com/ember-cli/ember-cli-inject-live-reload/pull/58) Run test suite on TravisCI and fix Node 4 compatibility. ([@Turbo87](https://github.com/Turbo87))

#### :house: Internal
* [#57](https://github.com/ember-cli/ember-cli-inject-live-reload/pull/57) Add linting via ESLint. ([@rwjblue](https://github.com/rwjblue))

#### Committers: 2
- Robert Jackson ([rwjblue](https://github.com/rwjblue))
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))


## v1.10.0 (2018-10-13)

#### :bug: Bug Fix
* [#55](https://github.com/ember-cli/ember-cli-inject-live-reload/pull/55) Pass path as argument to livereload.js ([@SparshithNR](https://github.com/SparshithNR))

#### :house: Internal
* [#54](https://github.com/ember-cli/ember-cli-inject-live-reload/pull/54) Refactoring and Tests ([@SparshithNR](https://github.com/SparshithNR))

#### Committers: 1
- SparshithNRai ([@SparshithNR](https://github.com/SparshithNR))


## [v1.8.2](https://github.com/ember-cli/ember-cli-inject-live-reload/tree/v1.8.2) (2018-08-03)
[Full Changelog](https://github.com/ember-cli/ember-cli-inject-live-reload/compare/v1.8.1...v1.8.2)

**Merged pull requests:**

- Passing port and host to livereload.js file as regex fails to parse URL with prefix [\#51](https://github.com/ember-cli/ember-cli-inject-live-reload/pull/51) ([SparshithNR](https://github.com/SparshithNR))

## [v1.8.1](https://github.com/ember-cli/ember-cli-inject-live-reload/tree/v1.8.1) (2018-07-24)
[Full Changelog](https://github.com/ember-cli/ember-cli-inject-live-reload/compare/v1.8.0...v1.8.1)

**Merged pull requests:**

- fix undefined error when options.liveReloadPrefix is undefined [\#50](https://github.com/ember-cli/ember-cli-inject-live-reload/pull/50) ([SparshithNR](https://github.com/SparshithNR))

## [v1.8.0](https://github.com/ember-cli/ember-cli-inject-live-reload/tree/v1.8.0) (2018-07-24)
[Full Changelog](https://github.com/ember-cli/ember-cli-inject-live-reload/compare/v1.7.0...v1.8.0)

**Implemented enhancements:**

- Consider liveReloadPrefix option which got added into tiny-lr [\#49](https://github.com/ember-cli/ember-cli-inject-live-reload/pull/49) ([SparshithNR](https://github.com/SparshithNR))

## [v1.7.0](https://github.com/ember-cli/ember-cli-inject-live-reload/tree/v1.7.0) (2017-07-14)
[Full Changelog](https://github.com/ember-cli/ember-cli-inject-live-reload/compare/v1.6.1...v1.7.0)

**Fixed bugs:**

- When using the liveReloadBaseUrl with an absolute URL, the non-path portion should be stripped when setting up middleware. [\#36](https://github.com/ember-cli/ember-cli-inject-live-reload/pull/36) ([lukemelia](https://github.com/lukemelia))

**Closed issues:**

- Is it possible to remove the need for a liveReloadPort added to the livereload url [\#43](https://github.com/ember-cli/ember-cli-inject-live-reload/issues/43)

## [v1.6.1](https://github.com/ember-cli/ember-cli-inject-live-reload/tree/v1.6.1) (2017-01-19)
[Full Changelog](https://github.com/ember-cli/ember-cli-inject-live-reload/compare/v1.6.0...v1.6.1)

**Closed issues:**

- Live Reload not working when not using Ember CLI server to serve assets [\#13](https://github.com/ember-cli/ember-cli-inject-live-reload/issues/13)

**Merged pull requests:**

- Change the name of middleware to broccoli-watcher [\#41](https://github.com/ember-cli/ember-cli-inject-live-reload/pull/41) ([kratiahuja](https://github.com/kratiahuja))

## [v1.6.0](https://github.com/ember-cli/ember-cli-inject-live-reload/tree/v1.6.0) (2017-01-19)
[Full Changelog](https://github.com/ember-cli/ember-cli-inject-live-reload/compare/v1.5.0...v1.6.0)

**Merged pull requests:**

- Update this addon to run before the new serve-file middleware [\#39](https://github.com/ember-cli/ember-cli-inject-live-reload/pull/39) ([kratiahuja](https://github.com/kratiahuja))

## [v1.5.0](https://github.com/ember-cli/ember-cli-inject-live-reload/tree/v1.5.0) (2017-01-19)
[Full Changelog](https://github.com/ember-cli/ember-cli-inject-live-reload/compare/v1.4.1...v1.5.0)

**Closed issues:**

- Live reload on master not working \(500 error\) [\#35](https://github.com/ember-cli/ember-cli-inject-live-reload/issues/35)
- liveReloadBaseUrl with absolute url no longer supported [\#33](https://github.com/ember-cli/ember-cli-inject-live-reload/issues/33)
- Injected script not being appropriately fingerprinted [\#32](https://github.com/ember-cli/ember-cli-inject-live-reload/issues/32)
- Requirements [\#31](https://github.com/ember-cli/ember-cli-inject-live-reload/issues/31)
- Use `EMBER\_CLI\_INJECT\_LIVE\_RELOAD\_BASEURL` in the injected script  [\#30](https://github.com/ember-cli/ember-cli-inject-live-reload/issues/30)

**Merged pull requests:**

- Handle `liveReloadOptions` being undefined. [\#40](https://github.com/ember-cli/ember-cli-inject-live-reload/pull/40) ([rwjblue](https://github.com/rwjblue))
- Support Advanced Configuration [\#25](https://github.com/ember-cli/ember-cli-inject-live-reload/pull/25) ([chrislopresto](https://github.com/chrislopresto))

## [v1.4.1](https://github.com/ember-cli/ember-cli-inject-live-reload/tree/v1.4.1) (2016-07-18)
[Full Changelog](https://github.com/ember-cli/ember-cli-inject-live-reload/compare/v1.4.0...v1.4.1)

**Closed issues:**

- baseURL is being removed from ember [\#27](https://github.com/ember-cli/ember-cli-inject-live-reload/issues/27)
- \[Question\]: starting point to hot reload JS like we do w/ css today? [\#26](https://github.com/ember-cli/ember-cli-inject-live-reload/issues/26)
- Livereload reloads whole page even if only the css has changed [\#11](https://github.com/ember-cli/ember-cli-inject-live-reload/issues/11)

**Merged pull requests:**

- Fix overriding baseURL [\#28](https://github.com/ember-cli/ember-cli-inject-live-reload/pull/28) ([jgoclawski](https://github.com/jgoclawski))

## [v1.4.0](https://github.com/ember-cli/ember-cli-inject-live-reload/tree/v1.4.0) (2015-12-08)
[Full Changelog](https://github.com/ember-cli/ember-cli-inject-live-reload/compare/v1.3.1...v1.4.0)

**Merged pull requests:**

- Allow to force baseURL [\#24](https://github.com/ember-cli/ember-cli-inject-live-reload/pull/24) ([jbescoyez](https://github.com/jbescoyez))
- Create LICENSE.md [\#21](https://github.com/ember-cli/ember-cli-inject-live-reload/pull/21) ([JohnQuaresma](https://github.com/JohnQuaresma))

## [v1.3.1](https://github.com/ember-cli/ember-cli-inject-live-reload/tree/v1.3.1) (2015-01-30)
[Full Changelog](https://github.com/ember-cli/ember-cli-inject-live-reload/compare/v1.3.0...v1.3.1)

**Closed issues:**

- Where can I find `ember-cli-live-reload.js`  [\#16](https://github.com/ember-cli/ember-cli-inject-live-reload/issues/16)
- live-reload does not work if rootURL is a subdirectory [\#15](https://github.com/ember-cli/ember-cli-inject-live-reload/issues/15)

**Merged pull requests:**

- Add baseUrl to script path for ember-cli-live-reload.js [\#18](https://github.com/ember-cli/ember-cli-inject-live-reload/pull/18) ([pixelhandler](https://github.com/pixelhandler))
- connect-livereload dependency is not required anymore [\#17](https://github.com/ember-cli/ember-cli-inject-live-reload/pull/17) ([Dremora](https://github.com/Dremora))
- Wrap dynamic script to avoid globals [\#12](https://github.com/ember-cli/ember-cli-inject-live-reload/pull/12) ([teddyzeenny](https://github.com/teddyzeenny))

## [v1.3.0](https://github.com/ember-cli/ember-cli-inject-live-reload/tree/v1.3.0) (2014-10-13)
[Full Changelog](https://github.com/ember-cli/ember-cli-inject-live-reload/compare/v1.2.3...v1.3.0)

**Closed issues:**

- Support dynamic or configurable hostname \(besides localhost\) [\#8](https://github.com/ember-cli/ember-cli-inject-live-reload/issues/8)

**Merged pull requests:**

- Dynamically generate livereload script. [\#10](https://github.com/ember-cli/ember-cli-inject-live-reload/pull/10) ([rwjblue](https://github.com/rwjblue))

## [v1.2.3](https://github.com/ember-cli/ember-cli-inject-live-reload/tree/v1.2.3) (2014-10-06)
[Full Changelog](https://github.com/ember-cli/ember-cli-inject-live-reload/compare/v1.2.2...v1.2.3)

**Closed issues:**

- make injected script protocol relative [\#6](https://github.com/ember-cli/ember-cli-inject-live-reload/issues/6)

**Merged pull requests:**

- protocol-relative + misc [\#7](https://github.com/ember-cli/ember-cli-inject-live-reload/pull/7) ([stefanpenner](https://github.com/stefanpenner))

## [v1.2.2](https://github.com/ember-cli/ember-cli-inject-live-reload/tree/v1.2.2) (2014-10-03)
[Full Changelog](https://github.com/ember-cli/ember-cli-inject-live-reload/compare/v1.2.1...v1.2.2)

## [v1.2.1](https://github.com/ember-cli/ember-cli-inject-live-reload/tree/v1.2.1) (2014-10-03)
[Full Changelog](https://github.com/ember-cli/ember-cli-inject-live-reload/compare/v1.2.0...v1.2.1)

**Closed issues:**

- Insert livereload-script? [\#2](https://github.com/ember-cli/ember-cli-inject-live-reload/issues/2)

**Merged pull requests:**

- Uses LiveReload port from ENV [\#3](https://github.com/ember-cli/ember-cli-inject-live-reload/pull/3) ([unwiredbrain](https://github.com/unwiredbrain))

## [v1.2.0](https://github.com/ember-cli/ember-cli-inject-live-reload/tree/v1.2.0) (2014-10-03)
[Full Changelog](https://github.com/ember-cli/ember-cli-inject-live-reload/compare/v1.1.0...v1.2.0)

## [v1.1.0](https://github.com/ember-cli/ember-cli-inject-live-reload/tree/v1.1.0) (2014-09-22)
[Full Changelog](https://github.com/ember-cli/ember-cli-inject-live-reload/compare/v1.0.3...v1.1.0)

## [v1.0.3](https://github.com/ember-cli/ember-cli-inject-live-reload/tree/v1.0.3) (2014-09-21)
[Full Changelog](https://github.com/ember-cli/ember-cli-inject-live-reload/compare/v1.0.2...v1.0.3)

**Merged pull requests:**

- Create README.md [\#1](https://github.com/ember-cli/ember-cli-inject-live-reload/pull/1) ([quaertym](https://github.com/quaertym))

## [v1.0.2](https://github.com/ember-cli/ember-cli-inject-live-reload/tree/v1.0.2) (2014-08-13)
[Full Changelog](https://github.com/ember-cli/ember-cli-inject-live-reload/compare/v1.0.1...v1.0.2)

## [v1.0.1](https://github.com/ember-cli/ember-cli-inject-live-reload/tree/v1.0.1) (2014-08-12)
[Full Changelog](https://github.com/ember-cli/ember-cli-inject-live-reload/compare/v1.0.0...v1.0.1)

## [v1.0.0](https://github.com/ember-cli/ember-cli-inject-live-reload/tree/v1.0.0) (2014-08-12)
