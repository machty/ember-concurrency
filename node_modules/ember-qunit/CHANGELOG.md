# Change Log

## v4.5.0 (2019-07-30)

#### :rocket: Enhancement
* [#507](https://github.com/emberjs/ember-qunit/pull/507) Upgrade @ember/test-helpers to 1.6.0. ([@rwjblue](https://github.com/rwjblue))
* [#483](https://github.com/emberjs/ember-qunit/pull/483) Deprecate legacy test APIs ([@chadhietala](https://github.com/chadhietala))

#### :bug: Bug Fix
* [#526](https://github.com/emberjs/ember-qunit/pull/526) Fix error message for test isolation validation ([@scalvert](https://github.com/scalvert))
* [#497](https://github.com/emberjs/ember-qunit/pull/497) Work around issue with pauseTest() timing out. ([@rwjblue](https://github.com/rwjblue))

#### :house: Internal
* [#490](https://github.com/emberjs/ember-qunit/pull/490) package.json: Use regular version constraints ([@Turbo87](https://github.com/Turbo87))

#### Committers: 5
- Chad Hietala ([@chadhietala](https://github.com/chadhietala))
- Robert Jackson ([@rwjblue](https://github.com/rwjblue))
- Steve Calvert ([@scalvert](https://github.com/scalvert))
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v4.4.1 (2019-02-25)

#### :bug: Bug Fix
* [#454](https://github.com/emberjs/ember-qunit/pull/454) Bump QUnit from 2.9.1 to 2.9.2 ([@dependabot[bot]](https://github.com/apps/dependabot))

#### :house: Internal
* [#453](https://github.com/emberjs/ember-qunit/pull/453) Converting ember-qunit to use test isolation primatives from @ember/test-helpers ([@scalvert](https://github.com/scalvert))

#### Committers: 1
- Steve Calvert ([@scalvert](https://github.com/scalvert))

## v4.4.0 (2019-02-19)

#### :rocket: Enhancement
* [#445](https://github.com/emberjs/ember-qunit/pull/445) Extending test isolation validation to include QUnit timeouts ([@scalvert](https://github.com/scalvert))

#### Committers: 1
- Steve Calvert ([@scalvert](https://github.com/scalvert))

## v4.3.0 (2019-02-06)

#### :rocket: Enhancement
* [#437](https://github.com/emberjs/ember-qunit/pull/437) Ensure Ember.onerror is reset after each test ([@scalvert](https://github.com/scalvert))

#### Committers: 1
- Steve Calvert ([@scalvert](https://github.com/scalvert))

## v4.2.0 (2018-12-13)

#### :rocket: Enhancement
* [#408](https://github.com/emberjs/ember-qunit/pull/408) Avoid `await settled()` in teardown when using async leak detection. ([@rwjblue](https://github.com/rwjblue))
* [#389](https://github.com/emberjs/ember-qunit/pull/389) Refactor `setupTestIsolationValidation` workflow. ([@scalvert](https://github.com/scalvert))

#### :bug: Bug Fix
* [#404](https://github.com/emberjs/ember-qunit/pull/404) Avoid subsequent test failures when prior test returns rejected RSVP.Promise. ([@scalvert](https://github.com/scalvert))

#### :house: Internal
* [#398](https://github.com/emberjs/ember-qunit/pull/398) TravisCI: Remove deprecated `sudo: false` option ([@Turbo87](https://github.com/Turbo87))
* [#402](https://github.com/emberjs/ember-qunit/pull/402) Update @ember/test-helpers to ^1.1.0. ([@rwjblue](https://github.com/rwjblue))

#### Committers: 4
- Jan Bobisud ([@bobisjan](https://github.com/bobisjan))
- Robert Jackson ([@rwjblue](https://github.com/rwjblue))
- Steve Calvert ([@scalvert](https://github.com/scalvert))
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))

## v4.1.2 (2018-11-08)

#### :bug: Bug Fix
* [#385](https://github.com/emberjs/ember-qunit/pull/385) Bugfix: fixes issue with test-isolation-validation output ([@scalvert](https://github.com/scalvert))
* [#383](https://github.com/emberjs/ember-qunit/pull/383) Bump @ember/test-helpers from 1.0.0 to 1.0.1 ([@dependabot[bot]](https://github.com/apps/dependabot))

#### Committers: 1
- Steve Calvert ([@scalvert](https://github.com/scalvert))

## v4.1.1 (2018-11-06)

#### :bug: Bug Fix
* [#381](https://github.com/emberjs/ember-qunit/pull/381) Prevent errors for skipped tests when using RSVP.Promise as Promise polyfill. ([@step2yeung](https://github.com/step2yeung))

#### Committers: 1
- Stephen Yeung ([@step2yeung](https://github.com/step2yeung))

## v4.1.0 (2018-11-05)

#### :rocket: Enhancement
* [#380](https://github.com/emberjs/ember-qunit/pull/380) Update to QUnit to 2.8.0 ([@gabrielcsapo](https://github.com/gabrielcsapo))

#### Committers: 1
- Gabriel Csapo ([@gabrielcsapo](https://github.com/gabrielcsapo))

## v4.0.0 (2018-10-30)

#### :boom: Breaking Change
* [#348](https://github.com/emberjs/ember-qunit/pull/348) Bump ember-cli-babel from 6.17.2 to 7.1.2 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#354](https://github.com/emberjs/ember-qunit/pull/354) Drop support for Node.js 4 and below ([@Turbo87](https://github.com/Turbo87))

#### :rocket: Enhancement
* [#373](https://github.com/emberjs/ember-qunit/pull/373) Adding debug info to test isolation validation ([@scalvert](https://github.com/scalvert))

#### :bug: Bug Fix
* [#369](https://github.com/emberjs/ember-qunit/pull/369) Upgrade qunit to v2.7.1 ([@stefanpenner](https://github.com/stefanpenner))

#### :house: Internal
* [#358](https://github.com/emberjs/ember-qunit/pull/358) Remove obsolete dependency resolution overrides ([@Turbo87](https://github.com/Turbo87))

#### :memo: Documentation
* [#371](https://github.com/emberjs/ember-qunit/pull/371) README: Add "Requirements" section ([@Turbo87](https://github.com/Turbo87))

#### Committers: 4
- Stefan Penner ([@stefanpenner](https://github.com/stefanpenner))
- Robert Jackson ([@rwjblue](https://github.com/rwjblue))
- Steve Calvert ([@scalvert](https://github.com/scalvert))
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))


## v3.5.3 (2018-10-19) and v3.5.2 (2018-10-18)

`v3.5.2` was mistakenly released with a breaking change that dropped support for Node.js 4.
To resolve this situation we have re-released `v3.5.1` as `v3.5.3`.


## v3.5.1 (2018-10-13)

#### :bug: Bug Fix
* [#353](https://github.com/emberjs/ember-qunit/pull/353) Pin `qunit` dependency to v2.6.x for Node 4 compatibility. ([@Turbo87](https://github.com/Turbo87))

#### Committers: 1
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))


## v3.5.0 (2018-10-10)

#### :rocket: Enhancement
* [#339](https://github.com/emberjs/ember-qunit/pull/351) Update `qunit` to 2.7.0. ([@turbo87](https://github.com/turbo87))

#### Committers: 1
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))

## v3.4.2 (2018-10-02)

#### :rocket: Enhancement
* [#339](https://github.com/emberjs/ember-qunit/pull/339) Update @ember/test-helpers to v0.7.26. ([@rwjblue](https://github.com/rwjblue))
* [#331](https://github.com/emberjs/ember-qunit/pull/331) Bump minimum required @ember/test-helpers to 0.7.25. ([@john-griffin](https://github.com/john-griffin))
* [#330](https://github.com/emberjs/ember-qunit/pull/330) Improve ModuleLoadFailure handling. ([@stefanpenner](https://github.com/stefanpenner))

#### :memo: Documentation
* [#333](https://github.com/emberjs/ember-qunit/pull/333) Add info about Ember.testing changes. ([@tmquinn](https://github.com/tmquinn))

#### :house: Internal
* [#336](https://github.com/emberjs/ember-qunit/pull/336) Remove polyfillMemoryLeakPrevention. ([@tmquinn](https://github.com/tmquinn))
* [#338](https://github.com/emberjs/ember-qunit/pull/338) Lock ember-data to 2.16.2. ([@rwjblue](https://github.com/rwjblue))
* [#329](https://github.com/emberjs/ember-qunit/pull/329) npmignore: Do not publish `yarn.lock` file. ([@Turbo87](https://github.com/Turbo87))

#### Committers: 5
- John Griffin ([john-griffin](https://github.com/john-griffin))
- Quinn Hoyer ([tmquinn](https://github.com/tmquinn))
- Robert Jackson ([rwjblue](https://github.com/rwjblue))
- Stefan Penner ([stefanpenner](https://github.com/stefanpenner))
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))

## v3.4.1 (2018-05-15)

#### :bug: Bug Fix
* [#328](https://github.com/emberjs/ember-qunit/pull/328) Polyfill memory leak prevention. ([@rwjblue](https://github.com/rwjblue))
* [#324](https://github.com/emberjs/ember-qunit/pull/324) bumped version requirement of ember-cli-babel from ^6.3.0 to ^6.8.2. ([@StephenAWalsh](https://github.com/StephenAWalsh))

#### :memo: Documentation
* [#326](https://github.com/emberjs/ember-qunit/pull/326) Test isolation validation comment is incorrect. ([@scalvert](https://github.com/scalvert))

#### Committers: 3
- Robert Jackson ([rwjblue](https://github.com/rwjblue))
- Steve Calvert ([scalvert](https://github.com/scalvert))
- Steve Walsh ([StephenAWalsh](https://github.com/StephenAWalsh))


## v3.4.0 (2018-03-28)

#### :rocket: Enhancement
* [#314](https://github.com/emberjs/ember-qunit/pull/314) Adding tests not settled detection support in tests. ([@scalvert](https://github.com/scalvert))

#### :memo: Documentation
* [#323](https://github.com/emberjs/ember-qunit/pull/323) Fix example in transition guide. ([@simonihmig](https://github.com/simonihmig))
* [#321](https://github.com/emberjs/ember-qunit/pull/321) README: Fix documentation issues. ([@Turbo87](https://github.com/Turbo87))
* [#322](https://github.com/emberjs/ember-qunit/pull/322) Add Migration Guide. ([@simonihmig](https://github.com/simonihmig))
* [#320](https://github.com/emberjs/ember-qunit/pull/320) Update Docs. ([@Turbo87](https://github.com/Turbo87))
* [#317](https://github.com/emberjs/ember-qunit/pull/317) Update README.md. ([@demee](https://github.com/demee))

#### Committers: 4
- Simon Ihmig ([simonihmig](https://github.com/simonihmig))
- Slawomir Demichowicz ([demee](https://github.com/demee))
- Steve Calvert ([scalvert](https://github.com/scalvert))
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))

## v3.3.2 (2018-02-16)

#### :bug: Bug Fix
* [#316](https://github.com/emberjs/ember-qunit/pull/316) Update @ember/test-helpers minimum version to 0.7.18. ([@rwjblue](https://github.com/rwjblue))
* [#315](https://github.com/emberjs/ember-qunit/pull/315) Add assert.expect to Ember.onerror validation test. ([@nlfurniss](https://github.com/nlfurniss))

#### Committers: 2
- Nathaniel Furniss ([nlfurniss](https://github.com/nlfurniss))
- Robert Jackson ([rwjblue](https://github.com/rwjblue))

## v3.3.1 (2018-02-11)

#### :rocket: Enhancement
* [#313](https://github.com/emberjs/ember-qunit/pull/313) Update `@ember/test-helpers` to v0.7.17. ([@Turbo87](https://github.com/Turbo87))

#### :bug: Bug Fix
* [#312](https://github.com/emberjs/ember-qunit/pull/312) Ensure `exception` is _actually_ removed for Ember 2.17+. ([@rwjblue](https://github.com/rwjblue))

#### :house: Internal
* [#312](https://github.com/emberjs/ember-qunit/pull/312) Update ember-try config to avoid bower for Ember channels. ([@rwjblue](https://github.com/rwjblue))

#### Committers: 2
- Robert Jackson ([rwjblue](https://github.com/rwjblue))
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))

## v3.3.0 (2018-01-17)

#### :rocket: Enhancement
* [#307](https://github.com/emberjs/ember-qunit/pull/307) Remove `exception` method from QUnit test adapter when using Ember 2.17+. ([@rwjblue](https://github.com/rwjblue))
* [#306](https://github.com/emberjs/ember-qunit/pull/306) Update to QUnit 2.5.0. ([@rwjblue](https://github.com/rwjblue))
* [#304](https://github.com/emberjs/ember-qunit/pull/304) Add validation for `Ember.onerror` in testing. ([@rwjblue](https://github.com/rwjblue))

#### :bug: Bug Fix
* [#308](https://github.com/emberjs/ember-qunit/pull/308) Fix deprecations for `@ember/test-helpers` reexports. ([@dfreeman](https://github.com/dfreeman))

#### :memo: Documentation
* [#310](https://github.com/emberjs/ember-qunit/pull/310) README: Use SVG badge. ([@olleolleolle](https://github.com/olleolleolle))

#### :house: Internal
* [#311](https://github.com/emberjs/ember-qunit/pull/311) Fix issues with sudo: false infra on Travis CI. ([@rwjblue](https://github.com/rwjblue))

#### Committers: 3
- Dan Freeman ([dfreeman](https://github.com/dfreeman))
- Olle Jonsson ([olleolleolle](https://github.com/olleolleolle))
- Robert Jackson ([rwjblue](https://github.com/rwjblue))

## v3.2.2 (2017-12-18)

#### :bug: Bug Fix
* [#305](https://github.com/emberjs/ember-qunit/pull/305) Bring back re-exports (with a deprecation).. ([@rwjblue](https://github.com/rwjblue))

#### Committers: 1
- Robert Jackson ([rwjblue](https://github.com/rwjblue))

## v3.2.1 (2017-12-17)

#### :bug: Bug Fix
* [#303](https://github.com/emberjs/ember-qunit/pull/303) Ensure Ember.testing is set properly during *ALL* tests.. ([@rwjblue](https://github.com/rwjblue))

#### Committers: 1
- Robert Jackson ([rwjblue](https://github.com/rwjblue))

## v3.2.0 (2017-12-17)

#### :rocket: Enhancement
* [#302](https://github.com/emberjs/ember-qunit/pull/302) Implement `startApplicationTest` from emberjs/rfcs#268. ([@rwjblue](https://github.com/rwjblue))

#### :house: Internal
* [#299](https://github.com/emberjs/ember-qunit/pull/299) CI: Use Node 4 for tests. ([@Turbo87](https://github.com/Turbo87))

#### Committers: 2
- Robert Jackson ([rwjblue](https://github.com/rwjblue))
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))

## [v3.0.0](https://github.com/emberjs/ember-qunit/tree/v3.0.0) (2017-11-11)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v3.0.0-beta.8...v3.0.0)

**Implemented enhancements:**

- Update to @ember/test-helpers \(from ember-test-helpers\). [\#296](https://github.com/emberjs/ember-qunit/pull/296) ([rwjblue](https://github.com/rwjblue))

## [v3.0.0-beta.8](https://github.com/emberjs/ember-qunit/tree/v3.0.0-beta.8) (2017-11-11)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v3.0.0-beta.7...v3.0.0-beta.8)

## [v3.0.0-beta.7](https://github.com/emberjs/ember-qunit/tree/v3.0.0-beta.7) (2017-11-06)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v3.0.0-beta.6...v3.0.0-beta.7)

**Merged pull requests:**

- Migrate from `qunitjs` to `qunit` package. [\#295](https://github.com/emberjs/ember-qunit/pull/295) ([rwjblue](https://github.com/rwjblue))

## [v3.0.0-beta.6](https://github.com/emberjs/ember-qunit/tree/v3.0.0-beta.6) (2017-11-05)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v3.0.0-beta.5...v3.0.0-beta.6)

**Merged pull requests:**

- Make `setupTest` and `setupRenderingTest` async. [\#292](https://github.com/emberjs/ember-qunit/pull/292) ([rwjblue](https://github.com/rwjblue))

## [v3.0.0-beta.5](https://github.com/emberjs/ember-qunit/tree/v3.0.0-beta.5) (2017-11-05)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v3.0.0-beta.4...v3.0.0-beta.5)

**Implemented enhancements:**

- Update ember-test-helpers to expose `pauseTest` / `resumeTest` [\#291](https://github.com/emberjs/ember-qunit/pull/291) ([rwjblue](https://github.com/rwjblue))

**Fixed bugs:**

- Add `pauseTest` and `resumeTest` functionality in `setupTest`. [\#287](https://github.com/emberjs/ember-qunit/issues/287)

**Closed issues:**

- beta.2 model unit tests failing w/codemod [\#289](https://github.com/emberjs/ember-qunit/issues/289)
- Async behavior outside of a test [\#246](https://github.com/emberjs/ember-qunit/issues/246)
- Upgrading to v0.4.12 causes error: `calling set on destroyed object` [\#233](https://github.com/emberjs/ember-qunit/issues/233)
- Does it work with model POJO attributes? [\#139](https://github.com/emberjs/ember-qunit/issues/139)
- moduleFor not allowing Adapter to use its Serializer. [\#69](https://github.com/emberjs/ember-qunit/issues/69)
- moduleForComponent issue with {{link-to}} helpers [\#52](https://github.com/emberjs/ember-qunit/issues/52)
- moduleForComponent and callbacks not working? [\#37](https://github.com/emberjs/ember-qunit/issues/37)

## [v3.0.0-beta.4](https://github.com/emberjs/ember-qunit/tree/v3.0.0-beta.4) (2017-10-17)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v3.0.0-beta.3...v3.0.0-beta.4)

**Implemented enhancements:**

- Implement RFC 232 \(New QUnit Testing API\) [\#208](https://github.com/emberjs/ember-qunit/issues/208)
- Add basic implementation of new ember-qunit API. [\#286](https://github.com/emberjs/ember-qunit/pull/286) ([rwjblue](https://github.com/rwjblue))

**Closed issues:**

- Model unit tests silently cache this.subject\(\) [\#278](https://github.com/emberjs/ember-qunit/issues/278)
- assert.throws fails in component integration tests with ember 2.12 [\#256](https://github.com/emberjs/ember-qunit/issues/256)
- Better assertion message when ember asserts.  [\#247](https://github.com/emberjs/ember-qunit/issues/247)
- When a service is injected in a router the routes unit tests fail [\#218](https://github.com/emberjs/ember-qunit/issues/218)
- \[QUESTION\]: can we update this test to show what ember 2.x tests would do? [\#215](https://github.com/emberjs/ember-qunit/issues/215)
- cannot get async test to work [\#209](https://github.com/emberjs/ember-qunit/issues/209)
- Addons "Unable to find partial with name" [\#202](https://github.com/emberjs/ember-qunit/issues/202)
- needs fails with single-character underscore helper name [\#201](https://github.com/emberjs/ember-qunit/issues/201)
- Intermittent issues triggering events on elements with bound actions [\#193](https://github.com/emberjs/ember-qunit/issues/193)
- Make beforeEach & afterEach respect returned promises [\#192](https://github.com/emberjs/ember-qunit/issues/192)
- async beforeEach [\#186](https://github.com/emberjs/ember-qunit/issues/186)
- Access to the component instance in moduleForComponent should be possible [\#184](https://github.com/emberjs/ember-qunit/issues/184)
- Merge unit / integration component tests [\#183](https://github.com/emberjs/ember-qunit/issues/183)
- .jshintignore ignored in addon [\#173](https://github.com/emberjs/ember-qunit/issues/173)
- You cannot use the same root element \(\#ember-testing\) multiple times in an Ember.Application [\#168](https://github.com/emberjs/ember-qunit/issues/168)
- App.destroy doesn't properly cleanup, possible regression [\#166](https://github.com/emberjs/ember-qunit/issues/166)
- Does beforeEach support more than 1 promise resolve? [\#165](https://github.com/emberjs/ember-qunit/issues/165)
- Called start\(\) outside of a test context [\#143](https://github.com/emberjs/ember-qunit/issues/143)
- problem returning application from qunit setup module callback [\#123](https://github.com/emberjs/ember-qunit/issues/123)
- Release New Version -- 0.2.0 [\#121](https://github.com/emberjs/ember-qunit/issues/121)
- moduleFor undefined function [\#117](https://github.com/emberjs/ember-qunit/issues/117)
- Update QUnit hook names: setup/teardown is deprecated for beforeEach/afterEach [\#114](https://github.com/emberjs/ember-qunit/issues/114)
- Does delegate functionality still exist in moduleFor? [\#112](https://github.com/emberjs/ember-qunit/issues/112)
- Child belongsTo Father, then Father belongsTo GrandFather issue.. [\#109](https://github.com/emberjs/ember-qunit/issues/109)
- async func test fails after stored in sessionStorage [\#107](https://github.com/emberjs/ember-qunit/issues/107)
- qunit master now supports the promise start/stop stuff [\#95](https://github.com/emberjs/ember-qunit/issues/95)
- New helper moduleForAdapter? [\#92](https://github.com/emberjs/ember-qunit/issues/92)
- How to erase contents in store\(\) after each test? [\#83](https://github.com/emberjs/ember-qunit/issues/83)
- Writing unit tests which will work with templates. [\#68](https://github.com/emberjs/ember-qunit/issues/68)
- I believe these deps, are incorrect [\#59](https://github.com/emberjs/ember-qunit/issues/59)
- Can't call `this.append\(\)` in `setup` and still have tests work [\#58](https://github.com/emberjs/ember-qunit/issues/58)
- Document that es6 transpiler must enable CompatFix or change exports [\#43](https://github.com/emberjs/ember-qunit/issues/43)
- You cannot use the same root element \(body\) [\#29](https://github.com/emberjs/ember-qunit/issues/29)
- figure out how to resolve templates on a default resolver [\#23](https://github.com/emberjs/ember-qunit/issues/23)
- refactor moduleForComponent view logic [\#21](https://github.com/emberjs/ember-qunit/issues/21)
- Unit + Intergration Test Conflicts [\#20](https://github.com/emberjs/ember-qunit/issues/20)
- Extending test for 3rd party additions [\#14](https://github.com/emberjs/ember-qunit/issues/14)
- using needs does weird things when you have multiple tests under the module [\#12](https://github.com/emberjs/ember-qunit/issues/12)
- Gotchas [\#10](https://github.com/emberjs/ember-qunit/issues/10)
- noCleanup option [\#6](https://github.com/emberjs/ember-qunit/issues/6)
- potential container variable leek [\#3](https://github.com/emberjs/ember-qunit/issues/3)
- moduleFor\(View|Component\) needs eventDispatcher [\#2](https://github.com/emberjs/ember-qunit/issues/2)
- stricter about cleanup/leaks [\#1](https://github.com/emberjs/ember-qunit/issues/1)

**Merged pull requests:**

- Use yarn instead of npm [\#285](https://github.com/emberjs/ember-qunit/pull/285) ([Turbo87](https://github.com/Turbo87))

## [v3.0.0-beta.3](https://github.com/emberjs/ember-qunit/tree/v3.0.0-beta.3) (2017-10-11)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v3.0.0-beta.2...v3.0.0-beta.3)

**Closed issues:**

- 0.4.24 is not tagged on bower install? [\#271](https://github.com/emberjs/ember-qunit/issues/271)

**Merged pull requests:**

- Properly call `setTestGenerator` method. [\#284](https://github.com/emberjs/ember-qunit/pull/284) ([rwjblue](https://github.com/rwjblue))

## [v3.0.0-beta.2](https://github.com/emberjs/ember-qunit/tree/v3.0.0-beta.2) (2017-10-07)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v3.0.0-beta.1...v3.0.0-beta.2)

**Merged pull requests:**

- Bring over more functionality from ember-cli-qunit. [\#283](https://github.com/emberjs/ember-qunit/pull/283) ([rwjblue](https://github.com/rwjblue))

## [v3.0.0-beta.1](https://github.com/emberjs/ember-qunit/tree/v3.0.0-beta.1) (2017-10-07)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v2.2.0...v3.0.0-beta.1)

**Closed issues:**

- How to configure QUnit? [\#281](https://github.com/emberjs/ember-qunit/issues/281)
- Visit\('foo'\), route goes to localhost:4200/foo in test [\#279](https://github.com/emberjs/ember-qunit/issues/279)

**Merged pull requests:**

- Make into an addon. [\#282](https://github.com/emberjs/ember-qunit/pull/282) ([rwjblue](https://github.com/rwjblue))

## [v2.2.0](https://github.com/emberjs/ember-qunit/tree/v2.2.0) (2017-07-21)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v2.1.4...v2.2.0)

**Closed issues:**

- Could not find module `ember-qunit`  [\#277](https://github.com/emberjs/ember-qunit/issues/277)
- Could not find module `ember-resolver` imported from `AppName/resolver` [\#276](https://github.com/emberjs/ember-qunit/issues/276)

**Merged pull requests:**

- Make throw/assertion stack traces useful [\#280](https://github.com/emberjs/ember-qunit/pull/280) ([stefanpenner](https://github.com/stefanpenner))
- FIX: A typo was preventing the globalize build from working [\#275](https://github.com/emberjs/ember-qunit/pull/275) ([eviltrout](https://github.com/eviltrout))

## [v2.1.4](https://github.com/emberjs/ember-qunit/tree/v2.1.4) (2017-06-07)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v2.1.3...v2.1.4)

**Closed issues:**

- Phantom 2.1 - Tests Fail on Object.assign, ember-resolver missing, and more - All Works in Chrome [\#273](https://github.com/emberjs/ember-qunit/issues/273)
- Question: Can I setup multiple resolvers in an acceptance test? [\#272](https://github.com/emberjs/ember-qunit/issues/272)
- Teardown with App.destroy [\#113](https://github.com/emberjs/ember-qunit/issues/113)

**Merged pull requests:**

- fix leak [\#274](https://github.com/emberjs/ember-qunit/pull/274) ([stefanpenner](https://github.com/stefanpenner))

## [v2.1.3](https://github.com/emberjs/ember-qunit/tree/v2.1.3) (2017-04-30)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v2.1.2...v2.1.3)

**Fixed bugs:**

- Tests failing in beforeEach\(\) due to module being undefined [\#268](https://github.com/emberjs/ember-qunit/issues/268)

**Closed issues:**

- a skip before test fails when this.subject\(\) is called in beforeEach [\#269](https://github.com/emberjs/ember-qunit/issues/269)
- Error: Could not find module `ember-qunit` [\#265](https://github.com/emberjs/ember-qunit/issues/265)

**Merged pull requests:**

- Convert "loader.js" from bower to npm dependency [\#270](https://github.com/emberjs/ember-qunit/pull/270) ([Turbo87](https://github.com/Turbo87))

## [v2.1.2](https://github.com/emberjs/ember-qunit/tree/v2.1.2) (2017-04-11)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v2.1.1...v2.1.2)

**Merged pull requests:**

- Fix modules with no callbacks [\#267](https://github.com/emberjs/ember-qunit/pull/267) ([trentmwillis](https://github.com/trentmwillis))

## [v2.1.1](https://github.com/emberjs/ember-qunit/tree/v2.1.1) (2017-04-11)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.4.24...v2.1.1)

**Fixed bugs:**

- `needs` not resolving after module change [\#262](https://github.com/emberjs/ember-qunit/issues/262)

**Closed issues:**

- 0.4.23 breaks tests in PhantomJS [\#264](https://github.com/emberjs/ember-qunit/issues/264)

**Merged pull requests:**

- Add RELEASE.md to document release process [\#266](https://github.com/emberjs/ember-qunit/pull/266) ([trentmwillis](https://github.com/trentmwillis))
- Handle async behaviour outside of tests [\#253](https://github.com/emberjs/ember-qunit/pull/253) ([mydea](https://github.com/mydea))

## [v0.4.24](https://github.com/emberjs/ember-qunit/tree/v0.4.24) (2017-04-10)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.4.23...v0.4.24)

**Merged pull requests:**

- Revert "Reset `module` variable after all tests in module are completed." [\#263](https://github.com/emberjs/ember-qunit/pull/263) ([trentmwillis](https://github.com/trentmwillis))
- Reset `module` variable after all tests in module are completed. [\#260](https://github.com/emberjs/ember-qunit/pull/260) ([rwjblue](https://github.com/rwjblue))

## [v0.4.23](https://github.com/emberjs/ember-qunit/tree/v0.4.23) (2017-04-06)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v2.1.0...v0.4.23)

**Merged pull requests:**

- Reset `module` variable after all tests in module are completed. [\#261](https://github.com/emberjs/ember-qunit/pull/261) ([rwjblue](https://github.com/rwjblue))

## [v2.1.0](https://github.com/emberjs/ember-qunit/tree/v2.1.0) (2017-03-25)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v2.0.0...v2.1.0)

**Merged pull requests:**

- Export todo [\#259](https://github.com/emberjs/ember-qunit/pull/259) ([drewchandler](https://github.com/drewchandler))
- Update package versions for build. [\#257](https://github.com/emberjs/ember-qunit/pull/257) ([rwjblue](https://github.com/rwjblue))
- Ensure all exports are globalized. [\#252](https://github.com/emberjs/ember-qunit/pull/252) ([rwjblue](https://github.com/rwjblue))

## [v2.0.0](https://github.com/emberjs/ember-qunit/tree/v2.0.0) (2017-03-23)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v2.0.0-beta.1...v2.0.0)

**Closed issues:**

- Test of the recompute function in an Ember helper always fails [\#254](https://github.com/emberjs/ember-qunit/issues/254)
- Add TypeScript typings for global helpers [\#251](https://github.com/emberjs/ember-qunit/issues/251)
- Unable to test `Ember.onError` after upgrading [\#250](https://github.com/emberjs/ember-qunit/issues/250)

## [v2.0.0-beta.1](https://github.com/emberjs/ember-qunit/tree/v2.0.0-beta.1) (2016-11-28)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v1.0.0...v2.0.0-beta.1)

**Merged pull requests:**

- Update "ember-test-helpers" to v0.6.0-beta.1 [\#249](https://github.com/emberjs/ember-qunit/pull/249) ([Turbo87](https://github.com/Turbo87))

## [v1.0.0](https://github.com/emberjs/ember-qunit/tree/v1.0.0) (2016-10-26)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v1.0.0-beta.1...v1.0.0)

**Closed issues:**

- Move repo to emberjs org. [\#242](https://github.com/emberjs/ember-qunit/issues/242)
- Polymorphic relationships via mixin break tests [\#240](https://github.com/emberjs/ember-qunit/issues/240)
- ember-test-helpers uses Ember.merge which is deprecated [\#221](https://github.com/emberjs/ember-qunit/issues/221)
- Problems with moduleForComponent and testing div ID [\#40](https://github.com/emberjs/ember-qunit/issues/40)

**Merged pull requests:**

- Make Qunit module available as 'ember-qunit' export [\#245](https://github.com/emberjs/ember-qunit/pull/245) ([zzarcon](https://github.com/zzarcon))
- Add 'phantomjs-prebuilt' to dev dependency in order to make test work locally [\#244](https://github.com/emberjs/ember-qunit/pull/244) ([zzarcon](https://github.com/zzarcon))
- Use emberjs org name instead of rwjblue [\#243](https://github.com/emberjs/ember-qunit/pull/243) ([zzarcon](https://github.com/zzarcon))
- Super minor readme typo [\#241](https://github.com/emberjs/ember-qunit/pull/241) ([derekdowling](https://github.com/derekdowling))

## [v1.0.0-beta.1](https://github.com/emberjs/ember-qunit/tree/v1.0.0-beta.1) (2016-08-17)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.4.22...v1.0.0-beta.1)

**Merged pull requests:**

- Upgrade QUnit to 2.0 [\#234](https://github.com/emberjs/ember-qunit/pull/234) ([trentmwillis](https://github.com/trentmwillis))

## [v0.4.22](https://github.com/emberjs/ember-qunit/tree/v0.4.22) (2016-08-17)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.4.21...v0.4.22)

**Merged pull requests:**

- Respect beforeEach and afterEach hooks returning promises [\#239](https://github.com/emberjs/ember-qunit/pull/239) ([trentmwillis](https://github.com/trentmwillis))
- Add CHANGELOG file [\#236](https://github.com/emberjs/ember-qunit/pull/236) ([Turbo87](https://github.com/Turbo87))

## [v0.4.21](https://github.com/emberjs/ember-qunit/tree/v0.4.21) (2016-08-16)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.4.20...v0.4.21)

**Closed issues:**

- moduleFor & friends: Support nested modules as provided by QUnit.module [\#232](https://github.com/emberjs/ember-qunit/issues/232)
- can't use Qunit's new before and after hooks [\#229](https://github.com/emberjs/ember-qunit/issues/229)
- reason without stack but with message will error [\#227](https://github.com/emberjs/ember-qunit/issues/227)
- Inconsistent Mixin testing behavior [\#226](https://github.com/emberjs/ember-qunit/issues/226)
- Singletons are not destroyed between integration tests [\#222](https://github.com/emberjs/ember-qunit/issues/222)
- Integration test method to "destroy" the component [\#217](https://github.com/emberjs/ember-qunit/issues/217)
- Triggering ember custom event such as paste in component integration test [\#214](https://github.com/emberjs/ember-qunit/issues/214)
- No moduleForHelper [\#76](https://github.com/emberjs/ember-qunit/issues/76)

**Merged pull requests:**

- Use QUnit's test context with ember-test-helpers. [\#238](https://github.com/emberjs/ember-qunit/pull/238) ([rwjblue](https://github.com/rwjblue))
- Upgrade package versions [\#235](https://github.com/emberjs/ember-qunit/pull/235) ([elwayman02](https://github.com/elwayman02))
- Add callback to README.md [\#230](https://github.com/emberjs/ember-qunit/pull/230) ([rfb](https://github.com/rfb))
- \[FIXES \#227\] [\#228](https://github.com/emberjs/ember-qunit/pull/228) ([stefanpenner](https://github.com/stefanpenner))
- Update README.md [\#225](https://github.com/emberjs/ember-qunit/pull/225) ([ocrampete16](https://github.com/ocrampete16))
- Update README.md [\#224](https://github.com/emberjs/ember-qunit/pull/224) ([jrowlingson](https://github.com/jrowlingson))
- install bower components the correct directory [\#223](https://github.com/emberjs/ember-qunit/pull/223) ([CodeOfficer](https://github.com/CodeOfficer))
- Export `skip` Qunit with wrapper. [\#219](https://github.com/emberjs/ember-qunit/pull/219) ([chriskrycho](https://github.com/chriskrycho))

## [v0.4.20](https://github.com/emberjs/ember-qunit/tree/v0.4.20) (2016-02-01)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.4.19...v0.4.20)

**Merged pull requests:**

- Run ember-test-helpers through Babel. [\#216](https://github.com/emberjs/ember-qunit/pull/216) ([rwjblue](https://github.com/rwjblue))

## [v0.4.19](https://github.com/emberjs/ember-qunit/tree/v0.4.19) (2016-01-31)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.4.18...v0.4.19)

## [v0.4.18](https://github.com/emberjs/ember-qunit/tree/v0.4.18) (2015-12-12)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.4.17...v0.4.18)

**Merged pull requests:**

- Consume ember-test-helpers from NPM. [\#213](https://github.com/emberjs/ember-qunit/pull/213) ([rwjblue](https://github.com/rwjblue))

## [v0.4.17](https://github.com/emberjs/ember-qunit/tree/v0.4.17) (2015-12-07)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.4.16...v0.4.17)

**Closed issues:**

- EmberQUnit\#test does not mirror QUnit\#test [\#210](https://github.com/emberjs/ember-qunit/issues/210)

**Merged pull requests:**

- Mirror QUnit test/only function signatures [\#211](https://github.com/emberjs/ember-qunit/pull/211) ([nickiaconis](https://github.com/nickiaconis))

## [v0.4.16](https://github.com/emberjs/ember-qunit/tree/v0.4.16) (2015-11-10)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.4.15...v0.4.16)

**Closed issues:**

- Where does the "ember.run" belong when integration testing? [\#203](https://github.com/emberjs/ember-qunit/issues/203)

**Merged pull requests:**

- Change test wrapper callback from `call` to `apply` [\#206](https://github.com/emberjs/ember-qunit/pull/206) ([elwayman02](https://github.com/elwayman02))
- \[RFC\] Adds a wrapped QUnit.only [\#205](https://github.com/emberjs/ember-qunit/pull/205) ([ebenoist](https://github.com/ebenoist))

## [v0.4.15](https://github.com/emberjs/ember-qunit/tree/v0.4.15) (2015-10-21)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.4.14...v0.4.15)

**Closed issues:**

- Service injection in integration tests does not work [\#200](https://github.com/emberjs/ember-qunit/issues/200)
- Regression in models with two words from 0.4.9 to 0.4.10 [\#199](https://github.com/emberjs/ember-qunit/issues/199)

## [v0.4.14](https://github.com/emberjs/ember-qunit/tree/v0.4.14) (2015-10-20)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.4.13...v0.4.14)

**Closed issues:**

- QUnit.module support? [\#196](https://github.com/emberjs/ember-qunit/issues/196)
- Tests broke between 0.4.11 and 0.4.12 [\#195](https://github.com/emberjs/ember-qunit/issues/195)

**Merged pull requests:**

- Fix README backticks for component hbs render statement [\#198](https://github.com/emberjs/ember-qunit/pull/198) ([kpfefferle](https://github.com/kpfefferle))
- Update year in readme [\#197](https://github.com/emberjs/ember-qunit/pull/197) ([Kuzirashi](https://github.com/Kuzirashi))

## [v0.4.13](https://github.com/emberjs/ember-qunit/tree/v0.4.13) (2015-10-02)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.4.12...v0.4.13)

## [v0.4.12](https://github.com/emberjs/ember-qunit/tree/v0.4.12) (2015-10-01)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.4.11...v0.4.12)

**Closed issues:**

- moduleForModel leaking state between tests [\#194](https://github.com/emberjs/ember-qunit/issues/194)

**Merged pull requests:**

- Remove redundant build step [\#191](https://github.com/emberjs/ember-qunit/pull/191) ([ef4](https://github.com/ef4))
- Better exception messages on phantomjs [\#190](https://github.com/emberjs/ember-qunit/pull/190) ([ef4](https://github.com/ef4))

## [v0.4.11](https://github.com/emberjs/ember-qunit/tree/v0.4.11) (2015-09-13)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.4.10...v0.4.11)

**Closed issues:**

- \[QUESTION\]: what version of this library should I be using with Ember 2.0.0+ [\#188](https://github.com/emberjs/ember-qunit/issues/188)
- Ember Qunit should warn when forcing an integration test into a unit test. [\#185](https://github.com/emberjs/ember-qunit/issues/185)
- Component unit test this.render\(\) call doesn't support passing in content [\#182](https://github.com/emberjs/ember-qunit/issues/182)
- Unit Tests throw error: "Uncaught Error: Assertion Failed: BUG: Render node exists without concomitant env" [\#178](https://github.com/emberjs/ember-qunit/issues/178)

**Merged pull requests:**

- update readme [\#189](https://github.com/emberjs/ember-qunit/pull/189) ([ronaldsuwandi](https://github.com/ronaldsuwandi))
- jQuery syntax [\#187](https://github.com/emberjs/ember-qunit/pull/187) ([aceofspades](https://github.com/aceofspades))

## [v0.4.10](https://github.com/emberjs/ember-qunit/tree/v0.4.10) (2015-08-20)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.4.9...v0.4.10)

**Closed issues:**

- Testing bound handlebars helpers [\#5](https://github.com/emberjs/ember-qunit/issues/5)

**Merged pull requests:**

- Update README.md [\#181](https://github.com/emberjs/ember-qunit/pull/181) ([MattNguyen](https://github.com/MattNguyen))

## [v0.4.9](https://github.com/emberjs/ember-qunit/tree/v0.4.9) (2015-07-30)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.4.8...v0.4.9)

## [v0.4.8](https://github.com/emberjs/ember-qunit/tree/v0.4.8) (2015-07-30)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.4.7...v0.4.8)

**Closed issues:**

- support for assert.notOk ? [\#180](https://github.com/emberjs/ember-qunit/issues/180)

**Merged pull requests:**

- Updated README.md with newer syntax [\#179](https://github.com/emberjs/ember-qunit/pull/179) ([thec0keman](https://github.com/thec0keman))

## [v0.4.7](https://github.com/emberjs/ember-qunit/tree/v0.4.7) (2015-07-28)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.4.6...v0.4.7)

**Closed issues:**

- Unit tests with components and new life-cycle hooks [\#174](https://github.com/emberjs/ember-qunit/issues/174)

## [v0.4.6](https://github.com/emberjs/ember-qunit/tree/v0.4.6) (2015-07-24)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.4.5...v0.4.6)

## [v0.4.5](https://github.com/emberjs/ember-qunit/tree/v0.4.5) (2015-07-23)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.4.4...v0.4.5)

## [v0.4.4](https://github.com/emberjs/ember-qunit/tree/v0.4.4) (2015-07-21)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.4.3...v0.4.4)

## [v0.4.3](https://github.com/emberjs/ember-qunit/tree/v0.4.3) (2015-07-21)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.4.2...v0.4.3)

## [v0.4.2](https://github.com/emberjs/ember-qunit/tree/v0.4.2) (2015-07-20)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.4.1...v0.4.2)

**Closed issues:**

- Compatibility with 1.13+  [\#177](https://github.com/emberjs/ember-qunit/issues/177)
- Cannot send actions to Routes [\#172](https://github.com/emberjs/ember-qunit/issues/172)

## [v0.4.1](https://github.com/emberjs/ember-qunit/tree/v0.4.1) (2015-07-06)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.4.0...v0.4.1)

**Closed issues:**

- version not found: ember-cli-qunit@0.4.0 [\#176](https://github.com/emberjs/ember-qunit/issues/176)

**Merged pull requests:**

- Fix brocfile include expressions to use literal dots [\#171](https://github.com/emberjs/ember-qunit/pull/171) ([j-](https://github.com/j-))

## [v0.4.0](https://github.com/emberjs/ember-qunit/tree/v0.4.0) (2015-05-18)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.3.4...v0.4.0)

**Merged pull requests:**

- Update ember-test-helpers to 0.5.0. [\#170](https://github.com/emberjs/ember-qunit/pull/170) ([rwjblue](https://github.com/rwjblue))

## [v0.3.4](https://github.com/emberjs/ember-qunit/tree/v0.3.4) (2015-05-18)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.3.3...v0.3.4)

**Closed issues:**

- can't test custom factories [\#169](https://github.com/emberjs/ember-qunit/issues/169)

## [v0.3.3](https://github.com/emberjs/ember-qunit/tree/v0.3.3) (2015-05-15)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.3.2...v0.3.3)

**Closed issues:**

- calling resetViews causes Ember integration tests to fail [\#86](https://github.com/emberjs/ember-qunit/issues/86)

**Merged pull requests:**

- Remove dubious `resetViews` function [\#167](https://github.com/emberjs/ember-qunit/pull/167) ([ef4](https://github.com/ef4))

## [v0.3.2](https://github.com/emberjs/ember-qunit/tree/v0.3.2) (2015-05-06)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.3.1...v0.3.2)

**Closed issues:**

- Fails to pluralize `factory` in unit test [\#162](https://github.com/emberjs/ember-qunit/issues/162)

**Merged pull requests:**

- Add main entry to bower.json [\#161](https://github.com/emberjs/ember-qunit/pull/161) ([ryanmurakami](https://github.com/ryanmurakami))

## [v0.3.1](https://github.com/emberjs/ember-qunit/tree/v0.3.1) (2015-04-05)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.3.0...v0.3.1)

**Closed issues:**

- Called stop\(\) outside of a test context [\#155](https://github.com/emberjs/ember-qunit/issues/155)
- subject helper in moduleForModel reuses container for all tests [\#81](https://github.com/emberjs/ember-qunit/issues/81)

**Merged pull requests:**

- Send full stack trace information on promise rejection [\#116](https://github.com/emberjs/ember-qunit/pull/116) ([yayalice](https://github.com/yayalice))

## [v0.3.0](https://github.com/emberjs/ember-qunit/tree/v0.3.0) (2015-03-24)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.2.12...v0.3.0)

**Closed issues:**

- TypeError: Cannot read property 'apply' of undefined, using apply in tests? [\#149](https://github.com/emberjs/ember-qunit/issues/149)

**Merged pull requests:**

- Update ember-test-helpers to 0.4.1. [\#159](https://github.com/emberjs/ember-qunit/pull/159) ([rwjblue](https://github.com/rwjblue))

## [v0.2.12](https://github.com/emberjs/ember-qunit/tree/v0.2.12) (2015-03-22)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.2.11...v0.2.12)

**Closed issues:**

- assert passed into beforeEach is not refreshed [\#157](https://github.com/emberjs/ember-qunit/issues/157)
- beforeEach in moduleForComponent does not pass in assert [\#156](https://github.com/emberjs/ember-qunit/issues/156)
- this.subject calls not generating new instances [\#154](https://github.com/emberjs/ember-qunit/issues/154)

**Merged pull requests:**

- Ensure that `assert` argument in beforeEach is not shared. [\#158](https://github.com/emberjs/ember-qunit/pull/158) ([rwjblue](https://github.com/rwjblue))

## [v0.2.11](https://github.com/emberjs/ember-qunit/tree/v0.2.11) (2015-03-12)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.2.10...v0.2.11)

**Closed issues:**

- `assert` argument to `beforeEach` and `afterEach` [\#151](https://github.com/emberjs/ember-qunit/issues/151)
- moduleForComponent tests and loading app/initializers [\#150](https://github.com/emberjs/ember-qunit/issues/150)
- Async method selector resolves immediately [\#148](https://github.com/emberjs/ember-qunit/issues/148)
- importing { module, test } from ember-qunit hides tests  [\#147](https://github.com/emberjs/ember-qunit/issues/147)
- import QUnit from "???"; [\#146](https://github.com/emberjs/ember-qunit/issues/146)
- Thanks! [\#145](https://github.com/emberjs/ember-qunit/issues/145)
- doesn't work with new container registry stuff [\#118](https://github.com/emberjs/ember-qunit/issues/118)
- moduleFor\* integration: true [\#108](https://github.com/emberjs/ember-qunit/issues/108)
- Tricky to use moduleForComponent for components with sub-components [\#74](https://github.com/emberjs/ember-qunit/issues/74)

**Merged pull requests:**

- Update ember-test-helpers to 0.3.6. [\#153](https://github.com/emberjs/ember-qunit/pull/153) ([rwjblue](https://github.com/rwjblue))
- Ensure that `beforeEach` / `afterEach` get `assert` argument. [\#152](https://github.com/emberjs/ember-qunit/pull/152) ([rwjblue](https://github.com/rwjblue))

## [v0.2.10](https://github.com/emberjs/ember-qunit/tree/v0.2.10) (2015-02-22)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.2.9...v0.2.10)

**Closed issues:**

- Add skip as a qunit helper that gets exported? [\#144](https://github.com/emberjs/ember-qunit/issues/144)

## [v0.2.9](https://github.com/emberjs/ember-qunit/tree/v0.2.9) (2015-02-19)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.2.8...v0.2.9)

**Closed issues:**

- 'assert' is undefined [\#142](https://github.com/emberjs/ember-qunit/issues/142)
- Exporting `QUnit.push` [\#140](https://github.com/emberjs/ember-qunit/issues/140)
- moduleForComponent fails "Unable to find partial with name" [\#110](https://github.com/emberjs/ember-qunit/issues/110)

**Merged pull requests:**

- Add skip to shim. [\#141](https://github.com/emberjs/ember-qunit/pull/141) ([abuiles](https://github.com/abuiles))
- Update examples for QUnit 2.x [\#138](https://github.com/emberjs/ember-qunit/pull/138) ([jbrown](https://github.com/jbrown))

## [v0.2.8](https://github.com/emberjs/ember-qunit/tree/v0.2.8) (2015-02-10)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.2.7...v0.2.8)

## [v0.2.7](https://github.com/emberjs/ember-qunit/tree/v0.2.7) (2015-02-10)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.2.6...v0.2.7)

**Closed issues:**

- Still expects handlebars to be in bower\_components [\#133](https://github.com/emberjs/ember-qunit/issues/133)
- Error: Path or pattern "bower\_components/ember-qunit/named-amd/main.js" did not match any files [\#131](https://github.com/emberjs/ember-qunit/issues/131)
- Could not find module ember when using the global version \(newest from build\) [\#130](https://github.com/emberjs/ember-qunit/issues/130)

**Merged pull requests:**

- Ensure that "ember" module shim is available for globals build. [\#137](https://github.com/emberjs/ember-qunit/pull/137) ([rwjblue](https://github.com/rwjblue))

## [v0.2.6](https://github.com/emberjs/ember-qunit/tree/v0.2.6) (2015-02-10)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.2.5...v0.2.6)

**Closed issues:**

- Direct child doesn't work in selector [\#135](https://github.com/emberjs/ember-qunit/issues/135)

**Merged pull requests:**

- Add default export for qunit module as QUnit. [\#136](https://github.com/emberjs/ember-qunit/pull/136) ([rwjblue](https://github.com/rwjblue))
- Upgrade ember to 1.10.0 and remove handlebars. [\#134](https://github.com/emberjs/ember-qunit/pull/134) ([dgeb](https://github.com/dgeb))

## [v0.2.5](https://github.com/emberjs/ember-qunit/tree/v0.2.5) (2015-02-07)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.2.4...v0.2.5)

**Closed issues:**

- Emq not available - no globalize [\#129](https://github.com/emberjs/ember-qunit/issues/129)

**Merged pull requests:**

- Add qunit ES6 shim. [\#132](https://github.com/emberjs/ember-qunit/pull/132) ([rwjblue](https://github.com/rwjblue))

## [v0.2.4](https://github.com/emberjs/ember-qunit/tree/v0.2.4) (2015-02-03)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.2.3...v0.2.4)

**Merged pull requests:**

- Fix argument shifting with `beforeEach` / `afterEach`. [\#128](https://github.com/emberjs/ember-qunit/pull/128) ([rwjblue](https://github.com/rwjblue))

## [v0.2.3](https://github.com/emberjs/ember-qunit/tree/v0.2.3) (2015-02-03)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.2.2...v0.2.3)

**Merged pull requests:**

- Use git-repo-version instead of git-repo-info directly. [\#127](https://github.com/emberjs/ember-qunit/pull/127) ([rwjblue](https://github.com/rwjblue))
- Pass test callback argument through from QUnit. [\#126](https://github.com/emberjs/ember-qunit/pull/126) ([rwjblue](https://github.com/rwjblue))

## [v0.2.2](https://github.com/emberjs/ember-qunit/tree/v0.2.2) (2015-02-03)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.2.1...v0.2.2)

**Merged pull requests:**

- Allow usage of beforeEach and afterEach. [\#125](https://github.com/emberjs/ember-qunit/pull/125) ([rwjblue](https://github.com/rwjblue))

## [v0.2.1](https://github.com/emberjs/ember-qunit/tree/v0.2.1) (2015-02-02)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.2.0...v0.2.1)

**Closed issues:**

- container used in unit tests doesn't normalize model names [\#119](https://github.com/emberjs/ember-qunit/issues/119)

**Merged pull requests:**

- Ensure build output is ES3 safe. [\#124](https://github.com/emberjs/ember-qunit/pull/124) ([rwjblue](https://github.com/rwjblue))

## [v0.2.0](https://github.com/emberjs/ember-qunit/tree/v0.2.0) (2015-01-31)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/latest...v0.2.0)

## [latest](https://github.com/emberjs/ember-qunit/tree/latest) (2015-01-31)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.1.8...latest)

**Closed issues:**

- Testing services in Ember-CLI conserves state between tests. [\#115](https://github.com/emberjs/ember-qunit/issues/115)
- why kill `dist/`? [\#101](https://github.com/emberjs/ember-qunit/issues/101)
- Wrong context in asyncTest \(using callbacks given to moduleFor instead of extended callbacks\) [\#98](https://github.com/emberjs/ember-qunit/issues/98)
- Qunit not finishing on Mac OS X [\#97](https://github.com/emberjs/ember-qunit/issues/97)
- Cannot send action to route in unit test. [\#96](https://github.com/emberjs/ember-qunit/issues/96)
- Unit testing model circular relationship requires `startApp\(\)` [\#91](https://github.com/emberjs/ember-qunit/issues/91)
- Integration Test Helpers are undefined in Component Test [\#88](https://github.com/emberjs/ember-qunit/issues/88)
- IsolatedContainer doesn't normalize type names [\#84](https://github.com/emberjs/ember-qunit/issues/84)
- Should have a mechanism for inserting components sans `this.$\(\)` [\#82](https://github.com/emberjs/ember-qunit/issues/82)
- Assertion alternately thrown when testing ED Model relationships [\#80](https://github.com/emberjs/ember-qunit/issues/80)
- Uncaught SyntaxError: Unexpected reserved word [\#78](https://github.com/emberjs/ember-qunit/issues/78)
- QUnit start and stop not happening for promises within controller actions. [\#77](https://github.com/emberjs/ember-qunit/issues/77)
- Testing components with {{each}} helper in layout fails [\#73](https://github.com/emberjs/ember-qunit/issues/73)
- Get access to ember store from moduleFor\("controller:activity"\) [\#70](https://github.com/emberjs/ember-qunit/issues/70)
- `moduleForComponent` does not properly destroy the views it created [\#64](https://github.com/emberjs/ember-qunit/issues/64)
- Testing Strangeness using Ember Qunit and Test Helpers [\#63](https://github.com/emberjs/ember-qunit/issues/63)
- moduleForModel transforms [\#61](https://github.com/emberjs/ember-qunit/issues/61)
- Bower dependency to qunit? [\#60](https://github.com/emberjs/ember-qunit/issues/60)
- Result of `this.$\(...\)` is cached after first call [\#55](https://github.com/emberjs/ember-qunit/issues/55)
- testing components that use other components [\#53](https://github.com/emberjs/ember-qunit/issues/53)
- moduleForComponent and moduleForModel could also accept a delegate function [\#51](https://github.com/emberjs/ember-qunit/issues/51)
- andThen does not execute after click\(\) [\#49](https://github.com/emberjs/ember-qunit/issues/49)
- Tests fail with `MODEL\_FACTORY\_INJECTIONS = true` [\#48](https://github.com/emberjs/ember-qunit/issues/48)
- Contributing steps do not work [\#47](https://github.com/emberjs/ember-qunit/issues/47)
- moduleFor could accept `callback` as second argument [\#45](https://github.com/emberjs/ember-qunit/issues/45)
- dist/named-amd does not work [\#42](https://github.com/emberjs/ember-qunit/issues/42)
- setting  Ember.testing to true [\#38](https://github.com/emberjs/ember-qunit/issues/38)
- separate the ember stuff from the qunit stuff [\#22](https://github.com/emberjs/ember-qunit/issues/22)
- moduleForMixin? [\#15](https://github.com/emberjs/ember-qunit/issues/15)

**Merged pull requests:**

- Add ember-cli for ease of use. [\#122](https://github.com/emberjs/ember-qunit/pull/122) ([rwjblue](https://github.com/rwjblue))
- Bumping ember-test-helpers and upgraded module transpiler [\#120](https://github.com/emberjs/ember-qunit/pull/120) ([chadhietala](https://github.com/chadhietala))
- upgrade ember-test-helpers to 0.0.7 [\#111](https://github.com/emberjs/ember-qunit/pull/111) ([jonbretman](https://github.com/jonbretman))
- Setup build publishing. [\#106](https://github.com/emberjs/ember-qunit/pull/106) ([rwjblue](https://github.com/rwjblue))
- Move to broccoli-funnel. [\#105](https://github.com/emberjs/ember-qunit/pull/105) ([rwjblue](https://github.com/rwjblue))
- Generate `bower.json` in build. [\#104](https://github.com/emberjs/ember-qunit/pull/104) ([rwjblue](https://github.com/rwjblue))
- Add globals build and bower build script [\#103](https://github.com/emberjs/ember-qunit/pull/103) ([dgeb](https://github.com/dgeb))
- Build process updates. [\#102](https://github.com/emberjs/ember-qunit/pull/102) ([rwjblue](https://github.com/rwjblue))
- Add a few more npm scripts. [\#100](https://github.com/emberjs/ember-qunit/pull/100) ([rwjblue](https://github.com/rwjblue))
- Refactor to use the extracted lib ember-test-helpers [\#99](https://github.com/emberjs/ember-qunit/pull/99) ([dgeb](https://github.com/dgeb))
- Root element auto-add ordering [\#93](https://github.com/emberjs/ember-qunit/pull/93) ([slindberg](https://github.com/slindberg))
- Update ember-data to beta.10 [\#90](https://github.com/emberjs/ember-qunit/pull/90) ([saygun](https://github.com/saygun))
- `isolated-container` should  call `resolver.normalize\(fullName\)` when resolving needs values. [\#89](https://github.com/emberjs/ember-qunit/pull/89) ([workmanw](https://github.com/workmanw))
- \[BUGFIX\] Destroy components on teardown. [\#85](https://github.com/emberjs/ember-qunit/pull/85) ([gordonkristan](https://github.com/gordonkristan))
- Update README with simple usage and updated travis repository [\#79](https://github.com/emberjs/ember-qunit/pull/79) ([Frozenfire92](https://github.com/Frozenfire92))
- Testing nested components with templates. [\#72](https://github.com/emberjs/ember-qunit/pull/72) ([tsched](https://github.com/tsched))
- fix npm install errors for karma-qunit and qunit [\#67](https://github.com/emberjs/ember-qunit/pull/67) ([fivetanley](https://github.com/fivetanley))
- Update readme with info on building dist/ [\#66](https://github.com/emberjs/ember-qunit/pull/66) ([bantic](https://github.com/bantic))
- Do not require Ember Data. [\#62](https://github.com/emberjs/ember-qunit/pull/62) ([rwjblue](https://github.com/rwjblue))
- Fix error in code example [\#57](https://github.com/emberjs/ember-qunit/pull/57) ([balinterdi](https://github.com/balinterdi))
- Fixed `this.$\(selector\)` returning cached result [\#56](https://github.com/emberjs/ember-qunit/pull/56) ([chancancode](https://github.com/chancancode))
- Pass the selector to this.$\(...\) helper in component tests [\#54](https://github.com/emberjs/ember-qunit/pull/54) ([chancancode](https://github.com/chancancode))
- Updating readme with information about async tests [\#50](https://github.com/emberjs/ember-qunit/pull/50) ([Emerson](https://github.com/Emerson))

## [v0.1.8](https://github.com/emberjs/ember-qunit/tree/v0.1.8) (2014-04-24)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.1.7...v0.1.8)

**Closed issues:**

- Unit testing models with associations/relationships fail [\#39](https://github.com/emberjs/ember-qunit/issues/39)
- loading with require.js [\#35](https://github.com/emberjs/ember-qunit/issues/35)

**Merged pull requests:**

- to run broccoli serve you need broccoli-cli [\#41](https://github.com/emberjs/ember-qunit/pull/41) ([zigomir](https://github.com/zigomir))
- Add adapter to module for model [\#34](https://github.com/emberjs/ember-qunit/pull/34) ([mixonic](https://github.com/mixonic))

## [v0.1.7](https://github.com/emberjs/ember-qunit/tree/v0.1.7) (2014-04-04)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.1.6...v0.1.7)

**Closed issues:**

- How to tell QUnit to execute tests wrapped in AMD definition ? [\#31](https://github.com/emberjs/ember-qunit/issues/31)
- What's the bare minimum required to test a ember.object in isolation? [\#30](https://github.com/emberjs/ember-qunit/issues/30)
- Calling save on models [\#28](https://github.com/emberjs/ember-qunit/issues/28)

**Merged pull requests:**

- assume qunit is a global on page [\#32](https://github.com/emberjs/ember-qunit/pull/32) ([knomedia](https://github.com/knomedia))
- \[dist\] newest build [\#27](https://github.com/emberjs/ember-qunit/pull/27) ([danjamin](https://github.com/danjamin))
- moves the setup into \_callbacks.setup [\#26](https://github.com/emberjs/ember-qunit/pull/26) ([fsmanuel](https://github.com/fsmanuel))
- Remove unnecessary \#ember-testing append in moduleFor. [\#19](https://github.com/emberjs/ember-qunit/pull/19) ([omghax](https://github.com/omghax))

## [v0.1.6](https://github.com/emberjs/ember-qunit/tree/v0.1.6) (2014-03-27)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.1.5...v0.1.6)

**Closed issues:**

- README? [\#13](https://github.com/emberjs/ember-qunit/issues/13)

**Merged pull requests:**

- Remove explicit paths to node\_modules/.bin. [\#18](https://github.com/emberjs/ember-qunit/pull/18) ([eventualbuddha](https://github.com/eventualbuddha))
- fixed global resolver setup instructions [\#17](https://github.com/emberjs/ember-qunit/pull/17) ([cavneb](https://github.com/cavneb))
- moduleFor controller with needs fails on second call with undefined [\#16](https://github.com/emberjs/ember-qunit/pull/16) ([fsmanuel](https://github.com/fsmanuel))

## [v0.1.5](https://github.com/emberjs/ember-qunit/tree/v0.1.5) (2014-03-12)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.1.4...v0.1.5)

## [v0.1.4](https://github.com/emberjs/ember-qunit/tree/v0.1.4) (2014-03-12)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.1.3...v0.1.4)

**Merged pull requests:**

- Added moduleForModel helper with test [\#9](https://github.com/emberjs/ember-qunit/pull/9) ([cavneb](https://github.com/cavneb))
- Add  import for moduleFor. [\#8](https://github.com/emberjs/ember-qunit/pull/8) ([abuiles](https://github.com/abuiles))

## [v0.1.3](https://github.com/emberjs/ember-qunit/tree/v0.1.3) (2014-03-04)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.1.2...v0.1.3)

## [v0.1.2](https://github.com/emberjs/ember-qunit/tree/v0.1.2) (2014-03-04)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.1.1...v0.1.2)

## [v0.1.1](https://github.com/emberjs/ember-qunit/tree/v0.1.1) (2014-03-03)
[Full Changelog](https://github.com/emberjs/ember-qunit/compare/v0.1.0...v0.1.1)

**Closed issues:**

- Needs a README [\#4](https://github.com/emberjs/ember-qunit/issues/4)

**Merged pull requests:**

- add event dispatcher [\#7](https://github.com/emberjs/ember-qunit/pull/7) ([ryanflorence](https://github.com/ryanflorence))

## [v0.1.0](https://github.com/emberjs/ember-qunit/tree/v0.1.0) (2014-02-27)

