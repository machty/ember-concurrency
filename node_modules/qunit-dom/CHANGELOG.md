# Changelog

## v0.8.5 (2019-04-26)

#### :rocket: Enhancement
* [#208](https://github.com/simplabs/qunit-dom/pull/208) Add `matchesSelector()` assertions ([@lindem](https://github.com/lindem))

#### :house: Internal
* [#234](https://github.com/simplabs/qunit-dom/pull/234) Use ESLint and prettier ([@Turbo87](https://github.com/Turbo87))

#### Committers: 2
- Timo L. ([@lindem](https://github.com/lindem))
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))


## v0.8.4 (2019-01-04)

#### :rocket: Enhancement
* [#232](https://github.com/simplabs/qunit-dom/pull/232) Implement a `hasPseudoElementStyle` assertion ([@joankaradimov](https://github.com/joankaradimov))

#### :memo: Documentation
* [#233](https://github.com/simplabs/qunit-dom/pull/233) helpers/node-list: Add missing `@private` declaration ([@Turbo87](https://github.com/Turbo87))

#### :house: Internal
* [#231](https://github.com/simplabs/qunit-dom/pull/231) CI: Remove broken `notifications` config ([@Turbo87](https://github.com/Turbo87))

#### Committers: 2
- Joan Karadimov ([@joankaradimov](https://github.com/joankaradimov))
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))


## v0.8.3 (2018-12-10)

#### :rocket: Enhancement
* [#198](https://github.com/simplabs/qunit-dom/pull/198) Warn user when `includesText` assertion should expect collapsable whitespace ([@happycollision](https://github.com/happycollision))

#### :bug: Bug Fix
* [#213](https://github.com/simplabs/qunit-dom/pull/213) Replace `Array.from()` for IE11 compatibility ([@Turbo87](https://github.com/Turbo87))

#### :house: Internal
* [#207](https://github.com/simplabs/qunit-dom/pull/207) TravisCI: Remove deprecated `sudo: false` option ([@Turbo87](https://github.com/Turbo87))

#### Committers: 2
- Don Denton ([@happycollision](https://github.com/happycollision))
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))


## v0.8.2 (2018-11-27)

#### :rocket: Enhancement
* [#204](https://github.com/simplabs/qunit-dom/pull/204) Adds support for `count` option to `isVisible` assertion ([@lukemelia](https://github.com/lukemelia))

#### Committers: 1
- Luke Melia ([@lukemelia](https://github.com/lukemelia))


## v0.8.1 (2018-11-23)

#### :rocket: Enhancement
* [#168](https://github.com/simplabs/qunit-dom/pull/168) Add `assert.dom(...).hasStyle()` assertion ([@selvagsz](https://github.com/selvagsz))

#### :memo: Documentation
* [#202](https://github.com/simplabs/qunit-dom/pull/202) docs: Use `{@link}` instead of broken empty markdown links ([@Turbo87](https://github.com/Turbo87))

#### :house: Internal
* [#174](https://github.com/simplabs/qunit-dom/pull/174)  CI: Use `--runInBand` option of Jest to speed up the tests  ([@Turbo87](https://github.com/Turbo87))
* [#161](https://github.com/simplabs/qunit-dom/pull/161) yarn: Add `integrity` hashes to the lockfile ([@Turbo87](https://github.com/Turbo87))
* [#142](https://github.com/simplabs/qunit-dom/pull/142) Fix CI issues ([@Turbo87](https://github.com/Turbo87))
* [#134](https://github.com/simplabs/qunit-dom/pull/134) tests: Adjust `setResolver()` import ([@Turbo87](https://github.com/Turbo87))

#### Committers: 3
- Jessica Jordan ([@jessica-jordan](https://github.com/jessica-jordan))
- Selva ([@selvagsz](https://github.com/selvagsz))
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))


## v0.8.0 (2018-09-06)

#### :boom: Breaking Change
* [#105](https://github.com/simplabs/qunit-dom/pull/105) Collapse whitespace for `includesText` assertion ([@brookjordan](https://github.com/brookjordan))
* [#126](https://github.com/simplabs/qunit-dom/pull/126) Update Node version requirement to `6.* || 8.* || >= 10.*` ([@Turbo87](https://github.com/Turbo87))
* [#117](https://github.com/simplabs/qunit-dom/pull/117) Bump broccoli-merge-trees from 2.0.0 to 3.0.1 ([@dependabot[bot]](https://github.com/apps/dependabot))

#### :memo: Documentation
* [#103](https://github.com/simplabs/qunit-dom/pull/103) README: Add `import` documentation ([@Turbo87](https://github.com/Turbo87))

#### Committers: 2
- Brook Jordan ([@brookjordan](https://github.com/brookjordan))
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))


## v0.7.1 (2018-07-17)

#### :rocket: Enhancement
* [#102](https://github.com/simplabs/qunit-dom/pull/102) Add `qunit-dom` dummy module to allow imports ([@Turbo87](https://github.com/Turbo87))

#### :bug: Bug Fix
* [#101](https://github.com/simplabs/qunit-dom/pull/101) Update `.npmignore` file ([@Turbo87](https://github.com/Turbo87))

#### Committers: 1
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))


## v0.7.0 (2018-07-04)

#### :boom: Breaking Change
* [#93](https://github.com/simplabs/qunit-dom/pull/93) Let `isNotVisible()` pass if the element does not exist ([@scalvert](https://github.com/scalvert))

#### :rocket: Enhancement
* [#96](https://github.com/simplabs/qunit-dom/pull/96) Use TypeScript instead of Babel ([@Turbo87](https://github.com/Turbo87))

#### :house: Internal
* [#95](https://github.com/simplabs/qunit-dom/pull/95) Update `fsevents` subdependency ([@Turbo87](https://github.com/Turbo87))

#### Committers: 2
- Steve Calvert ([scalvert](https://github.com/scalvert))
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))


## v0.6.3 (2018-05-22)

#### :rocket: Enhancement
* [#89](https://github.com/simplabs/qunit-dom/pull/89) Improve visibility detection. ([@Turbo87](https://github.com/Turbo87))

#### :memo: Documentation
* [#86](https://github.com/simplabs/qunit-dom/pull/86) Documentation cleanup. ([@Turbo87](https://github.com/Turbo87))
* [#85](https://github.com/simplabs/qunit-dom/pull/85) Add API docs for `isDisabled()` assertion. ([@Turbo87](https://github.com/Turbo87))
* [#66](https://github.com/simplabs/qunit-dom/pull/66) Add table of contents to API docs. ([@ddoria921](https://github.com/ddoria921))

#### :house: Internal
* [#87](https://github.com/simplabs/qunit-dom/pull/87)  Merge `isDisabled` and `isNotDisabled` helpers. ([@Turbo87](https://github.com/Turbo87))

#### Committers: 2
- Darin Doria ([ddoria921](https://github.com/ddoria921))
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))


## v0.6.2 (2018-04-11)

#### :bug: Bug Fix
* [#76](https://github.com/simplabs/qunit-dom/pull/76) Reduce specificity of Element check in findTargetElement. ([@adriancooney](https://github.com/adriancooney))

#### Committers: 1
- Adrian Cooney ([adriancooney](https://github.com/adriancooney))


## v0.6.1 (2018-04-09)

#### :bug: Bug Fix
* [#74](https://github.com/simplabs/qunit-dom/pull/74) Add isNotDisabled assertion. ([@jackbeegan](https://github.com/jackbeegan))

#### Committers: 1
- Jack Beegan ([jackbeegan](https://github.com/jackbeegan))


## v0.6.0 (2018-04-03)

#### :rocket: Enhancement
* [#69](https://github.com/simplabs/qunit-dom/pull/69) Add new `matchesText` alias for `hasText`. ([@RahulShivkumar](https://github.com/RahulShivkumar))
* [#67](https://github.com/simplabs/qunit-dom/pull/67) Add `isVisible` and `isNotVisible` assertion helpers. ([@patocallaghan](https://github.com/patocallaghan) and [@scalvert](https://github.com/scalvert))
* [#65](https://github.com/simplabs/qunit-dom/pull/65) Add `isRequired` and `isNotRequired` assertions. ([@scalvert](https://github.com/scalvert))
* [#64](https://github.com/simplabs/qunit-dom/pull/64) Add `hasAnyText()` assertion. ([@mikoscz](https://github.com/mikoscz))
* [#63](https://github.com/simplabs/qunit-dom/pull/63) Add `isChecked` and `isNotChecked` assertions. ([@raytiley](https://github.com/raytiley))
* [#60](https://github.com/simplabs/qunit-dom/pull/60) Allow calling `assert.dom()` with no argument defaulting to `rootElement`. ([@lennyburdette](https://github.com/lennyburdette))
* [#62](https://github.com/simplabs/qunit-dom/pull/62) Add `isDisabled()` assertion. ([@rtablada](https://github.com/rtablada))

#### :bug: Bug Fix
* [#59](https://github.com/simplabs/qunit-dom/pull/59) Add helpful error for invalid attributes to `hasText`. ([@spencer516](https://github.com/spencer516))

#### :house: Internal
* [#58](https://github.com/simplabs/qunit-dom/pull/58) Update `jest` to v21.2.1. ([@Turbo87](https://github.com/Turbo87))

#### Committers: 9
- Lenny Burdette ([lennyburdette](https://github.com/lennyburdette))
- Michał Staśkiewicz ([mikoscz](https://github.com/mikoscz))
- Pat O'Callaghan ([@patocallaghan](https://github.com/patocallaghan))
- Rahul Shivkumar ([RahulShivkumar](https://github.com/RahulShivkumar))
- Ray Tiley ([raytiley](https://github.com/raytiley))
- Ryan Tablada ([rtablada](https://github.com/rtablada))
- Spencer P ([spencer516](https://github.com/spencer516))
- Steve Calvert ([scalvert](https://github.com/scalvert))
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))


## v0.5.0 (2018-02-03)

#### :boom: Breaking Change
* [#49](https://github.com/simplabs/qunit-dom/pull/49) Revert "[Ember] Adjust `rootElement`". ([@Turbo87](https://github.com/Turbo87))

#### :house: Internal
* [#48](https://github.com/simplabs/qunit-dom/pull/48) testem: Use `--no-sandbox` on TravisCI. ([@Turbo87](https://github.com/Turbo87))

#### Committers: 2
- Marco Otte-Witte ([marcoow](https://github.com/marcoow))
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))


## v0.4.0 (2017-12-04)

#### :rocket: Enhancement
* [#40](https://github.com/simplabs/qunit-dom/pull/40) [Ember] Adjust `rootElement`. ([@simonihmig](https://github.com/simonihmig))

#### Committers: 1
- Simon Ihmig ([simonihmig](https://github.com/simonihmig))


## v0.3.4 (2017-11-13)

#### :rocket: Enhancement
* [#36](https://github.com/simplabs/qunit-dom/pull/36) Add `doesNotIncludeText()` assertion. ([@Zureka](https://github.com/Zureka))

#### Committers: 1
- Alex Zurek ([Zureka](https://github.com/Zureka))


## v0.3.3 (2017-10-21)

#### :rocket: Enhancement
* [#33](https://github.com/simplabs/qunit-dom/pull/33) Ember: Convert `rootElement` to non-caching property. ([@Turbo87](https://github.com/Turbo87))
* [#32](https://github.com/simplabs/qunit-dom/pull/32) Rename `hasTextContaining()` to `includesText()`. ([@Oreoz](https://github.com/Oreoz))
* [#31](https://github.com/simplabs/qunit-dom/pull/31) Add includesText() alias. ([@Oreoz](https://github.com/Oreoz))

#### :memo: Documentation
* [#29](https://github.com/simplabs/qunit-dom/pull/29) README: Fix example code. ([@Turbo87](https://github.com/Turbo87))

#### Committers: 2
- Jean-Philippe Roy ([Oreoz](https://github.com/Oreoz))
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))


## v0.3.2 (2017-10-10)

#### :rocket: Enhancement
* [#28](https://github.com/simplabs/qunit-dom/pull/28) Adds hasAttribute() and doesNotHaveAttribute() assertions. ([@Turbo87](https://github.com/Turbo87))
* [#27](https://github.com/simplabs/qunit-dom/pull/27) Add lacksClass() and lacksValue() aliases. ([@Turbo87](https://github.com/Turbo87))
* [#26](https://github.com/simplabs/qunit-dom/pull/26) Add doesNotHaveClass/hasNoClass() assertion. ([@Turbo87](https://github.com/Turbo87))
* [#25](https://github.com/simplabs/qunit-dom/pull/25)  Add hasAnyValue() assertion and support for calling hasValue() without arguments. ([@Turbo87](https://github.com/Turbo87))
* [#24](https://github.com/simplabs/qunit-dom/pull/24) Add hasNoValue() assertion. ([@Turbo87](https://github.com/Turbo87))

#### :house: Internal
* [#23](https://github.com/simplabs/qunit-dom/pull/23) tests/has-value: Ensure empty `value` does not break the assertion. ([@Turbo87](https://github.com/Turbo87))

#### Committers: 1
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))


## v0.3.1 (2017-10-09)

#### :rocket: Enhancement
* [#17](https://github.com/simplabs/qunit-dom/pull/17) Add hasClass() assertion. ([@Turbo87](https://github.com/Turbo87))
* [#15](https://github.com/simplabs/qunit-dom/pull/15) Add hasValue() assertion. ([@Turbo87](https://github.com/Turbo87))

#### :memo: Documentation
* [#16](https://github.com/simplabs/qunit-dom/pull/16) Add @see directives to JSDoc comments. ([@Turbo87](https://github.com/Turbo87))

#### Committers: 1
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))


## v0.3.0 (2017-10-09)

#### :boom: Breaking Change
* [#13](https://github.com/simplabs/qunit-dom/pull/13) Replace contains/matchesText() with hasText() assertions. ([@Turbo87](https://github.com/Turbo87))
* [#11](https://github.com/simplabs/qunit-dom/pull/11) Rename missing(), focused() and notFocused() assertions. ([@Turbo87](https://github.com/Turbo87))
* [#7](https://github.com/simplabs/qunit-dom/pull/7) Use assert.dom(selector).exists() instead of assert.dom.exists(selector). ([@Turbo87](https://github.com/Turbo87))

#### :bug: Bug Fix
* [#9](https://github.com/simplabs/qunit-dom/pull/9) Fix default "rootElement" for Ember projects. ([@Turbo87](https://github.com/Turbo87))

#### :memo: Documentation
* [#8](https://github.com/simplabs/qunit-dom/pull/8) Generate API docs from JSDoc comments. ([@Turbo87](https://github.com/Turbo87))
* [#1](https://github.com/simplabs/qunit-dom/pull/1) fix copyright notice. ([@marcoow](https://github.com/marcoow))

#### :house: Internal
* [#14](https://github.com/simplabs/qunit-dom/pull/14) Remove obsolete "rollup-plugin-commonjs" dependency. ([@Turbo87](https://github.com/Turbo87))
* [#12](https://github.com/simplabs/qunit-dom/pull/12) Refactoring of the internals. ([@Turbo87](https://github.com/Turbo87))
* [#10](https://github.com/simplabs/qunit-dom/pull/10)  Test assert.dom() API instead of importing directly. ([@Turbo87](https://github.com/Turbo87))
* [#5](https://github.com/simplabs/qunit-dom/pull/5) Fix package.json metadata. ([@Turbo87](https://github.com/Turbo87))
* [#2](https://github.com/simplabs/qunit-dom/pull/2) make travis notify our slack room instead of emailing. ([@marcoow](https://github.com/marcoow))

#### Committers: 2
- Marco Otte-Witte ([marcoow](https://github.com/marcoow))
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))
