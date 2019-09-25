## v6.10.1 (2019-08-23)

#### :bug: Bug Fix
* [#488](https://github.com/ember-cli/eslint-plugin-ember/pull/488) Update `require-computed-property-dependencies` rule to support eslint 3 and 4 ([@bmish](https://github.com/bmish))

#### :memo: Documentation
* [#489](https://github.com/ember-cli/eslint-plugin-ember/pull/489) Document eslint 4 as the minimum supported version ([@bmish](https://github.com/bmish))

#### :house: Internal
* [#482](https://github.com/ember-cli/eslint-plugin-ember/pull/482) Start testing plugin under Node 12 ([@bmish](https://github.com/bmish))

#### Committers: 1
- Bryan Mishkin ([@bmish](https://github.com/bmish))

## v6.10.0 (2019-08-19)

#### :rocket: Enhancement
* [#473](https://github.com/ember-cli/eslint-plugin-ember/pull/473) Add new `no-incorrect-calls-with-inline-anonymous-functions` rule ([@raycohen](https://github.com/raycohen))

#### :bug: Bug Fix
* [#476](https://github.com/ember-cli/eslint-plugin-ember/pull/476) Add `allowDynamicKeys` option (default true) to `require-computed-property-dependencies` rule ([@bmish](https://github.com/bmish))

#### Committers: 2
- Bryan Mishkin ([@bmish](https://github.com/bmish))
- Ray Cohen ([@raycohen](https://github.com/raycohen))

## v6.9.1 (2019-08-14)

#### :bug: Bug Fix
* [#472](https://github.com/ember-cli/eslint-plugin-ember/pull/472) Improve handling of nested keys inside braces for `require-computed-property-dependencies` rule ([@bmish](https://github.com/bmish))
* [#471](https://github.com/ember-cli/eslint-plugin-ember/pull/471) Improve detection of missing dependencies in `require-computed-property-dependencies` rule ([@bmish](https://github.com/bmish))

#### Committers: 1
- Bryan Mishkin ([@bmish](https://github.com/bmish))

## v6.9.0 (2019-08-12)

#### :rocket: Enhancement
* [#458](https://github.com/ember-cli/eslint-plugin-ember/pull/458) Add new rule `require-computed-property-dependencies` ([@bmish](https://github.com/bmish))

#### :bug: Bug Fix
* [#463](https://github.com/ember-cli/eslint-plugin-ember/pull/463) Fix false positives for import statements with `use-ember-data-rfc-395-imports` rule ([@fusion2004](https://github.com/fusion2004))

#### :house: Internal
* [#465](https://github.com/ember-cli/eslint-plugin-ember/pull/465) Add tests that rules are setup correctly (not missing tests, docs, exports, etc) ([@bmish](https://github.com/bmish))
* [#466](https://github.com/ember-cli/eslint-plugin-ember/pull/466) Fix eslint 6 rule test parser error ([@bmish](https://github.com/bmish))

#### Committers: 2
- Bryan Mishkin ([@bmish](https://github.com/bmish))
- Mark Oleson ([@fusion2004](https://github.com/fusion2004))

## v6.8.2 (2019-08-08)

#### :bug: Bug Fix
* [#461](https://github.com/ember-cli/eslint-plugin-ember/pull/461) Add null check in `new-module-imports` rule (again) ([@bmish](https://github.com/bmish))

#### Committers: 1
- Bryan Mishkin ([@bmish](https://github.com/bmish))

## v6.8.1 (2019-08-08)

#### :bug: Bug Fix
* [#460](https://github.com/ember-cli/eslint-plugin-ember/pull/460) Add null check in `new-module-imports` rule ([@dcyriller](https://github.com/dcyriller))

#### Committers: 1
- Cyrille David ([@dcyriller](https://github.com/dcyriller))

## v6.8.0 (2019-08-08)

#### :rocket: Enhancement
* [#450](https://github.com/ember-cli/eslint-plugin-ember/pull/450) Add new `use-ember-data-rfc-395-imports` rule ([@dcyriller](https://github.com/dcyriller))
* [#457](https://github.com/ember-cli/eslint-plugin-ember/pull/457) Add new `no-arrow-function-computed-properties` rule ([@bmish](https://github.com/bmish))
* [#445](https://github.com/ember-cli/eslint-plugin-ember/pull/445) Add new `no-proxies` rule ([@bmish](https://github.com/bmish))

#### :memo: Documentation
* [#454](https://github.com/ember-cli/eslint-plugin-ember/pull/454) Improve justification for `no-observers` rule ([@efx](https://github.com/efx))

#### :house: Internal
* [#456](https://github.com/ember-cli/eslint-plugin-ember/pull/456) Upgrade from eslint 4 to 5 ([@bmish](https://github.com/bmish))

#### Committers: 3
- Bryan Mishkin ([@bmish](https://github.com/bmish))
- Cyrille David ([@dcyriller](https://github.com/dcyriller))
- Eli Flanagan ([@efx](https://github.com/efx))

## v6.7.1 (2019-07-02)

#### :bug: Bug Fix
* [#440](https://github.com/ember-cli/eslint-plugin-ember/pull/440) Add missing rules `classic-decorator-hooks` and `classic-decorator-no-classic-methods` to index.js ([@bmish](https://github.com/bmish))

#### Committers: 1
- Bryan Mishkin ([@bmish](https://github.com/bmish))

## v6.7.0 (2019-06-22)

#### :rocket: Enhancement
* [#436](https://github.com/ember-cli/eslint-plugin-ember/pull/436) Adds decorator rules to aid migration to Octane ([@pzuraq](https://github.com/pzuraq))
* [#434](https://github.com/ember-cli/eslint-plugin-ember/pull/434) Add new `no-volatile-computed-properties` rule ([@bmish](https://github.com/bmish))

#### :bug: Bug Fix
* [#432](https://github.com/ember-cli/eslint-plugin-ember/pull/432) Update `require-computed-macros` rule to suggest the `reads` macro instead of `readOnly` for computed properties with `return this.x` ([@bmish](https://github.com/bmish))

#### :house: Internal
* [#435](https://github.com/ember-cli/eslint-plugin-ember/pull/435) Update ESLint config incl. Prettier ([@Turbo87](https://github.com/Turbo87))

#### Committers: 4
- Bryan Mishkin ([@bmish](https://github.com/bmish))
- Chris Garrett ([@pzuraq](https://github.com/pzuraq))
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)


## v6.6.0 (2019-06-16)

#### :rocket: Enhancement
* [#429](https://github.com/ember-cli/eslint-plugin-ember/pull/429) Add new `require-computed-macros` rule ([@bmish](https://github.com/bmish))

#### :bug: Bug Fix
* [#428](https://github.com/ember-cli/eslint-plugin-ember/pull/428) Fix spread operator bug in `no-on-calls-in-components` rule ([@rajasegar](https://github.com/rajasegar))

#### :memo: Documentation
* [#431](https://github.com/ember-cli/eslint-plugin-ember/pull/431) Add link to `sendAction` deprecation RFC for `closure-actions` rule ([@bmish](https://github.com/bmish))

#### Committers: 2
- Bryan Mishkin ([@bmish](https://github.com/bmish))
- Rajasegar Chandran ([@rajasegar](https://github.com/rajasegar))

## v6.5.1 (2019-05-27)

#### :bug: Bug Fix
* [#427](https://github.com/ember-cli/eslint-plugin-ember/pull/427) Fix typo in error message for `no-get` rule ([@bmish](https://github.com/bmish))

#### Committers: 1
- Bryan Mishkin ([@bmish](https://github.com/bmish))

## v6.5.0 (2019-05-26)

#### :rocket: Enhancement
* [#421](https://github.com/ember-cli/eslint-plugin-ember/pull/421) Update the `no-get` rule to also handle the `getProperties` function, and mark the `no-get-properties` rule as deprecated ([@bmish](https://github.com/bmish))
* [#397](https://github.com/ember-cli/eslint-plugin-ember/pull/397) Add new `computed-property-getters` rule ([@jrjohnson](https://github.com/jrjohnson))

#### :memo: Documentation
* [#412](https://github.com/ember-cli/eslint-plugin-ember/pull/412) Update release instructions ([@bmish](https://github.com/bmish))

#### Committers: 2
- Bryan Mishkin ([@bmish](https://github.com/bmish))
- Jonathan Johnson ([@jrjohnson](https://github.com/jrjohnson))

## v6.4.1 (2019-04-21)

#### :bug: Bug Fix
* [#413](https://github.com/ember-cli/eslint-plugin-ember/pull/413) Ignore template literals in `no-get` and `no-get-properties` rules ([@bmish](https://github.com/bmish))

#### Committers: 1
- Bryan Mishkin ([@bmish](https://github.com/bmish))

## v6.4.0 (2019-04-21)

#### :rocket: Enhancement
* [#403](https://github.com/ember-cli/eslint-plugin-ember/pull/403) Add new `no-get-properties` rule ([@bmish](https://github.com/bmish))
* [#404](https://github.com/ember-cli/eslint-plugin-ember/pull/404) Add new `no-get` rule ([@bmish](https://github.com/bmish))

#### :bug: Bug Fix
* [#398](https://github.com/ember-cli/eslint-plugin-ember/pull/398) `no-unnecessary-route-path-option`: fix error when `path` is undefined ([@bmish](https://github.com/bmish))

#### :memo: Documentation
* [#411](https://github.com/ember-cli/eslint-plugin-ember/pull/411) Update contributors ([@bmish](https://github.com/bmish))
* [#409](https://github.com/ember-cli/eslint-plugin-ember/pull/409) Update documentation for `require-return-from-computed` rule ([@esbanarango](https://github.com/esbanarango))

#### Committers: 2
- Bryan Mishkin ([@bmish](https://github.com/bmish))
- Esteban Arango Medina ([@esbanarango](https://github.com/esbanarango))

## v6.3.0 (2019-03-19)

#### :rocket: Enhancement
* [#369](https://github.com/ember-cli/eslint-plugin-ember/pull/369) Add new 'route-path-style' rule ([@bmish](https://github.com/bmish))
* [#372](https://github.com/ember-cli/eslint-plugin-ember/pull/372) Add new 'no-unnecessary-index-route'  rule ([@bmish](https://github.com/bmish))
* [#262](https://github.com/ember-cli/eslint-plugin-ember/pull/262) Add new 'require-return-from-computed' rule ([@gmurphey](https://github.com/gmurphey))
* [#378](https://github.com/ember-cli/eslint-plugin-ember/pull/378) Add new `no-unnecessary-service-injection-argument` rule ([@bmish](https://github.com/bmish))

#### :memo: Documentation
* [#395](https://github.com/ember-cli/eslint-plugin-ember/pull/395) docs: improve `closure-action` rule examples ([@Caltor](https://github.com/Caltor))
* [#383](https://github.com/ember-cli/eslint-plugin-ember/pull/383) no-deeply-nested-dependent-keys-with-each: Fix documentation examples ([@Alonski](https://github.com/Alonski))

#### :house: Internal
* [#386](https://github.com/ember-cli/eslint-plugin-ember/pull/386) test: add null output assertions for lint rules / test cases with no autofixer. ([@bmish](https://github.com/bmish))

#### Committers: 4
- Alon Bukai ([@Alonski](https://github.com/Alonski))
- Bryan Mishkin ([@bmish](https://github.com/bmish))
- Garrett Murphey ([@gmurphey](https://github.com/gmurphey))
- [@Caltor](https://github.com/Caltor)

## v6.2.0 (2019-01-28)

#### :rocket: Enhancement
* [#375](https://github.com/ember-cli/eslint-plugin-ember/pull/375) no-test-and-then: slight optimization ([@bmish](https://github.com/bmish))
* [#373](https://github.com/ember-cli/eslint-plugin-ember/pull/373) no-unnecessary-route-path-option: Add support for `--fix` ([@bmish](https://github.com/bmish))
* [#370](https://github.com/ember-cli/eslint-plugin-ember/pull/370) Add `no-unnecessary-route-path-option` rule ([@bmish](https://github.com/bmish))
* [#365](https://github.com/ember-cli/eslint-plugin-ember/pull/365) no-invalid-debug-function-arguments: Use dynamic error message ([@bmish](https://github.com/bmish))
* [#364](https://github.com/ember-cli/eslint-plugin-ember/pull/364) assert-arg-order: Rename to `no-invalid-debug-function-arguments` and detect invalid usages of `deprecate` and `warn` too ([@bmish](https://github.com/bmish))
* [#358](https://github.com/ember-cli/eslint-plugin-ember/pull/358) Add `assert-arg-order` rule ([@bmish](https://github.com/bmish))
* [#359](https://github.com/ember-cli/eslint-plugin-ember/pull/359) Add `no-deeply-nested-dependent-keys-with-each` rule ([@bmish](https://github.com/bmish))
* [#357](https://github.com/ember-cli/eslint-plugin-ember/pull/357) Add `no-test-and-then` rule ([@bmish](https://github.com/bmish))

#### :bug: Bug Fix
* [#371](https://github.com/ember-cli/eslint-plugin-ember/pull/371) no-test-and-then: Run only on test files ([@bmish](https://github.com/bmish))
* [#367](https://github.com/ember-cli/eslint-plugin-ember/pull/367) no-deeply-nested-dependent-keys-with-each: Fix false positives ([@bmish](https://github.com/bmish))
* [#366](https://github.com/ember-cli/eslint-plugin-ember/pull/366) no-invalid-debug-function-arguments: Fix false positives ([@bmish](https://github.com/bmish))
* [#362](https://github.com/ember-cli/eslint-plugin-ember/pull/362) assert-arg-order: Fix rule for `Ember.assert()` case ([@bmish](https://github.com/bmish))

#### :memo: Documentation
* [#380](https://github.com/ember-cli/eslint-plugin-ember/pull/380) no-test-and-then: Add migration path docs ([@bmish](https://github.com/bmish))
* [#368](https://github.com/ember-cli/eslint-plugin-ember/pull/368) no-test-and-then: Fix code sample in docs ([@bmish](https://github.com/bmish))
* [#361](https://github.com/ember-cli/eslint-plugin-ember/pull/361) no-deeply-nested-dependent-keys-with-each: Fix docs typo ([@bmish](https://github.com/bmish))
* [#360](https://github.com/ember-cli/eslint-plugin-ember/pull/360) Use more specific array types in util jsdoc comments ([@bmish](https://github.com/bmish))
* [#355](https://github.com/ember-cli/eslint-plugin-ember/pull/355) avoid-leaking-state-in-ember-objects: Show usage example of `DEFAULT_IGNORED_PROPERTIES` ([@yoavfranco](https://github.com/yoavfranco))
* [#354](https://github.com/ember-cli/eslint-plugin-ember/pull/354) avoid-needs-in-controllers: Add documentation ([@quajo](https://github.com/quajo))

#### :house: Internal
* [#363](https://github.com/ember-cli/eslint-plugin-ember/pull/363) no-deeply-nested-dependent-keys-with-each: Add more tests ([@bmish](https://github.com/bmish))

#### Committers: 3
- Bryan Mishkin ([@bmish](https://github.com/bmish))
- Selase Krakani ([@quajo](https://github.com/quajo))
- Yoav M. Franco ([@yoavfranco](https://github.com/yoavfranco))


## v6.1.0 (2018-12-15)

#### :rocket: Enhancement
* [#350](https://github.com/ember-cli/eslint-plugin-ember/pull/350) Introduce `no-ember-super-in-es-classes` rule ([@dfreeman](https://github.com/dfreeman))
* [#298](https://github.com/ember-cli/eslint-plugin-ember/pull/298) no-jquery: Check for aliased imports from 'jquery' module ([@initram](https://github.com/initram))

#### :bug: Bug Fix
* [#353](https://github.com/ember-cli/eslint-plugin-ember/pull/353) Fix error with `avoid-leaking-state-in-ember-objects` and spread ([@nlfurniss](https://github.com/nlfurniss))
* [#348](https://github.com/ember-cli/eslint-plugin-ember/pull/348) Fix `no-restricted-resolver-tests` to narrow scope of rule ([@scalvert](https://github.com/scalvert))
* [#332](https://github.com/ember-cli/eslint-plugin-ember/pull/332) use-brace-expansion: Limit lint rule to only trigger for `computed()` but no other macros ([@gmurphey](https://github.com/gmurphey))

#### :memo: Documentation
* [#349](https://github.com/ember-cli/eslint-plugin-ember/pull/349) Update `avoid-leaking-state-in-ember-objects` documentation. ([@samselikoff](https://github.com/samselikoff))
* [#345](https://github.com/ember-cli/eslint-plugin-ember/pull/345) Fix typo on `getNoPOJOWithoutIntegrationTrueMessage`. ([@esbanarango](https://github.com/esbanarango))
* [#341](https://github.com/ember-cli/eslint-plugin-ember/pull/341) Clarify `no-ember-testing-in-module-scope` documentation. ([@cibernox](https://github.com/cibernox))

#### :house: Internal
* [#347](https://github.com/ember-cli/eslint-plugin-ember/pull/347) TravisCI: Remove deprecated `sudo: false` option ([@Turbo87](https://github.com/Turbo87))

#### Committers: 9
- Dan Freeman ([@dfreeman](https://github.com/dfreeman))
- Esteban Arango Medina ([@esbanarango](https://github.com/esbanarango))
- Garrett Murphey ([@gmurphey](https://github.com/gmurphey))
- Martin Midtgaard ([@initram](https://github.com/initram))
- Miguel Camba ([@cibernox](https://github.com/cibernox))
- Nathaniel Furniss ([@nlfurniss](https://github.com/nlfurniss))
- Sam Selikoff ([@samselikoff](https://github.com/samselikoff))
- Steve Calvert ([@scalvert](https://github.com/scalvert))
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))

## v6.0.1 (2018-11-16)

#### :rocket: Enhancement
* [#331](https://github.com/ember-cli/eslint-plugin-ember/pull/331) Updating no-side-effects to also report on setProperties. ([@gmurphey](https://github.com/gmurphey))

#### :bug: Bug Fix
* [#340](https://github.com/ember-cli/eslint-plugin-ember/pull/340) no-restricted-resolver: Fix crashes ([@Turbo87](https://github.com/Turbo87))

#### :house: Internal
* [#335](https://github.com/ember-cli/eslint-plugin-ember/pull/335) Remove outdated `.nvmrc` file ([@Turbo87](https://github.com/Turbo87))
* [#334](https://github.com/ember-cli/eslint-plugin-ember/pull/334) package.json: Limit published files to the `lib` folder ([@Turbo87](https://github.com/Turbo87))
* [#336](https://github.com/ember-cli/eslint-plugin-ember/pull/336) CI: Use `--runInBand` option of Jest to speed up tests ([@Turbo87](https://github.com/Turbo87))

#### Committers: 2
- Garrett Murphey ([@gmurphey](https://github.com/gmurphey))
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))


## v6.0.0 (2018-11-14)

This release includes several changes to the `ember/recommended` configuration,
and drops support for Node.js 4 and ESLint 3.

#### :boom: Breaking Change
* [#311](https://github.com/ember-cli/eslint-plugin-ember/pull/311) Add `avoid-using-needs-in-controllers` to recommended set. ([@rwjblue](https://github.com/rwjblue))
* [#310](https://github.com/ember-cli/eslint-plugin-ember/pull/310) Add `no-restricted-resolver-tests` to recommended. ([@rwjblue](https://github.com/rwjblue))
* [#309](https://github.com/ember-cli/eslint-plugin-ember/pull/309) Make `no-observers` rule recommended ([@Gaurav0](https://github.com/Gaurav0))
* [#274](https://github.com/ember-cli/eslint-plugin-ember/pull/274) Add `no-ember-testing-in-module-scope` to recommended ([@tmquinn](https://github.com/tmquinn))
* [#267](https://github.com/ember-cli/eslint-plugin-ember/pull/267) Remove deprecated `experimentalObjectRestSpread` option ([@scottkidder](https://github.com/scottkidder))
* [#255](https://github.com/ember-cli/eslint-plugin-ember/pull/255) Drop Node 4 support. ([@rwjblue](https://github.com/rwjblue))

#### :rocket: Enhancement
* [#311](https://github.com/ember-cli/eslint-plugin-ember/pull/311) Add `avoid-using-needs-in-controllers` to recommended set. ([@rwjblue](https://github.com/rwjblue))
* [#310](https://github.com/ember-cli/eslint-plugin-ember/pull/310) Add no-restricted-resolver-tests to recommended. ([@rwjblue](https://github.com/rwjblue))
* [#309](https://github.com/ember-cli/eslint-plugin-ember/pull/309) Make no-observers rule recommended ([@Gaurav0](https://github.com/Gaurav0))

#### Committers: 4
- Gaurav Munjal ([@Gaurav0](https://github.com/Gaurav0))
- Quinn Hoyer ([@tmquinn](https://github.com/tmquinn))
- Robert Jackson ([@rwjblue](https://github.com/rwjblue))
- Scott Kidder ([@scottkidder](https://github.com/scottkidder))


## v5.4.0 (2018-11-09)

#### :rocket: Enhancement
* [#253](https://github.com/ember-cli/eslint-plugin-ember/pull/253) Add `avoid-using-needs` rule. ([@twokul](https://github.com/twokul))

#### :bug: Bug Fix
* [#314](https://github.com/ember-cli/eslint-plugin-ember/pull/314) Adding missing rules to index.js. ([@gmurphey](https://github.com/gmurphey))

#### Committers: 2
- Alex Navasardyan ([twokul](https://github.com/twokul))
- Garrett Murphey ([gmurphey](https://github.com/gmurphey))


## v5.3.0 (2018-11-08)

#### :rocket: Enhancement
* [#278](https://github.com/ember-cli/eslint-plugin-ember/pull/278) Adding `no-restricted-resolver-tests` general rule. ([@scalvert](https://github.com/scalvert))
* [#272](https://github.com/ember-cli/eslint-plugin-ember/pull/272) Add new rule `no-ember-testing-in-module-scope`. ([@tmquinn](https://github.com/tmquinn))
* [#261](https://github.com/ember-cli/eslint-plugin-ember/pull/261) Adding `no-test-file-importing` rule. ([@step2yeung](https://github.com/step2yeung))
* [#256](https://github.com/ember-cli/eslint-plugin-ember/pull/256) Add `no-new-mixins` rule. ([@nlfurniss](https://github.com/nlfurniss))

#### :bug: Bug Fix
* [#299](https://github.com/ember-cli/eslint-plugin-ember/pull/299) Fix issue with `no-duplicate-dependent-keys` to avoid errors on non-string dependent keys. ([@initram](https://github.com/initram))
* [#260](https://github.com/ember-cli/eslint-plugin-ember/pull/260) Updating `no-side-effects` rule to better detect sets inside of blocks. ([@gmurphey](https://github.com/gmurphey))
* [#246](https://github.com/ember-cli/eslint-plugin-ember/pull/246) Updating `no-on-calls-in-components` to only fail components using on with lifecylcle hooks. ([@patience-tema-baron](https://github.com/patience-tema-baron))

#### :memo: Documentation
* [#276](https://github.com/ember-cli/eslint-plugin-ember/pull/276) Add reason for rule `no-on-calls-in-components`. ([@cbou](https://github.com/cbou))
* [#277](https://github.com/ember-cli/eslint-plugin-ember/pull/277) docs: remove `get` from closure action example. ([@knownasilya](https://github.com/knownasilya))
* [#266](https://github.com/ember-cli/eslint-plugin-ember/pull/266) Update `no-empty-attrs` description. ([@locks](https://github.com/locks))

#### :house: Internal
* [#280](https://github.com/ember-cli/eslint-plugin-ember/pull/280) Clean up a couple of test definitions to unblock update script. ([@tmquinn](https://github.com/tmquinn))

#### Committers: 12
- Garrett Murphey ([gmurphey](https://github.com/gmurphey))
- Ilya Radchenko ([knownasilya](https://github.com/knownasilya))
- Martin Midtgaard ([initram](https://github.com/initram))
- Nathaniel Furniss ([nlfurniss](https://github.com/nlfurniss))
- Patience Tema Baron ([patience-tema-baron](https://github.com/patience-tema-baron))
- Quinn Hoyer ([tmquinn](https://github.com/tmquinn))
- Ricardo Mendes ([locks](https://github.com/locks))
- Stephen Yeung ([step2yeung](https://github.com/step2yeung))
- Steve Calvert ([scalvert](https://github.com/scalvert))
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))
- [dependabot[bot]](https://github.com/apps/dependabot)
- charles bourasseau ([cbou](https://github.com/cbou))


## v5.2.0 (2018-05-15)

#### :rocket: Enhancement
* [#142](https://github.com/ember-cli/eslint-plugin-ember/pull/142) Port code to ember-rfc176-data new format. ([@Serabe](https://github.com/Serabe))
* [#245](https://github.com/ember-cli/eslint-plugin-ember/pull/245) [avoid-leaking-state-in-ember-objects] Expose default ignored properties. ([@Kerrick](https://github.com/Kerrick))

#### :memo: Documentation
* [#208](https://github.com/ember-cli/eslint-plugin-ember/pull/208) Add URL to rule documentation to the metadata. ([@Arcanemagus](https://github.com/Arcanemagus))

#### :house: Internal
* [#142](https://github.com/ember-cli/eslint-plugin-ember/pull/142) Port code to ember-rfc176-data new format. ([@Serabe](https://github.com/Serabe))

#### Committers: 3
- Kerrick Long ([Kerrick](https://github.com/Kerrick))
- Landon Abney ([Arcanemagus](https://github.com/Arcanemagus))
- Sergio Arbeo ([Serabe](https://github.com/Serabe))


## v5.1.1 (2018-05-14)

#### :bug: Bug Fix
* [#229](https://github.com/ember-cli/eslint-plugin-ember/pull/229) Fix no-capital-letters-in-routes so it deals with MemberExpressions. ([@nlfurniss](https://github.com/nlfurniss))

#### :memo: Documentation
* [#241](https://github.com/ember-cli/eslint-plugin-ember/pull/241) Removes the no-jquery doc typo. ([@thebluejay](https://github.com/thebluejay))

#### :house: Internal
* [#254](https://github.com/ember-cli/eslint-plugin-ember/pull/254) Drop require-folder-tree dependency. ([@rwjblue](https://github.com/rwjblue))
* [#242](https://github.com/ember-cli/eslint-plugin-ember/pull/242) Update `jest` to v21.2.1. ([@Turbo87](https://github.com/Turbo87))

#### Committers: 4
- Nathaniel Furniss ([nlfurniss](https://github.com/nlfurniss))
- Robert Jackson ([rwjblue](https://github.com/rwjblue))
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))
- [thebluejay](https://github.com/thebluejay)


## v5.1.0 (2018-03-11)

#### :rocket: Enhancement
* [#172](https://github.com/ember-cli/eslint-plugin-ember/pull/172) Add `--fix` support to `order-in-*` rules. ([@PrzemoRevolve](https://github.com/PrzemoRevolve))

#### :bug: Bug Fix
* [#233](https://github.com/ember-cli/eslint-plugin-ember/pull/233) Fix init order in controllers and routes. ([@ro0gr](https://github.com/ro0gr))
* [#198](https://github.com/ember-cli/eslint-plugin-ember/pull/198) Add new scenarios for `require-super-in-init` rule. ([@clcuevas](https://github.com/clcuevas))
* [#205](https://github.com/ember-cli/eslint-plugin-ember/pull/205) add willInsertElement component lifecycle hook. ([@hakubo](https://github.com/hakubo))

#### Committers: 8
- Claudia Cuevas ([clcuevas](https://github.com/clcuevas))
- Jakub Olek ([hakubo](https://github.com/hakubo))
- Jason Williams ([jaswilli](https://github.com/jaswilli))
- Przemysław Nowak ([PrzemoRevolve](https://github.com/PrzemoRevolve))
- Ricardo Mendes ([locks](https://github.com/locks))
- Ruslan Grabovoy ([ro0gr](https://github.com/ro0gr))
- Sylvain MINA ([sly7-7](https://github.com/sly7-7))
- [verim1990](https://github.com/verim1990)


## v5.0.3 (2017-12-21)

#### :bug: Bug Fix
* [#197](https://github.com/ember-cli/eslint-plugin-ember/pull/197) Don't fail 'no-global-jquery' if module has both jquery and ember imports. ([@danwenzel](https://github.com/danwenzel))

#### Committers: 1
- Dan Wenzel ([danwenzel](https://github.com/danwenzel))

## v5.0.2 (2017-12-18)

#### :bug: Bug Fix
* [#186](https://github.com/ember-cli/eslint-plugin-ember/pull/186) Update `no-global-jquery` rule to account for new modules import. ([@clcuevas](https://github.com/clcuevas))

#### :memo: Documentation
* [#194](https://github.com/ember-cli/eslint-plugin-ember/pull/194) Update README.md. ([@bartocc](https://github.com/bartocc))

#### Committers: 2
- Claudia Cuevas ([clcuevas](https://github.com/clcuevas))
- Julien Palmas ([bartocc](https://github.com/bartocc))

## v5.0.1 (2017-11-20)

#### :rocket: Enhancement
* [#144](https://github.com/ember-cli/eslint-plugin-ember/pull/144) Add destructuring support to `new-modules-import` rule. ([@clcuevas](https://github.com/clcuevas))
* [#151](https://github.com/ember-cli/eslint-plugin-ember/pull/151) Allow recognition of controller injection. ([@rmachielse](https://github.com/rmachielse))

#### :bug: Bug Fix
* [#184](https://github.com/ember-cli/eslint-plugin-ember/pull/184) Prevent error when destructured path is not in known globals.. ([@rwjblue](https://github.com/rwjblue))

#### :memo: Documentation
* [#178](https://github.com/ember-cli/eslint-plugin-ember/pull/178) Add Release instructions. ([@Turbo87](https://github.com/Turbo87))
* [#167](https://github.com/ember-cli/eslint-plugin-ember/pull/167) Added Yarn Install. ([@Alonski](https://github.com/Alonski))
* [#177](https://github.com/ember-cli/eslint-plugin-ember/pull/177) Add CHANGELOG. ([@Turbo87](https://github.com/Turbo87))
* [#176](https://github.com/ember-cli/eslint-plugin-ember/pull/176) Add myself to contributors. ([@jbandura](https://github.com/jbandura))

#### Committers: 6
- Alon Bukai ([Alonski](https://github.com/Alonski))
- Claudia Cuevas ([clcuevas](https://github.com/clcuevas))
- Jacek Bandura ([jbandura](https://github.com/jbandura))
- Richard Machielse ([rmachielse](https://github.com/rmachielse))
- Robert Jackson ([rwjblue](https://github.com/rwjblue))
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))
-
## v5.0.0 (2017-11-20)

* 📦 - Change `recommended` rule set to match `eslint` pattern of only including rules that prevent errors (and specifically excluding stylistic rules).
  * ❌  - Remove `alias-model-in-controller` from `ember/recommended` rule set.
  * ❌  - Remove `avoid-leaking-state-in-components` from `ember/recommended` rule set.
  * ❌  - Remove `named-functions-in-promises` from `ember/recommended` rule set.
  * ❌  - Remove `no-empty-attrs` from `ember/recommended` rule set.
  * ❌  - Remove `no-observers` from `ember/recommended` rule set.
  * ❌  - Remove `use-ember-get-and-set` from `ember/recommended` rule set.
  * ❌  - Remove `order-in-components` from `ember/recommended` rule set.
  * ❌  - Remove `order-in-controllers` from `ember/recommended` rule set.
  * ❌  - Remove `order-in-models` from `ember/recommended` rule set.
  * ❌  - Remove `order-in-routes` from `ember/recommended` rule set.
  * ✅  - Add `avoid-leaking-state-in-ember-objects` to `ember/recommended` rule set.
  * ✅  - Add `new-module-imports` to `ember/recommended` rule set.
  * ✅  - Add `no-attrs-in-components` to `ember/recommended` rule set.
  * ✅  - Add `no-duplicate-dependent-keys` from `ember/recommended` rule set.
  * ✅  - Add `no-global-jquery` to `ember/recommended` rule set.
  * ✅  - Add `no-old-shims` to `ember/recommended` rule set.
  * ✅  - Add `require-super-in-init` to `ember/recommended` rule set.

#### :boom: Breaking Change
* [#173](https://github.com/ember-cli/eslint-plugin-ember/pull/173) Disable `order-in-*` rules by default. ([@Turbo87](https://github.com/Turbo87))
* [#174](https://github.com/ember-cli/eslint-plugin-ember/pull/174) Disable and deprecate `avoid-leaking-state-in-components` rule. ([@Turbo87](https://github.com/Turbo87))
* [#146](https://github.com/ember-cli/eslint-plugin-ember/pull/146) Update configs and recommendations. ([@michalsnik](https://github.com/michalsnik))

#### :rocket: Enhancement
* [#144](https://github.com/ember-cli/eslint-plugin-ember/pull/144) Add destructuring support to `new-modules-import` rule. ([@clcuevas](https://github.com/clcuevas))
* [#151](https://github.com/ember-cli/eslint-plugin-ember/pull/151) Allow recognition of controller injection. ([@rmachielse](https://github.com/rmachielse))

#### :memo: Documentation
* [#178](https://github.com/ember-cli/eslint-plugin-ember/pull/178) Add Release instructions. ([@Turbo87](https://github.com/Turbo87))
* [#167](https://github.com/ember-cli/eslint-plugin-ember/pull/167) Added Yarn Install. ([@Alonski](https://github.com/Alonski))
* [#177](https://github.com/ember-cli/eslint-plugin-ember/pull/177) Add CHANGELOG. ([@Turbo87](https://github.com/Turbo87))
* [#176](https://github.com/ember-cli/eslint-plugin-ember/pull/176) Add myself to contributors. ([@jbandura](https://github.com/jbandura))

#### Committers: 9
- Alon Bukai ([Alonski](https://github.com/Alonski))
- Claudia Cuevas ([clcuevas](https://github.com/clcuevas))
- Jacek Bandura ([jbandura](https://github.com/jbandura))
- Michał Sajnóg ([michalsnik](https://github.com/michalsnik))
- Richard Machielse ([rmachielse](https://github.com/rmachielse))
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))


## v4.6.2 (2017-11-15)

#### :rocket: Enhancement
* [#173](https://github.com/ember-cli/eslint-plugin-ember/pull/173) Disable `order-in-*` rules by default. ([@Turbo87](https://github.com/Turbo87))
* [#155](https://github.com/ember-cli/eslint-plugin-ember/pull/155) ember-get-and-set Add option `ignoreThisExpressions`. ([@JoelWAnna](https://github.com/JoelWAnna))
* [#174](https://github.com/ember-cli/eslint-plugin-ember/pull/174) Disable and deprecate `avoid-leaking-state-in-components` rule. ([@Turbo87](https://github.com/Turbo87))
* [#146](https://github.com/ember-cli/eslint-plugin-ember/pull/146) Update configs and recommendations. ([@michalsnik](https://github.com/michalsnik))

#### :bug: Bug Fix
* [#169](https://github.com/ember-cli/eslint-plugin-ember/pull/169) Closes [#150](https://github.com/ember-cli/eslint-plugin-ember/issues/150) issue with 'init' property. ([@eskab](https://github.com/eskab))
* [#168](https://github.com/ember-cli/eslint-plugin-ember/pull/168) Fix lint rule crash when variable is used as routename. ([@cspanring](https://github.com/cspanring))
* [#152](https://github.com/ember-cli/eslint-plugin-ember/pull/152) Detect models based on their files' path. ([@rmachielse](https://github.com/rmachielse))

#### :memo: Documentation
* [#175](https://github.com/ember-cli/eslint-plugin-ember/pull/175) Add deprecations to README. ([@Turbo87](https://github.com/Turbo87))
* [#166](https://github.com/ember-cli/eslint-plugin-ember/pull/166) add missing "plugins" and reorder. ([@kellyselden](https://github.com/kellyselden))

#### :house: Internal
* [#171](https://github.com/ember-cli/eslint-plugin-ember/pull/171) Fix failing tests on windows due to path separators. ([@PrzemoRevolve](https://github.com/PrzemoRevolve))

#### Committers: 9
- Christian Spanring ([cspanring](https://github.com/cspanring))
- Kelly Selden ([kellyselden](https://github.com/kellyselden))
- Michał Sajnóg ([michalsnik](https://github.com/michalsnik))
- Przemysław Nowak ([PrzemoRevolve](https://github.com/PrzemoRevolve))
- Richard Machielse ([rmachielse](https://github.com/rmachielse))
- Szymon Kabelis ([eskab](https://github.com/eskab))
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))
- [JoelWAnna](https://github.com/JoelWAnna)
- [shegupta](https://github.com/shegupta)


## v4.6.1 (2017-11-06)

#### :bug: Bug Fix
* [#160](https://github.com/ember-cli/eslint-plugin-ember/pull/160) ignore tagged templates for avoid-leaking-state-in-ember-objects rule. ([@amk221](https://github.com/amk221))

#### Committers: 1
- Andrew Kirwin ([amk221](https://github.com/amk221))


## v4.6.0 (2017-11-03)

#### :rocket: Enhancement
* [#137](https://github.com/ember-cli/eslint-plugin-ember/pull/137) Enforce component lifecycle hook order. ([@rwwagner90](https://github.com/rwwagner90))

#### :memo: Documentation
* [#154](https://github.com/ember-cli/eslint-plugin-ember/pull/154) Add myself to contributors, use https for GitHub links. ([@rwwagner90](https://github.com/rwwagner90))
* [#153](https://github.com/ember-cli/eslint-plugin-ember/pull/153) minor typo in readme. ([@zkrzyzanowski](https://github.com/zkrzyzanowski))

#### Committers: 3
- Robert Wagner ([rwwagner90](https://github.com/rwwagner90))
- Zach Krzyzanowski ([zkrzyzanowski](https://github.com/zkrzyzanowski))
- [shegupta](https://github.com/shegupta)


## v4.5.0 (2017-09-02)

#### :rocket: Enhancement
* [#121](https://github.com/ember-cli/eslint-plugin-ember/pull/121) Add rule to disallow `this.$` to prepare apps to remove jQuery. ([@cibernox](https://github.com/cibernox))

#### Committers: 1
- Miguel Camba ([cibernox](https://github.com/cibernox))


## v4.4.0 (2017-09-02)

#### :rocket: Enhancement
* [#124](https://github.com/ember-cli/eslint-plugin-ember/pull/124) Order beforeModel and afterModel around model. ([@rwwagner90](https://github.com/rwwagner90))
* [#108](https://github.com/ember-cli/eslint-plugin-ember/pull/108) Add additional position for empty methods. ([@t-sauer](https://github.com/t-sauer))

#### :bug: Bug Fix
* [#132](https://github.com/ember-cli/eslint-plugin-ember/pull/132) Don't report on Ember method calls in use-ember-get-and-set. ([@sudowork](https://github.com/sudowork))

#### :house: Internal
* [#133](https://github.com/ember-cli/eslint-plugin-ember/pull/133) Add recommended rules snapshot test. ([@Turbo87](https://github.com/Turbo87))

#### Committers: 4
- Kevin Gao ([sudowork](https://github.com/sudowork))
- Robert Wagner ([rwwagner90](https://github.com/rwwagner90))
- Thomas Sauer ([t-sauer](https://github.com/t-sauer))
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))


## v4.3.0 (2017-08-15)

#### :rocket: Enhancement
* [#104](https://github.com/ember-cli/eslint-plugin-ember/pull/104) New rule: no-duplicate-dependent-keys. ([@jbandura](https://github.com/jbandura))
* [#122](https://github.com/ember-cli/eslint-plugin-ember/pull/122) Add new "call-super-in-init" rule. ([@kevinkucharczyk](https://github.com/kevinkucharczyk))

#### :bug: Bug Fix
* [#107](https://github.com/ember-cli/eslint-plugin-ember/pull/107) Don't suggest nested property brace expansion. ([@Kerrick](https://github.com/Kerrick))

#### :memo: Documentation
* [#125](https://github.com/ember-cli/eslint-plugin-ember/pull/125) named-functions-in-promises example without .bind(). ([@caseywatts](https://github.com/caseywatts))
* [#120](https://github.com/ember-cli/eslint-plugin-ember/pull/120) Fix broken links in readme. ([@dustinspecker](https://github.com/dustinspecker))

#### :house: Internal
* [#118](https://github.com/ember-cli/eslint-plugin-ember/pull/118) Update "ember-rfc176-data" to v0.2.7. ([@Turbo87](https://github.com/Turbo87))

#### Committers: 6
- Casey Watts ([caseywatts](https://github.com/caseywatts))
- Dustin Specker ([dustinspecker](https://github.com/dustinspecker))
- Jacek Bandura ([jbandura](https://github.com/jbandura))
- Kerrick Long ([Kerrick](https://github.com/Kerrick))
- Kevin Kucharczyk ([kevinkucharczyk](https://github.com/kevinkucharczyk))
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))


## v4.2.0 (2017-08-03)

#### :rocket: Enhancement
* [#115](https://github.com/ember-cli/eslint-plugin-ember/pull/115) Add `fix` for `use-ember-get-and-set`. ([@sudowork](https://github.com/sudowork))
* [#116](https://github.com/ember-cli/eslint-plugin-ember/pull/116) Add "new-module-imports" rule. ([@Turbo87](https://github.com/Turbo87))

#### :house: Internal
* [#117](https://github.com/ember-cli/eslint-plugin-ember/pull/117) CI: Publish tags to npm automatically. ([@Turbo87](https://github.com/Turbo87))

#### Committers: 2
- Kevin Gao ([sudowork](https://github.com/sudowork))
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))


## v4.1.3 (2017-08-01)

#### :bug: Bug Fix
* [#114](https://github.com/ember-cli/eslint-plugin-ember/pull/114) Fix "no-global-jquery". ([@michalsnik](https://github.com/michalsnik))

#### Committers: 1
- Michał Sajnóg ([michalsnik](https://github.com/michalsnik))


## v4.1.1 (2017-08-01)

#### :rocket: Enhancement
* [#103](https://github.com/ember-cli/eslint-plugin-ember/pull/103) New rule: no-global-jquery. ([@jbandura](https://github.com/jbandura))
* [#100](https://github.com/ember-cli/eslint-plugin-ember/pull/100) New rule: no-attrs (Closes [#52](https://github.com/ember-cli/eslint-plugin-ember/issues/52)). ([@jbandura](https://github.com/jbandura))
* [#99](https://github.com/ember-cli/eslint-plugin-ember/pull/99) Adding new rule: no-attrs-snapshot. ([@scalvert](https://github.com/scalvert))

#### :bug: Bug Fix
* [#111](https://github.com/ember-cli/eslint-plugin-ember/pull/111) Add solution for service ordering when new module imports used. ([@jbandura](https://github.com/jbandura))
* [#98](https://github.com/ember-cli/eslint-plugin-ember/pull/98) Detecting computed properties with MemberExpressions. ([@jbandura](https://github.com/jbandura))

#### :memo: Documentation
* [#101](https://github.com/ember-cli/eslint-plugin-ember/pull/101) netguru -> ember-cli. ([@rwwagner90](https://github.com/rwwagner90))
* [#92](https://github.com/ember-cli/eslint-plugin-ember/pull/92) Update README & introduce auto generated table with rules. ([@michalsnik](https://github.com/michalsnik))

#### Committers: 4
- Jacek Bandura ([jbandura](https://github.com/jbandura))
- Michał Sajnóg ([michalsnik](https://github.com/michalsnik))
- Robert Wagner ([rwwagner90](https://github.com/rwwagner90))
- Steve Calvert ([scalvert](https://github.com/scalvert))


## v3.6.2 (2017-07-13)

#### :bug: Bug Fix
* [#93](https://github.com/ember-cli/eslint-plugin-ember/pull/93) Make sure negative values are treated as properties. ([@jbandura](https://github.com/jbandura))

#### Committers: 1
- Jacek Bandura ([jbandura](https://github.com/jbandura))


## v3.6.1 (2017-07-11)

#### :bug: Bug Fix
* [#94](https://github.com/ember-cli/eslint-plugin-ember/pull/94) Fix method of detecting whether route segment present. ([@jbandura](https://github.com/jbandura))

#### Committers: 1
- Jacek Bandura ([jbandura](https://github.com/jbandura))


## v3.6.0 (2017-07-10)

#### :rocket: Enhancement
* [#90](https://github.com/ember-cli/eslint-plugin-ember/pull/90) Add new "no-old-shims" rule. ([@Turbo87](https://github.com/Turbo87))

#### :house: Internal
* [#91](https://github.com/ember-cli/eslint-plugin-ember/pull/91) Switch test runner from Mocha/Chai to Jest. ([@Turbo87](https://github.com/Turbo87))
* [#89](https://github.com/ember-cli/eslint-plugin-ember/pull/89) Update "yarn.lock" file. ([@Turbo87](https://github.com/Turbo87))

#### Committers: 1
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))


## v3.5.0 (2017-06-26)

#### :rocket: Enhancement
* [#80](https://github.com/ember-cli/eslint-plugin-ember/pull/80) alias-model-in-controller: allow nested properties. ([@buschtoens](https://github.com/buschtoens))
* [#77](https://github.com/ember-cli/eslint-plugin-ember/pull/77) Add no-capital-letters-in-routes to base. ([@scottkidder](https://github.com/scottkidder))

#### Committers: 2
- Jan Buschtöns ([buschtoens](https://github.com/buschtoens))
- Scott Kidder ([scottkidder](https://github.com/scottkidder))


## v3.4.1 (2017-05-30)

#### :bug: Bug Fix
* [#74](https://github.com/ember-cli/eslint-plugin-ember/pull/74) Revert "Make it available on emberobserver.com". ([@Turbo87](https://github.com/Turbo87))

#### Committers: 1
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))


## v3.4.0 (2017-05-27)

#### :rocket: Enhancement
* [#70](https://github.com/ember-cli/eslint-plugin-ember/pull/70) New rule: no-capital-letters-in-routes. ([@michalsnik](https://github.com/michalsnik))

#### Committers: 1
- Michał Sajnóg ([michalsnik](https://github.com/michalsnik))


## v3.3.0 (2017-05-24)

#### :rocket: Enhancement
* [#64](https://github.com/ember-cli/eslint-plugin-ember/pull/64) Allow concise ArrowFunctionExpression (named-functions-in-promises). ([@sudowork](https://github.com/sudowork))
* [#66](https://github.com/ember-cli/eslint-plugin-ember/pull/66) Support tagged templates expressions. ([@michalsnik](https://github.com/michalsnik))

#### :memo: Documentation
* [#43](https://github.com/ember-cli/eslint-plugin-ember/pull/43) Sync groups between desc and javascript snippet. ([@bartocc](https://github.com/bartocc))
* [#65](https://github.com/ember-cli/eslint-plugin-ember/pull/65) Don't use this.attrs in docs. ([@sudowork](https://github.com/sudowork))

#### Committers: 3
- Julien Palmas ([bartocc](https://github.com/bartocc))
- Kevin Gao ([sudowork](https://github.com/sudowork))
- Michał Sajnóg ([michalsnik](https://github.com/michalsnik))


## v3.2.0 (2017-05-23)

#### :rocket: Enhancement
* [#60](https://github.com/ember-cli/eslint-plugin-ember/pull/60) `alias-model-in-controller` should support `readOnly` and `reads`. ([@michalsnik](https://github.com/michalsnik))
* [#46](https://github.com/ember-cli/eslint-plugin-ember/pull/46) Fix typo in documentation: rename 'no-side-effect' to 'no-side-effects'. ([@RusPosevkin](https://github.com/RusPosevkin))

#### :memo: Documentation
* [#50](https://github.com/ember-cli/eslint-plugin-ember/pull/50) Add syntax highlighting to Readme. ([@ryanponce](https://github.com/ryanponce))
* [#49](https://github.com/ember-cli/eslint-plugin-ember/pull/49) Update docs. ([@michalsnik](https://github.com/michalsnik))

#### :house: Internal
* [#54](https://github.com/ember-cli/eslint-plugin-ember/pull/54) Update rules to new ESLint rule format. ([@SaladFork](https://github.com/SaladFork))

#### Committers: 4
- Elad Shahar ([SaladFork](https://github.com/SaladFork))
- Michał Sajnóg ([michalsnik](https://github.com/michalsnik))
- Ruslan Posevkin ([RusPosevkin](https://github.com/RusPosevkin))
- Ryan Ponce ([ryanponce](https://github.com/ryanponce))


## v3.1.2 (2017-03-24)

#### :rocket: Enhancement
* [#44](https://github.com/ember-cli/eslint-plugin-ember/pull/44) Update no-on-calls-in-components rule. ([@clcuevas](https://github.com/clcuevas))

#### :memo: Documentation
* [#40](https://github.com/ember-cli/eslint-plugin-ember/pull/40) Fix configuration key. ([@bdmac](https://github.com/bdmac))

#### Committers: 2
- Brian McManus ([bdmac](https://github.com/bdmac))
- Claudia Cuevas ([clcuevas](https://github.com/clcuevas))


## v3.1.1 (2017-03-16)

#### :rocket: Enhancement
* [#39](https://github.com/ember-cli/eslint-plugin-ember/pull/39) Update no-empty-attrs rule. ([@clcuevas](https://github.com/clcuevas))

#### Committers: 1
- Claudia Cuevas ([clcuevas](https://github.com/clcuevas))


## v3.1.0 (2017-03-16)

#### :rocket: Enhancement
* [#37](https://github.com/ember-cli/eslint-plugin-ember/pull/37) 27 / Detect module types based on their files' path. ([@michalsnik](https://github.com/michalsnik))

#### Committers: 1
- Michał Sajnóg ([michalsnik](https://github.com/michalsnik))


## v3.0.2 (2017-03-08)

#### :rocket: Enhancement
* [#38](https://github.com/ember-cli/eslint-plugin-ember/pull/38) Add functions to route order. ([@netes](https://github.com/netes))

#### :memo: Documentation
* [#35](https://github.com/ember-cli/eslint-plugin-ember/pull/35) Typo in docs / closure-actions.md. ([@nfc036](https://github.com/nfc036))
* [#36](https://github.com/ember-cli/eslint-plugin-ember/pull/36) Remove remaining references to "query-params-on-top" rule. ([@Turbo87](https://github.com/Turbo87))

#### Committers: 3
- Kamil Ejsymont ([netes](https://github.com/netes))
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))
- [nfc036](https://github.com/nfc036)


## v3.0.0 (2017-02-20)

#### :rocket: Enhancement
* [#34](https://github.com/ember-cli/eslint-plugin-ember/pull/34) Improve order in controllers and documentation. ([@michalsnik](https://github.com/michalsnik))

#### :house: Internal
* [#33](https://github.com/ember-cli/eslint-plugin-ember/pull/33) Add eslint and use ES6. ([@michalsnik](https://github.com/michalsnik))

#### Committers: 1
- Michał Sajnóg ([michalsnik](https://github.com/michalsnik))


## v2.2.2 (2017-02-15)

#### :rocket: Enhancement
* [#31](https://github.com/ember-cli/eslint-plugin-ember/pull/31) Treat conditional expressions as custom properties. ([@michalsnik](https://github.com/michalsnik))

#### Committers: 1
- Michał Sajnóg ([michalsnik](https://github.com/michalsnik))


## v2.2.1 (2017-02-15)

#### :bug: Bug Fix
* [#30](https://github.com/ember-cli/eslint-plugin-ember/pull/30) Check only model's properties against `no-empty-attrs` rule. ([@michalsnik](https://github.com/michalsnik))

#### Committers: 1
- Michał Sajnóg ([michalsnik](https://github.com/michalsnik))


## v2.2.0 (2017-02-14)

#### :rocket: Enhancement
* [#23](https://github.com/ember-cli/eslint-plugin-ember/pull/23) Improved error messages for `order-in` rules. ([@Turbo87](https://github.com/Turbo87))

#### Committers: 1
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))


## v2.1.1 (2017-02-07)

#### :bug: Bug Fix
* [#16](https://github.com/ember-cli/eslint-plugin-ember/pull/16) Fix named-functions-in-promises rule. ([@michalsnik](https://github.com/michalsnik))

#### :memo: Documentation
* [#22](https://github.com/ember-cli/eslint-plugin-ember/pull/22) name correction. ([@bcardarella](https://github.com/bcardarella))

#### Committers: 2
- Brian Cardarella ([bcardarella](https://github.com/bcardarella))
- Michał Sajnóg ([michalsnik](https://github.com/michalsnik))


## v2.1.0 (2017-02-05)

#### :rocket: Enhancement
* [#15](https://github.com/ember-cli/eslint-plugin-ember/pull/15) Report correct positions for "order-in-*" rules. ([@Turbo87](https://github.com/Turbo87))

#### :memo: Documentation
* [#20](https://github.com/ember-cli/eslint-plugin-ember/pull/20) Update README and contributors. ([@michalsnik](https://github.com/michalsnik))
* [#12](https://github.com/ember-cli/eslint-plugin-ember/pull/12) doc: Adjust `no-side-effects` name and link. ([@Turbo87](https://github.com/Turbo87))
* [#7](https://github.com/ember-cli/eslint-plugin-ember/pull/7) README: Remove `ember-cli-eslint` requirement. ([@bardzusny](https://github.com/bardzusny))

#### :house: Internal
* [#19](https://github.com/ember-cli/eslint-plugin-ember/pull/19) Describe, launch tests under all supported Node.js versions. ([@bardzusny](https://github.com/bardzusny))
* [#9](https://github.com/ember-cli/eslint-plugin-ember/pull/9) Disable nyan reporter in CI. ([@alexlafroscia](https://github.com/alexlafroscia))
* [#8](https://github.com/ember-cli/eslint-plugin-ember/pull/8) Match yeoman generator structure. ([@alexlafroscia](https://github.com/alexlafroscia))
* [#4](https://github.com/ember-cli/eslint-plugin-ember/pull/4) Chore / Update plugin environment. ([@michalsnik](https://github.com/michalsnik))

#### Committers: 4
- Adrian ([bardzusny](https://github.com/bardzusny))
- Alex LaFroscia ([alexlafroscia](https://github.com/alexlafroscia))
- Michał Sajnóg ([michalsnik](https://github.com/michalsnik))
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))


## v2.0.1 (2017-01-16)

#### :bug: Bug Fix
* [#3](https://github.com/ember-cli/eslint-plugin-ember/pull/3) Fix error in 'use-brace-expansion' rule. ([@dwickern](https://github.com/dwickern))

#### Committers: 1
- Derek Wickern ([dwickern](https://github.com/dwickern))


## v2.0.0 (2016-12-30)

#### :rocket: Enhancement
* [#1](https://github.com/ember-cli/eslint-plugin-ember/pull/1) Add base configurations. ([@michalsnik](https://github.com/michalsnik))
* [#34](https://github.com/ember-cli/eslint-plugin-ember/pull/34) Improve order in controllers and documentation. ([@michalsnik](https://github.com/michalsnik))
* [#37](https://github.com/ember-cli/eslint-plugin-ember/pull/37) 27 / Detect module types based on their files' path. ([@michalsnik](https://github.com/michalsnik))
* [#31](https://github.com/ember-cli/eslint-plugin-ember/pull/31) Treat conditional expressions as custom properties. ([@michalsnik](https://github.com/michalsnik))
* [#23](https://github.com/ember-cli/eslint-plugin-ember/pull/23) Improved error messages for `order-in` rules. ([@Turbo87](https://github.com/Turbo87))
* [#15](https://github.com/ember-cli/eslint-plugin-ember/pull/15) Report correct positions for "order-in-*" rules. ([@Turbo87](https://github.com/Turbo87))

#### :bug: Bug Fix
* False positive for `no-empty-attrs`. ([@bdmac](https://github.com/bdmac))
* order-in-controllers vs query-params-on-top. ([@michalsnik](https://github.com/michalsnik))
* [#16](https://github.com/ember-cli/eslint-plugin-ember/pull/16) Fix named-functions-in-promises rule. ([@michalsnik](https://github.com/michalsnik))

#### :memo: Documentation
* [#35](https://github.com/ember-cli/eslint-plugin-ember/pull/35) Typo in docs / closure-actions.md. ([@nfc036](https://github.com/nfc036))
* [#22](https://github.com/ember-cli/eslint-plugin-ember/pull/22) name correction. ([@bcardarella](https://github.com/bcardarella))
* [#20](https://github.com/ember-cli/eslint-plugin-ember/pull/20) Update README and contributors. ([@michalsnik](https://github.com/michalsnik))

#### :house: Internal
* [#33](https://github.com/ember-cli/eslint-plugin-ember/pull/33) Add eslint and use ES6. ([@michalsnik](https://github.com/michalsnik))
* [#19](https://github.com/ember-cli/eslint-plugin-ember/pull/19) Describe, launch tests under all supported Node.js versions. ([@bardzusny](https://github.com/bardzusny))
* [#4](https://github.com/ember-cli/eslint-plugin-ember/pull/4) Chore / Update plugin environment. ([@michalsnik](https://github.com/michalsnik))

#### Committers: 9
- Adrian ([bardzusny](https://github.com/bardzusny))
- Brian Cardarella ([bcardarella](https://github.com/bcardarella))
- Brian McManus ([bdmac](https://github.com/bdmac))
- Craig Bilner ([craigbilner](https://github.com/craigbilner))
- Kamil Ejsymont ([netes](https://github.com/netes))
- Marcin Horoszko ([cinkonaap](https://github.com/cinkonaap))
- Michał Sajnóg ([michalsnik](https://github.com/michalsnik))
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))
- [nfc036](https://github.com/nfc036)
