# Change Log
## [1.0.2](https://github.com/ember-cli-deploy/ember-cli-deploy/tree/1.0.2) (2017-30-10)
[Full Changelog](https://github.com/ember-cli-deploy/ember-cli-deploy/compare/v1.0.1...1.0.2)

- Only emit plugin message if none are present [#487](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/487) [@dfreeeman](https://github.com/dfreeman)

## [1.0.1](https://github.com/ember-cli-deploy/ember-cli-deploy/tree/1.0.1) (2017-06-09)
[Full Changelog](https://github.com/ember-cli-deploy/ember-cli-deploy/compare/v1.0.0...1.0.1)

- Fix syntax for aliasing plugins [#467](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/467) [@calvinlough](https://github.com/calvinlough)
- Tolerate other names than those starting with ember-cli-deploy [#469](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/469) [@duizendnegen](https://github.com/duizendnegen)

## [1.0.0](https://github.com/ember-cli-deploy/ember-cli-deploy/tree/1.0.0) (2017-02-06)
[Full Changelog](https://github.com/ember-cli-deploy/ember-cli-deploy/compare/v1.0.0-beta.2...1.0.0)

Although ember-cli-deploy has had a fairly stable API since 0.5.x, this 1.0.0 release signifies that we are committed to supporting this API through the 1.x series, in accordance with SemVer.

Since 0.6.x, we have deprecated the `plugins` config option in favor of a more flexible and expressive approach.

Thanks to the efforts of @ef4 and @achambers the plugin ordering/disable/aliasing strategy has been entirely rewritten (originally released in 1.0.0-beta.1):

- the user can disable individual plugins by setting `disabled: {pluginName: true}` on each plugin's config entry.
- the user can disable all plugins except some using `disable: {allExcept: ['plugin1', 'plugin2']}`
- the user can influence plugin order by expressing inter-plugin dependencies with `runBefore` and `runAfter` on each plugin's config entry.
- plugin authors can influence plugin order by expressing inter-plugin dependencies by setting `runBefore` and `runAfter` properties directly on their plugin instance.
- plugin aliasing is now done by setting `alias: {original: ['alias1', 'alias2']}`

To get more information go visit [the Ember CLI Deploy website](http://www.ember-cli-deploy.com/docs/v1.0.x/configuration/)

Upgrade notes are also available [here](http://ember-cli-deploy.com/docs/v1.0.x/upgrading/)

## [1.0.0-beta.2](https://github.com/ember-cli-deploy/ember-cli-deploy/tree/1.0.0-beta.2) (2016-12-16)
[Full Changelog](https://github.com/ember-cli-deploy/ember-cli-deploy/compare/v1.0.0-beta.1...1.0.0-beta.2)

We anticipate this pre-release being the last beta before 1.0.0. There are *no API changes* in this beta. (Note that beta.1 deprecated the `plugins` config option in favor of a more flexible and expressive approach. See release notes for that version for details).

Changes in this beta consist of updated and trimmed dependencies, including the elimination of dependencies on ember-cli internals. Thanks to @duizendnegen for his work on this front.

## [v1.0.0-beta.1](https://github.com/ember-cli-deploy/ember-cli-deploy/tree/v1.0.0-beta.1) (2016-07-11)
[Full Changelog](https://github.com/ember-cli-deploy/ember-cli-deploy/compare/v0.6.4...v1.0.0-beta.1)

This pre-release has **no breaking changes** from 0.6.4 but deprecates the old way of specifying the `plugins` config property.

Thanks to the efforts of @ef4 and @achambers the plugin ordering/disable/aliasing strategy has been entirely rewritten:

- the user can disable individual plugins by setting `disabled: {pluginName: true}` on each plugin's config entry.
- the user can disable all plugins except some using `disable: {allExcept: ['plugin1', 'plugin2']}`
- the user can influence plugin order by expressing inter-plugin dependencies with `runBefore` and `runAfter` on each plugin's config entry.
- plugin authors can influence plugin order by expressing inter-plugin dependencies by setting `runBefore` and `runAfter` properties directly on their plugin instance.
- plugin aliasing is now done by setting `alias: {original: ['alias1', 'alias2']}`

To get more information go visit [the Ember CLI Deploy website](http://www.ember-cli-deploy.com/docs/v1.0.x/configuration/)

Upgrade notes are also available [here](http://ember-cli-deploy.com/docs/v1.0.x/upgrading/)

[Pull Request](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/349)

## [v0.6.4](https://github.com/ember-cli-deploy/ember-cli-deploy/tree/v0.6.4) (2016-06-24)
[Full Changelog](https://github.com/ember-cli-deploy/ember-cli-deploy/compare/v0.6.3...v0.6.4)


- Fix CoreObject init/super deprecation [\#410](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/410) ([alisdair](https://github.com/alisdair))
- add support for requiredHooks in pipelines for better error messages [\#406](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/406) ([ghedamat](https://github.com/ghedamat))
- Validate configured plugins before continue with pipeline [\#405](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/405) ([zzarcon](https://github.com/zzarcon))

## [0.6.3](https://github.com/ember-cli-deploy/ember-cli-deploy/tree/0.6.3) (2016-05-26)
[Full Changelog](https://github.com/ember-cli-deploy/ember-cli-deploy/compare/v0.6.2...0.6.3)

- [#402](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/402) Fix plugin context merging in the pipeline model [@dannyfallon/df](https://github.com/dannyfallon/df)

## [0.6.2](https://github.com/ember-cli-deploy/ember-cli-deploy/tree/0.6.2) (2016-05-12)
[Full Changelog](https://github.com/ember-cli-deploy/ember-cli-deploy/compare/v0.6.1...0.6.2)

- Bump lodash version to remove warning [#388](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/388) [@orf](https://github.com/orf)
- Update ember-cli links to ember-cli-deploy [#392](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/392) [@yothomas](https://github.com/yothomas)

## [0.6.1](https://github.com/ember-cli-deploy/ember-cli-deploy/tree/0.6.1) (2016-04-14)
[Full Changelog](https://github.com/ember-cli-deploy/ember-cli-deploy/compare/v0.6.0...0.6.1)

This release fixes a regression introduced by 0.6.0 that caused the command line flag for specifying a config file to stop working. Thanks to @dschmidt for the fix.

This release also adds config options for specifying log colors (some users had complaints about lack of contrast against certain terminal backgrounds). Documentation is still forthcoming on this feature, but you can check PR #377 if you're anxious to use this.

Pull Requests:

- Fix config file option [\#385](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/385) ([dschmidt](https://github.com/dschmidt))
- add config options for log colors [\#377](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/377) ([ghedamat](https://github.com/ghedamat))

## [0.6.0](https://github.com/ember-cli-deploy/ember-cli-deploy/tree/0.6.0) (2016-02-26)
[Full Changelog](https://github.com/ember-cli-deploy/ember-cli-deploy/compare/v0.5.1...0.6.0)

This release has no breaking changes from 0.5.1. It introduces a progress bar for deploys run on interactive terminals, improved ability to configure command defaults, and new fetchInitialRevisions & fetchRevisions hooks to the deploy pipeline, which will better enable plugins that want to do changelog/diff notifications.

We have also introduced new versioned docs for 0.6.x, available now from the version selector on ember-cli-deploy.com in the Docs section.

Huge thanks to the fine work of the ember-cli-deploy core team, particularly @ghedamat who has been very active this cycle, and to our growing set of contributors and community. It is amazing to the see the ember-cli-deploy plugin ecosystem blossom.

### Plugin Authors

The `fetchRevisions` hook is now be called during the "deploy" and "activate" pipelines. It was previously only called during the "list" pipeline. In addition, a new `fetchInitialRevisions` hook will be called during the "deploy" and "activate" pipelines. See the [0.6.x Pipeline Hooks docs](http://ember-cli-deploy.github.io/ember-cli-deploy/docs/v0.6.x/pipeline-hooks/) for details. If you maintain a plugin that uploads new revisions, you will want to update your plugin to implement the new hook. Here is an example of [updating ember-cli-deploy-redis](https://github.com/ember-cli-deploy/ember-cli-deploy-redis/pull/50).

You should also update your ember-cli-deploy-plugin dependency to 0.2.2, to ensure your plugin's logging plays nicely with the nifty new progress bar in this ember-cli-deploy release.

Pull Requests:

- Move to non-scoped npm package for progress, and newer version. Fixes an issue causing crashes when running at certain narrow terminal widths. [\#366](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/366) and [\#367](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/367) ([lukemelia](https://github.com/lukemelia))
- Use our fork of progress so that we can make the rocket part of the progress bar [\#364](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/364) ([lukemelia](https://github.com/lukemelia))
- Remove unused code [\#359](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/359) ([achambers](https://github.com/achambers))
- display progress notification during deploy [\#280](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/280) ([ghedamat](https://github.com/ghedamat))
- add `fetchRevisions`hook to deploy and activate pipelines [\#323](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/323) ([sethpollack](https://github.com/sethpollack))
- Allow loading .env files + .env.deploy.\<env\> files [\#342](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/342) ([blimmer](https://github.com/blimmer))
- read-config task \(fix issue where dotenv files were not loaded in time for deploy tasks\) [\#319](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/319) ([lukemelia](https://github.com/lukemelia))
- Remove temporary fix for broccoli-asset-rev [\#316](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/316) ([backspace](https://github.com/backspace))

## [0.5.1](https://github.com/ember-cli-deploy/ember-cli-deploy/tree/0.5.1) (2015-11-09)
[Full Changelog](https://github.com/ember-cli-deploy/ember-cli-deploy/compare/v0.5.0...0.5.1)

- Upgrade ember-cli to 1.13.8. [\#296](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/296) ([blimmer](https://github.com/blimmer))
- Require a deploy target to run ember deploy [\#294](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/294) ([kiwiupover](https://github.com/kiwiupover))
- Fix typo in "no plugins" warning \(it's/its\) [\#284](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/284) ([pgengler](https://github.com/pgengler))

## [0.5.0](https://github.com/ember-cli-deploy/ember-cli-deploy/tree/v0.5.0) (2015-10-29)
[Full Changelog](https://github.com/ember-cli-deploy/ember-cli-deploy/compare/v0.4.3...v0.5.0)

[BREAKING] This release is the first in the 0.5.0 series and the first using the new deploy pipeline and plugin architecture.

0.5.0 harnesses the concept of a pipeline that gives users the ability to flexibly compose plugins to satisfy their
custom deployment needs.

NOTE: 0.5.0 is a major rewrite and shift from the 0.4.x series and hence introduces a number of breaking changes.

For more information on the ember-cli-deploy v0.5.0, how to use it and how to write plugins please see the brand new
[documentation site](http://ember-cli-deploy.com).

## [0.5.0-beta.4](https://github.com/ember-cli-deploy/ember-cli-deploy/tree/0.5.0-beta.4) (2015-10-24)
[Full Changelog](https://github.com/ember-cli-deploy/ember-cli-deploy/compare/v0.5.0-beta.3...0.5.0-beta.4)

**Merged pull requests:**

- Add a `--verbose` option to commands, make default output quiet, and … [\#266](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/266) ([lukemelia](https://github.com/lukemelia))

## [0.5.0-beta.3](https://github.com/ember-cli-deploy/ember-cli-deploy/tree/0.5.0-beta.3) (2015-10-22)
[Full Changelog](https://github.com/ember-cli-deploy/ember-cli-deploy/compare/v0.5.0-beta.2...0.5.0-beta.3)

This release is expected to be the last beta before 0.5.0. We're happy to welcome
@ghedamat to the core team and are grateful for his many contributions to
documentation this cycle.

Thanks to everyone who took time to contribute to this release!

#### Community Contributions

- add postInstall message [\#256](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/256) ([ghedamat](https://github.com/ghedamat))
- Correct typo; commandOptions are a local var [\#255](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/255) ([kategengler](https://github.com/kategengler))
- Make --deploy-config-path accept absolute paths [\#253](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/253) ([dschmidt](https://github.com/dschmidt))
- Update warning message url when no plugins installed [\#234](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/234) ([achambers](https://github.com/achambers))
- Guard postBuild hook [\#232](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/232) ([lukemelia](https://github.com/lukemelia))
- Merge 0.4.x [\#228](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/228) ([lukemelia](https://github.com/lukemelia))
- Give warning when no plugins are installed [\#225](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/225) ([achambers](https://github.com/achambers))
- Add support for postBuildDeployHook [\#222](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/222) ([ghedamat](https://github.com/ghedamat))

### 0.5.0-beta.2 (June 14, 2015)

#### Community Contributions

- [#189](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/189) [DOCUMENTATION] Upgrade instructions for plugin authors (and a bit for end users) [@duizendnegen/feature](https://github.com/duizendnegen/feature)
- [#196](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/196) [BUGFIX] Fix bug where fingerprint options in deploy.js don't work [@achambers](https://github.com/achambers)
- [#197](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/197) Remove unused code and commands deprecated in 0.4.0. [@yapplabs](https://github.com/yapplabs)
- [#206](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/206) Remove modifying fingerprint options on `included` hook [@achambers](https://github.com/achambers)
- [#207](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/207) Add 'prepare' hooks to pipeline [@achambers](https://github.com/achambers)
- [#208](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/208) [DOCUMENTATION] Update RFC with prepare hook [@achambers](https://github.com/achambers)
- [#210](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/210) add setup and teardown hooks to all commands [@ghedamat](https://github.com/ghedamat)
- [#212](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/212) [DOCUMENTATION] Update description of hooks in rfc [@ghedamat](https://github.com/ghedamat)
- [#213](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/213) Change deprecated require 'ember-cli/lib/errors/silent' to 'silent-error' [@dukex](https://github.com/dukex)

### 0.4.3 (July 12, 2015)

This release fixes problems with the silent-error package used by
`ember-cli-deploy` internally, brings improvements for the activate task and
makes it possible to configure the build path that `ember-cli-deploy` uses to
store files before uploading.

Thanks to everyone who took time to contribute to this release!

#### Community Contributions

- [#156](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/156) Fix `_materialize` using wrong this context [@jeffhertzler](https://github.com/jeffhertzler)
- [#158](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/158) added ember-cli-rest-index adapter to list of adapter [@leojh](https://github.com/leojh)
- [#159](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/159) Update video link in README. [@blimmer](https://github.com/blimmer)
- [#161](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/161) Remove leading '+' es from code of conduct [@pangratz](https://github.com/pangratz)
- [#164](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/164) [#151] read manifestPrefix from config [@pavloo](https://github.com/pavloo)
- [#170](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/170) Add ability to configure build paths, defaulting to tmp/deploy-dist/. [@duizendnegen/feature](https://github.com/duizendnegen/feature)
- [#171](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/171) Update ember cli 0.2.7 and fix npm warnings [@ghedamat](https://github.com/ghedamat)
- [#175](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/175) Manifest prefix for activate task. [@juggy](https://github.com/juggy)
- [#176](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/176) Use silent-error NPM Package [@jherdman](https://github.com/jherdman)
- [#178](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/178) Use SilentError to log errors when parsing config. [@ember-cli](https://github.com/ember-cli)

Thank you to all who took the time to contribute!

### 0.4.2 (June 14, 2015)

This release fixes asset upload issues with io.js, adds the possibility for
index adapters to support multiple files and adds a configuration option to
exclude asset files from deployment.

#### Community Contributions

- [#140](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/140) Link to ember-deploy-couchbase. [@waltznetworks](https://github.com/waltznetworks)
- [#113](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/113) Provide better error support for missing environment config [@achambers](https://github.com/achambers)
- [#115](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/115) Changed package to be able to run tests on windows. [@Twinkletoes](https://github.com/Twinkletoes)
- [#119](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/119) Stub active, list, createTag UnknownAdapter methods [@waltznetworks](https://github.com/waltznetworks)
- [#120](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/120) [DOCUMENTATION] Make Sinatra example a bit more secure [@elucid](https://github.com/elucid)
- [#124](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/124) Index Adapter support for multiple files [@Ahalogy](https://github.com/Ahalogy)
- [#128](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/128) Link to custom adapters section for quick ref [@jayphelps](https://github.com/jayphelps)
- [#129](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/129) Make a callout easily actionable [@jorgedavila25](https://github.com/jorgedavila25)
- [#141](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/141) Add configuration option to exclude asset files from being deployed. [@yapplabs](https://github.com/yapplabs)
- [#142](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/142) Test against stable node versions [@yapplabs](https://github.com/yapplabs)
- [#144](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/144) Resolve JSHint error on deploy.js blueprint [@blimmer](https://github.com/blimmer)
- [#146](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/146) Make io.js work [@trym](https://github.com/trym)

Thank you to all who took the time to contribute!

### 0.4.1 (March 13, 2015)

This release mainly revolves round fixing a bug around `child_process` and `execSync` compatability among the nodejs versions and platforms.

#### Community Contributions

- [#93](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/93) [BUGFIX] execSync compat issue #92 [@joebartels](https://github.com/joebartels)
- [#100](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/100) [DOCS] Update config around production-like environments [@Soliah](https://github.com/Soliah)

### 0.4.0 (March 07, 2015)

This release marks the merge of `achambers/ember-cli-deploy`, `LevelBossMike/ember-deploy` and `tedconf/ember-cli-front-end-builds` into the official `ember-cli-deploy`

If you are upgrading from `achambers/ember-cli-deploy v0.0.6`, please follow these [miragtion steps](https://github.com/ember-cli-deploy/ember-cli-deploy/blob/master/MIGRATION_STEPS.md);

#### Community Contributions

- [#33](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/33) [DOCS] Link to new S3 Index Adapter [@pootsbook](https://github.com/pootsbook)
- [#65](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/65) [DOCS] Update CodeClimate batch. [@LevelbossMike](https://github.com/LevelbossMike)
- [#35](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/35) [ENHANCEMENT] Match ember-cli's build command aliases by supporting --prod and --dev [@jamesfid](https://github.com/jamesfid)
- [#36](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/36) [ENHANCEMENT] Allow custom config file via --deploy-config-file. [@yapplabs](https://github.com/yapplabs)
- [#63](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/63) [BUGFIX] Fix regression to the type of object that was being passed to assets adapters as “config”. [@yapplabs](https://github.com/yapplabs)
- [#56](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/56) [BREAKING ENHANCEMENT] Deprecated commands no longer needed. [@ember-cli](https://github.com/ember-cli)
- [#40](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/40) [BUGFIX] Removed erroneous conflict markers. [@jamesfid](https://github.com/jamesfid)
- [#58](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/58) [ENHANCEMENT] Add blueprint to auto generate config/deploy.js [@ember-cli](https://github.com/ember-cli)
- [#57](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/57) [DEPRECATION] Deprecate use of deploy.json in favor of config/deploy.js. Closes #51 [@yapplabs](https://github.com/yapplabs)
- [#66](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/66) [DOCS] Add note for fingerprint.prepend and staging envs. [@LevelbossMike](https://github.com/LevelbossMike)
- [#74](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/74) [BREAKING DEPRECATION] Revert Unsupported Commands back to Deprecated for 0.4.0 release [@danshultz](https://github.com/danshultz)
- [#85](https://github.com/ember-cli-deploy/ember-cli-deploy/pull/85) [DEPRECATION] npm post install message for users of v0.0.6 [@achambers](https://github.com/achambers)

### 0.3.1 (February 08, 2015)

- [#32](https://github.com/LevelbossMike/ember-deploy/pull/32) add support for execSync in node >= 0.11 [@kriswill](https://github.com/kriswill)

\* *This Change Log was automatically generated by [github_changelog_generator](https://github.com/skywinder/Github-Changelog-Generator)*
