# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.2] - 2019-07-05

- Lock `@babel/plugin-transform-typescript` version pending a fix to [babel/babel#10162](https://github.com/babel/babel/issues/10162) ([#751](https://github.com/typed-ember/ember-cli-typescript/pull/751))

## [2.0.1] - 2019-04-10

### Fixed 🔧

- Correctly handles a mismatch between package and addon names ([#669](https://github.com/typed-ember/ember-cli-typescript/pull/669))
- Uses [Notion](https://www.notionjs.com) to specify Node and Yarn versions correctly. ([#667](https://github.com/typed-ember/ember-cli-typescript/pull/667))

## [2.0.0] - 2019-03-13

The bullets below comprise a Greatest Hits list of the fixes and additions from 1.x, but the 2.0 release constitutes a ground-up rewrite of how we handle both transpiling and typechecking TypeScript code. For a full guide for upgrading from 1.x to 2.0, see the [Upgrade Notes document](https://github.com/typed-ember/ember-cli-typescript/blob/13015d2e7ebef9d7b9b8b5acb84a35b8dfde5502/tests/dummy/app/templates/docs/upgrade-notes.md).

### Fixed 🔧

- We now play nicely with other JS/TS processors, like `ember-auto-import` ([#287](https://github.com/typed-ember/ember-cli-typescript/issues/287))
- Compilation across projects in monorepos no longer causes `tsc` to panic ([#314](https://github.com/typed-ember/ember-cli-typescript/issues/314))

### Added ⭐️

- Typechecking now occurs off of the main build thread, so the two are no longer in competition for CPU time on multi-core systems.
- Much nicer formatting for type errors in both the console and browser when running `ember serve`.
- TS code is now transpiled by Babel, allowing it to benefit from the same caching and parallelization as JS transpilation, and ensuring consistent language semantics between TS and JS files.

## Upgrading ⚙️

See the [2.0 Upgrade Notes](https://github.com/typed-ember/ember-cli-typescript/blob/13015d2e7ebef9d7b9b8b5acb84a35b8dfde5502/tests/dummy/app/templates/docs/upgrade-notes.md) for detailed instructions on upgrading from 1.x to 2.0.

## Contributors 🙇

Thanks to everyone who opened/discovered an issue we fixed or PR we merged over the course of our 2.0 stabilization process!

- @acorncom
- @allenylzhou
- @alexlafroscia
- @anmaikul
- @Bouke
- @boris-petrov
- @championswimmer
- @chriskrycho
- @dwickern
- @dfreeman
- @ef4
- @Gaurav0
- @happycollision
- @jamescdavis
- @lifeart
- @mfeckie
- @mike-north
- @runspired
- @simonihmig
- @theseyi

## [2.0.0-rc.2] - 2019-01-07

For details on the changes since 1.x, see the [`2.0.0-beta.1` release notes](
https://github.com/typed-ember/ember-cli-typescript/releases/tag/v2.0.0-beta.1).

### Fixed 🔧

- Set `--isolatedModules` back to `false` in both precompilation and generated blueprints

### Added ⭐️

- We now warn you nicely if you try to use this in an addon via `devDependencies` instead of `dependencies`

### Under the hood 🚗

- Used the same tests commands across providers, so we get the same results

## Upgrading ⚙️

For apps:

```
ember install ember-cli-typescript@next
```

For addons:

```
ember install -S ember-cli-typescript@next
```

## Contributors 🙇

Thanks to everyone who opened/discovered an issue we fixed or PR we merged in this release!

- @alexlafroscia
- @dfreeman
- @happycollision

## [2.0.0-rc.1] - 2018-12-13

## What Changed?

For details on the changes since 1.x, see the [`2.0.0-beta.1` release notes](
https://github.com/typed-ember/ember-cli-typescript/releases/tag/v2.0.0-beta.1).

### Fixed 🔧

- Builds no longer hang if a changed TypeScript file did not trigger a TS rebuild (which can happen e.g. if it is not yet imported elsewhere).
- Type-checking information now properly gets injected into the build pipeline for test builds as well as development and production builds.
- Declaration maps now have test coverage to make sure they don't break.

### Changed 💥

- The build system now uses the `tsconfig.json` file's `paths` key to copy type definitions during precompile, rather than assuming Ember project structure.

### Added ⭐️

- The addon now checks to confirm you're using Ember CLI 3.5+, since the new approach to builds has serious performance problems with a local `tmp` directory.

### Under the hood 🚗

- Bumped *many* dependency versions.
- Set up Azure Pipelines configuration.
- Updated internals to use TypeScript themselves.

## Upgrading ⚙️

```
ember install ember-cli-typescript@next
```

## Contributors 🙇

Thanks to everyone who opened/discovered an issue we fixed or PR we merged in this release!

- @mike-north
- @dfreeman
- @jamescdavis

## [2.0.0-beta.3] - 2018-11-02

## What Changed?

For details on the changes since 1.x, see the [`2.0.0-beta.1` release notes](
https://github.com/typed-ember/ember-cli-typescript/releases/tag/v2.0.0-beta.1).

### Fixed 🔧
- Ensure consistency with `tsc` re: class property initialization order (#365)

## Upgrading ⚙️

```
ember install ember-cli-typescript@beta
```

## Contributors 🙇

Thanks to everyone who opened/discovered an issue we fixed or PR we merged in this release!

- @runspired
- @dfreeman

## [2.0.0-beta.2] - 2018-10-26

### Fixed
- Ensure that ember-cli-typescript doesn't interfere with parallelizing the Babel transpilation process (#351)

## [2.0.0-beta.1] - 2018-10-25

This is a major release with 💥 breaking changes 💥! However, most apps will compile with minimal (or no) changes! 🎉 They'll also tend to compile *much faster* in many cases. ⚡️

We now use Babel 7's support for TypeScript to build apps and addons. Most of the horrible hacks we had to do before are now gone, and the error outputs you will see for type errors are much nicer as well. (As a particular note, we should work better with `ember-auto-import` now, since we're just part of the normal Broccoli/Babel pipeline Ember CLI uses.)

***THIS IS A BETA!*** Please test this out in your apps! Please do *not* use this for your production apps!

### Added

* Much nicer reporting of type errors both in the console and in your browser
* Type errors now use the "pretty" type error format stabilized in TypeScript 2.9

### Changed

* We now build the application using Babel 7's TypeScript plugin. This has a few important limitations – some of them bugs (linked below); others are conscious decisions on the part of Babel. The changes:
    - `const enum` types are unsupported. You should switch to constants or regular enums.

    - trailing commas after rest function parameters (`function foo(...bar[],) {}`) are disallowed by the ECMAScript spec, so Babel also disallows them.

    - re-exports of types have to be disambiguated to be *types*, rather than values. Neither of these will work:

      ```ts
      export { FooType } from 'foo';
      ```
      ```ts
      import { FooType } from 'foo';
      export { FooType };
      ```

      In both cases, Babel attempts to emit a *value* export, not just a *type* export, and fails because there is no actual value to emit. You can do this instead as a workaround:

      ```ts
      import * as Foo from 'foo';
      export type FooType = Foo.FooType;
      ```

    - `this` types in ES5 getters and setters are do not work ([babel/babel#8069](https://github.com/babel/babel/issues/8069))

    - destructuring of parameters in function signatures currently do not work ([babel/babel#8099](https://github.com/babel/babel/issues/8099))

    Other bugs you should be aware of:

    - if an enum has a member with the same name as an imported type ([babel/babel#8881](https://github.com/babel/babel/issues/8881))

* `ember-cli-typescript` must be in `dependencies` instead of `devDependencies` for addons, since we now hook into the normal Broccoli + Babel build pipeline instead of doing an end-run around it

* Addons can no longer use `.ts` in app, because an addon's `app` directory gets merged with and uses the *host's* (i.e. the other addon or app's) preprocessors, and we cannot guarantee the host has TS support. Note that in-repo-addons will continue to work for in-repo addons because of the app build works with the host's (i.e. the app's, not the addon's) preprocessors.

* Apps need to use `.js` for overrides in app, since the different file extension means apps no long consistently "win" over addon versions (a limitation of how Babel + app merging interact) – note that this won’t be a problem with Module Unification apps

### Fixed

* Type errors now show properly in the browser when running tests

## [1.5.0] - 2018-10-25

### Fixed

* We now provide better user feedback when installing ember-cli-typescript from a git version (i.e. for testing prereleases)
* Updated to ember-cli-typescript-blueprints so types in generated files correctly match the latest Ember Data types
* Updated to latest Ember CLI blueprint (as of 3.5.0)

## [1.4.4] - 2018-10-01

### Fixed

* We no longer claim the absolute highest priority when ember-cli is selecting blueprints (see [#323])

[#323]: https://github.com/typed-ember/ember-cli-typescript/pull/323

## [1.4.3] - 2018-09-24

### Fixed

* We now correctly clean up the system temp directory we create during builds (see [#318])

[#318]: https://github.com/typed-ember/ember-cli-typescript/issues/318

### Changed

* We reference the Discord channel instead of Slack.
* [Internal] We enabled writing code for this addon itself in TypeScript.

## [1.4.2] - 2018-09-06

### Fixed

* Ensure TS blueprints always take precedence over JS ones ([#253](https://github.com/typed-ember/ember-cli-typescript/pull/253))

## [1.4.1] - 2018-09-05

### Fixed

* Avoid warnings in Ember CLI 3.4+ about missing package directories for our in-repo testing addons ([#252](https://github.com/typed-ember/ember-cli-typescript/pull/252))

### Changed

* All blueprints for Ember and Ember Data entities now come from a standalone [ember-cli-typescript-blueprints](https://github.com/typed-ember/ember-cli-typescript-blueprints) package.

## [1.4.0] - 2018-08-07

### Fixed

* Ignore `node_modules` hoisted above project root (e.g. yarn workspaces)

### Added

* Auto-install of [`@types/ember__test-helpers`](https://www.npmjs.com/package/@types/ember__test-helpers)
* Initial support for [Module Unification](https://github.com/emberjs/rfcs/blob/master/text/0143-module-unification.md) (see [#199](https://github.com/typed-ember/ember-cli-typescript/pull/199) for what is/isn't supported in this release)
* Support for building addons' `test-support` and `addon-test-support` directories

## [1.3.4] - 2018-09-24

### Fixed

* We now correctly clean up the system temp directory we create during builds. (Backported from 1.4.3; see [#318].)

## [1.3.3] - 2018-07-19

### Fixed

* Watcher has been "de-simplified" to make it more consistent with how tsc's own watcher works and prevent rebuild issues.
* `ember-cli-typescript` will now run after `ember-decorators`, ensuring that the `ember-cli-typescript` blueprints override `ember-decorators`'.

### Changed

* Improved documentation regarding service injection.

### Added

* Getting Help section to readme.
* Github issue templates.

## [1.3.2] - 2018-06-05

### Fixed

* TypeScript 2.9 no longer causes infinite error loops and/or fails to trigger rebuilds.

## [1.3.1] - 2018-05-14

### Fixed

* No longer requires TypeScript before it has been installed.
* Properly ignore the root across platforms.

## [1.3.0] - 2018-05-01

### Fixed

* Simplified the file watching implementation, fixing some odd behavior when trees of files were deleted or moved all at once.
* Synchronization between tsc and the broccoli build process has been improved, reducing spurious rebuilds.
* TypeScript no longer churns on every change in the `tmp` directory.
* Make sure ember-cli-typescript is a dev dependency when generating in-repo-addons, so their TypeScript gets built correctly.
* Eliminated some lint errors in the build.

### Changed

* Updated the generated `tsconfig.json` to use the maximum strictness we can with Ember's typings.
* Clarified instructions for sourcemaps.

### Added

* The addon now supports failing the build when there are type errors, using `"noEmitOnError": true` in `tsconfig.json`.

## [1.2.2] - 2018-09-24

### Fixed

* We now correctly clean up the system temp directory we create during builds. (Backported from 1.4.3; see [#318].)

## [1.2.1] - 2018-03-14

### Fixed

* Blueprint now correctly adds ember-cli-typescript as a dependency, allowing TS to be merged into the regular app tree.

## [1.2.0] - 2018-03-05

### Added

* Blueprint (and tests) to generate in-repo addons configured for TypeScript
* Add `// @ts-ignore` component template import.
* `-addon` blueprints for all the things to generate .ts files in `app/` in an addon.

### Changed

* Improve instructions for setting up [Linked Addons](README.md#linking-addons) and [In-repo Addons](README.md#in-repo-addons).

### Fixed

* Addon components need to manually set their layout property to the imported compiled template.
* The declaration file for the `<app-name>/config/environment` module now resolves correctly from app code. If you have a version of this file previously generated at `types/<app-name>/config/environment.d.ts`, you'll likely want to move it to `app/config/environment.d.ts`.

## [1.1.7] - 2018-09-24

### Fixed

* We now correctly clean up the system temp directory we create during builds. (Backported from 1.4.3; see [#318].)

## [1.1.6] - 2018-02-23

### Fixed

* The blueprints provided by `ember-cli-typescript` now deterministically override the base ones from `ember-data` and `ember-source`.
* Correct type declarations are installed out of the box based on what test framework is present.
* A catch-all model registry is generated on installation to avoid the "error TS2344" problem.

## [1.1.5] - 2018-02-20

### Fixed

* Fixed a regression in 1.1.4 which caused in-repo-addons written in TypeScript not to work correctly.
* Fixed the `tsconfig.json` blueprint to properly include the `types` directory.

## [1.1.4] - 2018-02-20

### Changed

* The default `tsconfig.json` now includes inline source maps to support integrating with Babel sourcemaps, and the README has instructions for configuring Ember CLI's Babel integration.

### Fixed

* TypeScript files in addon `app` trees now get compiled properly.
* App files now correctly take precedence over any files of the same name earlier in the tree. (If you had a component with the same name as an addon-supplied component, for example, the addon version could override yours.)

## [1.1.3] - 2018-02-16

### Fixed

* Fix default blueprint for `types/<my app>/index.d.ts`: add missing import and an export statement so ambient declarations work.
* Add types to initializer and instance initializer blueprints.
* Special-case handling for Mirage so that it works at all, and update generators so it works "out of the box".
* Stop assuming the ember-cli-qunit version consumers have installed will be sufficiently high for our tests to pass.

## [1.1.2] - 2018-02-13

### Fixed

* _Actually_ resolve the problem of throwing when running generators if `ember-cli-version-checker` version too low: put it in `dependencies`.

## [1.1.1] - 2018-02-12

### Fixed

* No longer throw when running generators if `ember-cli-version-checker` version too low by putting it in `peerDependencies`.
* Clarified some parts of the README that misled people on handling certain errors.

## [1.1.0] - 2018-02-12

### Added

* **Generators:** `ember generate <blueprint>` now creates TypeScript files for you
* **Support for addons:** we now precompile addon TypeScript so `ember-cli-typescript` and `typescript` itself can remain in `devDependencies` instead of `dependencies`, and addons can easily distribute compiled JavaScript with TypeScript type definition (`.d.ts`) files.
* **Incremental compilation:** `ember serve` or `ember test --serve` now use TypeScript's `tsc --watch` mode to only rebuild what changed, so your builds should be much faster

### Fixed

* `tsconfig.json` is no longer so annoyingly temperamental; you can largely do what you want with it
* `ember serve` no longer triggers a full rebuild of all TypeScript files every time _any_ file in your project changes.

## [1.0.6] - 2017-12-17

### Changed

* Update to broccoli-typescript-compiler 2.1.1, for proper support for TS 2.6. This should make your build properly respect things like // @ts-ignore special comments.

## [1.0.5] - 2017-11-23

### Fixed

* Updated the `tsconfig.json` blueprint to set the `noImplicitThis` option to `true`, improving experience around use of updated type definitions

## [1.0.4] - 2017-11-13

### Changed

* Updated broccoli-compiler-typescript
* Updated package.json to always install latest version of type definitions

### Fixed

* Fixed the default generated `environment.d.ts`

### Internal

* Made everything [✨ Prettier ✨](https://prettier.io)

## [1.0.3] - 2017-08-22

### Changed

* TS info messages now go to `stdout` and TS error messages now properly go to `stderr`
* Fixed a dead link in the README

## [1.0.2] - 2017-08-16

### Fixed

* Updates the generated `tsconfig.json` to set `"modules": "ES6"` in the compiler options, so that codemods which operate on modules, like [babel-plugin-ember-modules-api-polyfill](https://github.com/ember-cli/babel-plugin-ember-modules-api-polyfill/), will actually work. (Yes, this is 1.0.1, but done correctly.)

## [1.0.1] - 2017-08-16

### Changed

* Updates the generated `tsconfig.json` to set `"modules": "ES6"` in the compiler options, so that codemods which operate on modules, like [babel-plugin-ember-modules-api-polyfill](https://github.com/ember-cli/babel-plugin-ember-modules-api-polyfill/), will actually work.

## [1.0.0] - 2017-08-08

### Added

* Include more type definitions in the default blueprint
* Documentation of using `paths` (thanks @toranb!)
* Supports in-repo addons, including in-repo Ember Engines

### Changed

* Update to broccoli-compiler-typescript@2.0
* Update Ember CLI and TypeScript (thanks @mfeckie!)
* Match the `broccoli-typescript-compiler` option `throwOnError` with the `tsconfig.json` `noEmitOnError` option.

### Fixed

* Use `this.ui.write` instead of `console.log`.
* Only process the tsconfig file once, instead of for every Broccoli tree (i.e. addons, the app, and the tests).
* No longer pass the `allowJs` option to TypeScript, since Broccoli manages the tree so `.ts` and `.js` files for us.

### Internal

* Run prettier on the codebase

## [0.4.0] - 2017-05-03

### Changed

* Updated the base type definitions in `app/config/environment.d.ts` to include the defaults generated when creating an Ember app (thanks, @luketheobscure!)
* Updated the README with clearer installation instructions and notes on using the add-on to develop other add-ons

### Fixed

* `ember serve` and `ember test` and `ember build` all work properly now, across platforms
* builds are much faster on all platforms.

## [0.3.2] - 2017-04-22

### Fixed

* Now properly installs on Windows.

## [0.3.1] - 2017-04-22

### Added

* `tsconfig.json` blueprint now includes paths to resolve default Ember app structure imports

### Fixed

* Resolved install bugs on macOS and Linux

### Removed

* All references to `local-types` in the codebase and blueprints, since `local-types` is not used by the addon and not a normal TypeScript file location

## [0.3.0] - 2017-03-13

### Fixed

* `tsconfig.json` blueprint now works for both the addon and editors

## [0.2.0] - 2016-12-17

### Added

* Everything; the 0.2.0 release began by copying the implementation from [ember-cli-typify].
* Basic, semi-working functionality.

[ember-cli-typify]: https://github.com/winding-lines/ember-cli-typify
[unreleased]: https://github.com/typed-ember/ember-cli-typescript/compare/v2.0.2...HEAD
[2.0.2]: https://github.com/typed-ember/ember-cli-typescript/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/typed-ember/ember-cli-typescript/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/typed-ember/ember-cli-typescript/compare/v2.0.0-rc.2...v2.0.0
[2.0.0-rc.2]: https://github.com/typed-ember/ember-cli-typescript/compare/v2.0.0-rc.1...v2.0.0-rc.2
[2.0.0-rc.1]: https://github.com/typed-ember/ember-cli-typescript/compare/v2.0.0-beta.3...v2.0.0-rc.1
[2.0.0-beta.3]: https://github.com/typed-ember/ember-cli-typescript/compare/v2.0.0-beta.2...v2.0.0-beta.3
[2.0.0-beta.2]: https://github.com/typed-ember/ember-cli-typescript/compare/v2.0.0-beta.1...v2.0.0-beta.2
[2.0.0-beta.1]: https://github.com/typed-ember/ember-cli-typescript/compare/HEAD...v2.0.0-beta.1
[1.5.0]: https://github.com/typed-ember/ember-cli-typescript/compare/v1.4.4...v1.5.0
[1.4.4]: https://github.com/typed-ember/ember-cli-typescript/compare/v1.4.3...v1.4.4
[1.4.3]: https://github.com/typed-ember/ember-cli-typescript/compare/v1.4.2...v1.4.3
[1.4.2]: https://github.com/typed-ember/ember-cli-typescript/compare/v1.4.1...v1.4.2
[1.4.1]: https://github.com/typed-ember/ember-cli-typescript/compare/v1.4.0...v1.4.1
[1.4.0]: https://github.com/typed-ember/ember-cli-typescript/compare/v1.3.3...v1.4.0
[1.3.4]: https://github.com/typed-ember/ember-cli-typescript/compare/v1.3.3...v1.3.4
[1.3.3]: https://github.com/typed-ember/ember-cli-typescript/compare/v1.3.2...v1.3.3
[1.3.2]: https://github.com/typed-ember/ember-cli-typescript/compare/v1.3.1...v1.3.2
[1.3.1]: https://github.com/typed-ember/ember-cli-typescript/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/typed-ember/ember-cli-typescript/compare/v1.2.1...v1.3.0
[1.2.1]: https://github.com/typed-ember/ember-cli-typescript/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/typed-ember/ember-cli-typescript/compare/v1.1.6...v1.2.0
[1.1.7]: https://github.com/typed-ember/ember-cli-typescript/compare/v1.1.6...v1.1.7
[1.1.6]: https://github.com/typed-ember/ember-cli-typescript/compare/v1.1.5...v1.1.6
[1.1.5]: https://github.com/typed-ember/ember-cli-typescript/compare/v1.1.4...v1.1.5
[1.1.4]: https://github.com/typed-ember/ember-cli-typescript/compare/v1.1.3...v1.1.4
[1.1.3]: https://github.com/typed-ember/ember-cli-typescript/compare/v1.1.2...v1.1.3
[1.1.2]: https://github.com/typed-ember/ember-cli-typescript/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/typed-ember/ember-cli-typescript/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/typed-ember/ember-cli-typescript/compare/v1.0.6...v1.1.0
[1.0.6]: https://github.com/typed-ember/ember-cli-typescript/compare/v1.0.5...v1.0.6
[1.0.5]: https://github.com/typed-ember/ember-cli-typescript/compare/v1.0.4...v1.0.5
[1.0.4]: https://github.com/typed-ember/ember-cli-typescript/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/typed-ember/ember-cli-typescript/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/typed-ember/ember-cli-typescript/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/typed-ember/ember-cli-typescript/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/typed-ember/ember-cli-typescript/compare/v0.4.0...v1.0.0
[0.4.0]: https://github.com/typed-ember/ember-cli-typescript/compare/v0.3.2...v0.4.0
[0.3.2]: https://github.com/typed-ember/ember-cli-typescript/compare/v0.3.1...v0.3.2
[0.3.1]: https://github.com/typed-ember/ember-cli-typescript/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/typed-ember/ember-cli-typescript/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/typed-ember/ember-cli-typescript/compare/04dfe8757710ef8fab0d7a0dfec2a4b06593efa2...v0.2.0
