<center><h1>ember-cli-typescript</h1></center>

<center>Use TypeScript in your Ember 2.x and 3.x apps!</center>

<center>

[![*nix build status (master)](https://travis-ci.org/typed-ember/ember-cli-typescript.svg?branch=master)](https://travis-ci.org/typed-ember/ember-cli-typescript) [![Build Status](https://dev.azure.com/typed-ember/ember-cli-typescript/_apis/build/status/typed-ember.ember-cli-typescript)](https://dev.azure.com/typed-ember/ember-cli-typescript/_build/latest?definitionId=2) [![Ember Observer Score](https://emberobserver.com/badges/ember-cli-typescript.svg)](https://emberobserver.com/addons/ember-cli-typescript)

</center>

- [Documentation](#documentation)
- [Usage](#usage)
  - [Installation and Setup](#installation-and-setup)
    - [In apps](#in-apps)
    - [In addons](#in-addons)
  - [Upgrading from 1.x](#upgrading-from-1x)
    - [Update ember-cli-babel](#update-ember-cli-babel)
    - [Update ember-decorators](#update-ember-decorators)
    - [Update ember-cli-typescript](#update-ember-cli-typescript)
      - [In apps](#in-apps-1)
      - [In addons](#in-addons-1)
      - [Account for addon build pipeline changes](#account-for-addon-build-pipeline-changes)
      - [Account for TS → Babel issues](#account-for-ts--babel-issues)
- [Getting Help](#getting-help)
  - [💬 Getting Started](#-getting-started)
  - [📚 Issues With Ember Type Definitions](#-issues-with-ember-type-definitions)
  - [⚙️ Issues With Adding TypeScript Support To Apps and Addons](#️-issues-with-adding-typescript-support-to-apps-and-addons)
  - [✅ Issues With Linting TypeScript](#-issues-with-linting-typescript)
- [Supported Ember and TypeScript versions](#supported-ember-and-typescript-versions)
- [Installing from git](#installing-from-git)

## Documentation

This README focuses on basic information about setting up and using the addon. For more details, see [the documentation](https://typed-ember.github.io/ember-cli-typescript/versions/master/), which includes:

- troubleshooting tips
- a walkthrough for using TypeScript with Ember effectively
- guides for publishing addons written in TypeScript
- more details on how the addon sets up your project during installation

…and much more!

## Usage

### Installation and Setup

***Note:* Because ember-cli-typescript is part of the build pipeline, the process for installing it differs slightly between apps and addons!**

#### In apps

In apps, you can simply `ember install` the dependency like normal:

```sh
ember install ember-cli-typescript@latest
```

#### In addons

To work properly, Ember addons must declare this library as a `dependency`, not a `devDependency`. You can `ember install` it by running:

```sh
ember install ember-cli-typescript@latest --save
```

All dependencies will be added to your `package.json`, and you're ready to roll! **If you're upgrading from a previous release, see below!** you should check to merge any tweaks you've made to `tsconfig.json`.

### Upgrading from 1.x

There are a number of important changes between ember-cli-typescript v1 and v2, which mean the upgrade process is *straightforward* but *specific*:

1. Update ember-cli-babel. Fix any problems introduced during the upgrade.
2. Update ember-decorators. Fix any problems introduced during the upgrade.
3. Update ember-cli-typescript. Follow the detailed upgrade guide below to fix discrepancies between Babel and TypeScript's compiled output.

If you deviate from this order, you are likely to have a *much* more difficult time upgrading!

#### Update ember-cli-babel

ember-cli-typescript **requires** ember-cli-babel at version 7.1.0 or above, which requires ember-cli 2.13 or above. It also **requires** @babel/core 7.2.0 or higher.

The recommended approach here is to deduplicate existing installations of the dependency, remove and reinstall ember-cli-babel to make sure that all its transitive dependencies are updated to the latest possible, and then to deduplicate *again*.

If using yarn:
    
```
npx yarn-deduplicate
yarn remove ember-cli-babel
yarn add --dev ember-cli-babel
npx yarn-deduplicate
```

If using npm:
      
```
npm dedupe
npm uninstall ember-cli-babel
npm install --save-dev ember-cli-babel
npm dedupe
```

Note: If you are also using ember-decorators—and specifically the babel-transform that gets added with it—you will need update @ember-decorators/babel-transforms as well (anything over 3.1.0 should work):

```
ember install ember-decorators@^3.1.0 @ember-decorators/babel-transforms@^3.1.0
```

#### Update ember-decorators

Follow the same process of deduplication, reinstallation, and re-deduplication as described for ember-cli-babel above. This will get you the latest version of ember-decorators and, importantly, its @ember-decorators/babel-transforms dependency.

#### Update ember-cli-typescript

***Note:* Because ember-cli-typescript is part of the build pipeline, the process for updating it differs slightly between apps and addons!**

##### In apps

In apps, you can simply `ember install` the dependency like normal:

```sh
ember install ember-cli-typescript@latest
```

##### In addons

To work properly, Ember addons must declare this library as a `dependency`, not a `devDependency`. **This is a *change* from ember-cli-typescript v1.**

1. Remove ember-cli-typescript from your dependencies.

    With yarn:
    
    ```sh
    yarn remove ember-cli-typescript 
    ```

    With npm:
    
    ```sh
    npm uninstall ember-cli-typescript
    ```

2. Re-install it with `ember install`:

    ```sh
    ember install ember-cli-typescript@latest --save
    ```

##### Account for addon build pipeline changes

Since we now integrate in a more traditional way into Ember CLI's build pipeline, there are two changes required for addons using TypeScript.

- Addons can no longer use `.ts` in `app`, because an addon's `app` directory gets merged with and uses the *host's* (i.e. the other addon or app's) preprocessors, and we cannot guarantee the host has TS support. Note that `.ts` will continue to work for in-repo addons because the app build works with the host's (i.e. the app's, not the addon's) preprocessors.

- Similarly, apps must use `.js` to override addon defaults in `app`, since the different file extension means apps no long consistently "win" over addon versions (a limitation of how Babel + app merging interact).

##### Account for TS → Babel issues

ember-cli-typescript v2 uses Babel to compile your code, and the TypeScript compiler only to *check* your code. This makes for much faster builds, and eliminates the differences between Babel and TypeScript in the build output that could cause problems in v1. However, because of those differences, you’ll need to make a few changes in the process of upgrading.

- `const enum` is not supported at all. You will need to replace all uses of `const enum` with simply `enum` or constants.

- Using ES5 getters or settings with `this` type annotations is not supported through at least Babel 7.3. However, they should also be unnecessary with ES6 classes, so you can simply *remove* the `this` type annotation.

- Trailing commas after rest function parameters (`function foo(...bar[],) {}`) are disallowed by the ECMAScript spec, so Babel also disallows them.

- Re-exports of types have to be disambiguated to be *types*, rather than values. Neither of these will work:

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

## Getting Help

When seeking help, you should first consider what you need, and which aspect of the Ember+TypeScript ecosystem your issue pertains to.

### 💬 Getting Started

We have a channel (**`#e-typescript`**) on the [Ember Community Discord server](https://discordapp.com/invite/zT3asNS) where you can ask about getting started, good resources for self-directed learning and more.

### 📚 Issues With Ember Type Definitions

If you've found that some of the Ember type information is missing things, or is incorrect in some way, please first ensure you're using the latest version of the [packages this addon installs](#other-packages-this-addon-installs). Although [StackOverflow](https://stackoverflow.com/questions/tagged/ember.js+typescript) and [Discuss](https://discuss.emberjs.com/search?q=typescript) are not the advised places to report problems, you may find an answer there.

If you don't find an answer, please [open an enhancement request or bug report in this project](https://github.com/typed-ember/ember-cli-typescript/issues/new/choose).

### ⚙️ Issues With Adding TypeScript Support To Apps and Addons

If you run into a problem with the way TypeScript is compiled in Ember apps (i.e., a broccoli error message, incorrect build output, etc...), please first check [StackOverflow](https://stackoverflow.com/questions/tagged/ember.js+typescript) and [Discuss](https://discuss.emberjs.com/search?q=typescript), as you may find an answer.

If you don't find an answer, please [open an enhancement request or bug report in this project](https://github.com/typed-ember/ember-cli-typescript/issues/new/choose).

### ✅ Issues With Linting TypeScript

The TypeScript compiler does some very basic linting of your code, but most developers use (and Microsoft now officially recommends) ESLint.

One sure way to tell which tool is generating an error message is that _Linters like [ESLint](https://eslint.org/) or [TSLint](https://github.com/palantir/tslint/) will always mention their name, and the name of the pertinent rule, when it alerts you to a violation_.

For example, in VS Code, you might see a popover with this message:

```plain
[eslint] variable name must be in lowerCamelCase, PascalCase or UPPER_CASE (variable-name)
```

Here, `variable-name` is the name of the rule, and `[eslint]` is the *source* of the rule.

- For issues relating to typescript compiler analysis, [create an issue in this project](https://github.com/typed-ember/ember-cli-typescript/issues/new/choose).
- If you run into issues with using ESLint with Ember, create an issue [here](https://github.com/ember-cli/ember-cli-eslint/issues/new).
- For TSLint-related concerns, please create an issue in the [`ember-cli-tslint`](https://github.com/typed-ember/ember-cli-tslint) project by clicking [here](https://github.com/typed-ember/ember-cli-tslint/issues/new).

## Supported Ember and TypeScript versions

ember-cli-typescript runs its test suite against Ember CLI current and beta. It's also in active use in several large applications. Any breakage for upcoming releases _should_ be detected and fixed ahead of those releases, but you can help us guarantee that by running your own Ember.js+TypeScript app with beta and canary turned on and let us know if you run into issues with upcoming Ember.js releases.

This library supports the current version of TypeScript [![TS Version](https://img.shields.io/github/tag/Microsoft/typescript.svg?label=latest%20typescript%20release)](https://github.com/Microsoft/TypeScript/releases/latest) and at least one previous minor or major release. In other words, if `3.4` is the latest release, we **do** support `3.4.x`, `3.3.x`, and **might** support `3.2.x` as well. (The test suite only runs against the current release and `next` branch, but the TS versions do not affect the build process in the same way they do type definitions.)

## Installing from git

This addon uses TypeScript for its own implementation, so if you install `ember-cli-typescript` from git rather than from the npm registry, you won't get compiled `.js` files. To get everything working, you can install `ts-node` as a project dependency, and `ember-cli-typescript` will ensure it's registered correctly to transpile source files as needed.
