# Changelog

## v2.2.0 (2018-05-28)

#### :rocket: Enhancement
* [#70](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/70) Replace unmaintained `uglify-es` with `terser`. ([@Turbo87](https://github.com/Turbo87))

#### :memo: Documentation
* [#66](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/66) Update changelog (Closes [#65](https://github.com/ember-cli/broccoli-uglify-sourcemap/issues/65)). ([@mikrostew](https://github.com/mikrostew))

#### :house: Internal
* [#71](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/71) Cleanup code and add ESLint checks. ([@Turbo87](https://github.com/Turbo87))

#### Committers: 2
- Michael Stewart ([mikrostew](https://github.com/mikrostew))
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))


## v2.1.1 (2018-03-27)

#### :bug: Bug Fix
* [#64](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/64) JOBS environment variable should override concurrency. ([@mikrostew](https://github.com/mikrostew))

#### Committers: 1
- Michael Stewart ([mikrostew](https://github.com/mikrostew))


## v2.1.0 (2018-03-27)

#### :rocket: Enhancement
* [#63](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/63) Run uglify in parallel, using a workerpool. ([@mikrostew](https://github.com/mikrostew))

#### :memo: Documentation
* [#62](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/62) Fix a comment typo. ([@ealter](https://github.com/ealter))

#### Committers: 2
- Eliot Alter ([ealter](https://github.com/ealter))
- Michael Stewart ([mikrostew](https://github.com/mikrostew))


## v2.0.2 (2018-01-11)

#### :bug: Bug Fix
* [#59](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/59) Do not try to access `length` of minified code if minification failed. ([@kmoe](https://github.com/kmoe))

#### :memo: Documentation
* [#56](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/56) Fix CHANGELOG. ([@Turbo87](https://github.com/Turbo87))

#### Committers: 2
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))
- [kmoe](https://github.com/kmoe)


## v2.0.1 (2017-11-16)

#### :bug: Bug Fix
* [#55](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/55)  Ignore missing sourcemap if referenced file does not exist. ([@Turbo87](https://github.com/Turbo87))

#### Committers: 1
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))


## v2.0.0 (2017-10-03)

#### :rocket: Enhancement
* [#52](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/52) Update dependencies. ([@Turbo87](https://github.com/Turbo87))

#### :house: Internal
* [#50](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/50) Replace Mocha/Chai with Jest. ([@Turbo87](https://github.com/Turbo87))

#### Committers: 1
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))


## v2.0.0-beta.2 (2017-07-10)

#### :boom: Breaking Change
* [#47](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/47) Use uglify-es instead of uglify-js. ([@fusion2004](https://github.com/fusion2004))

#### Committers: 1
- Mark Oleson ([fusion2004](https://github.com/fusion2004))


## v2.0.0-beta.1 (2017-07-09)

#### :boom: Breaking Change
* [#49](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/49) Update to "uglify-js" v3.0.24. ([@Turbo87](https://github.com/Turbo87))

#### :house: Internal
* [#48](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/48) Remove unused "origSourcesContent" variable. ([@Turbo87](https://github.com/Turbo87))
* [#45](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/45) CI: Use "auto-dist-tag" for deployment. ([@Turbo87](https://github.com/Turbo87))

#### Committers: 1
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))


## v1.5.2 (2017-03-31)

#### :bug: Bug Fix
* [#41](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/41) Remove UglifyJS2 issue workaround. ([@Turbo87](https://github.com/Turbo87))

#### :house: Internal
* [#44](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/44) CI: Deploy tags automatically to npm. ([@Turbo87](https://github.com/Turbo87))
* [#43](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/43) Cleanup "package.json" file. ([@Turbo87](https://github.com/Turbo87))
* [#42](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/42) CI: Update Node.js target matrix. ([@Turbo87](https://github.com/Turbo87))

#### Committers: 1
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))


## v1.5.1 (2016-12-20)

#### :rocket: Enhancement
* [#39](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/39) [Closes [#38](https://github.com/ember-cli/broccoli-uglify-sourcemap/issues/38) #36] improve slow concat warning. ([@stefanpenner](https://github.com/stefanpenner))

#### Committers: 1
- Stefan Penner ([stefanpenner](https://github.com/stefanpenner))


## v1.5.0 (2016-12-03)

#### :rocket: Enhancement
* [#35](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/35) Update uglify-js to ^2.7.0.. ([@tjni](https://github.com/tjni))

#### :bug: Bug Fix
* [#37](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/37) fix minor typo. ([@efx](https://github.com/efx))

#### Committers: 2
- Eli Flanagan ([efx](https://github.com/efx))
- Theodore Ni ([tjni](https://github.com/tjni))


## v1.4.1 (2016-08-05)

#### :house: Internal
* [#32](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/32) Whitelist files for npm and reduce lodash dependency. ([@kamalaknn](https://github.com/kamalaknn))

#### Committers: 1
- Kamalakannan ([kamalaknn](https://github.com/kamalaknn))


## v1.4.0 (2016-05-20)

#### :rocket: Enhancement
* [#29](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/29) bump uglify-js. ([@stefanpenner](https://github.com/stefanpenner))

#### :bug: Bug Fix
* [#28](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/28) Fix typo in warning text.. ([@eric-adstage](https://github.com/eric-adstage))

#### Committers: 2
- Eric Foster ([eric-adstage](https://github.com/eric-adstage))
- Stefan Penner ([stefanpenner](https://github.com/stefanpenner))


## v1.3.0 (2016-04-27)

#### :rocket: Enhancement
* [#12](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/12) Log and warn. ([@stefanpenner](https://github.com/stefanpenner))

#### :bug: Bug Fix
* [#27](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/27) Revert "don’t minify files that already advertise as minified.". ([@rwjblue](https://github.com/rwjblue))

#### Committers: 2
- Robert Jackson ([rwjblue](https://github.com/rwjblue))
- Stefan Penner ([stefanpenner](https://github.com/stefanpenner))


## v1.2.0 (2016-03-04)

#### :rocket: Enhancement
* [#26](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/26) don’t minify files that already advertise as minified.. ([@stefanpenner](https://github.com/stefanpenner))

#### :bug: Bug Fix
* [#22](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/22) [DOCFIX] Update the README.md to reflect the real package name.. ([@minasmart](https://github.com/minasmart))

#### Committers: 2
- Mina Smart ([minasmart](https://github.com/minasmart))
- Stefan Penner ([stefanpenner](https://github.com/stefanpenner))


## v1.1.1 (2016-01-09)

#### :house: Internal
* [#21](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/21) Upgrade to a supported version of lodash.. ([@blimmer](https://github.com/blimmer))

#### Committers: 1
- Ben Limmer ([blimmer](https://github.com/blimmer))


## v1.1.0 (2015-11-17)

#### :rocket: Enhancement
* [#11](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/11) Pr 7. ([@stefanpenner](https://github.com/stefanpenner))

#### :bug: Bug Fix
* [#18](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/18) Lock uglify-js dependency to ~2.5.0.. ([@blimmer](https://github.com/blimmer))

#### :memo: Documentation
* [#14](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/14) fix a typo in README.md. ([@fivetanley](https://github.com/fivetanley))

#### :house: Internal
* [#10](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/10) fix tests. ([@stefanpenner](https://github.com/stefanpenner))

#### Committers: 3
- Ben Limmer ([blimmer](https://github.com/blimmer))
- Stanley Stuart ([fivetanley](https://github.com/fivetanley))
- Stefan Penner ([stefanpenner](https://github.com/stefanpenner))


## v1.0.1 (2015-06-18)

#### :bug: Bug Fix
* [#6](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/6) fix '?' --> filename. ([@SSS2557](https://github.com/SSS2557))

#### Committers: 1
- Sandesh ([SSS2557](https://github.com/SSS2557))


## v1.0.0 (2015-06-07)

#### :rocket: Enhancement
* [#4](https://github.com/ember-cli/broccoli-uglify-sourcemap/pull/4) append filename to errors thrown from UglifyJS.. ([@stefanpenner](https://github.com/stefanpenner))

#### Committers: 1
- Stefan Penner ([stefanpenner](https://github.com/stefanpenner))
