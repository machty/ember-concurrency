## v1.6.1 (2019-08-30)

#### :bug: Bug Fix
* [#677](https://github.com/emberjs/ember-test-helpers/pull/677) Fix legacy rendering tests (e.g. `moduleForComponent`) when used with Ember 3.13+ ([@buschtoens](https://github.com/buschtoens))

#### Committers: 2
- Jan Buschtöns ([@buschtoens](https://github.com/buschtoens))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v1.6.0 (2019-06-17)

#### :memo: Documentation
* [#663](https://github.com/emberjs/ember-test-helpers/pull/663) Update documentation for `triggerEvent` ([@qpowell](https://github.com/qpowell))
* [#598](https://github.com/emberjs/ember-test-helpers/pull/598) Fix file upload example in `triggerEvent` documentation. ([@jherdman](https://github.com/jherdman))

#### :house: Internal
* [#652](https://github.com/emberjs/ember-test-helpers/pull/652) chore(test): Fixes CI when testing floating dependencies ([@scalvert](https://github.com/scalvert))

#### Committers: 4
- James Herdman ([@jherdman](https://github.com/jherdman))
- Quinten Powell ([@qpowell](https://github.com/qpowell))
- Steve Calvert ([@scalvert](https://github.com/scalvert))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v1.6.0-beta.2 (2019-05-14)

#### :house: Internal
* [#649](https://github.com/emberjs/ember-test-helpers/pull/649) chore(deps): Upgrades ember-test-waiters to latest version (0.9.1) ([@scalvert](https://github.com/scalvert))
* [#636](https://github.com/emberjs/ember-test-helpers/pull/636) refactor(DebugInfo): Changes DebugInfo constructor signature to POJO ([@scalvert](https://github.com/scalvert))

#### Committers: 1
- Steve Calvert ([@scalvert](https://github.com/scalvert))

## v1.6.0-beta.1 (2019-05-02)

#### :rocket: Enhancement
* [#632](https://github.com/emberjs/ember-test-helpers/pull/632) Add `ember-test-waiters` and integrate into settledness checks ([@scalvert](https://github.com/scalvert))
* [#608](https://github.com/emberjs/ember-test-helpers/pull/608) Adding custom test debug info API ([@scalvert](https://github.com/scalvert))
* [#594](https://github.com/emberjs/ember-test-helpers/pull/594) Update API docs to simplify table of contents ([@ygongdev](https://github.com/ygongdev))

#### :bug: Bug Fix
* [#580](https://github.com/emberjs/ember-test-helpers/pull/580) Remove invalid reexports ([@villander](https://github.com/villander))

#### :memo: Documentation
* [#594](https://github.com/emberjs/ember-test-helpers/pull/594) Update API docs to simplify table of contents ([@ygongdev](https://github.com/ygongdev))

#### Committers: 3
- Michael Villander ([@villander](https://github.com/villander))
- Steve Calvert ([@scalvert](https://github.com/scalvert))
- Yicheng (Jerry) Gong ([@ygongdev](https://github.com/ygongdev))

## v1.5.0 (2019-02-22)

#### :rocket: Enhancement
* [#575](https://github.com/emberjs/ember-test-helpers/pull/575) Exporting getDebugInfo as public ([@scalvert](https://github.com/scalvert))

#### Committers: 1
- Steve Calvert ([@scalvert](https://github.com/scalvert))

## v1.4.0 (2019-02-19)

#### :rocket: Enhancement
* [#554](https://github.com/emberjs/ember-test-helpers/pull/554) Moving test isolation validation primatives into @ember/test-helpers ([@scalvert](https://github.com/scalvert))

#### :memo: Documentation
* [#553](https://github.com/emberjs/ember-test-helpers/pull/553) Test and document specifying options to click ([@efx](https://github.com/efx))

#### :house: Internal
* [#566](https://github.com/emberjs/ember-test-helpers/pull/566) Refresh `yarn.lock`. ([@rwjblue](https://github.com/rwjblue))

#### Committers: 3
- Eli Flanagan ([@efx](https://github.com/efx))
- Robert Jackson ([@rwjblue](https://github.com/rwjblue))
- Steve Calvert ([@scalvert](https://github.com/scalvert))

## v1.3.2 (2019-02-01)

#### :bug: Bug Fix
* [#548](https://github.com/emberjs/ember-test-helpers/pull/548) Refactors setupOnerror to be a pure setup/teardown approach ([@scalvert](https://github.com/scalvert))

#### Committers: 1
- Steve Calvert ([@scalvert](https://github.com/scalvert))


## v1.3.1 (2019-01-28)

#### :bug: Bug Fix
* [#546](https://github.com/emberjs/ember-test-helpers/pull/546) Avoid importing jQuery, depend on self.jQuery instead. ([@rwjblue](https://github.com/rwjblue))

#### Committers: 1
- Robert Jackson ([@rwjblue](https://github.com/rwjblue))

## v1.3.0 (2019-01-27)

#### :rocket: Enhancement
* [#543](https://github.com/emberjs/ember-test-helpers/pull/543) Add deprecation for this.$ in rendering tests ([@simonihmig](https://github.com/simonihmig))

#### Committers: 1
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))


## v1.2.1 (2019-01-26)

#### :bug: Bug Fix
* [#482](https://github.com/emberjs/ember-test-helpers/pull/482) Wait for pending route transitions as part of settledness check ([@AlexTraher](https://github.com/AlexTraher)) ([@dexturr](https://github.com/dexturr)) ([@rwjblue](https://github.com/rwjblue))

#### Committers: 3
- Alex ([@AlexTraher](https://github.com/AlexTraher))
- Dexter Edwards ([@dexturr](https://github.com/dexturr))
- Robert Jackson ([@rwjblue](https://github.com/rwjblue))


## v1.2.0 (2019-01-26)

#### :rocket: Enhancement
* [#540](https://github.com/emberjs/ember-test-helpers/pull/540) Adds `setupOnerror` utility to allow patching `Ember.onerror` in individual tests ([@scalvert](https://github.com/scalvert))
* [#505](https://github.com/emberjs/ember-test-helpers/pull/505) Update dependency on ember-cli-htmlbars-inline-precompile to ^2.1.0. ([@rwjblue](https://github.com/rwjblue))

#### :bug: Bug Fix
* [#541](https://github.com/emberjs/ember-test-helpers/pull/541) Fix issues around `Ember.$` deprecation. ([@rwjblue](https://github.com/rwjblue))
* [#465](https://github.com/emberjs/ember-test-helpers/pull/465) Ensure `typeIn` has correct key option ([@mydea](https://github.com/mydea))

#### :memo: Documentation
* [#529](https://github.com/emberjs/ember-test-helpers/pull/529) Fix docs for return type of findAll ([@yandavid](https://github.com/yandavid))

#### Committers: 4
- David Yan ([@yandavid](https://github.com/yandavid))
- Francesco Novy ([@mydea](https://github.com/mydea))
- Robert Jackson ([@rwjblue](https://github.com/rwjblue))
- Steve Calvert ([@scalvert](https://github.com/scalvert))


## v1.1.0 (2018-12-10)

#### :rocket: Enhancement
* [#498](https://github.com/emberjs/ember-test-helpers/pull/498) Add ability to opt-out of automatic settledness waiting in teardown. ([@rwjblue](https://github.com/rwjblue))

#### :bug: Bug Fix
* [#497](https://github.com/emberjs/ember-test-helpers/pull/497) Only customize RSVP's async for Ember older than 1.7. ([@rwjblue](https://github.com/rwjblue))
* [#481](https://github.com/emberjs/ember-test-helpers/pull/481) Allow ember-cli-htmlbars-inline-precompile 2.x and 1.x ([@mydea](https://github.com/mydea))

#### :house: Internal
* [#491](https://github.com/emberjs/ember-test-helpers/pull/491) TravisCI: Remove deprecated `sudo: false` option ([@Turbo87](https://github.com/Turbo87))
* [#480](https://github.com/emberjs/ember-test-helpers/pull/480) Extract Prettier configuration to .prettierrc.js file. ([@rwjblue](https://github.com/rwjblue))
* [#463](https://github.com/emberjs/ember-test-helpers/pull/463) Improve type declarations ([@Turbo87](https://github.com/Turbo87))

#### Committers: 4
- Francesco Novy ([@mydea](https://github.com/mydea))
- Peter Wagenet ([@wagenet](https://github.com/wagenet))
- Robert Jackson ([@rwjblue](https://github.com/rwjblue))
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))

## v1.0.1 (2018-11-07)

#### :bug: Bug Fix
* [#458](https://github.com/emberjs/ember-test-helpers/pull/458) Ensure the world is settled after `await settled()` ([@wagenet](https://github.com/wagenet))

#### :house: Internal
* [#466](https://github.com/emberjs/ember-test-helpers/pull/466) Fix precompile errors and prevent regressions. ([@rwjblue](https://github.com/rwjblue))
* [#452](https://github.com/emberjs/ember-test-helpers/pull/452) Import type definitions from `@types/ember__test-helpers` ([@Turbo87](https://github.com/Turbo87))
* [#450](https://github.com/emberjs/ember-test-helpers/pull/450) Convert to TypeScript ([@Turbo87](https://github.com/Turbo87))
* [#464](https://github.com/emberjs/ember-test-helpers/pull/464) Add *.ts to `.npmignore`. ([@rwjblue](https://github.com/rwjblue))
* [#462](https://github.com/emberjs/ember-test-helpers/pull/462) Improve ESLint usage ([@Turbo87](https://github.com/Turbo87))
* [#456](https://github.com/emberjs/ember-test-helpers/pull/456)  tests: Adjust import paths to use `@ember/test-helpers`  ([@Turbo87](https://github.com/Turbo87))
* [#449](https://github.com/emberjs/ember-test-helpers/pull/449) CI: Only run for `master`, PRs and version tags and branches ([@Turbo87](https://github.com/Turbo87))
* [#448](https://github.com/emberjs/ember-test-helpers/pull/448) CI: Use `name` property instead of `NAME` env var workaround ([@Turbo87](https://github.com/Turbo87))

#### Committers: 3
- Peter Wagenet ([@wagenet](https://github.com/wagenet))
- Robert Jackson ([@rwjblue](https://github.com/rwjblue))
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))

## v1.0.0 (2018-10-29)

#### :boom: Breaking Change
* [#427](https://github.com/emberjs/ember-test-helpers/pull/427) Drop support for Node.js 4 and below ([@Turbo87](https://github.com/Turbo87))
* [#425](https://github.com/emberjs/ember-test-helpers/pull/425) Drop support for ember-cli 2.12 and below ([@dependabot](https://github.com/dependabot))

#### :rocket: Enhancement
* [#370](https://github.com/emberjs/ember-test-helpers/pull/370) Allow internal `nextTick` utility to use microtasks when possible. ([@rwjblue](https://github.com/rwjblue))
* [#428](https://github.com/emberjs/ember-test-helpers/pull/428) Standardize params for calling triggerEvent on file input ([@mattdonnelly](https://github.com/mattdonnelly))

#### :bug: Bug Fix
* [#429](https://github.com/emberjs/ember-test-helpers/pull/429) Ensure view is set by default on generated mouse events ([@mydea](https://github.com/mydea))

#### Committers: 4
- Francesco Novy ([@mydea](https://github.com/mydea))
- Matt Donnelly ([@mattdonnelly](https://github.com/mattdonnelly))
- Robert Jackson ([@rwjblue](https://github.com/rwjblue))
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))

## v0.7.27 (2018-10-16)

#### :bug: Bug Fix
* [#429](https://github.com/emberjs/ember-test-helpers/pull/429) Ensure view is set by default on generated mouse events. ([@mydea](https://github.com/mydea))

#### Committers: 1
- Francesco Novy ([mydea](https://github.com/mydea))

## v0.7.26 (2018-10-02)

#### :rocket: Enhancement
* [#410](https://github.com/emberjs/ember-test-helpers/pull/410) Use `assign` instead of deprecated `merge`. ([@wagenet](https://github.com/wagenet))
* [#397](https://github.com/emberjs/ember-test-helpers/pull/397) Add `typeIn` helper to trigger `keyup`, `keypress` and `keyup` events when filling inputs. ([@mfeckie](https://github.com/mfeckie))
* [#398](https://github.com/emberjs/ember-test-helpers/pull/398) Add options to `click`, `doubleClick`, and `tap`. ([@BryanCrotaz](https://github.com/BryanCrotaz))
* [#387](https://github.com/emberjs/ember-test-helpers/pull/387) Update `buildMouseEvent` to use `MouseEvent` constructor if it is present. ([@ggayowsky](https://github.com/ggayowsky))
* [#391](https://github.com/emberjs/ember-test-helpers/pull/391) Add numbers to `keyFromKeyCode`. ([@localpcguy](https://github.com/localpcguy))
* [#392](https://github.com/emberjs/ember-test-helpers/pull/392) Include selector in `waitFor()`'s default timeout message. ([@gabrielgrant](https://github.com/gabrielgrant))
* [#382](https://github.com/emberjs/ember-test-helpers/pull/382) Add `doubleClick` helper. ([@mmun](https://github.com/mmun))

#### :bug: Bug Fix
* [#413](https://github.com/emberjs/ember-test-helpers/pull/413) Clear requests array when tearing down. ([@hjdivad](https://github.com/hjdivad))
* [#404](https://github.com/emberjs/ember-test-helpers/pull/404) Fix `getRootElement` failing when `Application.rootElement` is an element. ([@apellerano-pw](https://github.com/apellerano-pw))

#### :memo: Documentation
* [#408](https://github.com/emberjs/ember-test-helpers/pull/408) Update `setupApplicationContext` documentation. ([@vitch](https://github.com/vitch))
* [#340](https://github.com/emberjs/ember-test-helpers/pull/340) Add some specific documentation for uploading files. ([@jrjohnson](https://github.com/jrjohnson))
* [#396](https://github.com/emberjs/ember-test-helpers/pull/396) docs(api): try fixing `getSettledState` list. ([@knownasilya](https://github.com/knownasilya))
* [#199](https://github.com/emberjs/ember-test-helpers/pull/199) Replace hard-coded guides link with /current. ([@acorncom](https://github.com/acorncom))
* [#386](https://github.com/emberjs/ember-test-helpers/pull/386) Fix `waitFor` return value documentation. ([@pcambra](https://github.com/pcambra))

#### :house: Internal
* [#412](https://github.com/emberjs/ember-test-helpers/pull/412) Work around downstream dependencies dropping Node 4 without major bump. ([@rwjblue](https://github.com/rwjblue))

#### Committers: 15
- Andrew Pellerano ([apellerano-pw](https://github.com/apellerano-pw))
- Bryan ([BryanCrotaz](https://github.com/BryanCrotaz))
- David Baker ([acorncom](https://github.com/acorncom))
- David J. Hamilton ([hjdivad](https://github.com/hjdivad))
- Gabriel Grant ([gabrielgrant](https://github.com/gabrielgrant))
- Ilya Radchenko ([knownasilya](https://github.com/knownasilya))
- Jonathan Johnson ([jrjohnson](https://github.com/jrjohnson))
- Kelvin Luck ([vitch](https://github.com/vitch))
- Martin Feckie ([mfeckie](https://github.com/mfeckie))
- Martin Muñoz ([mmun](https://github.com/mmun))
- Mike Behnke ([localpcguy](https://github.com/localpcguy))
- Pedro ([pcambra](https://github.com/pcambra))
- Peter Wagenet ([wagenet](https://github.com/wagenet))
- Robert Jackson ([rwjblue](https://github.com/rwjblue))
- [ggayowsky](https://github.com/ggayowsky)

## v0.7.25 (2018-06-10)

#### :boom: Breaking Change
* [#384](https://github.com/emberjs/ember-test-helpers/pull/384) Prevent `click` from triggering events on disabled form elements. ([@kellyselden](https://github.com/kellyselden))

#### :rocket: Enhancement
* [#379](https://github.com/emberjs/ember-test-helpers/pull/379) Improve `triggerKeyEvent()` warnings. ([@Turbo87](https://github.com/Turbo87))

#### :bug: Bug Fix
* [#384](https://github.com/emberjs/ember-test-helpers/pull/384) Prevent `click` from triggering events on disabled form elements. ([@kellyselden](https://github.com/kellyselden))

#### :house: Internal
* [#377](https://github.com/emberjs/ember-test-helpers/pull/377) Ignore yarn.lock in published tarballs.. ([@rwjblue](https://github.com/rwjblue))

#### Committers: 3
- Kelly Selden ([kellyselden](https://github.com/kellyselden))
- Robert Jackson ([rwjblue](https://github.com/rwjblue))
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))

## v0.7.24 (2018-05-18)

#### :house: Internal
* [#376](https://github.com/emberjs/ember-test-helpers/pull/376) auto-dist-tag: Use Node 4 compatible release. ([@Turbo87](https://github.com/Turbo87))

#### Committers: 1
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))


## v0.7.23 (2018-05-18)

#### :bug: Bug Fix
* [#374](https://github.com/emberjs/ember-test-helpers/pull/374) Change descriptors to allow properties to be enumerated and configured. ([@jimenglish81](https://github.com/jimenglish81))

#### Committers: 1
- [jimenglish81](https://github.com/jimenglish81)


## v0.7.22 (2018-04-21)

#### :rocket: Enhancement
* [#361](https://github.com/emberjs/ember-test-helpers/pull/361) Fix KeyboardEvent#key and allow `triggerKeyEvent` to receive keys instead of keycodes. ([@cibernox](https://github.com/cibernox))
* [#356](https://github.com/emberjs/ember-test-helpers/pull/356) add waitFor msg. ([@snewcomer](https://github.com/snewcomer))

#### :bug: Bug Fix
* [#366](https://github.com/emberjs/ember-test-helpers/pull/366) Fix issues with Ember 3.2+ and legacy acceptance tests.. ([@cibernox](https://github.com/cibernox))

#### Committers: 2
- Miguel Camba ([cibernox](https://github.com/cibernox))
- Scott Newcomer ([snewcomer](https://github.com/snewcomer))

## v0.7.21 (2018-04-13)

#### :rocket: Enhancement
* [#358](https://github.com/emberjs/ember-test-helpers/pull/358) Add `context` argument assertions to the `find` and `findAll` helpers. ([@Turbo87](https://github.com/Turbo87))
* [#349](https://github.com/emberjs/ember-test-helpers/pull/349) Protect context properties and methods from overwriting. ([@Turbo87](https://github.com/Turbo87))
* [#346](https://github.com/emberjs/ember-test-helpers/pull/346) Allow for custom error message in waitUntil helper. ([@BitBrit](https://github.com/BitBrit))

#### :memo: Documentation
* [#348](https://github.com/emberjs/ember-test-helpers/pull/348) wait-for helper's count value is null by default. ([@sly7-7](https://github.com/sly7-7))

#### Committers: 3
- Sylvain MINA ([sly7-7](https://github.com/sly7-7))
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))
- [BitBrit](https://github.com/BitBrit)

## v0.7.20 (2018-03-19)

#### :bug: Bug Fix
* Fix invalid publish artifact (missing directory contents).

#### Committers: 4
- Robert Jackson

## v0.7.19 (2018-03-19)

#### :rocket: Enhancement
* [#336](https://github.com/emberjs/ember-test-helpers/pull/336) Make `getApplication` public. ([@snewcomer](https://github.com/snewcomer))

#### :bug: Bug Fix
* [#331](https://github.com/emberjs/ember-test-helpers/pull/331) Check `nodeType` rather than `instanceOf` Check. ([@spencer516](https://github.com/spencer516))

#### :memo: Documentation
* [#334](https://github.com/emberjs/ember-test-helpers/pull/334) Enhance README and API reference. ([@Turbo87](https://github.com/Turbo87))

#### :house: Internal
* [#344](https://github.com/emberjs/ember-test-helpers/pull/344) Update `qunit` to v2.5.1. ([@Turbo87](https://github.com/Turbo87))

#### Committers: 4
- Andrew Kirwin ([amk221](https://github.com/amk221))
- Scott Newcomer ([snewcomer](https://github.com/snewcomer))
- Spencer P ([spencer516](https://github.com/spencer516))
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))

## v0.7.18 (2018-02-13)

#### :bug: Bug Fix
* [#319](https://github.com/emberjs/ember-test-helpers/pull/319) Fix regression with `wait()` timeouts.. ([@rwjblue](https://github.com/rwjblue))

#### :house: Internal
* [#320](https://github.com/emberjs/ember-test-helpers/pull/320) Lock down documentation to 5.3.5 to avoid Node 4 issues.. ([@rwjblue](https://github.com/rwjblue))

#### Committers: 1
- Robert Jackson ([rwjblue](https://github.com/rwjblue))


## v0.7.17 (2018-02-10)

#### :rocket: Enhancement
* [#305](https://github.com/emberjs/ember-test-helpers/pull/305) Support testing without an application template wrapper. ([@cibernox](https://github.com/cibernox))

#### :bug: Bug Fix
* [#317](https://github.com/emberjs/ember-test-helpers/pull/317) Remove simple alias for `wait` -> `settled`. ([@rwjblue](https://github.com/rwjblue))

#### :house: Internal
* [#315](https://github.com/emberjs/ember-test-helpers/pull/315) Update to QUnit 2.5.0.. ([@rwjblue](https://github.com/rwjblue))

#### Committers: 2
- Miguel Camba ([cibernox](https://github.com/cibernox))
- Robert Jackson ([rwjblue](https://github.com/rwjblue))

## v0.7.16 (2018-02-01)

#### :rocket: Enhancement
* [#309](https://github.com/emberjs/ember-test-helpers/pull/309) Make getRootElement() public. ([@bendemboski](https://github.com/bendemboski))

#### Committers: 1
- Ben Demboski ([bendemboski](https://github.com/bendemboski))

## v0.7.15 (2018-01-31)

#### :rocket: Enhancement
* [#308](https://github.com/emberjs/ember-test-helpers/pull/308) Implement `find()` and `findAll()` DOM helpers. ([@bendemboski](https://github.com/bendemboski))

#### Committers: 1
- Ben Demboski ([bendemboski](https://github.com/bendemboski))

## v0.7.14 (2018-01-26)

#### :bug: Bug Fix
* [#307](https://github.com/emberjs/ember-test-helpers/pull/307) Make sure initializers can modify the DOM. ([@bendemboski](https://github.com/bendemboski))
* [#302](https://github.com/emberjs/ember-test-helpers/pull/302) Allow empty string to fillIn. ([@snewcomer](https://github.com/snewcomer))

#### :memo: Documentation
* [#301](https://github.com/emberjs/ember-test-helpers/pull/301) README: use SVG badges. ([@olleolleolle](https://github.com/olleolleolle))

#### :house: Internal
* [#304](https://github.com/emberjs/ember-test-helpers/pull/304) Update to 2.18. ([@cibernox](https://github.com/cibernox))
* [#298](https://github.com/emberjs/ember-test-helpers/pull/298) Avoid using Bower builds for release, beta, and canary.... ([@rwjblue](https://github.com/rwjblue))

#### Committers: 5
- Ben Demboski ([bendemboski](https://github.com/bendemboski))
- Miguel Camba ([cibernox](https://github.com/cibernox))
- Olle Jonsson ([olleolleolle](https://github.com/olleolleolle))
- Robert Jackson ([rwjblue](https://github.com/rwjblue))
- Scott Newcomer ([snewcomer](https://github.com/snewcomer))

## v0.7.13 (2018-01-02)

#### :bug: Bug Fix
* [#297](https://github.com/emberjs/ember-test-helpers/pull/297) Ensure templates are precompiled properly on ember-cli prior to 2.12. ([@rwjblue](https://github.com/rwjblue))

#### :house: Internal
* [#296](https://github.com/emberjs/ember-test-helpers/pull/296) Clean up and simplify setupRenderingContext. ([@rwjblue](https://github.com/rwjblue))

#### Committers: 1
- Robert Jackson ([rwjblue](https://github.com/rwjblue))

## v0.7.12 (2017-12-31)

#### :rocket: Enhancement
* [#295](https://github.com/emberjs/ember-test-helpers/pull/295) Use "real" rootElement for DOM interaction helpers. ([@rwjblue](https://github.com/rwjblue))
* [#292](https://github.com/emberjs/ember-test-helpers/pull/292) Refactor settled to leverage waitUntil. ([@rwjblue](https://github.com/rwjblue))

#### :memo: Documentation
* [#294](https://github.com/emberjs/ember-test-helpers/pull/294) Update documentation to generate into API.md. ([@rwjblue](https://github.com/rwjblue))
* [#291](https://github.com/emberjs/ember-test-helpers/pull/291) Document all the things... ([@rwjblue](https://github.com/rwjblue))
* [#287](https://github.com/emberjs/ember-test-helpers/pull/287) Flesh out DOM interaction helper documentation. ([@rwjblue](https://github.com/rwjblue))

#### :house: Internal
* [#293](https://github.com/emberjs/ember-test-helpers/pull/293) Chore: Remove RSVP "resolve in run-loop" config. ([@rwjblue](https://github.com/rwjblue))
* [#290](https://github.com/emberjs/ember-test-helpers/pull/290) Tests: Make valid-jsdoc an error (instead of warning). ([@rwjblue](https://github.com/rwjblue))
* [#289](https://github.com/emberjs/ember-test-helpers/pull/289) Fix documentation deployment in CI.. ([@rwjblue](https://github.com/rwjblue))
* [#288](https://github.com/emberjs/ember-test-helpers/pull/288) Tweak linting configuration.. ([@rwjblue](https://github.com/rwjblue))

#### Committers: 1
- Robert Jackson ([rwjblue](https://github.com/rwjblue))

## v0.7.11 (2017-12-27)

#### :memo: Documentation
* [#286](https://github.com/emberjs/ember-test-helpers/pull/286) Add `documentation` dev dependency. ([@Turbo87](https://github.com/Turbo87))

#### Committers: 1
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))

## v0.7.10 (2017-12-20)

#### :rocket: Enhancement
* [#282](https://github.com/emberjs/ember-test-helpers/pull/282) Refactor `setupRenderingContext` so that element is stable after setup. ([@rwjblue](https://github.com/rwjblue))

#### :house: Internal
* [#280](https://github.com/emberjs/ember-test-helpers/pull/280) Cleanup browser detection and overrides. ([@rwjblue](https://github.com/rwjblue))

#### Committers: 1
- Robert Jackson ([rwjblue](https://github.com/rwjblue))

## v0.7.9 (2017-12-16)

#### :rocket: Enhancement
* [#279](https://github.com/emberjs/ember-test-helpers/pull/279) Add application testing infrastructure. ([@rwjblue](https://github.com/rwjblue))

#### Committers: 1
- Robert Jackson ([rwjblue](https://github.com/rwjblue))

## v0.7.8 (2017-12-15)

#### :bug: Bug Fix
* [#276](https://github.com/emberjs/ember-test-helpers/pull/276) Fix issues with IE11. All tests now passing on IE11, Chrome, FireFox, Edge, and Safari. 🎉 ([@cibernox](https://github.com/cibernox))

#### Committers: 1
- Miguel Camba ([cibernox](https://github.com/cibernox))

## v0.7.7 (2017-12-15)

#### :bug: Bug Fix
* [#275](https://github.com/emberjs/ember-test-helpers/pull/275) Split cleanup into two buckets. Ensure tests can be ran on IE11. ([@rwjblue](https://github.com/rwjblue))

#### :house: Internal
* [#274](https://github.com/emberjs/ember-test-helpers/pull/274) Ensure `vendor` tree is transpiled when developing addon.. ([@rwjblue](https://github.com/rwjblue))

#### Committers: 1
- Robert Jackson ([rwjblue](https://github.com/rwjblue))

## v0.7.6 (2017-12-15)

#### :bug: Bug Fix
* [#271](https://github.com/emberjs/ember-test-helpers/pull/271) Ensure `vendor` is transpiled. ([@rwjblue](https://github.com/rwjblue))

#### :house: Internal
* [#272](https://github.com/emberjs/ember-test-helpers/pull/272) Make tests boot in IE. ([@cibernox](https://github.com/cibernox))
* [#273](https://github.com/emberjs/ember-test-helpers/pull/273) Remove duplicated `wait` tests. ([@rwjblue](https://github.com/rwjblue))

#### Committers: 2
- Miguel Camba ([cibernox](https://github.com/cibernox))
- Robert Jackson ([rwjblue](https://github.com/rwjblue))

## v0.7.5 (2017-12-15)

#### :rocket: Enhancement
* [#258](https://github.com/emberjs/ember-test-helpers/pull/258) Bring over DOM helper implementation from `ember-native-dom-helpers`. First step towards implementing [emberjs/rfcs#268](https://github.com/emberjs/rfcs/pull/268). ([@rwjblue](https://github.com/rwjblue))

#### :bug: Bug Fix
* [#264](https://github.com/emberjs/ember-test-helpers/pull/264) Wait for pending AJAX in acceptance tests. ([@rwjblue](https://github.com/rwjblue))

#### :house: Internal
* [#269](https://github.com/emberjs/ember-test-helpers/pull/269) Use `nextTick` and `nextTickPromise` throughout codebase. ([@rwjblue](https://github.com/rwjblue))

#### Committers: 2
- Miguel Camba ([cibernox](https://github.com/cibernox))
- Robert Jackson ([rwjblue](https://github.com/rwjblue))

## v0.7.4 (2017-12-13)

#### :rocket: Enhancement
* [#262](https://github.com/emberjs/ember-test-helpers/pull/262) settled: Ramp up timeout values for isSettled() check. ([@Turbo87](https://github.com/Turbo87))

#### :bug: Bug Fix
* [#263](https://github.com/emberjs/ember-test-helpers/pull/263) Refactor settled to avoid triggering a new run-loop.. ([@rwjblue](https://github.com/rwjblue))

#### :house: Internal
* [#261](https://github.com/emberjs/ember-test-helpers/pull/261) Cleanup `settle()` integration tests. ([@Turbo87](https://github.com/Turbo87))
* [#257](https://github.com/emberjs/ember-test-helpers/pull/257) Run `yarn lint` and `yarn test` from the same job in first stage.. ([@rwjblue](https://github.com/rwjblue))

#### Committers: 2
- Robert Jackson ([rwjblue](https://github.com/rwjblue))
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))

## [v0.7.3](https://github.com/emberjs/ember-test-helpers/tree/v0.7.3) (2017-12-05)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.7.2...v0.7.3)

**Implemented enhancements:**

- Refactor `isSettled` to allow better insight into current state. [\#251](https://github.com/emberjs/ember-test-helpers/pull/251) ([rwjblue](https://github.com/rwjblue))
- Expose `isSettled` utility function. [\#248](https://github.com/emberjs/ember-test-helpers/pull/248) ([rwjblue](https://github.com/rwjblue))

**Fixed bugs:**

- Fix order dependence in tests. [\#252](https://github.com/emberjs/ember-test-helpers/pull/252) ([rwjblue](https://github.com/rwjblue))

**Closed issues:**

- Remove `ember-beta` from allowed failures. [\#249](https://github.com/emberjs/ember-test-helpers/issues/249)
- moduleForModel doesn't play nicely with application serializer. [\#165](https://github.com/emberjs/ember-test-helpers/issues/165)
- Unit testing components with new attrs hash [\#63](https://github.com/emberjs/ember-test-helpers/issues/63)
- Support non ember-data models [\#29](https://github.com/emberjs/ember-test-helpers/issues/29)
- Generated controller test fails to lookup another controller factory \(through needs\) [\#8](https://github.com/emberjs/ember-test-helpers/issues/8)
- Unit test for model requires inclusion of any other "referenced" model into needs. [\#6](https://github.com/emberjs/ember-test-helpers/issues/6)

**Merged pull requests:**

- CI: Use Node 4 for tests [\#256](https://github.com/emberjs/ember-test-helpers/pull/256) ([Turbo87](https://github.com/Turbo87))
- Use build stages to fail early... [\#255](https://github.com/emberjs/ember-test-helpers/pull/255) ([rwjblue](https://github.com/rwjblue))
- Upgrade default Ember version to 2.17. [\#254](https://github.com/emberjs/ember-test-helpers/pull/254) ([rwjblue](https://github.com/rwjblue))
- Remove usage of Ember.Handlebars.SafeString. [\#253](https://github.com/emberjs/ember-test-helpers/pull/253) ([rwjblue](https://github.com/rwjblue))

## [v0.7.2](https://github.com/emberjs/ember-test-helpers/tree/v0.7.2) (2017-11-30)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.7.1...v0.7.2)

**Implemented enhancements:**

- Implement `validateErrorHandler` utility. [\#247](https://github.com/emberjs/ember-test-helpers/pull/247) ([rwjblue](https://github.com/rwjblue))

**Closed issues:**

- Leaking states between tests \(because of acceptance tests\) [\#243](https://github.com/emberjs/ember-test-helpers/issues/243)
- Allowing rejected promises in integration tests [\#197](https://github.com/emberjs/ember-test-helpers/issues/197)

## [v0.7.1](https://github.com/emberjs/ember-test-helpers/tree/v0.7.1) (2017-11-11)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.7.0...v0.7.1)

**Implemented enhancements:**

- Automatically set resolver when `setApplication` is called. [\#242](https://github.com/emberjs/ember-test-helpers/pull/242) ([rwjblue](https://github.com/rwjblue))

## [v0.7.0](https://github.com/emberjs/ember-test-helpers/tree/v0.7.0) (2017-11-11)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.7.0-beta.11...v0.7.0)

**Implemented enhancements:**

- Rename to `@ember/test-helpers` [\#240](https://github.com/emberjs/ember-test-helpers/issues/240)
- Rename to @ember/test-helpers. [\#241](https://github.com/emberjs/ember-test-helpers/pull/241) ([rwjblue](https://github.com/rwjblue))

## [v0.7.0-beta.11](https://github.com/emberjs/ember-test-helpers/tree/v0.7.0-beta.11) (2017-11-10)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.7.0-beta.10...v0.7.0-beta.11)

**Implemented enhancements:**

- Use `Application.buildInstance` if possible to create `owner` for use in tests. [\#234](https://github.com/emberjs/ember-test-helpers/issues/234)

**Merged pull requests:**

- Random cleanup... [\#238](https://github.com/emberjs/ember-test-helpers/pull/238) ([rwjblue](https://github.com/rwjblue))
- Use `Application.create\(\).buildInstance\(\)` if possible. [\#237](https://github.com/emberjs/ember-test-helpers/pull/237) ([rwjblue](https://github.com/rwjblue))

## [v0.7.0-beta.10](https://github.com/emberjs/ember-test-helpers/tree/v0.7.0-beta.10) (2017-11-05)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.7.0-beta.9...v0.7.0-beta.10)

**Implemented enhancements:**

- Make `setupContext` / `teardownContext` async [\#235](https://github.com/emberjs/ember-test-helpers/issues/235)

**Merged pull requests:**

- Make setup and teardown of new API async. [\#236](https://github.com/emberjs/ember-test-helpers/pull/236) ([rwjblue](https://github.com/rwjblue))

## [v0.7.0-beta.9](https://github.com/emberjs/ember-test-helpers/tree/v0.7.0-beta.9) (2017-11-05)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.7.0-beta.8...v0.7.0-beta.9)

**Implemented enhancements:**

- Add pauseTest and resumeTest functionality. [\#233](https://github.com/emberjs/ember-test-helpers/pull/233) ([rwjblue](https://github.com/rwjblue))

**Fixed bugs:**

- Broken tests in v0.7.0-beta.8 [\#231](https://github.com/emberjs/ember-test-helpers/issues/231)

**Closed issues:**

- this.on\(\) no longer supported in rendering tests? [\#232](https://github.com/emberjs/ember-test-helpers/issues/232)

## [v0.7.0-beta.8](https://github.com/emberjs/ember-test-helpers/tree/v0.7.0-beta.8) (2017-10-20)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.7.0-beta.7...v0.7.0-beta.8)

**Fixed bugs:**

- New `setupRenderingTest` seems to recreate the `\#ember-testing-container` for every test [\#228](https://github.com/emberjs/ember-test-helpers/issues/228)
- Ensure ember-testing-container is reset properly. [\#229](https://github.com/emberjs/ember-test-helpers/pull/229) ([rwjblue](https://github.com/rwjblue))
- Set Ember.testing only while actually running a test. [\#227](https://github.com/emberjs/ember-test-helpers/pull/227) ([rwjblue](https://github.com/rwjblue))

**Closed issues:**

- TypeError: Cannot read property 'resolveRegistration' of undefined [\#230](https://github.com/emberjs/ember-test-helpers/issues/230)

## [v0.7.0-beta.7](https://github.com/emberjs/ember-test-helpers/tree/v0.7.0-beta.7) (2017-10-17)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.7.0-beta.6...v0.7.0-beta.7)

**Fixed bugs:**

- Ensure testing elements are properly reset/cleared. [\#226](https://github.com/emberjs/ember-test-helpers/pull/226) ([rwjblue](https://github.com/rwjblue))

## [v0.7.0-beta.6](https://github.com/emberjs/ember-test-helpers/tree/v0.7.0-beta.6) (2017-10-17)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.7.0-beta.5...v0.7.0-beta.6)

**Implemented enhancements:**

- Expose `settled` helper function. [\#223](https://github.com/emberjs/ember-test-helpers/pull/223) ([rwjblue](https://github.com/rwjblue))
- Expose importable helper functions. [\#222](https://github.com/emberjs/ember-test-helpers/pull/222) ([rwjblue](https://github.com/rwjblue))

**Merged pull requests:**

- Update README for new API iteration. [\#225](https://github.com/emberjs/ember-test-helpers/pull/225) ([rwjblue](https://github.com/rwjblue))
- Continue to flesh out more tests for new API's. [\#224](https://github.com/emberjs/ember-test-helpers/pull/224) ([rwjblue](https://github.com/rwjblue))
- Move `setContext` into `setupContext`. [\#221](https://github.com/emberjs/ember-test-helpers/pull/221) ([rwjblue](https://github.com/rwjblue))

## [v0.7.0-beta.5](https://github.com/emberjs/ember-test-helpers/tree/v0.7.0-beta.5) (2017-10-16)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.7.0-beta.4...v0.7.0-beta.5)

**Implemented enhancements:**

- Expose `element` in component integration tests [\#184](https://github.com/emberjs/ember-test-helpers/issues/184)
- Deprecate `this.container` and `this.registry` when using Ember 2.3.0. [\#120](https://github.com/emberjs/ember-test-helpers/issues/120)
- Way to use extended EventDispatcher [\#20](https://github.com/emberjs/ember-test-helpers/issues/20)
- Expose test helpers for component unit tests [\#3](https://github.com/emberjs/ember-test-helpers/issues/3)
- Basic implementation for new testing API. [\#220](https://github.com/emberjs/ember-test-helpers/pull/220) ([rwjblue](https://github.com/rwjblue))

**Fixed bugs:**

- Tests fail after upgrading to 0.5.17 - unable to find custom store [\#130](https://github.com/emberjs/ember-test-helpers/issues/130)
- Document "integration: true" and "needs" [\#55](https://github.com/emberjs/ember-test-helpers/issues/55)

**Closed issues:**

- Simplify support matrix. [\#206](https://github.com/emberjs/ember-test-helpers/issues/206)
- contextualizeCallbacks prevents custom test instance helpers [\#204](https://github.com/emberjs/ember-test-helpers/issues/204)
- 0.6.3 is breaking existing tests [\#203](https://github.com/emberjs/ember-test-helpers/issues/203)
- initializers affect component integration tests if there is an acceptance test [\#146](https://github.com/emberjs/ember-test-helpers/issues/146)
- Service injection fails in integration tests [\#109](https://github.com/emberjs/ember-test-helpers/issues/109)
- Integration test with router injected into component [\#103](https://github.com/emberjs/ember-test-helpers/issues/103)
- Failing test suite under 0.5.9 [\#97](https://github.com/emberjs/ember-test-helpers/issues/97)
- Inject integration test helpers into component integration tests. [\#67](https://github.com/emberjs/ember-test-helpers/issues/67)
- add-ons unit tests fail to retrieve custom factories [\#54](https://github.com/emberjs/ember-test-helpers/issues/54)
- View-rendering with `{{outlet}}` in views template fails [\#36](https://github.com/emberjs/ember-test-helpers/issues/36)
- If ED is being used and integration:true then I should be able to access the store [\#31](https://github.com/emberjs/ember-test-helpers/issues/31)
- Working with new Container/Registry Implementation [\#7](https://github.com/emberjs/ember-test-helpers/issues/7)

**Merged pull requests:**

- Use yarn instead of npm [\#219](https://github.com/emberjs/ember-test-helpers/pull/219) ([Turbo87](https://github.com/Turbo87))
- Reorganize repo internals to prepare for RFC 232 implementation. [\#218](https://github.com/emberjs/ember-test-helpers/pull/218) ([rwjblue](https://github.com/rwjblue))

## [v0.7.0-beta.4](https://github.com/emberjs/ember-test-helpers/tree/v0.7.0-beta.4) (2017-10-10)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.7.0-beta.3...v0.7.0-beta.4)

**Closed issues:**

- Release via TravisCI [\#214](https://github.com/emberjs/ember-test-helpers/issues/214)

**Merged pull requests:**

- Remove `TestModuleForIntegration`. [\#217](https://github.com/emberjs/ember-test-helpers/pull/217) ([rwjblue](https://github.com/rwjblue))
- Travis: Automatically publish tags to npm [\#216](https://github.com/emberjs/ember-test-helpers/pull/216) ([Turbo87](https://github.com/Turbo87))
- Reduce direct jQuery usage in tests. [\#215](https://github.com/emberjs/ember-test-helpers/pull/215) ([rwjblue](https://github.com/rwjblue))

## [v0.7.0-beta.3](https://github.com/emberjs/ember-test-helpers/tree/v0.7.0-beta.3) (2017-10-08)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.7.0-beta.2...v0.7.0-beta.3)

**Closed issues:**

- Convert to Ember addon [\#210](https://github.com/emberjs/ember-test-helpers/issues/210)

## [v0.7.0-beta.2](https://github.com/emberjs/ember-test-helpers/tree/v0.7.0-beta.2) (2017-10-07)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.7.0-beta.1...v0.7.0-beta.2)

**Implemented enhancements:**

- Autoregister event dispatcher in unit tests [\#205](https://github.com/emberjs/ember-test-helpers/pull/205) ([cibernox](https://github.com/cibernox))

## [v0.7.0-beta.1](https://github.com/emberjs/ember-test-helpers/tree/v0.7.0-beta.1) (2017-10-07)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.6.3...v0.7.0-beta.1)

**Implemented enhancements:**

- Migrate to an addon. [\#213](https://github.com/emberjs/ember-test-helpers/pull/213) ([rwjblue](https://github.com/rwjblue))
- Ensure RSVP promises do not need manual Ember.run wrapping. [\#201](https://github.com/emberjs/ember-test-helpers/pull/201) ([rwjblue](https://github.com/rwjblue))
- Updates to ensure ember-data from npm works properly. [\#200](https://github.com/emberjs/ember-test-helpers/pull/200) ([rwjblue](https://github.com/rwjblue))

**Closed issues:**

- Document `resolver` option for modules [\#208](https://github.com/emberjs/ember-test-helpers/issues/208)

**Merged pull requests:**

- Document ability to set module-specific resolver [\#209](https://github.com/emberjs/ember-test-helpers/pull/209) ([trentmwillis](https://github.com/trentmwillis))

## [v0.6.3](https://github.com/emberjs/ember-test-helpers/tree/v0.6.3) (2017-03-04)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.6.2...v0.6.3)

**Fixed bugs:**

- Import `require` \(avoid using global require\). [\#198](https://github.com/emberjs/ember-test-helpers/pull/198) ([rwjblue](https://github.com/rwjblue))

## [v0.6.2](https://github.com/emberjs/ember-test-helpers/tree/v0.6.2) (2017-02-14)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.6.1...v0.6.2)

**Fixed bugs:**

- Deprecation Warning thrown Even when `needs:\[\]` is passed [\#195](https://github.com/emberjs/ember-test-helpers/issues/195)

**Merged pull requests:**

- Deprecation Warning thrown with `needs:\[\]` [\#196](https://github.com/emberjs/ember-test-helpers/pull/196) ([canufeel](https://github.com/canufeel))

## [v0.6.1](https://github.com/emberjs/ember-test-helpers/tree/v0.6.1) (2017-01-24)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.6.0...v0.6.1)

**Implemented enhancements:**

- Ember 2.12: Use factoryFor instead of lookupFactory, if available [\#194](https://github.com/emberjs/ember-test-helpers/pull/194) ([bwbuchanan](https://github.com/bwbuchanan))

**Closed issues:**

- Release v0.6.0 [\#192](https://github.com/emberjs/ember-test-helpers/issues/192)
- Integration component test issues after v0.5.31 [\#176](https://github.com/emberjs/ember-test-helpers/issues/176)

## [v0.6.0](https://github.com/emberjs/ember-test-helpers/tree/v0.6.0) (2016-12-21)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.6.0-beta.1...v0.6.0)

**Implemented enhancements:**

- JSHint not catching missing semicolon's aka. replace JSHint with ESLint [\#70](https://github.com/emberjs/ember-test-helpers/issues/70)
- Replace JSHint with ESLint [\#190](https://github.com/emberjs/ember-test-helpers/pull/190) ([Turbo87](https://github.com/Turbo87))

**Closed issues:**

- Use ESLint instead of JSHint [\#189](https://github.com/emberjs/ember-test-helpers/issues/189)
- Update Ember CLI [\#185](https://github.com/emberjs/ember-test-helpers/issues/185)

**Merged pull requests:**

- README: Update links [\#193](https://github.com/emberjs/ember-test-helpers/pull/193) ([Turbo87](https://github.com/Turbo87))
- Cleanup package.json file [\#188](https://github.com/emberjs/ember-test-helpers/pull/188) ([Turbo87](https://github.com/Turbo87))
- Update dependencies [\#187](https://github.com/emberjs/ember-test-helpers/pull/187) ([Turbo87](https://github.com/Turbo87))
- Update QUnit module example [\#186](https://github.com/emberjs/ember-test-helpers/pull/186) ([martndemus](https://github.com/martndemus))

## [v0.6.0-beta.1](https://github.com/emberjs/ember-test-helpers/tree/v0.6.0-beta.1) (2016-11-27)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.34...v0.6.0-beta.1)

**Implemented enhancements:**

- Publish to npm [\#58](https://github.com/emberjs/ember-test-helpers/issues/58)

**Closed issues:**

- test-module-for-integration.js [\#182](https://github.com/emberjs/ember-test-helpers/issues/182)

**Merged pull requests:**

- Replace "klassy" with ES6 classes [\#183](https://github.com/emberjs/ember-test-helpers/pull/183) ([Turbo87](https://github.com/Turbo87))
- Overriding toString\(\) to return the test subject name [\#181](https://github.com/emberjs/ember-test-helpers/pull/181) ([kiwiupover](https://github.com/kiwiupover))

## [v0.5.34](https://github.com/emberjs/ember-test-helpers/tree/v0.5.34) (2016-10-03)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.33...v0.5.34)

**Closed issues:**

- Reset test elements instead of emptying them [\#178](https://github.com/emberjs/ember-test-helpers/issues/178)
- Regression with v0.5.26 [\#161](https://github.com/emberjs/ember-test-helpers/issues/161)

**Merged pull requests:**

- Reset ember-testing div to initial state on teardown [\#180](https://github.com/emberjs/ember-test-helpers/pull/180) ([trentmwillis](https://github.com/trentmwillis))
- Fix the build \(skipping a willDestroyElement test\) for canary builds. [\#179](https://github.com/emberjs/ember-test-helpers/pull/179) ([rwjblue](https://github.com/rwjblue))

## [v0.5.33](https://github.com/emberjs/ember-test-helpers/tree/v0.5.33) (2016-08-18)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.32...v0.5.33)

**Closed issues:**

- Ability to set Resolver per-module [\#173](https://github.com/emberjs/ember-test-helpers/issues/173)
- Callback context is inconsistent [\#133](https://github.com/emberjs/ember-test-helpers/issues/133)

**Merged pull requests:**

- Introduce resolver option to test module [\#174](https://github.com/emberjs/ember-test-helpers/pull/174) ([trentmwillis](https://github.com/trentmwillis))

## [v0.5.32](https://github.com/emberjs/ember-test-helpers/tree/v0.5.32) (2016-08-16)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.31...v0.5.32)

**Merged pull requests:**

- Allow test frameworks to set context to use. [\#175](https://github.com/emberjs/ember-test-helpers/pull/175) ([rwjblue](https://github.com/rwjblue))

## [v0.5.31](https://github.com/emberjs/ember-test-helpers/tree/v0.5.31) (2016-08-03)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.30...v0.5.31)

**Merged pull requests:**

- Enable usage when jQuery is not present. [\#172](https://github.com/emberjs/ember-test-helpers/pull/172) ([rwjblue](https://github.com/rwjblue))
- Avoid duplication between test-module-for-component and test-module-for-integration. [\#171](https://github.com/emberjs/ember-test-helpers/pull/171) ([rwjblue](https://github.com/rwjblue))

## [v0.5.30](https://github.com/emberjs/ember-test-helpers/tree/v0.5.30) (2016-08-01)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.29...v0.5.30)

**Merged pull requests:**

- Only append to the DOM when the first `this.render` is called. [\#170](https://github.com/emberjs/ember-test-helpers/pull/170) ([rwjblue](https://github.com/rwjblue))
- More alpha work. [\#169](https://github.com/emberjs/ember-test-helpers/pull/169) ([rwjblue](https://github.com/rwjblue))

## [v0.5.29](https://github.com/emberjs/ember-test-helpers/tree/v0.5.29) (2016-08-01)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.28...v0.5.29)

**Merged pull requests:**

- Start working on making the alpha pass. [\#168](https://github.com/emberjs/ember-test-helpers/pull/168) ([rwjblue](https://github.com/rwjblue))

## [v0.5.28](https://github.com/emberjs/ember-test-helpers/tree/v0.5.28) (2016-07-30)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.27...v0.5.28)

**Merged pull requests:**

- Call `Ember.ApplicationInstance.setupRegistry` if present. [\#167](https://github.com/emberjs/ember-test-helpers/pull/167) ([rwjblue](https://github.com/rwjblue))
- Updating Package Versions within current range [\#166](https://github.com/emberjs/ember-test-helpers/pull/166) ([elwayman02](https://github.com/elwayman02))

## [v0.5.27](https://github.com/emberjs/ember-test-helpers/tree/v0.5.27) (2016-06-20)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.26...v0.5.27)

**Closed issues:**

- Attempting to inject an unknown injection: `router:main` when running unit or integration tests for controllers or routes. [\#151](https://github.com/emberjs/ember-test-helpers/issues/151)

**Merged pull requests:**

- Fix the module-for-integration tests on Ember canary. [\#163](https://github.com/emberjs/ember-test-helpers/pull/163) ([rwjblue](https://github.com/rwjblue))
- export unsetContext from the main module [\#162](https://github.com/emberjs/ember-test-helpers/pull/162) ([CodeOfficer](https://github.com/CodeOfficer))

## [v0.5.26](https://github.com/emberjs/ember-test-helpers/tree/v0.5.26) (2016-06-07)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.25...v0.5.26)

**Closed issues:**

- Minor version 0.5.24 -\> 0.5.25 broke my tests [\#159](https://github.com/emberjs/ember-test-helpers/issues/159)

**Merged pull requests:**

- Fix regression related to DOM structure. [\#160](https://github.com/emberjs/ember-test-helpers/pull/160) ([rwjblue](https://github.com/rwjblue))

## [v0.5.25](https://github.com/emberjs/ember-test-helpers/tree/v0.5.25) (2016-06-06)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.24...v0.5.25)

**Closed issues:**

- can't test customEvents [\#75](https://github.com/emberjs/ember-test-helpers/issues/75)

**Merged pull requests:**

- Refactor `moduleForComponent` rendering to use outlet system. [\#158](https://github.com/emberjs/ember-test-helpers/pull/158) ([rwjblue](https://github.com/rwjblue))

## [v0.5.24](https://github.com/emberjs/ember-test-helpers/tree/v0.5.24) (2016-05-25)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.23...v0.5.24)

**Closed issues:**

- How should mutliple render calls in one test behave? [\#111](https://github.com/emberjs/ember-test-helpers/issues/111)

**Merged pull requests:**

- Ensure prior render is cleared when calling `this.render`. [\#155](https://github.com/emberjs/ember-test-helpers/pull/155) ([rwjblue](https://github.com/rwjblue))

## [v0.5.23](https://github.com/emberjs/ember-test-helpers/tree/v0.5.23) (2016-05-05)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.22...v0.5.23)

**Closed issues:**

- Component context should be cleaned up between integration tests? [\#149](https://github.com/emberjs/ember-test-helpers/issues/149)
- Check Ember.Test.waiters in wait helper [\#139](https://github.com/emberjs/ember-test-helpers/issues/139)

**Merged pull requests:**

- Fix the build... [\#154](https://github.com/emberjs/ember-test-helpers/pull/154) ([rwjblue](https://github.com/rwjblue))
- Use new path to loader.js [\#153](https://github.com/emberjs/ember-test-helpers/pull/153) ([danjamin](https://github.com/danjamin))
- Prefer Ember.assign over Ember.merge [\#150](https://github.com/emberjs/ember-test-helpers/pull/150) ([martndemus](https://github.com/martndemus))

## [v0.5.22](https://github.com/emberjs/ember-test-helpers/tree/v0.5.22) (2016-01-31)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.21...v0.5.22)

**Merged pull requests:**

- Test ember-data-2.3 in addon mode. [\#148](https://github.com/emberjs/ember-test-helpers/pull/148) ([rwjblue](https://github.com/rwjblue))
- Add `clearRender` method to allow testing of willDestroyElement. [\#147](https://github.com/emberjs/ember-test-helpers/pull/147) ([rwjblue](https://github.com/rwjblue))
- Add moduleForIntegration [\#144](https://github.com/emberjs/ember-test-helpers/pull/144) ([matteddy](https://github.com/matteddy))

## [v0.5.21](https://github.com/emberjs/ember-test-helpers/tree/v0.5.21) (2016-01-24)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.20...v0.5.21)

**Merged pull requests:**

- Avoid using DS.JSONAPIAdapter if module is present. [\#143](https://github.com/emberjs/ember-test-helpers/pull/143) ([rwjblue](https://github.com/rwjblue))
- Load the JSONAPIAdapter out of require instead of assuming its on a D… [\#142](https://github.com/emberjs/ember-test-helpers/pull/142) ([bmac](https://github.com/bmac))
- Add support for Ember Test registered waiters to wait helper [\#141](https://github.com/emberjs/ember-test-helpers/pull/141) ([adamjmcgrath](https://github.com/adamjmcgrath))

## [v0.5.20](https://github.com/emberjs/ember-test-helpers/tree/v0.5.20) (2016-01-23)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.19...v0.5.20)

**Closed issues:**

- Global DS with Ember Data 2.3 [\#140](https://github.com/emberjs/ember-test-helpers/issues/140)

**Merged pull requests:**

- Make build-registry work correctly when ember-data addon is used [\#138](https://github.com/emberjs/ember-test-helpers/pull/138) ([pangratz](https://github.com/pangratz))
- Change callback context to deprecate test module properties [\#136](https://github.com/emberjs/ember-test-helpers/pull/136) ([trentmwillis](https://github.com/trentmwillis))
- Add moduleForAcceptance [\#129](https://github.com/emberjs/ember-test-helpers/pull/129) ([matteddy](https://github.com/matteddy))

## [v0.5.19](https://github.com/emberjs/ember-test-helpers/tree/v0.5.19) (2015-12-12)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.18...v0.5.19)

## [v0.5.18](https://github.com/emberjs/ember-test-helpers/tree/v0.5.18) (2015-12-12)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.17...v0.5.18)

**Closed issues:**

- Return passed value from `set` and `setProperties` on integration tests [\#131](https://github.com/emberjs/ember-test-helpers/issues/131)

**Merged pull requests:**

- Enable publishing to NPM. [\#135](https://github.com/emberjs/ember-test-helpers/pull/135) ([rwjblue](https://github.com/rwjblue))
- Use NPM for klassy dep. [\#134](https://github.com/emberjs/ember-test-helpers/pull/134) ([rwjblue](https://github.com/rwjblue))
- Return passed in value for set and setProperties in integration test [\#132](https://github.com/emberjs/ember-test-helpers/pull/132) ([trentmwillis](https://github.com/trentmwillis))
- Add JSHint to project. [\#128](https://github.com/emberjs/ember-test-helpers/pull/128) ([rwjblue](https://github.com/rwjblue))
- Update ember-cli to latest released version. [\#123](https://github.com/emberjs/ember-test-helpers/pull/123) ([rwjblue](https://github.com/rwjblue))
- Provide better context for `subject\(\)` deprecation [\#57](https://github.com/emberjs/ember-test-helpers/pull/57) ([seanpdoyle](https://github.com/seanpdoyle))

## [v0.5.17](https://github.com/emberjs/ember-test-helpers/tree/v0.5.17) (2015-12-07)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.16...v0.5.17)

**Closed issues:**

- Tests fail for latest beta/canary [\#126](https://github.com/emberjs/ember-test-helpers/issues/126)
- Can no longer override registry in acceptance tests [\#124](https://github.com/emberjs/ember-test-helpers/issues/124)

**Merged pull requests:**

- Fix registry resolver for isolated container @2.3+ [\#127](https://github.com/emberjs/ember-test-helpers/pull/127) ([nickiaconis](https://github.com/nickiaconis))
- Restrict integration: 'legacy' to component tests. [\#122](https://github.com/emberjs/ember-test-helpers/pull/122) ([rwjblue](https://github.com/rwjblue))
- Add support for `integration: 'legacy'` [\#121](https://github.com/emberjs/ember-test-helpers/pull/121) ([rwjblue](https://github.com/rwjblue))

## [v0.5.16](https://github.com/emberjs/ember-test-helpers/tree/v0.5.16) (2015-11-10)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.15...v0.5.16)

**Merged pull requests:**

- Use newly exposed mixins to create owner. [\#119](https://github.com/emberjs/ember-test-helpers/pull/119) ([rwjblue](https://github.com/rwjblue))

## [v0.5.15](https://github.com/emberjs/ember-test-helpers/tree/v0.5.15) (2015-11-10)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.14...v0.5.15)

**Closed issues:**

- Events are fired twice for `onxxxx` type of handlers [\#116](https://github.com/emberjs/ember-test-helpers/issues/116)
- Injecting services for component integration tests doesn't seem to work [\#114](https://github.com/emberjs/ember-test-helpers/issues/114)

**Merged pull requests:**

- Work with `Ember.getOwner`. [\#118](https://github.com/emberjs/ember-test-helpers/pull/118) ([rwjblue](https://github.com/rwjblue))

## [v0.5.14](https://github.com/emberjs/ember-test-helpers/tree/v0.5.14) (2015-10-21)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.13...v0.5.14)

**Closed issues:**

- Implicit service injection fails in unit tests for dasherized names [\#108](https://github.com/emberjs/ember-test-helpers/issues/108)

**Merged pull requests:**

- Fix issues with normalization in primary \(non-fallback\) registry. [\#113](https://github.com/emberjs/ember-test-helpers/pull/113) ([rwjblue](https://github.com/rwjblue))

## [v0.5.13](https://github.com/emberjs/ember-test-helpers/tree/v0.5.13) (2015-10-20)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.12...v0.5.13)

**Closed issues:**

- TestModuleFor{App,Acceptance} proposal [\#94](https://github.com/emberjs/ember-test-helpers/issues/94)

**Merged pull requests:**

- Add `wait` helper. [\#112](https://github.com/emberjs/ember-test-helpers/pull/112) ([rwjblue](https://github.com/rwjblue))
- \[CLEANUP\] remove empty file [\#110](https://github.com/emberjs/ember-test-helpers/pull/110) ([pangratz](https://github.com/pangratz))
- Update README.md [\#107](https://github.com/emberjs/ember-test-helpers/pull/107) ([Kuzirashi](https://github.com/Kuzirashi))
- prepend tear down steps like tearDownForComponent in the begining of tearDownSteps array [\#104](https://github.com/emberjs/ember-test-helpers/pull/104) ([tsing80](https://github.com/tsing80))

## [v0.5.12](https://github.com/emberjs/ember-test-helpers/tree/v0.5.12) (2015-10-02)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.11...v0.5.12)

**Merged pull requests:**

- Guard for missing Ember.inject. [\#106](https://github.com/emberjs/ember-test-helpers/pull/106) ([rwjblue](https://github.com/rwjblue))

## [v0.5.11](https://github.com/emberjs/ember-test-helpers/tree/v0.5.11) (2015-10-01)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.10...v0.5.11)

**Merged pull requests:**

- Add public API for injection & registration [\#105](https://github.com/emberjs/ember-test-helpers/pull/105) ([ef4](https://github.com/ef4))
- Add `id` and `until` to deprecations. [\#102](https://github.com/emberjs/ember-test-helpers/pull/102) ([rwjblue](https://github.com/rwjblue))

## [v0.5.10](https://github.com/emberjs/ember-test-helpers/tree/v0.5.10) (2015-09-13)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.9...v0.5.10)

**Closed issues:**

- \[CANARY\] Test suite fails against ember-canary 2.2.0 [\#99](https://github.com/emberjs/ember-test-helpers/issues/99)
- No way to call component.didInsertElement\(\) in component integration test [\#84](https://github.com/emberjs/ember-test-helpers/issues/84)

**Merged pull requests:**

- Move action handling from module to context [\#101](https://github.com/emberjs/ember-test-helpers/pull/101) ([ef4](https://github.com/ef4))
- Do not register a router service for Ember \<1.13 [\#100](https://github.com/emberjs/ember-test-helpers/pull/100) ([mixonic](https://github.com/mixonic))
- Fix typo in thrown error [\#98](https://github.com/emberjs/ember-test-helpers/pull/98) ([HeroicEric](https://github.com/HeroicEric))

## [v0.5.9](https://github.com/emberjs/ember-test-helpers/tree/v0.5.9) (2015-08-20)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.8...v0.5.9)

**Merged pull requests:**

- Allow overriding services/factories in the registry. [\#96](https://github.com/emberjs/ember-test-helpers/pull/96) ([rwjblue](https://github.com/rwjblue))
- Update ember-try config. [\#95](https://github.com/emberjs/ember-test-helpers/pull/95) ([rwjblue](https://github.com/rwjblue))
- \[BUGFIX\] Pass in model name to `store.adapterFor` [\#93](https://github.com/emberjs/ember-test-helpers/pull/93) ([seanpdoyle](https://github.com/seanpdoyle))
- Throw when integration and needs declared [\#78](https://github.com/emberjs/ember-test-helpers/pull/78) ([bcardarella](https://github.com/bcardarella))
- Additional dom testing events. [\#66](https://github.com/emberjs/ember-test-helpers/pull/66) ([blimmer](https://github.com/blimmer))

## [v0.5.8](https://github.com/emberjs/ember-test-helpers/tree/v0.5.8) (2015-07-30)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.7...v0.5.8)

**Closed issues:**

- Recent view registry change breaks tests [\#91](https://github.com/emberjs/ember-test-helpers/issues/91)
- Deprecation message You tried to look up 'store:main', but this has been deprecated in favor of 'service:store' [\#65](https://github.com/emberjs/ember-test-helpers/issues/65)
- Deprecation message DS.FixtureAdapter has been deprecated [\#64](https://github.com/emberjs/ember-test-helpers/issues/64)

**Merged pull requests:**

- Ensure view-registry is injected for unit tested components. [\#92](https://github.com/emberjs/ember-test-helpers/pull/92) ([rwjblue](https://github.com/rwjblue))

## [v0.5.7](https://github.com/emberjs/ember-test-helpers/tree/v0.5.7) (2015-07-28)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.6...v0.5.7)

**Merged pull requests:**

- Consistently use the new view registry [\#90](https://github.com/emberjs/ember-test-helpers/pull/90) ([ef4](https://github.com/ef4))

## [v0.5.6](https://github.com/emberjs/ember-test-helpers/tree/v0.5.6) (2015-07-24)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.5...v0.5.6)

**Merged pull requests:**

- Add support for closure actions in component integration test [\#89](https://github.com/emberjs/ember-test-helpers/pull/89) ([martndemus](https://github.com/martndemus))
- Remove dependencies that are actually dev dependencies [\#88](https://github.com/emberjs/ember-test-helpers/pull/88) ([chadhietala](https://github.com/chadhietala))

## [v0.5.5](https://github.com/emberjs/ember-test-helpers/tree/v0.5.5) (2015-07-23)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.4...v0.5.5)

**Closed issues:**

- Angle bracket components error when resolving [\#77](https://github.com/emberjs/ember-test-helpers/issues/77)

**Merged pull requests:**

- ensure we correctly cleanup the context [\#87](https://github.com/emberjs/ember-test-helpers/pull/87) ([stefanpenner](https://github.com/stefanpenner))

## [v0.5.4](https://github.com/emberjs/ember-test-helpers/tree/v0.5.4) (2015-07-21)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.3...v0.5.4)

**Merged pull requests:**

- Avoid using container.register. [\#86](https://github.com/emberjs/ember-test-helpers/pull/86) ([rwjblue](https://github.com/rwjblue))

## [v0.5.3](https://github.com/emberjs/ember-test-helpers/tree/v0.5.3) (2015-07-21)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.2...v0.5.3)

**Closed issues:**

- "Render node exists without concomitant env" in 1.13.4 [\#76](https://github.com/emberjs/ember-test-helpers/issues/76)

**Merged pull requests:**

- Only override container methods if present. [\#85](https://github.com/emberjs/ember-test-helpers/pull/85) ([rwjblue](https://github.com/rwjblue))

## [v0.5.2](https://github.com/emberjs/ember-test-helpers/tree/v0.5.2) (2015-07-20)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.1...v0.5.2)

**Closed issues:**

- Does not work with Ember 2.0.0 beta 3 [\#80](https://github.com/emberjs/ember-test-helpers/issues/80)
- Component integration tests used deprecated Ember.View [\#59](https://github.com/emberjs/ember-test-helpers/issues/59)

**Merged pull requests:**

- Prevent errors when Ember.View / Ember.\_MetamorphView are undefined. [\#79](https://github.com/emberjs/ember-test-helpers/pull/79) ([rwjblue](https://github.com/rwjblue))
- allow getProperties and setProperties for component integration tests [\#68](https://github.com/emberjs/ember-test-helpers/pull/68) ([CodeOfficer](https://github.com/CodeOfficer))

## [v0.5.1](https://github.com/emberjs/ember-test-helpers/tree/v0.5.1) (2015-07-06)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.5.0...v0.5.1)

**Closed issues:**

- remove dependency on klassy, prefer raw JS or core-object [\#56](https://github.com/emberjs/ember-test-helpers/issues/56)
- Accessing store and other services from [\#50](https://github.com/emberjs/ember-test-helpers/issues/50)
- this.subject\(\) throws error in moduleForModel if { integration: true } [\#46](https://github.com/emberjs/ember-test-helpers/issues/46)
- TestModuleForComponent, integration: true, and {{link-to}} incompatible [\#41](https://github.com/emberjs/ember-test-helpers/issues/41)

**Merged pull requests:**

- Update test-module-for-model.js [\#74](https://github.com/emberjs/ember-test-helpers/pull/74) ([quaertym](https://github.com/quaertym))
- Guard against exceptions in the setup steps. [\#73](https://github.com/emberjs/ember-test-helpers/pull/73) ([winding-lines](https://github.com/winding-lines))
- Ember.keys is deprecated in favor of Object.keys [\#71](https://github.com/emberjs/ember-test-helpers/pull/71) ([jpadilla](https://github.com/jpadilla))
- punctual punctuation [\#69](https://github.com/emberjs/ember-test-helpers/pull/69) ([CodeOfficer](https://github.com/CodeOfficer))
- Add a test for {{component}} helper [\#62](https://github.com/emberjs/ember-test-helpers/pull/62) ([ef4](https://github.com/ef4))
- Don't replace Ember's internal view:toplevel [\#61](https://github.com/emberjs/ember-test-helpers/pull/61) ([ef4](https://github.com/ef4))
- Compatibility with Ember 1.13+ [\#60](https://github.com/emberjs/ember-test-helpers/pull/60) ([ef4](https://github.com/ef4))

## [v0.5.0](https://github.com/emberjs/ember-test-helpers/tree/v0.5.0) (2015-05-18)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.4.6...v0.5.0)

**Merged pull requests:**

- Remove isolatedContainer and use Ember.Application.buildRegistry. [\#49](https://github.com/emberjs/ember-test-helpers/pull/49) ([rwjblue](https://github.com/rwjblue))

## [v0.4.6](https://github.com/emberjs/ember-test-helpers/tree/v0.4.6) (2015-05-18)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.4.5...v0.4.6)

**Closed issues:**

- moduleForComponent accepts 3 or 1 argument, should also accept 2 [\#52](https://github.com/emberjs/ember-test-helpers/issues/52)
- Feature request: support for block-params [\#40](https://github.com/emberjs/ember-test-helpers/issues/40)
- Proposal: switching to template-driven component integration tests [\#25](https://github.com/emberjs/ember-test-helpers/issues/25)

**Merged pull requests:**

- Ensure moduleForComponent with description works. [\#53](https://github.com/emberjs/ember-test-helpers/pull/53) ([rwjblue](https://github.com/rwjblue))

## [v0.4.5](https://github.com/emberjs/ember-test-helpers/tree/v0.4.5) (2015-05-14)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.4.4...v0.4.5)

**Closed issues:**

- Needs no longer optional in v0.4.4? Unit tests deprecated? [\#47](https://github.com/emberjs/ember-test-helpers/issues/47)
- New factories in isolatedContainer for Glimmer [\#43](https://github.com/emberjs/ember-test-helpers/issues/43)

**Merged pull requests:**

- Allow missing arguments for `moduleForComponent`. [\#48](https://github.com/emberjs/ember-test-helpers/pull/48) ([rwjblue](https://github.com/rwjblue))
- Add javascript syntax highlighting to README example [\#45](https://github.com/emberjs/ember-test-helpers/pull/45) ([HeroicEric](https://github.com/HeroicEric))

## [v0.4.4](https://github.com/emberjs/ember-test-helpers/tree/v0.4.4) (2015-05-06)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.4.3...v0.4.4)

**Merged pull requests:**

- Add container items required for Glimmer. [\#44](https://github.com/emberjs/ember-test-helpers/pull/44) ([rwjblue](https://github.com/rwjblue))
- Delegate to DS.\_setupContainer when available to register service:store [\#39](https://github.com/emberjs/ember-test-helpers/pull/39) ([bmac](https://github.com/bmac))
- Support component integration tests [\#38](https://github.com/emberjs/ember-test-helpers/pull/38) ([ef4](https://github.com/ef4))
- Add automated testing against many Ember versions. [\#35](https://github.com/emberjs/ember-test-helpers/pull/35) ([rwjblue](https://github.com/rwjblue))

## [v0.4.3](https://github.com/emberjs/ember-test-helpers/tree/v0.4.3) (2015-04-04)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.4.2...v0.4.3)

**Merged pull requests:**

- Use container to register custom DS keys. [\#34](https://github.com/emberjs/ember-test-helpers/pull/34) ([dgeb](https://github.com/dgeb))

## [v0.4.2](https://github.com/emberjs/ember-test-helpers/tree/v0.4.2) (2015-04-04)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.4.1...v0.4.2)

**Closed issues:**

- isolated-container depends on private view [\#30](https://github.com/emberjs/ember-test-helpers/issues/30)

**Merged pull requests:**

- Register some built in Ember Data objects if ED exists on the page. [\#33](https://github.com/emberjs/ember-test-helpers/pull/33) ([bmac](https://github.com/bmac))
- Asynchronous module hooks [\#32](https://github.com/emberjs/ember-test-helpers/pull/32) ([ef4](https://github.com/ef4))

## [v0.4.1](https://github.com/emberjs/ember-test-helpers/tree/v0.4.1) (2015-03-24)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.4.0...v0.4.1)

**Merged pull requests:**

- Ensure `moduleForModel` uses the correct store for `subject`. [\#28](https://github.com/emberjs/ember-test-helpers/pull/28) ([rwjblue](https://github.com/rwjblue))

## [v0.4.0](https://github.com/emberjs/ember-test-helpers/tree/v0.4.0) (2015-03-17)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.3.6...v0.4.0)

**Merged pull requests:**

- \[breaking\] Remove `view.$\(\)` call in `render\(\)` of module for component [\#27](https://github.com/emberjs/ember-test-helpers/pull/27) ([bantic](https://github.com/bantic))

## [v0.3.6](https://github.com/emberjs/ember-test-helpers/tree/v0.3.6) (2015-03-12)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.3.5...v0.3.6)

**Merged pull requests:**

- Move integration container logic to TestModule [\#24](https://github.com/emberjs/ember-test-helpers/pull/24) ([nikz](https://github.com/nikz))

## [v0.3.5](https://github.com/emberjs/ember-test-helpers/tree/v0.3.5) (2015-03-11)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.3.4...v0.3.5)

**Closed issues:**

- setup and teardown are not passing original arguments from frameworks [\#22](https://github.com/emberjs/ember-test-helpers/issues/22)

**Merged pull requests:**

- Set `registry.normalizeFullName` to `resolver.normalize`. [\#23](https://github.com/emberjs/ember-test-helpers/pull/23) ([dgeb](https://github.com/dgeb))
- Adding standalone integration test support [\#21](https://github.com/emberjs/ember-test-helpers/pull/21) ([ef4](https://github.com/ef4))

## [v0.3.4](https://github.com/emberjs/ember-test-helpers/tree/v0.3.4) (2015-02-22)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.3.3...v0.3.4)

**Merged pull requests:**

- Fix `afterTeardown` callback removal. [\#19](https://github.com/emberjs/ember-test-helpers/pull/19) ([rwjblue](https://github.com/rwjblue))
- destroy the subject in teardown [\#18](https://github.com/emberjs/ember-test-helpers/pull/18) ([CodeOfficer](https://github.com/CodeOfficer))
- make sure bower\_components folder is where broccoli expects [\#17](https://github.com/emberjs/ember-test-helpers/pull/17) ([CodeOfficer](https://github.com/CodeOfficer))

## [v0.3.3](https://github.com/emberjs/ember-test-helpers/tree/v0.3.3) (2015-02-19)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.3.2...v0.3.3)

**Merged pull requests:**

- Component not in dom in willDestroyElement [\#16](https://github.com/emberjs/ember-test-helpers/pull/16) ([craigteegarden](https://github.com/craigteegarden))

## [v0.3.2](https://github.com/emberjs/ember-test-helpers/tree/v0.3.2) (2015-02-10)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.3.1...v0.3.2)

**Merged pull requests:**

- Expose registry methods from isolatedContainer without deprecations. [\#15](https://github.com/emberjs/ember-test-helpers/pull/15) ([dgeb](https://github.com/dgeb))
- Ensure callbacks are called in the test module's context. [\#14](https://github.com/emberjs/ember-test-helpers/pull/14) ([dgeb](https://github.com/dgeb))

## [v0.3.1](https://github.com/emberjs/ember-test-helpers/tree/v0.3.1) (2015-02-08)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.3.0...v0.3.1)

**Merged pull requests:**

- Upgrade ember to 1.10.0 and remove handlebars. [\#13](https://github.com/emberjs/ember-test-helpers/pull/13) ([dgeb](https://github.com/dgeb))

## [v0.3.0](https://github.com/emberjs/ember-test-helpers/tree/v0.3.0) (2015-01-31)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.2.0...v0.3.0)

**Merged pull requests:**

- Ensure that `setup` callback is invoked with the correct context. [\#12](https://github.com/emberjs/ember-test-helpers/pull/12) ([rwjblue](https://github.com/rwjblue))
- Use ember-cli for easier building. [\#11](https://github.com/emberjs/ember-test-helpers/pull/11) ([rwjblue](https://github.com/rwjblue))

## [v0.2.0](https://github.com/emberjs/ember-test-helpers/tree/v0.2.0) (2015-01-22)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.1.0...v0.2.0)

## [v0.1.0](https://github.com/emberjs/ember-test-helpers/tree/v0.1.0) (2015-01-22)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.0.7...v0.1.0)

**Merged pull requests:**

- Update ES6 module transpiler and proper sourcemap concatenation [\#10](https://github.com/emberjs/ember-test-helpers/pull/10) ([chadhietala](https://github.com/chadhietala))
- Move to loader.js@3.0.0 and use ember-cli dependencies [\#9](https://github.com/emberjs/ember-test-helpers/pull/9) ([chadhietala](https://github.com/chadhietala))

## [v0.0.7](https://github.com/emberjs/ember-test-helpers/tree/v0.0.7) (2014-11-19)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.0.6...v0.0.7)

**Merged pull requests:**

- The isolated container exposes Ember's controllers. [\#4](https://github.com/emberjs/ember-test-helpers/pull/4) ([cyril-sf](https://github.com/cyril-sf))
- Make sure container and resolver normalize the same way [\#2](https://github.com/emberjs/ember-test-helpers/pull/2) ([marcoow](https://github.com/marcoow))

## [v0.0.6](https://github.com/emberjs/ember-test-helpers/tree/v0.0.6) (2014-10-20)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.0.5...v0.0.6)

## [v0.0.5](https://github.com/emberjs/ember-test-helpers/tree/v0.0.5) (2014-10-14)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.0.4...v0.0.5)

## [v0.0.4](https://github.com/emberjs/ember-test-helpers/tree/v0.0.4) (2014-10-14)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.0.3...v0.0.4)

## [v0.0.3](https://github.com/emberjs/ember-test-helpers/tree/v0.0.3) (2014-10-07)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.0.2...v0.0.3)

**Closed issues:**

- Configure testem for CI testing [\#1](https://github.com/emberjs/ember-test-helpers/issues/1)

## [v0.0.2](https://github.com/emberjs/ember-test-helpers/tree/v0.0.2) (2014-10-02)
[Full Changelog](https://github.com/emberjs/ember-test-helpers/compare/v0.0.1...v0.0.2)

## [v0.0.1](https://github.com/emberjs/ember-test-helpers/tree/v0.0.1) (2014-05-03)
