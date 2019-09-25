# Change Log

## [v1.1.0](https://github.com/ember-cli/ember-try/tree/v1.1.0) (2018-09-25)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v1.0.0...v1.1.0)

**Closed issues:**

- \[Security\] Cut stable release with upgraded lodash or cli-table3 [\#200](https://github.com/ember-cli/ember-try/issues/200)
- `npm prune --no-shrinkwrap` removes packages declared with `github:repo\#hash` syntax [\#170](https://github.com/ember-cli/ember-try/issues/170)

**Merged pull requests:**

- \[feat\] Adds support for Yarn/NPM workspaces [\#209](https://github.com/ember-cli/ember-try/pull/209) ([pzuraq](https://github.com/pzuraq))

## [v1.0.0](https://github.com/ember-cli/ember-try/tree/v1.0.0) (2018-08-30)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v1.0.0-beta.6...v1.0.0)

**Merged pull requests:**

- Upgrade ember-cli & blueprint [\#206](https://github.com/ember-cli/ember-try/pull/206) ([kategengler](https://github.com/kategengler))
- Update deps [\#205](https://github.com/ember-cli/ember-try/pull/205) ([kategengler](https://github.com/kategengler))

## [v1.0.0-beta.6](https://github.com/ember-cli/ember-try/tree/v1.0.0-beta.6) (2018-08-30)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v1.0.0-beta.5...v1.0.0-beta.6)

## [v1.0.0-beta.5](https://github.com/ember-cli/ember-try/tree/v1.0.0-beta.5) (2018-08-30)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v1.0.0-beta.4...v1.0.0-beta.5)

## [v1.0.0-beta.4](https://github.com/ember-cli/ember-try/tree/v1.0.0-beta.4) (2018-08-30)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v1.0.0-beta.3...v1.0.0-beta.4)

**Closed issues:**

- A function in the Route to just leave current route, whatever it is. [\#199](https://github.com/ember-cli/ember-try/issues/199)
- `ember try:ember` dies after first failed scenario with 1.0.0-beta.3 [\#197](https://github.com/ember-cli/ember-try/issues/197)
- Tests not rebuilding on an ember try scenario [\#190](https://github.com/ember-cli/ember-try/issues/190)

**Merged pull requests:**

- Update to Travis Stages & Deploy from Travis [\#204](https://github.com/ember-cli/ember-try/pull/204) ([kategengler](https://github.com/kategengler))
- Handle non-zero exit from commands run in a way needed by execa [\#203](https://github.com/ember-cli/ember-try/pull/203) ([kategengler](https://github.com/kategengler))
- Update `cli-table2` to `cli-table3` [\#198](https://github.com/ember-cli/ember-try/pull/198) ([Turbo87](https://github.com/Turbo87))

## [v1.0.0-beta.3](https://github.com/ember-cli/ember-try/tree/v1.0.0-beta.3) (2018-05-15)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v1.0.0-beta.2...v1.0.0-beta.3)

## [v1.0.0-beta.2](https://github.com/ember-cli/ember-try/tree/v1.0.0-beta.2) (2018-05-15)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v1.0.0-beta.1...v1.0.0-beta.2)

**Closed issues:**

- Failing scenario for `1.13` after updating to `3.0` [\#187](https://github.com/ember-cli/ember-try/issues/187)
- Travis and yarn issue on Ember 2.12 only [\#148](https://github.com/ember-cli/ember-try/issues/148)
- Be smart about versions of Ember where version is provided by bower and where versions are provided by npm [\#91](https://github.com/ember-cli/ember-try/issues/91)

**Merged pull requests:**

- Use execa for subprocess support. [\#195](https://github.com/ember-cli/ember-try/pull/195) ([stefanpenner](https://github.com/stefanpenner))
- move requires from let -\> const [\#194](https://github.com/ember-cli/ember-try/pull/194) ([stefanpenner](https://github.com/stefanpenner))
- Let mocha handle rejected promises. [\#193](https://github.com/ember-cli/ember-try/pull/193) ([stefanpenner](https://github.com/stefanpenner))
- Explicitly remove `--no-shrinkwrap` from the `npm prune` call [\#171](https://github.com/ember-cli/ember-try/pull/171) ([xcambar](https://github.com/xcambar))

## [v1.0.0-beta.1](https://github.com/ember-cli/ember-try/tree/v1.0.0-beta.1) (2018-02-09)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v1.0.0-beta.0...v1.0.0-beta.1)

**Merged pull requests:**

- Upgrade ember-try-config to 3.0 [\#185](https://github.com/ember-cli/ember-try/pull/185) ([kategengler](https://github.com/kategengler))

## [v1.0.0-beta.0](https://github.com/ember-cli/ember-try/tree/v1.0.0-beta.0) (2018-02-07)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.2.23...v1.0.0-beta.0)

**Implemented enhancements:**

- Remove deprecated commands [\#163](https://github.com/ember-cli/ember-try/issues/163)

**Closed issues:**

- How might I get only one of my scenarios to run my after\_success deploy script? [\#180](https://github.com/ember-cli/ember-try/issues/180)
- Remove "default config"? [\#177](https://github.com/ember-cli/ember-try/issues/177)
- Deprecate support for top-level dependencies under a scenario [\#162](https://github.com/ember-cli/ember-try/issues/162)

**Merged pull requests:**

- Remove default config [\#184](https://github.com/ember-cli/ember-try/pull/184) ([kategengler](https://github.com/kategengler))
- Update npmignore [\#183](https://github.com/ember-cli/ember-try/pull/183) ([kategengler](https://github.com/kategengler))
- Add yarn.lock [\#182](https://github.com/ember-cli/ember-try/pull/182) ([kategengler](https://github.com/kategengler))
- Allow setting env vars per scenario, independent of defining a command [\#181](https://github.com/ember-cli/ember-try/pull/181) ([kategengler](https://github.com/kategengler))
- Use smoke-test-app for running all-commands.sh [\#179](https://github.com/ember-cli/ember-try/pull/179) ([kategengler](https://github.com/kategengler))
- Remove deprecated commands and config options [\#178](https://github.com/ember-cli/ember-try/pull/178) ([kategengler](https://github.com/kategengler))
- Upgrade ember-cli, ember & other deps [\#174](https://github.com/ember-cli/ember-try/pull/174) ([kategengler](https://github.com/kategengler))

## [v0.2.23](https://github.com/ember-cli/ember-try/tree/v0.2.23) (2018-01-13)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.2.22...v0.2.23)

**Fixed bugs:**

- Support config files returning a promise [\#173](https://github.com/ember-cli/ember-try/pull/173) ([kategengler](https://github.com/kategengler))

**Closed issues:**

- Feature Request: support promises in dependencies... [\#172](https://github.com/ember-cli/ember-try/issues/172)

**Merged pull requests:**

- Stop using phantom for test runs... [\#175](https://github.com/ember-cli/ember-try/pull/175) ([rwjblue](https://github.com/rwjblue))

## [v0.2.22](https://github.com/ember-cli/ember-try/tree/v0.2.22) (2017-11-14)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.2.21...v0.2.22)

**Merged pull requests:**

- Do not issue warning when including ember-try in project's package.json. [\#166](https://github.com/ember-cli/ember-try/pull/166) ([rwjblue](https://github.com/rwjblue))

## [v0.2.21](https://github.com/ember-cli/ember-try/tree/v0.2.21) (2017-11-14)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.2.20...v0.2.21)

**Merged pull requests:**

- update ember-cli-version-checker [\#165](https://github.com/ember-cli/ember-try/pull/165) ([ef4](https://github.com/ef4))

## [v0.2.20](https://github.com/ember-cli/ember-try/tree/v0.2.20) (2017-11-13)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.2.19...v0.2.20)

**Fixed bugs:**

- Error: Cannot find module 'bower' [\#161](https://github.com/ember-cli/ember-try/issues/161)
-  Ensure `bower` is not required when no bower dependencies are present. [\#164](https://github.com/ember-cli/ember-try/pull/164) ([rwjblue](https://github.com/rwjblue))

**Closed issues:**

- bower version [\#131](https://github.com/ember-cli/ember-try/issues/131)
- Ember-try uses `Yarn` in Travis CI Trusty Build [\#125](https://github.com/ember-cli/ember-try/issues/125)
- Allow user to disable beta, canary when using versionCompatability [\#86](https://github.com/ember-cli/ember-try/issues/86)

**Merged pull requests:**

- Clean up all-commands.sh to remove deprecated commands [\#160](https://github.com/ember-cli/ember-try/pull/160) ([kategengler](https://github.com/kategengler))

## [v0.2.19](https://github.com/ember-cli/ember-try/tree/v0.2.19) (2017-11-12)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.2.18...v0.2.19)

**Fixed bugs:**

- versionCompatibility caching [\#112](https://github.com/ember-cli/ember-try/issues/112)

**Closed issues:**

- Scenarios missing their deps when no bower and no package-lock.json [\#150](https://github.com/ember-cli/ember-try/issues/150)
- try:each fails with paths containing spaces and parens [\#149](https://github.com/ember-cli/ember-try/issues/149)
- ember-cli module directory emptied of files [\#141](https://github.com/ember-cli/ember-try/issues/141)

**Merged pull requests:**

- Implicitly add an npm dev dependency on bower [\#157](https://github.com/ember-cli/ember-try/pull/157) ([hjdivad](https://github.com/hjdivad))
- Bump ember-try-config [\#156](https://github.com/ember-cli/ember-try/pull/156) ([hjdivad](https://github.com/hjdivad))
- Put quotes around paths  [\#154](https://github.com/ember-cli/ember-try/pull/154) ([kategengler](https://github.com/kategengler))

## [v0.2.18](https://github.com/ember-cli/ember-try/tree/v0.2.18) (2017-11-06)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.2.17...v0.2.18)

**Implemented enhancements:**

- Order versionCompatibility scenarios by semver [\#128](https://github.com/ember-cli/ember-try/issues/128)

**Closed issues:**

- Ignore package-lock.json by default [\#144](https://github.com/ember-cli/ember-try/issues/144)
- yarn detection isn't complete [\#133](https://github.com/ember-cli/ember-try/issues/133)

**Merged pull requests:**

- Update README to indicate lockfiles are ignored for npm as well as yarn [\#153](https://github.com/ember-cli/ember-try/pull/153) ([kategengler](https://github.com/kategengler))
- Use --no-shrinkwrap option to npm [\#152](https://github.com/ember-cli/ember-try/pull/152) ([kategengler](https://github.com/kategengler))

## [v0.2.17](https://github.com/ember-cli/ember-try/tree/v0.2.17) (2017-09-08)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.2.16...v0.2.17)

**Closed issues:**

- `useYarn: true` causes `ember try:each` to fail [\#147](https://github.com/ember-cli/ember-try/issues/147)

**Merged pull requests:**

- Update travis.yml to test against node 8 [\#146](https://github.com/ember-cli/ember-try/pull/146) ([kategengler](https://github.com/kategengler))
- fix indentation [\#139](https://github.com/ember-cli/ember-try/pull/139) ([kellyselden](https://github.com/kellyselden))
- Change Yarn detection to look for lockfile [\#138](https://github.com/ember-cli/ember-try/pull/138) ([backspace](https://github.com/backspace))

## [v0.2.16](https://github.com/ember-cli/ember-try/tree/v0.2.16) (2017-07-16)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.2.15...v0.2.16)

**Fixed bugs:**

- npm@5 issues [\#130](https://github.com/ember-cli/ember-try/issues/130)

**Closed issues:**

- ember-try fails with default addon app + ember-cli-sass [\#126](https://github.com/ember-cli/ember-try/issues/126)
- Does `ember-try-config` need to be a dev dependency? [\#77](https://github.com/ember-cli/ember-try/issues/77)

**Merged pull requests:**

- add npm badge to README [\#136](https://github.com/ember-cli/ember-try/pull/136) ([kellyselden](https://github.com/kellyselden))
- add --ignore-engines to yarn default options [\#135](https://github.com/ember-cli/ember-try/pull/135) ([kellyselden](https://github.com/kellyselden))
- fix default value [\#134](https://github.com/ember-cli/ember-try/pull/134) ([kellyselden](https://github.com/kellyselden))

## [v0.2.15](https://github.com/ember-cli/ember-try/tree/v0.2.15) (2017-05-31)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.2.14...v0.2.15)

**Merged pull requests:**

- loosen engine constraints, assume new versions are compatible. [\#129](https://github.com/ember-cli/ember-try/pull/129) ([stefanpenner](https://github.com/stefanpenner))
- Remove sync-exec as it is not used anymore [\#127](https://github.com/ember-cli/ember-try/pull/127) ([polarctos](https://github.com/polarctos))

## [v0.2.14](https://github.com/ember-cli/ember-try/tree/v0.2.14) (2017-04-22)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.2.13...v0.2.14)

**Merged pull requests:**

- Move ember-cli-babel to a devDependency. [\#124](https://github.com/ember-cli/ember-try/pull/124) ([rwjblue](https://github.com/rwjblue))
- Make "ember-cli-babel" dev dependency [\#123](https://github.com/ember-cli/ember-try/pull/123) ([Turbo87](https://github.com/Turbo87))

## [v0.2.13](https://github.com/ember-cli/ember-try/tree/v0.2.13) (2017-03-28)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.2.12...v0.2.13)

**Closed issues:**

- Failing in Travis with `Error: Cannot find module './../utils/result-summary'` [\#121](https://github.com/ember-cli/ember-try/issues/121)

**Merged pull requests:**

- Require ResultSummary before any npm scenarios run [\#122](https://github.com/ember-cli/ember-try/pull/122) ([kategengler](https://github.com/kategengler))

## [v0.2.12](https://github.com/ember-cli/ember-try/tree/v0.2.12) (2017-03-24)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.2.11...v0.2.12)

**Merged pull requests:**

- Add tests for using yarn when available [\#120](https://github.com/ember-cli/ember-try/pull/120) ([kategengler](https://github.com/kategengler))
- Minimal yarn support [\#117](https://github.com/ember-cli/ember-try/pull/117) ([canufeel](https://github.com/canufeel))

## [v0.2.11](https://github.com/ember-cli/ember-try/tree/v0.2.11) (2017-03-16)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.2.10...v0.2.11)

**Closed issues:**

- Support running bower scenarios even if the app does not initially have a bower.json [\#110](https://github.com/ember-cli/ember-try/issues/110)

**Merged pull requests:**

- clarify that reset cleans up npm stuff too [\#119](https://github.com/ember-cli/ember-try/pull/119) ([ibroadfo](https://github.com/ibroadfo))
- fix CI client-test cache problem [\#118](https://github.com/ember-cli/ember-try/pull/118) ([canufeel](https://github.com/canufeel))
- Switch from eslint & jscs to just eslint [\#116](https://github.com/ember-cli/ember-try/pull/116) ([kategengler](https://github.com/kategengler))
- Support having bower scenarios without having a bower.json initially [\#115](https://github.com/ember-cli/ember-try/pull/115) ([kategengler](https://github.com/kategengler))

## [v0.2.10](https://github.com/ember-cli/ember-try/tree/v0.2.10) (2017-02-21)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.2.9...v0.2.10)

**Closed issues:**

- Having trouble figuring out how to try versions of ember-data  [\#111](https://github.com/ember-cli/ember-try/issues/111)

**Merged pull requests:**

- Leverage command return value instead of process.exit. [\#114](https://github.com/ember-cli/ember-try/pull/114) ([rwjblue](https://github.com/rwjblue))

## [v0.2.9](https://github.com/ember-cli/ember-try/tree/v0.2.9) (2017-01-15)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.2.8...v0.2.9)

**Merged pull requests:**

- Install bower if not installed and required by scenarios [\#109](https://github.com/ember-cli/ember-try/pull/109) ([kategengler](https://github.com/kategengler))

## [v0.2.8](https://github.com/ember-cli/ember-try/tree/v0.2.8) (2016-11-01)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.2.7...v0.2.8)

**Closed issues:**

- Command from config cannot include multiple command with | or && [\#94](https://github.com/ember-cli/ember-try/issues/94)
- Allow using environment variables in command. [\#87](https://github.com/ember-cli/ember-try/issues/87)

**Merged pull requests:**

- Allow chained commands and setting env vars in commands [\#107](https://github.com/ember-cli/ember-try/pull/107) ([kategengler](https://github.com/kategengler))
- Run a subset of commands in Windows CI as a smoke-test [\#97](https://github.com/ember-cli/ember-try/pull/97) ([kategengler](https://github.com/kategengler))

## [v0.2.7](https://github.com/ember-cli/ember-try/tree/v0.2.7) (2016-10-30)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.2.6...v0.2.7)

**Closed issues:**

- Add API for removing packages [\#104](https://github.com/ember-cli/ember-try/issues/104)
- A [\#103](https://github.com/ember-cli/ember-try/issues/103)
- Add ability for `yarn` to replace `bower` executable [\#102](https://github.com/ember-cli/ember-try/issues/102)
- make bower optional [\#101](https://github.com/ember-cli/ember-try/issues/101)
- Running command silently contains ember-try installation output [\#99](https://github.com/ember-cli/ember-try/issues/99)
- `ember-try-config` messing with shrinkwrap [\#80](https://github.com/ember-cli/ember-try/issues/80)
- Can we use bower's programmatic api? [\#42](https://github.com/ember-cli/ember-try/issues/42)

**Merged pull requests:**

- Allow removing packages from bower config [\#108](https://github.com/ember-cli/ember-try/pull/108) ([kategengler](https://github.com/kategengler))
- allow removing npm packages [\#106](https://github.com/ember-cli/ember-try/pull/106) ([kellyselden](https://github.com/kellyselden))
- add support for npm peerDependencies [\#105](https://github.com/ember-cli/ember-try/pull/105) ([kellyselden](https://github.com/kellyselden))
- Upgrade to ember-cli 2.8 [\#98](https://github.com/ember-cli/ember-try/pull/98) ([kategengler](https://github.com/kategengler))
- Updating help text for try:one [\#90](https://github.com/ember-cli/ember-try/pull/90) ([thoov](https://github.com/thoov))

## [v0.2.6](https://github.com/ember-cli/ember-try/tree/v0.2.6) (2016-09-28)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.2.5...v0.2.6)

**Fixed bugs:**

- Deprecation warning for Ember CLI below v2.6.0 [\#83](https://github.com/ember-cli/ember-try/issues/83)

**Merged pull requests:**

- Skipping deprecation warning if ember-cli is below 2.6 [\#96](https://github.com/ember-cli/ember-try/pull/96) ([gmurphey](https://github.com/gmurphey))
- readme missing backticks [\#93](https://github.com/ember-cli/ember-try/pull/93) ([kellyselden](https://github.com/kellyselden))
- readme typo [\#92](https://github.com/ember-cli/ember-try/pull/92) ([kellyselden](https://github.com/kellyselden))
- NPM packaging cleanup [\#89](https://github.com/ember-cli/ember-try/pull/89) ([Turbo87](https://github.com/Turbo87))

## [v0.2.5](https://github.com/ember-cli/ember-try/tree/v0.2.5) (2016-08-03)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.2.4...v0.2.5)

**Fixed bugs:**

- Deprecation warning for Ember CLI below v2.6.0 [\#84](https://github.com/ember-cli/ember-try/issues/84)

**Merged pull requests:**

- Don't use "latest" as strategy in package.json [\#85](https://github.com/ember-cli/ember-try/pull/85) ([cibernox](https://github.com/cibernox))
- Fix spelling [\#82](https://github.com/ember-cli/ember-try/pull/82) ([xomaczar](https://github.com/xomaczar))
- Remove typo in deprecation message [\#78](https://github.com/ember-cli/ember-try/pull/78) ([dmuneras](https://github.com/dmuneras))

## [v0.2.4](https://github.com/ember-cli/ember-try/tree/v0.2.4) (2016-06-21)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.2.3...v0.2.4)

**Merged pull requests:**

- CoreObject 1.x and 2.x compat [\#76](https://github.com/ember-cli/ember-try/pull/76) ([stefanpenner](https://github.com/stefanpenner))

## [v0.2.3](https://github.com/ember-cli/ember-try/tree/v0.2.3) (2016-06-21)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.2.2...v0.2.3)

**Closed issues:**

- slow require times [\#74](https://github.com/ember-cli/ember-try/issues/74)
- ember try is grabbing more than release/beta [\#72](https://github.com/ember-cli/ember-try/issues/72)
- When using `ember try:each`, `npm install` doesn't always seem to be executed [\#70](https://github.com/ember-cli/ember-try/issues/70)
- \[Proposal\] Blueprinted scenarios  [\#55](https://github.com/ember-cli/ember-try/issues/55)

**Merged pull requests:**

- Move costly requires to be lazy. [\#75](https://github.com/ember-cli/ember-try/pull/75) ([rwjblue](https://github.com/rwjblue))
- Fix deprecation message for `ember try` command. [\#73](https://github.com/ember-cli/ember-try/pull/73) ([rwjblue](https://github.com/rwjblue))
- Warn if addon or app is using ember-try in package.json, it's now included in ember-cli [\#71](https://github.com/ember-cli/ember-try/pull/71) ([kategengler](https://github.com/kategengler))
- Update README.md [\#69](https://github.com/ember-cli/ember-try/pull/69) ([MiguelMadero](https://github.com/MiguelMadero))
- Added "How to use EmberTry" from Global Ember Meetup [\#68](https://github.com/ember-cli/ember-try/pull/68) ([taras](https://github.com/taras))

## [v0.2.2](https://github.com/ember-cli/ember-try/tree/v0.2.2) (2016-03-15)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.2.1...v0.2.2)

## [v0.2.1](https://github.com/ember-cli/ember-try/tree/v0.2.1) (2016-03-13)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.2.0...v0.2.1)

**Merged pull requests:**

- Add some output between scenarios to make the output easier to parse in case of failures [\#67](https://github.com/ember-cli/ember-try/pull/67) ([kategengler](https://github.com/kategengler))
- Make config file able to export a function [\#66](https://github.com/ember-cli/ember-try/pull/66) ([kategengler](https://github.com/kategengler))
- Add ability to auto-generate scenarios from a `versionCompatibility` statement in package.json [\#65](https://github.com/ember-cli/ember-try/pull/65) ([kategengler](https://github.com/kategengler))
- Some reorganization + adding debug [\#64](https://github.com/ember-cli/ember-try/pull/64) ([kategengler](https://github.com/kategengler))
- Add coverage & codeclimate config [\#63](https://github.com/ember-cli/ember-try/pull/63) ([kategengler](https://github.com/kategengler))

## [v0.2.0](https://github.com/ember-cli/ember-try/tree/v0.2.0) (2016-02-20)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.1.3...v0.2.0)

**Closed issues:**

- ember try:testall should honor all or a subset of 'ember test' arguments [\#43](https://github.com/ember-cli/ember-try/issues/43)
- Add a parameter to the scenarios to warn on failure instead of fail [\#4](https://github.com/ember-cli/ember-try/issues/4)

**Merged pull requests:**

- New configuration option `allowedToFail` per scenario. [\#62](https://github.com/ember-cli/ember-try/pull/62) ([kategengler](https://github.com/kategengler))
- Add 'bowerOptions' and 'npmOptions' as top level configuration options [\#61](https://github.com/ember-cli/ember-try/pull/61) ([kategengler](https://github.com/kategengler))
- Add `ember try:one \<scenario\> \(...options\) --- \<command\>` [\#60](https://github.com/ember-cli/ember-try/pull/60) ([kategengler](https://github.com/kategengler))
- Make commands configurable and add `try:each` command, soft-deprecating `testall` [\#59](https://github.com/ember-cli/ember-try/pull/59) ([kategengler](https://github.com/kategengler))

## [v0.1.3](https://github.com/ember-cli/ember-try/tree/v0.1.3) (2016-02-16)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.1.2...v0.1.3)

**Closed issues:**

- \[enhancement\] Enable writing test results to file [\#30](https://github.com/ember-cli/ember-try/issues/30)

**Merged pull requests:**

- Fix bug: options were not being passed to the command run by `try` [\#58](https://github.com/ember-cli/ember-try/pull/58) ([kategengler](https://github.com/kategengler))
- Quiet npm warnings by appeasing it with changes to the fixture package.json [\#57](https://github.com/ember-cli/ember-try/pull/57) ([kategengler](https://github.com/kategengler))
- Just passing --skip-cleanup isn't enough [\#56](https://github.com/ember-cli/ember-try/pull/56) ([kategengler](https://github.com/kategengler))
- Refactor so that ScenarioManager doesn't need to know about config [\#54](https://github.com/ember-cli/ember-try/pull/54) ([kategengler](https://github.com/kategengler))

## [v0.1.2](https://github.com/ember-cli/ember-try/tree/v0.1.2) (2016-02-04)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.1.1...v0.1.2)

**Closed issues:**

- Table cell width / alignment issues in some scenarios. [\#46](https://github.com/ember-cli/ember-try/issues/46)

**Merged pull requests:**

- Expose environment variable for currently running scenario. [\#52](https://github.com/ember-cli/ember-try/pull/52) ([rwjblue](https://github.com/rwjblue))
- Use cli-table2. [\#51](https://github.com/ember-cli/ember-try/pull/51) ([rwjblue](https://github.com/rwjblue))

## [v0.1.1](https://github.com/ember-cli/ember-try/tree/v0.1.1) (2016-02-01)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.1.0...v0.1.1)

**Closed issues:**

- `bower.json` reset to first run, not initial value. [\#47](https://github.com/ember-cli/ember-try/issues/47)
- \[enhancement\] Handle ember and ember data as addons [\#44](https://github.com/ember-cli/ember-try/issues/44)

**Merged pull requests:**

- Allow --config-path to be specified to ember-try commands. [\#50](https://github.com/ember-cli/ember-try/pull/50) ([rwjblue](https://github.com/rwjblue))
- Remove `.only` so all node tests can run. [\#49](https://github.com/ember-cli/ember-try/pull/49) ([rwjblue](https://github.com/rwjblue))
- Simplify npm scripts. [\#48](https://github.com/ember-cli/ember-try/pull/48) ([rwjblue](https://github.com/rwjblue))

## [v0.1.0](https://github.com/ember-cli/ember-try/tree/v0.1.0) (2016-01-29)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.0.8...v0.1.0)

**Closed issues:**

- What is the most convenient way to execute ember-try builds concurrently on Linux? [\#40](https://github.com/ember-cli/ember-try/issues/40)
- CI Pipeline [\#38](https://github.com/ember-cli/ember-try/issues/38)

**Merged pull requests:**

- Support for npm dependencies + improved output [\#45](https://github.com/ember-cli/ember-try/pull/45) ([kategengler](https://github.com/kategengler))
- JSHint and JSCS [\#39](https://github.com/ember-cli/ember-try/pull/39) ([mike-north](https://github.com/mike-north))
- Update ember-cli to 1.13.6 [\#37](https://github.com/ember-cli/ember-try/pull/37) ([mike-north](https://github.com/mike-north))

## [v0.0.8](https://github.com/ember-cli/ember-try/tree/v0.0.8) (2015-07-24)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.0.7...v0.0.8)

**Closed issues:**

- Removing ember-data causes error [\#35](https://github.com/ember-cli/ember-try/issues/35)
- Failing on Travis [\#27](https://github.com/ember-cli/ember-try/issues/27)
- try:testall  does not appear in help [\#22](https://github.com/ember-cli/ember-try/issues/22)

**Merged pull requests:**

- Add support for dev dependencies [\#36](https://github.com/ember-cli/ember-try/pull/36) ([martndemus](https://github.com/martndemus))
- Update to ember-cli 0.2.7 [\#29](https://github.com/ember-cli/ember-try/pull/29) ([mike-north](https://github.com/mike-north))
- Here's a test suite [\#28](https://github.com/ember-cli/ember-try/pull/28) ([mike-north](https://github.com/mike-north))

## [v0.0.7](https://github.com/ember-cli/ember-try/tree/v0.0.7) (2015-06-03)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.0.6...v0.0.7)

**Merged pull requests:**

- Disable bower install interactivity [\#25](https://github.com/ember-cli/ember-try/pull/25) ([knownasilya](https://github.com/knownasilya))

## [v0.0.6](https://github.com/ember-cli/ember-try/tree/v0.0.6) (2015-06-02)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.0.5...v0.0.6)

**Closed issues:**

- Add `tmp` dir to the .npmignore. [\#23](https://github.com/ember-cli/ember-try/issues/23)

**Merged pull requests:**

- add tmp dir to npmignore fix \#23 [\#24](https://github.com/ember-cli/ember-try/pull/24) ([odoe](https://github.com/odoe))

## [v0.0.5](https://github.com/ember-cli/ember-try/tree/v0.0.5) (2015-04-20)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.0.4...v0.0.5)

**Closed issues:**

- Killing ember-try while it's running leaves bower.json modified [\#20](https://github.com/ember-cli/ember-try/issues/20)
- Ability to configure a minimum version for "testall" [\#19](https://github.com/ember-cli/ember-try/issues/19)
- Add a hook for after successful test [\#15](https://github.com/ember-cli/ember-try/issues/15)
- Add ability to pass command line options when using `ember try beta \<command\>`. [\#10](https://github.com/ember-cli/ember-try/issues/10)

**Merged pull requests:**

- Change default scenarios to use Ember's channels. [\#21](https://github.com/ember-cli/ember-try/pull/21) ([rwjblue](https://github.com/rwjblue))
- Added an option to --skip-cleanup [\#18](https://github.com/ember-cli/ember-try/pull/18) ([jrjohnson](https://github.com/jrjohnson))
- Update README.md [\#16](https://github.com/ember-cli/ember-try/pull/16) ([martndemus](https://github.com/martndemus))
- Upgraded Ember 1.11.1 scenario [\#14](https://github.com/ember-cli/ember-try/pull/14) ([taras](https://github.com/taras))
- Allow all command arguments to be passed through. [\#13](https://github.com/ember-cli/ember-try/pull/13) ([rwjblue](https://github.com/rwjblue))

## [v0.0.4](https://github.com/ember-cli/ember-try/tree/v0.0.4) (2015-04-05)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.0.3...v0.0.4)

**Closed issues:**

- Fails when Bower is not globally installed. [\#11](https://github.com/ember-cli/ember-try/issues/11)
- New version? [\#7](https://github.com/ember-cli/ember-try/issues/7)

**Merged pull requests:**

- Do not require global `bower` or `ember` commands. [\#12](https://github.com/ember-cli/ember-try/pull/12) ([rwjblue](https://github.com/rwjblue))

## [v0.0.3](https://github.com/ember-cli/ember-try/tree/v0.0.3) (2015-04-04)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.0.2...v0.0.3)

**Closed issues:**

- Running an individual scenario with `ember try` returns a nonzero exit code when all tests pass [\#5](https://github.com/ember-cli/ember-try/issues/5)
- Allow testing of `beta` and `canary` versions. [\#3](https://github.com/ember-cli/ember-try/issues/3)

**Merged pull requests:**

- Remove dependency on git; manage original version of bower.json [\#9](https://github.com/ember-cli/ember-try/pull/9) ([kategengler](https://github.com/kategengler))
- Replace Task model with CoreObject [\#8](https://github.com/ember-cli/ember-try/pull/8) ([kategengler](https://github.com/kategengler))
- fixes \#3: remove actual version check and preserve resolutions [\#6](https://github.com/ember-cli/ember-try/pull/6) ([habdelra](https://github.com/habdelra))

## [v0.0.2](https://github.com/ember-cli/ember-try/tree/v0.0.2) (2015-03-31)
[Full Changelog](https://github.com/ember-cli/ember-try/compare/v0.0.1...v0.0.2)

**Merged pull requests:**

- Update for 1.11.0 and 1.12.0-beta.1. [\#2](https://github.com/ember-cli/ember-try/pull/2) ([rwjblue](https://github.com/rwjblue))
- Consistent quotes [\#1](https://github.com/ember-cli/ember-try/pull/1) ([jbrown](https://github.com/jbrown))

## [v0.0.1](https://github.com/ember-cli/ember-try/tree/v0.0.1) (2015-03-24)


\* *This Change Log was automatically generated by [github_changelog_generator](https://github.com/skywinder/Github-Changelog-Generator)*
