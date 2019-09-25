## v5.2.1 (2019-08-09)

#### :bug: Bug Fix
* [#396](https://github.com/ember-cli/ember-resolver/pull/396) Component and their templates should be normalized the same. ([@rwjblue](https://github.com/rwjblue))

#### Committers: 1
- Robert Jackson ([@rwjblue](https://github.com/rwjblue))

## v5.2.0 (2019-08-01)

#### :bug: Bug Fix
* [#392](https://github.com/ember-cli/ember-resolver/pull/392) Add components to dasherisation exception ([@backspace](https://github.com/backspace))

#### :memo: Documentation
* [#376](https://github.com/ember-cli/ember-resolver/pull/376) Add basic project description to README.md. ([@abhilashlr](https://github.com/abhilashlr))

#### Committers: 3
- Buck Doyle ([@backspace](https://github.com/backspace))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)
- abhilashlr ([@abhilashlr](https://github.com/abhilashlr))

## v5.1.3 (2019-02-22)

#### :bug: Bug Fix
* [#338](https://github.com/ember-cli/ember-resolver/pull/338) Fix MU `GlimmerResolver.normalize` when `fullName` is not present ([@ppcano](https://github.com/ppcano))

#### Committers: 1
- Pepe Cano ([@ppcano](https://github.com/ppcano))

## v5.1.2 (2019-02-21)

#### :bug: Bug Fix
* [#336](https://github.com/ember-cli/ember-resolver/pull/336) Update modifiers and router-map in MU resolver configuration. ([@rwjblue](https://github.com/rwjblue))

#### Committers: 2
- L. Preston Sego III ([@NullVoxPopuli](https://github.com/NullVoxPopuli))
- Robert Jackson ([@rwjblue](https://github.com/rwjblue))

## v5.1.1 (2019-02-15)

#### :bug: Bug Fix
* [#313](https://github.com/ember-cli/ember-resolver/pull/313) fix(glimmer-wrapper): move debug `normalize` in `.extend()` block ([@buschtoens](https://github.com/buschtoens))

#### Committers: 1
- Jan Buschtöns ([@buschtoens](https://github.com/buschtoens))

## v5.1.0 (2019-02-15)

#### :rocket: Enhancement
* [#295](https://github.com/ember-cli/ember-resolver/pull/295) Remove deprecated legacy shims ([@Turbo87](https://github.com/Turbo87))

#### :bug: Bug Fix
* [#330](https://github.com/ember-cli/ember-resolver/pull/330) Support engine resolution in scoped packages ([@dfreeman](https://github.com/dfreeman))
* [#300](https://github.com/ember-cli/ember-resolver/pull/300) fix(glimmer-wrapper): add `normalize` method for `Registry#has` ([@buschtoens](https://github.com/buschtoens))
* [#247](https://github.com/ember-cli/ember-resolver/pull/247) Fix MU for deeply nested classic components ([@simonihmig](https://github.com/simonihmig))
* [#301](https://github.com/ember-cli/ember-resolver/pull/301) Add component-manager and modifier-manager to default module unification configuration ([@NullVoxPopuli](https://github.com/NullVoxPopuli))

#### :memo: Documentation
* [#316](https://github.com/ember-cli/ember-resolver/pull/316) Adds changelog entry for version v5.0.0 ([@NLincoln](https://github.com/NLincoln))

#### :house: Internal
* [#310](https://github.com/ember-cli/ember-resolver/pull/310) Remove outaded comment ([@dcyriller](https://github.com/dcyriller))
* [#294](https://github.com/ember-cli/ember-resolver/pull/294) Remove unused dependencies ([@Turbo87](https://github.com/Turbo87))

#### Committers: 8
- Cyrille David ([@dcyriller](https://github.com/dcyriller))
- Dan Freeman ([@dfreeman](https://github.com/dfreeman))
- Jan Buschtöns ([@buschtoens](https://github.com/buschtoens))
- L. Preston Sego III ([@NullVoxPopuli](https://github.com/NullVoxPopuli))
- Léo Bugoni ([@leobugoni](https://github.com/leobugoni))
- Nathan Lincoln ([@NLincoln](https://github.com/NLincoln))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))

## [v5.0.0](https://github.com/ember-cli/ember-resolver/tree/v5.0.0) (2018-07-23)

[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v4.5.6...v5.0.0)

**Breaking Changes**

- Dropped support for Node v4
- ember-resolver will no longer fall back to the globals resolver [\#243](https://github.com/ember-cli/ember-resolver/pull/243)

## [v4.5.6](https://github.com/ember-cli/ember-resolver/tree/v4.5.6) (2018-06-13)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v4.5.5...v4.5.6)

**Closed issues:**

- An error occurred in the constructor for ember-resolver [\#234](https://github.com/ember-cli/ember-resolver/issues/234)
- emberResolverFeatureFlags\(\) calls project.config\(\) without an environment name [\#233](https://github.com/ember-cli/ember-resolver/issues/233)
- ember-cli-react/resolver not found [\#231](https://github.com/ember-cli/ember-resolver/issues/231)
- Add ember-cli-eslint [\#200](https://github.com/ember-cli/ember-resolver/issues/200)

**Merged pull requests:**

- cleanup yo [\#240](https://github.com/ember-cli/ember-resolver/pull/240) ([stefanpenner](https://github.com/stefanpenner))
- Added config type to module unification config [\#239](https://github.com/ember-cli/ember-resolver/pull/239) ([chrism](https://github.com/chrism))
- use flag EMBER\_CLI\_MODULE\_UNIFICATION [\#238](https://github.com/ember-cli/ember-resolver/pull/238) ([givanse](https://github.com/givanse))
- Fixup linting issues. [\#236](https://github.com/ember-cli/ember-resolver/pull/236) ([rwjblue](https://github.com/rwjblue))
- Update to ember-cli@3.1.4 blueprint. [\#235](https://github.com/ember-cli/ember-resolver/pull/235) ([rwjblue](https://github.com/rwjblue))

## [v4.5.5](https://github.com/ember-cli/ember-resolver/tree/v4.5.5) (2018-03-23)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v4.5.4...v4.5.5)

**Closed issues:**

- \[4.5.3\] Build error [\#227](https://github.com/ember-cli/ember-resolver/issues/227)
- Support for RFC 297 - Deprecation of Ember.Logger [\#223](https://github.com/ember-cli/ember-resolver/issues/223)

**Merged pull requests:**

- \[RFC 297\] Updated to conditionally use console rather than using Ember.Logger [\#232](https://github.com/ember-cli/ember-resolver/pull/232) ([lupestro](https://github.com/lupestro))
- Update module unification spec link [\#230](https://github.com/ember-cli/ember-resolver/pull/230) ([josemarluedke](https://github.com/josemarluedke))
- Use build-time `project.isModuleUnification\(\)` instead of feature flag. [\#228](https://github.com/ember-cli/ember-resolver/pull/228) ([cibernox](https://github.com/cibernox))

## [v4.5.4](https://github.com/ember-cli/ember-resolver/tree/v4.5.4) (2018-03-09)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v4.5.3...v4.5.4)

## [v4.5.3](https://github.com/ember-cli/ember-resolver/tree/v4.5.3) (2018-03-09)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v4.5.2...v4.5.3)

**Closed issues:**

- Namespaces [\#214](https://github.com/ember-cli/ember-resolver/issues/214)

**Merged pull requests:**

- Update MU trees: template-options is now template-compiler [\#226](https://github.com/ember-cli/ember-resolver/pull/226) ([cibernox](https://github.com/cibernox))

## [v4.5.2](https://github.com/ember-cli/ember-resolver/tree/v4.5.2) (2018-03-05)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v4.5.1...v4.5.2)

## [v4.5.1](https://github.com/ember-cli/ember-resolver/tree/v4.5.1) (2018-03-05)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v4.5.0...v4.5.1)

**Closed issues:**

- Use shorthands & recursive lookup for component paths called from template [\#217](https://github.com/ember-cli/ember-resolver/issues/217)
- Implement a fallback resolver [\#188](https://github.com/ember-cli/ember-resolver/issues/188)
- default podModulePrefix value [\#74](https://github.com/ember-cli/ember-resolver/issues/74)

**Merged pull requests:**

- Source and Namespace via Local Lookup [\#225](https://github.com/ember-cli/ember-resolver/pull/225) ([mixonic](https://github.com/mixonic))
- Normalize specifiers before passing to fallback [\#224](https://github.com/ember-cli/ember-resolver/pull/224) ([iezer](https://github.com/iezer))
- \[DOCS\] Adds example about pluralizedTypes usage [\#222](https://github.com/ember-cli/ember-resolver/pull/222) ([SergeAstapov](https://github.com/SergeAstapov))
- Fix Main Service Lookup [\#221](https://github.com/ember-cli/ember-resolver/pull/221) ([iezer](https://github.com/iezer))
- Glimmer Resolver gets target namespace as third argument [\#220](https://github.com/ember-cli/ember-resolver/pull/220) ([iezer](https://github.com/iezer))
- Upgrade to Ember CLI 2.18, Re-enable beta testing [\#219](https://github.com/ember-cli/ember-resolver/pull/219) ([mixonic](https://github.com/mixonic))
- Add support to glimmer-wrapper for MU namespaces [\#218](https://github.com/ember-cli/ember-resolver/pull/218) ([iezer](https://github.com/iezer))

## [v4.5.0](https://github.com/ember-cli/ember-resolver/tree/v4.5.0) (2017-08-29)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v4.4.0...v4.5.0)

**Merged pull requests:**

- Ensure internal `layoutFor` lookups for namespaced templates works. [\#213](https://github.com/ember-cli/ember-resolver/pull/213) ([rwjblue](https://github.com/rwjblue))

## [v4.4.0](https://github.com/ember-cli/ember-resolver/tree/v4.4.0) (2017-08-16)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v4.3.1...v4.4.0)

**Merged pull requests:**

- Dependency Cleanup [\#211](https://github.com/ember-cli/ember-resolver/pull/211) ([mixonic](https://github.com/mixonic))

## [v4.3.1](https://github.com/ember-cli/ember-resolver/tree/v4.3.1) (2017-08-15)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v4.3.0...v4.3.1)

**Closed issues:**

- Adding files to the resolver [\#209](https://github.com/ember-cli/ember-resolver/issues/209)

**Merged pull requests:**

- Update ember-cli-version-checker [\#212](https://github.com/ember-cli/ember-resolver/pull/212) ([ef4](https://github.com/ef4))

## [v4.3.0](https://github.com/ember-cli/ember-resolver/tree/v4.3.0) (2017-07-11)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v4.2.4...v4.3.0)

**Closed issues:**

- MU: camelCased lookups [\#195](https://github.com/ember-cli/ember-resolver/issues/195)

**Merged pull requests:**

- Fallback Resolver [\#208](https://github.com/ember-cli/ember-resolver/pull/208) ([iezer](https://github.com/iezer))

## [v4.2.4](https://github.com/ember-cli/ember-resolver/tree/v4.2.4) (2017-07-08)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v4.2.3...v4.2.4)

**Merged pull requests:**

- Normalize dots to slashes where appropriate [\#207](https://github.com/ember-cli/ember-resolver/pull/207) ([mixonic](https://github.com/mixonic))

## [v4.2.3](https://github.com/ember-cli/ember-resolver/tree/v4.2.3) (2017-07-08)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v4.2.2...v4.2.3)

**Merged pull requests:**

- Normalize services [\#206](https://github.com/ember-cli/ember-resolver/pull/206) ([mixonic](https://github.com/mixonic))

## [v4.2.2](https://github.com/ember-cli/ember-resolver/tree/v4.2.2) (2017-07-08)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v4.2.1...v4.2.2)

**Closed issues:**

- Component helper usage should warn [\#203](https://github.com/ember-cli/ember-resolver/issues/203)

**Merged pull requests:**

- Bump @glimmer/resolver [\#205](https://github.com/ember-cli/ember-resolver/pull/205) ([mixonic](https://github.com/mixonic))
- Support named exports [\#204](https://github.com/ember-cli/ember-resolver/pull/204) ([mixonic](https://github.com/mixonic))

## [v4.2.1](https://github.com/ember-cli/ember-resolver/tree/v4.2.1) (2017-07-02)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v4.2.0...v4.2.1)

**Merged pull requests:**

- make referrer absolute for all lookups [\#201](https://github.com/ember-cli/ember-resolver/pull/201) ([iezer](https://github.com/iezer))
- use `test` instead of `match` [\#197](https://github.com/ember-cli/ember-resolver/pull/197) ([bekzod](https://github.com/bekzod))

## [v4.2.0](https://github.com/ember-cli/ember-resolver/tree/v4.2.0) (2017-07-02)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v4.1.0...v4.2.0)

**Implemented enhancements:**

- Port on top of @glimmer/di [\#171](https://github.com/ember-cli/ember-resolver/issues/171)

**Closed issues:**

- Local lookup [\#191](https://github.com/ember-cli/ember-resolver/issues/191)
- GlimmerWrapper: Resolve modules without a default export [\#189](https://github.com/ember-cli/ember-resolver/issues/189)
- 4.1.0 produces html-formatted "...@glimmer/resolver was not found..."-error on `npm install` on jenkins [\#187](https://github.com/ember-cli/ember-resolver/issues/187)

**Merged pull requests:**

- Dependency upgrades [\#199](https://github.com/ember-cli/ember-resolver/pull/199) ([mixonic](https://github.com/mixonic))
- Normalize referrer and lookupString, add config flag [\#198](https://github.com/ember-cli/ember-resolver/pull/198) ([mixonic](https://github.com/mixonic))
- defaultType support, mv partials code to resolver [\#192](https://github.com/ember-cli/ember-resolver/pull/192) ([mixonic](https://github.com/mixonic))
- Assert against get, not normalize [\#190](https://github.com/ember-cli/ember-resolver/pull/190) ([mixonic](https://github.com/mixonic))
- fix file name typo [\#186](https://github.com/ember-cli/ember-resolver/pull/186) ([kellyselden](https://github.com/kellyselden))
- Fixes a small typo [\#184](https://github.com/ember-cli/ember-resolver/pull/184) ([acorncom](https://github.com/acorncom))

## [v4.1.0](https://github.com/ember-cli/ember-resolver/tree/v4.1.0) (2017-03-28)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v4.0.0...v4.1.0)

**Merged pull requests:**

- Initial implementation of the module unification feature flag [\#182](https://github.com/ember-cli/ember-resolver/pull/182) ([mixonic](https://github.com/mixonic))
- Feature flags [\#180](https://github.com/ember-cli/ember-resolver/pull/180) ([mixonic](https://github.com/mixonic))

## [v4.0.0](https://github.com/ember-cli/ember-resolver/tree/v4.0.0) (2017-03-25)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v3.0.1...v4.0.0)

**Merged pull requests:**

- Update to Babel 6. [\#179](https://github.com/ember-cli/ember-resolver/pull/179) ([rwjblue](https://github.com/rwjblue))

## [v3.0.1](https://github.com/ember-cli/ember-resolver/tree/v3.0.1) (2017-03-24)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v3.0.0...v3.0.1)

**Closed issues:**

- 3 version break ember-inspector. [\#175](https://github.com/ember-cli/ember-resolver/issues/175)
- ContainerDebugAdapter.catalogEntriesByType returns objects of wrong type [\#120](https://github.com/ember-cli/ember-resolver/issues/120)

**Merged pull requests:**

- \[Fixes \#175\] restore ability to resolve from modules [\#178](https://github.com/ember-cli/ember-resolver/pull/178) ([stefanpenner](https://github.com/stefanpenner))
- No longer need Ember.keys [\#177](https://github.com/ember-cli/ember-resolver/pull/177) ([mixonic](https://github.com/mixonic))
- Restructure on disk [\#176](https://github.com/ember-cli/ember-resolver/pull/176) ([mixonic](https://github.com/mixonic))

## [v3.0.0](https://github.com/ember-cli/ember-resolver/tree/v3.0.0) (2017-03-11)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v2.1.1...v3.0.0)

**Closed issues:**

- Remove old / dead code [\#131](https://github.com/ember-cli/ember-resolver/issues/131)
- Re-register failing on `App.reset\(\)` [\#130](https://github.com/ember-cli/ember-resolver/issues/130)
- confirm @ember as npm scope works [\#114](https://github.com/ember-cli/ember-resolver/issues/114)

**Merged pull requests:**

- more cleanup [\#174](https://github.com/ember-cli/ember-resolver/pull/174) ([stefanpenner](https://github.com/stefanpenner))
- cleanup [\#173](https://github.com/ember-cli/ember-resolver/pull/173) ([stefanpenner](https://github.com/stefanpenner))
- cleanup deps [\#172](https://github.com/ember-cli/ember-resolver/pull/172) ([stefanpenner](https://github.com/stefanpenner))
- Allow for lazy people like me to easy navigate to update example. [\#169](https://github.com/ember-cli/ember-resolver/pull/169) ([daniellawrence](https://github.com/daniellawrence))
- Update ember-cli-app-version to version 2.0.1 🚀 [\#165](https://github.com/ember-cli/ember-resolver/pull/165) ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))
- Update ember-cli to version 2.9.1 🚀 [\#164](https://github.com/ember-cli/ember-resolver/pull/164) ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))

## [v2.1.1](https://github.com/ember-cli/ember-resolver/tree/v2.1.1) (2016-12-30)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v2.1.2...v2.1.1)

**Merged pull requests:**

- Don't resolve camelCase helper names to dasherized modules [\#167](https://github.com/ember-cli/ember-resolver/pull/167) ([lukemelia](https://github.com/lukemelia))
- 👻😱 Node.js 0.10 is unmaintained 😱👻 [\#166](https://github.com/ember-cli/ember-resolver/pull/166) ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))

## [v2.1.2](https://github.com/ember-cli/ember-resolver/tree/v2.1.2) (2016-10-17)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v2.1.0...v2.1.2)

**Merged pull requests:**

- Update `ember-cli` to `2.8.0`. Closes \#152. [\#156](https://github.com/ember-cli/ember-resolver/pull/156) ([btecu](https://github.com/btecu))

## [v2.1.0](https://github.com/ember-cli/ember-resolver/tree/v2.1.0) (2016-09-03)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v2.0.3...v2.1.0)

**Fixed bugs:**

- Pin "jquery" to v1.11.3 [\#145](https://github.com/ember-cli/ember-resolver/pull/145) ([Turbo87](https://github.com/Turbo87))

**Closed issues:**

- Use Ember Inflector for pluralization? [\#147](https://github.com/ember-cli/ember-resolver/issues/147)
- Fix broken/hanging TravisCI builds [\#137](https://github.com/ember-cli/ember-resolver/issues/137)
- ember-data and pod format [\#128](https://github.com/ember-cli/ember-resolver/issues/128)
- Deprecation warning in Ember 2.2 [\#124](https://github.com/ember-cli/ember-resolver/issues/124)
- How to transpile `index.js` with broccoli-babel-transpiler [\#121](https://github.com/ember-cli/ember-resolver/issues/121)
- Bower: Unable to find a suitable version for ember-resolver [\#119](https://github.com/ember-cli/ember-resolver/issues/119)
- Make moduleNameLookupPatterns a DAG for extensibility. [\#118](https://github.com/ember-cli/ember-resolver/issues/118)

**Merged pull requests:**

- Implement resolveEngine and resolveRouteMap [\#151](https://github.com/ember-cli/ember-resolver/pull/151) ([trentmwillis](https://github.com/trentmwillis))
- Update CHANGELOG file [\#146](https://github.com/ember-cli/ember-resolver/pull/146) ([Turbo87](https://github.com/Turbo87))
- Add options to deprecation [\#133](https://github.com/ember-cli/ember-resolver/pull/133) ([wagenet](https://github.com/wagenet))
- Updating semver comparison to handle pre-release versions. [\#126](https://github.com/ember-cli/ember-resolver/pull/126) ([gmurphey](https://github.com/gmurphey))
- Update README URLs based on HTTP redirects [\#125](https://github.com/ember-cli/ember-resolver/pull/125) ([ReadmeCritic](https://github.com/ReadmeCritic))
- Update readme to explain confusing bower resolution message [\#123](https://github.com/ember-cli/ember-resolver/pull/123) ([darbyw](https://github.com/darbyw))
- Add installation guide [\#117](https://github.com/ember-cli/ember-resolver/pull/117) ([bianjp](https://github.com/bianjp))

## [v2.0.3](https://github.com/ember-cli/ember-resolver/tree/v2.0.3) (2015-08-31)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v2.0.2...v2.0.3)

**Implemented enhancements:**

- Move to node [\#79](https://github.com/ember-cli/ember-resolver/issues/79)

**Closed issues:**

- Don't Rely On Globals [\#106](https://github.com/ember-cli/ember-resolver/issues/106)
- This doesn't seem to be published on npm [\#102](https://github.com/ember-cli/ember-resolver/issues/102)

**Merged pull requests:**

- Add backwards compatibility with 0.1.x exported modules. [\#115](https://github.com/ember-cli/ember-resolver/pull/115) ([rwjblue](https://github.com/rwjblue))
- Make an ember-cli addon. [\#113](https://github.com/ember-cli/ember-resolver/pull/113) ([rwjblue](https://github.com/rwjblue))

## [v2.0.2](https://github.com/ember-cli/ember-resolver/tree/v2.0.2) (2015-08-31)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v2.0.1...v2.0.2)

## [v2.0.1](https://github.com/ember-cli/ember-resolver/tree/v2.0.1) (2015-08-31)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v1.0.1...v2.0.1)

## [v1.0.1](https://github.com/ember-cli/ember-resolver/tree/v1.0.1) (2015-08-30)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v0.1.21...v1.0.1)

## [v0.1.21](https://github.com/ember-cli/ember-resolver/tree/v0.1.21) (2015-08-28)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v0.1.20...v0.1.21)

**Merged pull requests:**

- Fix failure on Ember canary. [\#112](https://github.com/ember-cli/ember-resolver/pull/112) ([rwjblue](https://github.com/rwjblue))
- Improve performance of translateToContainerFullname function [\#111](https://github.com/ember-cli/ember-resolver/pull/111) ([joshvfleming](https://github.com/joshvfleming))

## [v0.1.20](https://github.com/ember-cli/ember-resolver/tree/v0.1.20) (2015-08-24)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v0.1.19...v0.1.20)

**Closed issues:**

- When variable and helper shares the same name, the helper always wins [\#108](https://github.com/ember-cli/ember-resolver/issues/108)

**Merged pull requests:**

- Add a changelog [\#110](https://github.com/ember-cli/ember-resolver/pull/110) ([mike-north](https://github.com/mike-north))
- Align with container cleanup [\#109](https://github.com/ember-cli/ember-resolver/pull/109) ([mike-north](https://github.com/mike-north))

## [v0.1.19](https://github.com/ember-cli/ember-resolver/tree/v0.1.19) (2015-08-20)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v0.1.18...v0.1.19)

**Closed issues:**

- Problem with loading templates. [\#103](https://github.com/ember-cli/ember-resolver/issues/103)

**Merged pull requests:**

- \[DOCS\] adding license attribute to the bower.json [\#107](https://github.com/ember-cli/ember-resolver/pull/107) ([williamsbdev](https://github.com/williamsbdev))
- Add failing test for @content-helper lookup [\#105](https://github.com/ember-cli/ember-resolver/pull/105) ([tim-evans](https://github.com/tim-evans))
- Rebased \#92 [\#104](https://github.com/ember-cli/ember-resolver/pull/104) ([tim-evans](https://github.com/tim-evans))

## [v0.1.18](https://github.com/ember-cli/ember-resolver/tree/v0.1.18) (2015-06-25)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v0.1.17...v0.1.18)

**Closed issues:**

- Change usages of `Ember.create` and `Ember.keys` to `Object.create` and `Object.keys` [\#97](https://github.com/ember-cli/ember-resolver/issues/97)
- Deprecated Computed Syntax [\#93](https://github.com/ember-cli/ember-resolver/issues/93)
- Nested pods & Adapters [\#91](https://github.com/ember-cli/ember-resolver/issues/91)
- Colocating the model with templates, controllers, partials and routes in a pod directory structure [\#81](https://github.com/ember-cli/ember-resolver/issues/81)

**Merged pull requests:**

- Updates [\#100](https://github.com/ember-cli/ember-resolver/pull/100) ([stefanpenner](https://github.com/stefanpenner))

## [v0.1.17](https://github.com/ember-cli/ember-resolver/tree/v0.1.17) (2015-06-12)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v0.1.16...v0.1.17)

**Merged pull requests:**

- Fix `shouldWrapInClassFactory` issue from knownForType refactor. [\#96](https://github.com/ember-cli/ember-resolver/pull/96) ([rwjblue](https://github.com/rwjblue))

## [v0.1.16](https://github.com/ember-cli/ember-resolver/tree/v0.1.16) (2015-06-12)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v0.1.15...v0.1.16)

**Closed issues:**

- Error with lookup process [\#94](https://github.com/ember-cli/ember-resolver/issues/94)
- may the initializers.js be modularized? [\#67](https://github.com/ember-cli/ember-resolver/issues/67)

**Merged pull requests:**

- Implement `knownForType` for RFC\#58. [\#95](https://github.com/ember-cli/ember-resolver/pull/95) ([rwjblue](https://github.com/rwjblue))
- Fix namespaced resolves for all types [\#92](https://github.com/ember-cli/ember-resolver/pull/92) ([rmachielse](https://github.com/rmachielse))

## [v0.1.15](https://github.com/ember-cli/ember-resolver/tree/v0.1.15) (2015-03-20)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v0.1.14...v0.1.15)

**Merged pull requests:**

- Bump version 0.1.15 [\#90](https://github.com/ember-cli/ember-resolver/pull/90) ([trabus](https://github.com/trabus))

## [v0.1.14](https://github.com/ember-cli/ember-resolver/tree/v0.1.14) (2015-03-15)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v0.1.13...v0.1.14)

**Merged pull requests:**

- Do not throw an error if `this.namespace` is undefined on init. [\#89](https://github.com/ember-cli/ember-resolver/pull/89) ([rwjblue](https://github.com/rwjblue))

## [v0.1.13](https://github.com/ember-cli/ember-resolver/tree/v0.1.13) (2015-03-15)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v0.1.12...v0.1.13)

**Closed issues:**

- Release new version [\#86](https://github.com/ember-cli/ember-resolver/issues/86)

**Merged pull requests:**

- Add podModulePrefix deprecation warning. [\#88](https://github.com/ember-cli/ember-resolver/pull/88) ([trabus](https://github.com/trabus))
- Refactor chooseModuleName to not be an anonymous function [\#87](https://github.com/ember-cli/ember-resolver/pull/87) ([alexspeller](https://github.com/alexspeller))

## [v0.1.12](https://github.com/ember-cli/ember-resolver/tree/v0.1.12) (2015-02-22)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v0.1.11...v0.1.12)

**Closed issues:**

- How are the needs supposed to be specified for a controller with nested routes? [\#85](https://github.com/ember-cli/ember-resolver/issues/85)
- AMD support [\#78](https://github.com/ember-cli/ember-resolver/issues/78)
- ember-dev is pointing to `master` branch instead of `ruby` in Gemfile [\#71](https://github.com/ember-cli/ember-resolver/issues/71)

**Merged pull requests:**

- //@ is depricated  [\#84](https://github.com/ember-cli/ember-resolver/pull/84) ([mikeumus](https://github.com/mikeumus))
- Update dist for pod debug adapter support [\#83](https://github.com/ember-cli/ember-resolver/pull/83) ([teddyzeenny](https://github.com/teddyzeenny))
- Add pod support and avoid duplicate entries [\#82](https://github.com/ember-cli/ember-resolver/pull/82) ([teddyzeenny](https://github.com/teddyzeenny))
- Update organization name in repository URL [\#76](https://github.com/ember-cli/ember-resolver/pull/76) ([tricknotes](https://github.com/tricknotes))

## [v0.1.11](https://github.com/ember-cli/ember-resolver/tree/v0.1.11) (2014-12-21)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v0.1.10...v0.1.11)

**Closed issues:**

- extra unneeded closures exist in dist builds. [\#2](https://github.com/ember-cli/ember-resolver/issues/2)

**Merged pull requests:**

- Stamp Resolver class to indicate it is a modulesBasedResolver. [\#75](https://github.com/ember-cli/ember-resolver/pull/75) ([rwjblue](https://github.com/rwjblue))
- Make assertion message friendly [\#73](https://github.com/ember-cli/ember-resolver/pull/73) ([tricknotes](https://github.com/tricknotes))
- Fix link to homepage [\#72](https://github.com/ember-cli/ember-resolver/pull/72) ([tricknotes](https://github.com/tricknotes))

## [v0.1.10](https://github.com/ember-cli/ember-resolver/tree/v0.1.10) (2014-10-16)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v0.1.9...v0.1.10)

**Merged pull requests:**

- Allow namespace resolving [\#70](https://github.com/ember-cli/ember-resolver/pull/70) ([bcardarella](https://github.com/bcardarella))

## [v0.1.9](https://github.com/ember-cli/ember-resolver/tree/v0.1.9) (2014-10-10)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v0.1.8...v0.1.9)

**Merged pull requests:**

- Allow namespace resolving [\#65](https://github.com/ember-cli/ember-resolver/pull/65) ([bcardarella](https://github.com/bcardarella))

## [v0.1.8](https://github.com/ember-cli/ember-resolver/tree/v0.1.8) (2014-10-09)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v0.1.7...v0.1.8)

**Closed issues:**

- namespace resolver breaks resolving apps [\#69](https://github.com/ember-cli/ember-resolver/issues/69)
- ember-resolver v0.1.7 pulls down v0.1.6 [\#66](https://github.com/ember-cli/ember-resolver/issues/66)
- .detect and .nearestOfType broken [\#62](https://github.com/ember-cli/ember-resolver/issues/62)
- It cannot resolve nested route on the namespace \(App.TestListRoute\) [\#57](https://github.com/ember-cli/ember-resolver/issues/57)
- including 3rd party ember's library with precompiled templates doesn't work because of `normalize` method [\#55](https://github.com/ember-cli/ember-resolver/issues/55)
- templateName does not resolve when in pod structure [\#45](https://github.com/ember-cli/ember-resolver/issues/45)
- Controller \(with no corresponding Route\) in sub directory cannot be found [\#37](https://github.com/ember-cli/ember-resolver/issues/37)
- resolveTemplate should try both dasherized and underscores [\#34](https://github.com/ember-cli/ember-resolver/issues/34)
- Models in POD structure [\#28](https://github.com/ember-cli/ember-resolver/issues/28)

**Merged pull requests:**

- Allow pluralization to be configurable. [\#68](https://github.com/ember-cli/ember-resolver/pull/68) ([rwjblue](https://github.com/rwjblue))
- Updated the bower.json name attr to be ember-resolver [\#64](https://github.com/ember-cli/ember-resolver/pull/64) ([toranb](https://github.com/toranb))
- Resolves IE8 bug [\#63](https://github.com/ember-cli/ember-resolver/pull/63) ([jdjkelly](https://github.com/jdjkelly))

## [v0.1.7](https://github.com/ember-cli/ember-resolver/tree/v0.1.7) (2014-07-24)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v0.1.6...v0.1.7)

## [v0.1.6](https://github.com/ember-cli/ember-resolver/tree/v0.1.6) (2014-07-24)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v0.1.5...v0.1.6)

**Closed issues:**

- Object.create not available on IE 8 [\#60](https://github.com/ember-cli/ember-resolver/issues/60)

**Merged pull requests:**

- Allow components to be grouped together in a single subdirectory. [\#61](https://github.com/ember-cli/ember-resolver/pull/61) ([rwjblue](https://github.com/rwjblue))
- Bump version in bower.json [\#59](https://github.com/ember-cli/ember-resolver/pull/59) ([xtian](https://github.com/xtian))

## [v0.1.5](https://github.com/ember-cli/ember-resolver/tree/v0.1.5) (2014-07-18)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v0.1.4...v0.1.5)

## [v0.1.4](https://github.com/ember-cli/ember-resolver/tree/v0.1.4) (2014-07-18)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/v0.1.3...v0.1.4)

## [v0.1.3](https://github.com/ember-cli/ember-resolver/tree/v0.1.3) (2014-07-18)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/0.1.2...v0.1.3)

**Closed issues:**

- Loading templates doesn't work [\#52](https://github.com/ember-cli/ember-resolver/issues/52)
- Components with templates in pod structure [\#30](https://github.com/ember-cli/ember-resolver/issues/30)

**Merged pull requests:**

- add normalization caching. [\#58](https://github.com/ember-cli/ember-resolver/pull/58) ([stefanpenner](https://github.com/stefanpenner))
- Minor grammatical fix to a comment [\#54](https://github.com/ember-cli/ember-resolver/pull/54) ([baddox](https://github.com/baddox))
- Fix component template lookup with pods. [\#53](https://github.com/ember-cli/ember-resolver/pull/53) ([rwjblue](https://github.com/rwjblue))

## [0.1.2](https://github.com/ember-cli/ember-resolver/tree/0.1.2) (2014-06-03)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/0.1.1...0.1.2)

**Closed issues:**

- Should resolver be optionally independent of the Application namespace? [\#41](https://github.com/ember-cli/ember-resolver/issues/41)

**Merged pull requests:**

- Fix typo in logging tests [\#51](https://github.com/ember-cli/ember-resolver/pull/51) ([rlivsey](https://github.com/rlivsey))
- Don't log if logging is disabled [\#50](https://github.com/ember-cli/ember-resolver/pull/50) ([rlivsey](https://github.com/rlivsey))

## [0.1.1](https://github.com/ember-cli/ember-resolver/tree/0.1.1) (2014-06-03)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/0.1.0...0.1.1)

**Merged pull requests:**

- Do not parse the name if it was already parsed. [\#48](https://github.com/ember-cli/ember-resolver/pull/48) ([rwjblue](https://github.com/rwjblue))

## [0.1.0](https://github.com/ember-cli/ember-resolver/tree/0.1.0) (2014-06-03)
[Full Changelog](https://github.com/ember-cli/ember-resolver/compare/0.0.1...0.1.0)

**Closed issues:**

- Change name to michael-bay-resolver [\#46](https://github.com/ember-cli/ember-resolver/issues/46)
- templateName convention and RangeError: invalid array length [\#43](https://github.com/ember-cli/ember-resolver/issues/43)
- Single word handlebars helpers do not resolve [\#40](https://github.com/ember-cli/ember-resolver/issues/40)
- proposal for a new folder for adapters, serializers and transformers [\#38](https://github.com/ember-cli/ember-resolver/issues/38)
- Resolver breaks when logging long names [\#35](https://github.com/ember-cli/ember-resolver/issues/35)
- Bower install breaks after the last commit [\#33](https://github.com/ember-cli/ember-resolver/issues/33)
- Incorrect Assertion due to camelCasing of Ember Data Model [\#24](https://github.com/ember-cli/ember-resolver/issues/24)
- Partial resolution is ambiguous [\#22](https://github.com/ember-cli/ember-resolver/issues/22)
- Folder structure tweak [\#21](https://github.com/ember-cli/ember-resolver/issues/21)
- Loading template issue [\#13](https://github.com/ember-cli/ember-resolver/issues/13)
- Configure for default controller and route in application, by default it's a generated by Ember   [\#11](https://github.com/ember-cli/ember-resolver/issues/11)
- Create real tests of resolver. [\#1](https://github.com/ember-cli/ember-resolver/issues/1)

**Merged pull requests:**

- Very light refactor to the `chooseModuleName` function. [\#47](https://github.com/ember-cli/ember-resolver/pull/47) ([yamadapc](https://github.com/yamadapc))
- Update README.md [\#42](https://github.com/ember-cli/ember-resolver/pull/42) ([zigomir](https://github.com/zigomir))
- Refactor `resolveOther` into separate methods. [\#39](https://github.com/ember-cli/ember-resolver/pull/39) ([rwjblue](https://github.com/rwjblue))
- Do not error when logging long module names. [\#36](https://github.com/ember-cli/ember-resolver/pull/36) ([rwjblue](https://github.com/rwjblue))
- switch back to inheriting from Ember.DefaultResolver [\#32](https://github.com/ember-cli/ember-resolver/pull/32) ([ghempton](https://github.com/ghempton))
- WIP: Entries for type [\#31](https://github.com/ember-cli/ember-resolver/pull/31) ([teddyzeenny](https://github.com/teddyzeenny))
- Changed AMD module name to be less generic [\#27](https://github.com/ember-cli/ember-resolver/pull/27) ([jayphelps](https://github.com/jayphelps))
- Revert  \#20 and \#25. [\#26](https://github.com/ember-cli/ember-resolver/pull/26) ([abuiles](https://github.com/abuiles))
- More generic error message for normalize method [\#25](https://github.com/ember-cli/ember-resolver/pull/25) ([denisnazarov](https://github.com/denisnazarov))
- Provide fallback lookup for partials. [\#23](https://github.com/ember-cli/ember-resolver/pull/23) ([rwjblue](https://github.com/rwjblue))
- Support camelcase resolving of controllers in `needs` array [\#20](https://github.com/ember-cli/ember-resolver/pull/20) ([rahulcs](https://github.com/rahulcs))
- Reduce the usage of \_eak\_seen. [\#19](https://github.com/ember-cli/ember-resolver/pull/19) ([rwjblue](https://github.com/rwjblue))
- Refactor logging into helper function. [\#18](https://github.com/ember-cli/ember-resolver/pull/18) ([rwjblue](https://github.com/rwjblue))
- Test against all three Ember channels. [\#17](https://github.com/ember-cli/ember-resolver/pull/17) ([rwjblue](https://github.com/rwjblue))
- Add POD structure and allow types to have custom prefixes. [\#16](https://github.com/ember-cli/ember-resolver/pull/16) ([rwjblue](https://github.com/rwjblue))
- Allow 'some-type:main' modules to be looked up easier. [\#15](https://github.com/ember-cli/ember-resolver/pull/15) ([rwjblue](https://github.com/rwjblue))
- Add some real tests. [\#14](https://github.com/ember-cli/ember-resolver/pull/14) ([rwjblue](https://github.com/rwjblue))
- Fixed typo. Ambigous should be Ambiguous [\#12](https://github.com/ember-cli/ember-resolver/pull/12) ([eccegordo](https://github.com/eccegordo))
- Avoid dot notation for property `default` [\#9](https://github.com/ember-cli/ember-resolver/pull/9) ([zeppelin](https://github.com/zeppelin))
- Skip type normalization [\#8](https://github.com/ember-cli/ember-resolver/pull/8) ([teddyzeenny](https://github.com/teddyzeenny))
- Fix invalid JSON [\#6](https://github.com/ember-cli/ember-resolver/pull/6) ([joliss](https://github.com/joliss))
- Remove exports dependency. [\#5](https://github.com/ember-cli/ember-resolver/pull/5) ([rwjblue](https://github.com/rwjblue))
- naming isn't finalized, but this provides a toString useful for modules [\#4](https://github.com/ember-cli/ember-resolver/pull/4) ([stefanpenner](https://github.com/stefanpenner))
- Fancier logging! [\#3](https://github.com/ember-cli/ember-resolver/pull/3) ([jonkirkman](https://github.com/jonkirkman))

## [0.0.1](https://github.com/ember-cli/ember-resolver/tree/0.0.1) (2013-10-31)
