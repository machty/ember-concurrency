# Changelog

## v5.0.0 (2018-11-09)

#### :boom: Breaking Change
* [#141](https://github.com/ember-cli/broccoli-lint-eslint/pull/141) Remove deprecated code ([@Turbo87](https://github.com/Turbo87))
* [#135](https://github.com/ember-cli/broccoli-lint-eslint/pull/135) Upgrade to ESLint 5 ([@Gaurav0](https://github.com/Gaurav0))
* [#133](https://github.com/ember-cli/broccoli-lint-eslint/pull/133) Drop support for node 4, add support for node 8, 10 ([@Gaurav0](https://github.com/Gaurav0))

#### :memo: Documentation
* [#138](https://github.com/ember-cli/broccoli-lint-eslint/pull/138) Update README ([@Gaurav0](https://github.com/Gaurav0))

#### :house: Internal
* [#151](https://github.com/ember-cli/broccoli-lint-eslint/pull/151) Increase default `mocha` timeout to 5sec ([@Turbo87](https://github.com/Turbo87))
* [#117](https://github.com/ember-cli/broccoli-lint-eslint/pull/117) Ensure linting is ran as part of CI. ([@rwjblue](https://github.com/rwjblue))
* [#140](https://github.com/ember-cli/broccoli-lint-eslint/pull/140) Fix ci with broccoli-persistent-filter 2.1.0 ([@Gaurav0](https://github.com/Gaurav0))
* [#143](https://github.com/ember-cli/broccoli-lint-eslint/pull/143)  Convert `EslintValidationFilter` to an ES6 class  ([@Turbo87](https://github.com/Turbo87))
* [#139](https://github.com/ember-cli/broccoli-lint-eslint/pull/139) Fix .eslintignore test and add test for including dotfile ([@Gaurav0](https://github.com/Gaurav0))

#### Committers: 4
- Gaurav Munjal ([@Gaurav0](https://github.com/Gaurav0))
- Robert Jackson ([@rwjblue](https://github.com/rwjblue))
- Sang Mercado ([@sangm](https://github.com/sangm))
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))


## [v4.2.1](https://github.com/ember-cli/broccoli-lint-eslint/tree/v4.2.1) (2017-11-07)
[Full Changelog](https://github.com/ember-cli/broccoli-lint-eslint/compare/v4.2.0...v4.2.1)

**Fixed bugs:**

- Invoke super with the valid args to avoid ENOENT [\#115](https://github.com/ember-cli/broccoli-lint-eslint/pull/115) ([rwjblue](https://github.com/rwjblue))

**Merged pull requests:**

- Failing test PR emulating ember-cli/ember-cli\#7347 [\#118](https://github.com/ember-cli/broccoli-lint-eslint/pull/118) ([rwjblue](https://github.com/rwjblue))
- Cleaning up unused options [\#114](https://github.com/ember-cli/broccoli-lint-eslint/pull/114) ([chrmod](https://github.com/chrmod))

## [v4.2.0](https://github.com/ember-cli/broccoli-lint-eslint/tree/v4.2.0) (2017-10-27)
[Full Changelog](https://github.com/ember-cli/broccoli-lint-eslint/compare/v4.1.0...v4.2.0)

**Implemented enhancements:**

- Add static immutable "testGenerators" list property [\#113](https://github.com/ember-cli/broccoli-lint-eslint/pull/113) ([Turbo87](https://github.com/Turbo87))
- Deprecate constructor usage in favor of .create\(\) and add documentation [\#109](https://github.com/ember-cli/broccoli-lint-eslint/pull/109) ([Turbo87](https://github.com/Turbo87))

**Fixed bugs:**

- Update README with details on test grouping. [\#107](https://github.com/ember-cli/broccoli-lint-eslint/issues/107)

**Merged pull requests:**

- chore\(package\): update sinon to version 4.0.1 [\#112](https://github.com/ember-cli/broccoli-lint-eslint/pull/112) ([Turbo87](https://github.com/Turbo87))
- Update mocha to the latest version 🚀 [\#111](https://github.com/ember-cli/broccoli-lint-eslint/pull/111) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))
- Do not depend on TypeScript for extensions test [\#108](https://github.com/ember-cli/broccoli-lint-eslint/pull/108) ([t-sauer](https://github.com/t-sauer))
- Update sinon to the latest version 🚀 [\#104](https://github.com/ember-cli/broccoli-lint-eslint/pull/104) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))
- Update typescript to the latest version 🚀 [\#103](https://github.com/ember-cli/broccoli-lint-eslint/pull/103) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))

## [v4.1.0](https://github.com/ember-cli/broccoli-lint-eslint/tree/v4.1.0) (2017-07-17)
[Full Changelog](https://github.com/ember-cli/broccoli-lint-eslint/compare/v4.0.0...v4.1.0)

**Merged pull requests:**

- Make extensions configurable [\#102](https://github.com/ember-cli/broccoli-lint-eslint/pull/102) ([t-sauer](https://github.com/t-sauer))

## [v4.0.0](https://github.com/ember-cli/broccoli-lint-eslint/tree/v4.0.0) (2017-06-18)
[Full Changelog](https://github.com/ember-cli/broccoli-lint-eslint/compare/v3.3.1...v4.0.0)

**Merged pull requests:**

- Update to ESLint ^4.0 [\#101](https://github.com/ember-cli/broccoli-lint-eslint/pull/101) ([alexdiliberto](https://github.com/alexdiliberto))
- Update chai-as-promised to the latest version 🚀 [\#100](https://github.com/ember-cli/broccoli-lint-eslint/pull/100) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))
- Update chai to the latest version 🚀 [\#99](https://github.com/ember-cli/broccoli-lint-eslint/pull/99) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))

## [v3.3.1](https://github.com/ember-cli/broccoli-lint-eslint/tree/v3.3.1) (2017-05-04)
[Full Changelog](https://github.com/ember-cli/broccoli-lint-eslint/compare/v3.3.0...v3.3.1)

**Implemented enhancements:**

- CI: Use "auto-dist-tag" for deployment [\#97](https://github.com/ember-cli/broccoli-lint-eslint/pull/97) ([Turbo87](https://github.com/Turbo87))

**Closed issues:**

- Extract test generators into "broccoli-lint-test-generators" package [\#96](https://github.com/ember-cli/broccoli-lint-eslint/issues/96)

**Merged pull requests:**

- Use "aot-test-generators" to generate tests [\#98](https://github.com/ember-cli/broccoli-lint-eslint/pull/98) ([Turbo87](https://github.com/Turbo87))

## [v3.3.0](https://github.com/ember-cli/broccoli-lint-eslint/tree/v3.3.0) (2017-05-01)
[Full Changelog](https://github.com/ember-cli/broccoli-lint-eslint/compare/v3.2.1...v3.3.0)

**Implemented enhancements:**

- Add factory function and "group" option [\#95](https://github.com/ember-cli/broccoli-lint-eslint/pull/95) ([Turbo87](https://github.com/Turbo87))

**Fixed bugs:**

- test-generators: Fix broken comment output [\#87](https://github.com/ember-cli/broccoli-lint-eslint/pull/87) ([Turbo87](https://github.com/Turbo87))
- Dont lint ignored files [\#86](https://github.com/ember-cli/broccoli-lint-eslint/pull/86) ([LucasHill](https://github.com/LucasHill))

**Merged pull requests:**

- Simplify baseDir\(\) method [\#94](https://github.com/ember-cli/broccoli-lint-eslint/pull/94) ([Turbo87](https://github.com/Turbo87))
- Use "lodash.defaultsdeep" to assign default options [\#93](https://github.com/ember-cli/broccoli-lint-eslint/pull/93) ([Turbo87](https://github.com/Turbo87))
- Refactorings [\#91](https://github.com/ember-cli/broccoli-lint-eslint/pull/91) ([Turbo87](https://github.com/Turbo87))
- Add integration tests using "broccoli-test-helper" [\#90](https://github.com/ember-cli/broccoli-lint-eslint/pull/90) ([Turbo87](https://github.com/Turbo87))
- Use "chai-as-promised" for testing [\#89](https://github.com/ember-cli/broccoli-lint-eslint/pull/89) ([Turbo87](https://github.com/Turbo87))
- Remove Babel transpilation [\#88](https://github.com/ember-cli/broccoli-lint-eslint/pull/88) ([Turbo87](https://github.com/Turbo87))

## [v3.2.1](https://github.com/ember-cli/broccoli-lint-eslint/tree/v3.2.1) (2017-03-19)
[Full Changelog](https://github.com/ember-cli/broccoli-lint-eslint/compare/v3.2.0...v3.2.1)

**Fixed bugs:**

- Bust cache if ignored status changes. [\#85](https://github.com/ember-cli/broccoli-lint-eslint/pull/85) ([LucasHill](https://github.com/LucasHill))

**Closed issues:**

- An in-range update of broccoli-merge-trees is breaking the build 🚨 [\#80](https://github.com/ember-cli/broccoli-lint-eslint/issues/80)

**Merged pull requests:**

- Cleanup [\#83](https://github.com/ember-cli/broccoli-lint-eslint/pull/83) ([Turbo87](https://github.com/Turbo87))
- Update sinon to the latest version 🚀 [\#82](https://github.com/ember-cli/broccoli-lint-eslint/pull/82) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))
- Update broccoli-merge-trees to the latest version 🚀 [\#81](https://github.com/ember-cli/broccoli-lint-eslint/pull/81) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))
- Update md5-hex to the latest version 🚀 [\#79](https://github.com/ember-cli/broccoli-lint-eslint/pull/79) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))
- CI: Enable automatic NPM deployment for tags [\#78](https://github.com/ember-cli/broccoli-lint-eslint/pull/78) ([Turbo87](https://github.com/Turbo87))

## [v3.2.0](https://github.com/ember-cli/broccoli-lint-eslint/tree/v3.2.0) (2017-01-03)
[Full Changelog](https://github.com/ember-cli/broccoli-lint-eslint/compare/v2.7.0...v3.2.0)

**Closed issues:**

- Plans for migrating to ESLint 3.0? [\#76](https://github.com/ember-cli/broccoli-lint-eslint/issues/76)

**Merged pull requests:**

- 👻😱 Node.js 0.10 is unmaintained 😱👻 [\#75](https://github.com/ember-cli/broccoli-lint-eslint/pull/75) ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))
- Update dependencies to enable Greenkeeper 🌴 [\#74](https://github.com/ember-cli/broccoli-lint-eslint/pull/74) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))
- Update es6-promise to version 4.0.0 🚀 [\#65](https://github.com/ember-cli/broccoli-lint-eslint/pull/65) ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))

## [v2.7.0](https://github.com/ember-cli/broccoli-lint-eslint/tree/v2.7.0) (2016-09-13)
[Full Changelog](https://github.com/ember-cli/broccoli-lint-eslint/compare/v2.6.0...v2.7.0)

**Implemented enhancements:**

- Add support for setting `throwOnWarn` option [\#45](https://github.com/ember-cli/broccoli-lint-eslint/issues/45)

**Closed issues:**

- Minimum builderFeatures required; persistent output flag error [\#39](https://github.com/ember-cli/broccoli-lint-eslint/issues/39)

**Merged pull requests:**

- add support for throwOnWarn option [\#60](https://github.com/ember-cli/broccoli-lint-eslint/pull/60) ([BrianSipple](https://github.com/BrianSipple))
- Clean up testing syntax and overall architecture [\#59](https://github.com/ember-cli/broccoli-lint-eslint/pull/59) ([BrianSipple](https://github.com/BrianSipple))
- \[2.x\] Fix throwOnError support and add test [\#58](https://github.com/ember-cli/broccoli-lint-eslint/pull/58) ([BrianSipple](https://github.com/BrianSipple))
- Merge 2.6.0 release back into master branch [\#57](https://github.com/ember-cli/broccoli-lint-eslint/pull/57) ([Turbo87](https://github.com/Turbo87))

## [v2.6.0](https://github.com/ember-cli/broccoli-lint-eslint/tree/v2.6.0) (2016-08-19)
[Full Changelog](https://github.com/ember-cli/broccoli-lint-eslint/compare/v2.5.0...v2.6.0)

## [v2.5.0](https://github.com/ember-cli/broccoli-lint-eslint/tree/v2.5.0) (2016-08-19)
[Full Changelog](https://github.com/ember-cli/broccoli-lint-eslint/compare/v3.1.0...v2.5.0)

**Implemented enhancements:**

- Add predefined test generators [\#54](https://github.com/ember-cli/broccoli-lint-eslint/pull/54) ([Turbo87](https://github.com/Turbo87))

**Merged pull requests:**

- Backport commits from master to 2.x [\#56](https://github.com/ember-cli/broccoli-lint-eslint/pull/56) ([Turbo87](https://github.com/Turbo87))
- Simplify Babel usage for running tests [\#55](https://github.com/ember-cli/broccoli-lint-eslint/pull/55) ([Turbo87](https://github.com/Turbo87))
- Improved CI configuration [\#53](https://github.com/ember-cli/broccoli-lint-eslint/pull/53) ([Turbo87](https://github.com/Turbo87))
- Investigate ignore files [\#52](https://github.com/ember-cli/broccoli-lint-eslint/pull/52) ([alexlafroscia](https://github.com/alexlafroscia))
- Avoid shipping test files [\#50](https://github.com/ember-cli/broccoli-lint-eslint/pull/50) ([alexlafroscia](https://github.com/alexlafroscia))

## [v3.1.0](https://github.com/ember-cli/broccoli-lint-eslint/tree/v3.1.0) (2016-08-08)
[Full Changelog](https://github.com/ember-cli/broccoli-lint-eslint/compare/v3.0.0...v3.1.0)

**Closed issues:**

- Cannot set throwOnError [\#7](https://github.com/ember-cli/broccoli-lint-eslint/issues/7)

**Merged pull requests:**

- Use injected console object over global [\#51](https://github.com/ember-cli/broccoli-lint-eslint/pull/51) ([mitchlloyd](https://github.com/mitchlloyd))
- Update tests for mocha 3 compatibility [\#48](https://github.com/ember-cli/broccoli-lint-eslint/pull/48) ([BrianSipple](https://github.com/BrianSipple))
- Fix throwOnError option [\#44](https://github.com/ember-cli/broccoli-lint-eslint/pull/44) ([BrianSipple](https://github.com/BrianSipple))
- Update internal eslint configuration in `lib` and `tests` [\#43](https://github.com/ember-cli/broccoli-lint-eslint/pull/43) ([BrianSipple](https://github.com/BrianSipple))

## [v3.0.0](https://github.com/ember-cli/broccoli-lint-eslint/tree/v3.0.0) (2016-07-18)
[Full Changelog](https://github.com/ember-cli/broccoli-lint-eslint/compare/v2.4.1...v3.0.0)

**Closed issues:**

- Upgrade to eslint 3.0.x [\#40](https://github.com/ember-cli/broccoli-lint-eslint/issues/40)

**Merged pull requests:**

- Update to ESLint 3 [\#42](https://github.com/ember-cli/broccoli-lint-eslint/pull/42) ([alexlafroscia](https://github.com/alexlafroscia))

## [v2.4.1](https://github.com/ember-cli/broccoli-lint-eslint/tree/v2.4.1) (2016-07-17)
[Full Changelog](https://github.com/ember-cli/broccoli-lint-eslint/compare/v2.4.0...v2.4.1)

**Merged pull requests:**

- Bump ESLint version to 2.13.1 [\#41](https://github.com/ember-cli/broccoli-lint-eslint/pull/41) ([BrianSipple](https://github.com/BrianSipple))

## [v2.4.0](https://github.com/ember-cli/broccoli-lint-eslint/tree/v2.4.0) (2016-06-10)
[Full Changelog](https://github.com/ember-cli/broccoli-lint-eslint/compare/v2.3.0...v2.4.0)

**Closed issues:**

- Allow test generator to determine what counts as failing [\#10](https://github.com/ember-cli/broccoli-lint-eslint/issues/10)

**Merged pull requests:**

- Allow the testGenerator function to handle warnings. [\#38](https://github.com/ember-cli/broccoli-lint-eslint/pull/38) ([rwjblue](https://github.com/rwjblue))

## [v2.3.0](https://github.com/ember-cli/broccoli-lint-eslint/tree/v2.3.0) (2016-05-19)
[Full Changelog](https://github.com/ember-cli/broccoli-lint-eslint/compare/v2.2.1...v2.3.0)

**Merged pull requests:**

- Improve logic that filters out error messages related to ignored files [\#37](https://github.com/ember-cli/broccoli-lint-eslint/pull/37) ([BrianSipple](https://github.com/BrianSipple))

## [v2.2.1](https://github.com/ember-cli/broccoli-lint-eslint/tree/v2.2.1) (2016-04-20)
[Full Changelog](https://github.com/ember-cli/broccoli-lint-eslint/compare/v2.2.0...v2.2.1)

**Closed issues:**

- Windows : Invalid regular expression [\#35](https://github.com/ember-cli/broccoli-lint-eslint/issues/35)
- Support for ".eslintrc.js" [\#33](https://github.com/ember-cli/broccoli-lint-eslint/issues/33)
- Needs to have 2.2.0 published to NPM [\#32](https://github.com/ember-cli/broccoli-lint-eslint/issues/32)

**Merged pull requests:**

- Escape regex, was causing issues in Windows - Fixes \#35 [\#36](https://github.com/ember-cli/broccoli-lint-eslint/pull/36) ([jonathanKingston](https://github.com/jonathanKingston))
- Test multiple config file formats [\#34](https://github.com/ember-cli/broccoli-lint-eslint/pull/34) ([BrianSipple](https://github.com/BrianSipple))

## [v2.2.0](https://github.com/ember-cli/broccoli-lint-eslint/tree/v2.2.0) (2016-04-12)
[Full Changelog](https://github.com/ember-cli/broccoli-lint-eslint/compare/v2.1.0...v2.2.0)

**Closed issues:**

- Not accepting nested configurations [\#26](https://github.com/ember-cli/broccoli-lint-eslint/issues/26)
- Other maintainer wanted [\#20](https://github.com/ember-cli/broccoli-lint-eslint/issues/20)
- Update broccoli-filter [\#12](https://github.com/ember-cli/broccoli-lint-eslint/issues/12)

**Merged pull requests:**

- Feature/update ignore filter message [\#30](https://github.com/ember-cli/broccoli-lint-eslint/pull/30) ([jonathansamines](https://github.com/jonathansamines))
- Fix custom rules test [\#29](https://github.com/ember-cli/broccoli-lint-eslint/pull/29) ([nickiaconis](https://github.com/nickiaconis))
- Accept non-string input trees [\#25](https://github.com/ember-cli/broccoli-lint-eslint/pull/25) ([nickiaconis](https://github.com/nickiaconis))
- Use broccoli-persistent-filter [\#21](https://github.com/ember-cli/broccoli-lint-eslint/pull/21) ([nickiaconis](https://github.com/nickiaconis))

## [v2.1.0](https://github.com/ember-cli/broccoli-lint-eslint/tree/v2.1.0) (2016-03-21)
[Full Changelog](https://github.com/ember-cli/broccoli-lint-eslint/compare/v2.0.1...v2.1.0)

**Closed issues:**

- Pin ESLint dependency to 2.2.0 [\#23](https://github.com/ember-cli/broccoli-lint-eslint/issues/23)

**Merged pull requests:**

- Update to eslint 2.4.0 [\#28](https://github.com/ember-cli/broccoli-lint-eslint/pull/28) ([BrianSipple](https://github.com/BrianSipple))
- Change test file extension from 'eslint-test' to 'lint-test' [\#27](https://github.com/ember-cli/broccoli-lint-eslint/pull/27) ([mitchlloyd](https://github.com/mitchlloyd))

## [v2.0.1](https://github.com/ember-cli/broccoli-lint-eslint/tree/v2.0.1) (2016-03-14)
**Closed issues:**

- Latest version is missing `build` directory when installed [\#22](https://github.com/ember-cli/broccoli-lint-eslint/issues/22)
- Update versioning to match with 2.x eslint [\#17](https://github.com/ember-cli/broccoli-lint-eslint/issues/17)
- OS-dependent path-handling [\#15](https://github.com/ember-cli/broccoli-lint-eslint/issues/15)
- Use of arrow functions breaks non-harmony node [\#13](https://github.com/ember-cli/broccoli-lint-eslint/issues/13)
- Upgrade dependencies [\#8](https://github.com/ember-cli/broccoli-lint-eslint/issues/8)
- Make pass eslint-config-nightmare-mode [\#5](https://github.com/ember-cli/broccoli-lint-eslint/issues/5)
- Improve documentation [\#3](https://github.com/ember-cli/broccoli-lint-eslint/issues/3)

**Merged pull requests:**

- Add "build" to "files" array in package.json. [\#24](https://github.com/ember-cli/broccoli-lint-eslint/pull/24) ([chriskrycho](https://github.com/chriskrycho))
- Bump major version; pre-babelify code [\#19](https://github.com/ember-cli/broccoli-lint-eslint/pull/19) ([chriskrycho](https://github.com/chriskrycho))
- Platform-independent path-handling; more robust null-checking. [\#16](https://github.com/ember-cli/broccoli-lint-eslint/pull/16) ([chriskrycho](https://github.com/chriskrycho))
- Upgrade broccoli-filter [\#14](https://github.com/ember-cli/broccoli-lint-eslint/pull/14) ([nickiaconis](https://github.com/nickiaconis))
- Upgrade to eslint@2.2.0 and nightmare-mode@2.2.0. [\#11](https://github.com/ember-cli/broccoli-lint-eslint/pull/11) ([chriskrycho](https://github.com/chriskrycho))
- Update eslint to ^0.19.0 [\#4](https://github.com/ember-cli/broccoli-lint-eslint/pull/4) ([topaxi](https://github.com/topaxi))
- Add ability to generate tests [\#2](https://github.com/ember-cli/broccoli-lint-eslint/pull/2) ([teddyzeenny](https://github.com/teddyzeenny))
- Merging in all changes in ember-cli-eslint branch [\#1](https://github.com/ember-cli/broccoli-lint-eslint/pull/1) ([jonathanKingston](https://github.com/jonathanKingston))



\* *This Change Log was automatically generated by [github_changelog_generator](https://github.com/skywinder/Github-Changelog-Generator)*
