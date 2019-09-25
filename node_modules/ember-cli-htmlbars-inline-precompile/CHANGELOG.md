# Change Log

## v2.1.0 (2018-12-13)

#### :rocket: Enhancement
* [#156](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/156) Bring back support for Ember prior to 2.12 support (aka "bower support"). ([@rwjblue](https://github.com/rwjblue))

#### :bug: Bug Fix
* [#148](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/148) Prevent duplicating inline precompile babel plugin ([@arthirm](https://github.com/arthirm))

#### :house: Internal
* [#150](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/150) TravisCI: Remove deprecated `sudo: false` option ([@Turbo87](https://github.com/Turbo87))

#### Committers: 3
- Arthi ([@arthirm](https://github.com/arthirm))
- Robert Jackson ([@rwjblue](https://github.com/rwjblue))
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))

## v2.0.0 (2018-11-07)

#### :boom: Breaking Change
* [#120](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/120) Upgrade to ember-cli@3.5 blueprint.  ([@arthirm](https://github.com/arthirm))
* [#126](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/126) Remove Bower and run node-tests in CI ([@arthirm](https://github.com/arthirm))
* [#119](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/119) Drop Node.js 4 support ([@Turbo87](https://github.com/Turbo87))

#### :rocket: Enhancement
* [#118](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/118) Update `.npmignore` file ([@Turbo87](https://github.com/Turbo87))

#### :bug: Bug Fix
* [#114](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/114) Avoid setting up plugins per template (setup once per worker) ([@arthirm](https://github.com/arthirm))

#### Committers: 2
- Arthi ([@arthirm](https://github.com/arthirm))
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))

## v1.0.5 (2018-10-12)

#### :rocket: Enhancement
* [#115](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/115) Update `ember-cli-babel` peer dependency to support Babel 7 too. ([@Turbo87](https://github.com/Turbo87))

#### Committers: 1
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))


## v1.0.4 (2018-10-04)

#### :bug: Bug Fix
* [#112](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/112) Fix for Memory leak. ([@arthirm](https://github.com/arthirm))

#### Committers: 1
- Arthi ([arthirm](https://github.com/arthirm))


## v1.0.3 (2018-06-02)

#### :rocket: Enhancement
* [#106](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/106) Update minimum versions of dependencies.. ([@rwjblue](https://github.com/rwjblue))
* [#102](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/102) Add support for importing from `ember-cli-htmlbars-inline-precompile`. ([@Turbo87](https://github.com/Turbo87))

#### Committers: 2
- Robert Jackson ([rwjblue](https://github.com/rwjblue))
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))


## v1.0.2 (2017-08-09)

#### :bug: Bug Fix
* [#97](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/97) Fix caching for parallel plugin objects. ([@mikrostew](https://github.com/mikrostew))

#### Committers: 2
- Kelly Selden ([kellyselden](https://github.com/kellyselden))
- Michael Stewart ([mikrostew](https://github.com/mikrostew))


## v1.0.1 (2017-08-05)

#### :rocket: Enhancement
* [#93](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/93) update `ember-cli-babel` version check and dependencies. ([@mikrostew](https://github.com/mikrostew))

#### :bug: Bug Fix
* [#91](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/91) Adjust "ember-cli-babel" version check. ([@Turbo87](https://github.com/Turbo87))

#### Committers: 2
- Michael Stewart ([mikrostew](https://github.com/mikrostew))
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))


## v1.0.0 (2017-08-01)

#### :rocket: Enhancement
* [#83](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/83) Enable parallel transpile using API in broccoli-babel-transpiler. ([@mikrostew](https://github.com/mikrostew))

#### Committers: 1
- Michael Stewart ([mikrostew](https://github.com/mikrostew))


## v0.4.4 (2017-07-29)

#### :bug: Bug Fix
* [#88](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/88) Ensure ember-template-compiler does not mutate shared config object.. ([@rwjblue](https://github.com/rwjblue))

#### Committers: 1
- Robert Jackson ([rwjblue](https://github.com/rwjblue))


## v0.4.3 (2017-05-10)

#### :rocket: Enhancement
* [#81](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/81) Update ember-cli-version-checker to be aware of nested packages.. ([@rwjblue](https://github.com/rwjblue))

#### Committers: 1
- Robert Jackson ([rwjblue](https://github.com/rwjblue))


## v0.4.2 (2017-05-03)

#### :bug: Bug Fix
* [#76](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/76) Fixes init call so this works in older versions of ember-cli. ([@MiguelMadero](https://github.com/MiguelMadero))

#### Committers: 2
- Miguel Madero ([MiguelMadero](https://github.com/MiguelMadero))
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))


## v0.4.1 (2017-05-02)

#### :rocket: Enhancement
* [#72](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/72) Add helpful messaging when used in the wrong context.. ([@rwjblue](https://github.com/rwjblue))

#### Committers: 1
- Robert Jackson ([rwjblue](https://github.com/rwjblue))


## v0.4.0 (2017-04-22)

#### :rocket: Enhancement
* [#69](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/69) Make it work with ember-cli-babel@6 + ember-cli ^2.. ([@rwjblue](https://github.com/rwjblue))

#### :bug: Bug Fix
* [#68](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/68) Ensure super call is bounded. ([@samselikoff](https://github.com/samselikoff))

#### Committers: 4
- Ricardo Mendes ([locks](https://github.com/locks))
- Robert Jackson ([rwjblue](https://github.com/rwjblue))
- Sam Selikoff ([samselikoff](https://github.com/samselikoff))
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))


## v0.4.0-beta.1 (2017-03-11)

#### :rocket: Enhancement
* [#69](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/69) Make it work with ember-cli-babel@6 + ember-cli ^2.. ([@rwjblue](https://github.com/rwjblue))

#### :bug: Bug Fix
* [#68](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/68) Ensure super call is bounded. ([@samselikoff](https://github.com/samselikoff))

#### Committers: 4
- Ricardo Mendes ([locks](https://github.com/locks))
- Robert Jackson ([rwjblue](https://github.com/rwjblue))
- Sam Selikoff ([samselikoff](https://github.com/samselikoff))
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))


## v0.3.6 (2016-11-04)

#### :bug: Bug Fix
* [#57](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/57) Use ember-source instead of ember-core. ([@josemarluedke](https://github.com/josemarluedke))

#### Committers: 3
- Greenkeeper ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))
- Josemar Luedke ([josemarluedke](https://github.com/josemarluedke))
- Ricardo Mendes ([locks](https://github.com/locks))


## v0.3.5 (2016-08-11)

#### :bug: Bug Fix
* [#37](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/37) Fix AST plugin usage with inline precompiler.. ([@rwjblue](https://github.com/rwjblue))

#### Committers: 2
- Greenkeeper ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))
- Robert Jackson ([rwjblue](https://github.com/rwjblue))


## v0.3.4 (2016-08-10)

#### :rocket: Enhancement
* [#34](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/34) Provide template compiler cache key to babel plugin.. ([@rwjblue](https://github.com/rwjblue))
* [#31](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/31) Noop if ember-cli-htmlbars has already registered the precompiler. ([@offirgolan](https://github.com/offirgolan))

#### Committers: 3
- Greenkeeper ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))
- Offir Golan ([offirgolan](https://github.com/offirgolan))
- Robert Jackson ([rwjblue](https://github.com/rwjblue))


## v0.3.3 (2016-07-27)

#### :rocket: Enhancement
* [#30](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/30) Make sure feature flags are available. ([@chadhietala](https://github.com/chadhietala))

#### Committers: 2
- Chad Hietala ([chadhietala](https://github.com/chadhietala))
- Clemens M�ller ([pangratz](https://github.com/pangratz))


## v0.3.2 (2016-05-22)

#### :rocket: Enhancement
* [#28](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/28) add support for ember-core npm module. ([@stefanpenner](https://github.com/stefanpenner))

#### Committers: 2
- Clemens M�ller ([pangratz](https://github.com/pangratz))
- Stefan Penner ([stefanpenner](https://github.com/stefanpenner))


## 0.3.1 (2015-09-12)

#### :rocket: Enhancement
* [#23](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/23) Upgrade to ember-cli-htmlbars ^1.0.0. ([@joliss](https://github.com/joliss))

#### Committers: 1
- Jo Liss ([joliss](https://github.com/joliss))


## 0.3.0 (2015-08-31)

#### :rocket: Enhancement
* [#21](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/21) Fix usage within multi-EmberApp builds. ([@ef4](https://github.com/ef4))

#### :bug: Bug Fix
* [#5](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/5) app.options doesn't exist when used in addons. ([@wagenet](https://github.com/wagenet))

#### Committers: 2
- Edward Faulkner ([ef4](https://github.com/ef4))
- Peter Wagenet ([wagenet](https://github.com/wagenet))


## v0.1.2 (2015-06-26)

#### :rocket: Enhancement
* [#12](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/12) Bump babel-plugin-htmlbars-inline-precompile to v0.0.3. ([@pangratz](https://github.com/pangratz))

#### Committers: 1
- Clemens M�ller ([pangratz](https://github.com/pangratz))


## v0.1.1 (2015-06-13)

#### :rocket: Enhancement
* [#10](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/pull/10) Pump babel-plugin-htmlbars-inline-precompile to 0.0.2. ([@pangratz](https://github.com/pangratz))

#### Committers: 1
- Clemens M�ller ([pangratz](https://github.com/pangratz))
