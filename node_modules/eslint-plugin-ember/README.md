# eslint-plugin-ember

[![NPM version](https://img.shields.io/npm/v/eslint-plugin-ember.svg?style=flat)](https://npmjs.org/package/eslint-plugin-ember)
[![NPM downloads](https://img.shields.io/npm/dm/eslint-plugin-ember.svg?style=flat)](https://npmjs.org/package/eslint-plugin-ember)
[![Build Status](https://travis-ci.org/ember-cli/eslint-plugin-ember.svg?branch=master)](https://travis-ci.org/ember-cli/eslint-plugin-ember)

> An ESlint plugin that provides set of rules for Ember Applications based on commonly known good practices.

## ❗️ Requirements

- [ESLint](https://eslint.org/) `>= 4`
- [Node.js](https://nodejs.org/) `>= 6`

## 🚀 Usage

### 1. Install plugin

```shell
  yarn add --dev eslint-plugin-ember
```
Or
```shell
  npm install --save-dev eslint-plugin-ember
```

### 2. Modify your `.eslintrc.js`:

#### Use with predefined settings:

```javascript
// .eslintrc.js
module.exports = {
  plugins: [
    'ember'
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended' // or 'plugin:ember/base'
  ],
  rules: {
    // override rules' settings here
  }
}
```

Possible configurations:
- [plugin:ember/base](https://github.com/ember-cli/eslint-plugin-ember/blob/master/lib/config/base.js) - contains no rules settings, but the basic eslint configuration suitable for any ember project. You can use it to configure rules as you wish.
- [plugin:ember/recommended](https://github.com/ember-cli/eslint-plugin-ember/blob/master/lib/config/recommended.js) - extends base configuration with recommended rules' settings

#### Use plain plugin:

If you don't want to use predefined settings, you can use it as a plain plugin:

```javascript
module.exports = {
  plugins: [
    'ember'
  ],
  extends: [
    'eslint:recommended'
  ],
  rules: {
    // add rules' settings here, eg.:
    'ember/local-modules': 2
  }
}
```

All rules from this plugin have to be prefixed with `ember/`

## 🍟 Rules

Rules are grouped by category to help you understand their purpose.

All rules below with a check mark :white_check_mark: are enabled by default while using `plugin:ember/recommended` config.

The `--fix` option on the command line automatically fixes problems reported by rules which have a wrench :wrench: below.

<!--RULES_TABLE_START-->

### Best Practices

|    | Rule ID | Description |
|:---|:--------|:------------|
|  | [alias-model-in-controller](./docs/rules/alias-model-in-controller.md) | Enforces aliasing model in controller |
| :white_check_mark: | [avoid-using-needs-in-controllers](./docs/rules/avoid-using-needs-in-controllers.md) | Avoids using needs in controllers |
| :white_check_mark: | [closure-actions](./docs/rules/closure-actions.md) | Enforces usage of closure actions |
|  | [named-functions-in-promises](./docs/rules/named-functions-in-promises.md) | Enforces usage of named functions in promises |
| :white_check_mark: | [new-module-imports](./docs/rules/new-module-imports.md) |  Use "New Module Imports" from Ember RFC #176 |
| :white_check_mark: | [no-function-prototype-extensions](./docs/rules/no-function-prototype-extensions.md) | Prevents usage of Ember's `function` prototype extensions |
|  | [no-get](./docs/rules/no-get.md) | Require ES5 getters instead of Ember's `get` / `getProperties` functions |
| :white_check_mark: | [no-global-jquery](./docs/rules/no-global-jquery.md) | Prevents usage of global jQuery object |
|  | [no-jquery](./docs/rules/no-jquery.md) | Disallow any usage of jQuery |
|  | [no-new-mixins](./docs/rules/no-new-mixins.md) | Prevents creation of new mixins |
| :white_check_mark: | [no-observers](./docs/rules/no-observers.md) | Prevents usage of observers |
| :white_check_mark::wrench: | [no-old-shims](./docs/rules/no-old-shims.md) | Prevents usage of old shims for modules |
| :white_check_mark: | [no-on-calls-in-components](./docs/rules/no-on-calls-in-components.md) | Prevents usage of `on` to call lifecycle hooks in components |
| :white_check_mark: | [no-restricted-resolver-tests](./docs/rules/no-restricted-resolver-tests.md) | Prevents the use of patterns that use the restricted resolver in tests. |
|  | [no-unnecessary-index-route](./docs/rules/no-unnecessary-index-route.md) | Disallow unnecessary `index` route definition |
| :wrench: | [no-unnecessary-route-path-option](./docs/rules/no-unnecessary-route-path-option.md) | Disallow unnecessary route `path` option |
| :wrench: | [no-unnecessary-service-injection-argument](./docs/rules/no-unnecessary-service-injection-argument.md) | Disallow unnecessary argument when injecting service |
|  | [no-volatile-computed-properties](./docs/rules/no-volatile-computed-properties.md) | Disallows volatile computed properties |
| :wrench: | [require-computed-macros](./docs/rules/require-computed-macros.md) | Requires using computed property macros when possible |
|  | [route-path-style](./docs/rules/route-path-style.md) | Enforces usage of kebab-case (instead of snake_case or camelCase) in route paths |
| :wrench: | [use-ember-get-and-set](./docs/rules/use-ember-get-and-set.md) | Enforces usage of Ember.get and Ember.set |


### Possible Errors

|    | Rule ID | Description |
|:---|:--------|:------------|
| :white_check_mark: | [jquery-ember-run](./docs/rules/jquery-ember-run.md) | Prevents usage of jQuery without Ember Run Loop |
|  | [no-arrow-function-computed-properties](./docs/rules/no-arrow-function-computed-properties.md) | Disallows arrow functions in computed properties |
| :white_check_mark: | [no-attrs-in-components](./docs/rules/no-attrs-in-components.md) | Disallow usage of this.attrs in components |
| :white_check_mark: | [no-attrs-snapshot](./docs/rules/no-attrs-snapshot.md) | Disallow use of attrs snapshot in `didReceiveAttrs` and `didUpdateAttrs` |
| :white_check_mark: | [no-capital-letters-in-routes](./docs/rules/no-capital-letters-in-routes.md) | Raise an error when there is a route with uppercased letters in router.js |
|  | [no-deeply-nested-dependent-keys-with-each](./docs/rules/no-deeply-nested-dependent-keys-with-each.md) | Disallows usage of deeply-nested computed property dependent keys with `@each`. |
| :white_check_mark: | [no-duplicate-dependent-keys](./docs/rules/no-duplicate-dependent-keys.md) | Disallow repeating dependent keys |
| :wrench: | [no-ember-super-in-es-classes](./docs/rules/no-ember-super-in-es-classes.md) | Prevents use of `this._super` in ES class methods |
| :white_check_mark: | [no-ember-testing-in-module-scope](./docs/rules/no-ember-testing-in-module-scope.md) | Prevents use of Ember.testing in module scope |
|  | [no-incorrect-calls-with-inline-anonymous-functions](./docs/rules/no-incorrect-calls-with-inline-anonymous-functions.md) | Disallows inline anonymous functions as arguments to `debounce`, `once`, and `scheduleOnce` |
|  | [no-invalid-debug-function-arguments](./docs/rules/no-invalid-debug-function-arguments.md) | Catch usages of Ember's `assert()` / `warn()` / `deprecate()` functions that have the arguments passed in the wrong order. |
| :white_check_mark: | [no-side-effects](./docs/rules/no-side-effects.md) | Warns about unexpected side effects in computed properties |
| :wrench: | [require-computed-property-dependencies](./docs/rules/require-computed-property-dependencies.md) | Requires dependencies to be declared statically in computed properties |
|  | [require-return-from-computed](./docs/rules/require-return-from-computed.md) | Warns about missing return statements in computed properties |
| :white_check_mark: | [require-super-in-init](./docs/rules/require-super-in-init.md) | Enforces super calls in init hooks |
| :white_check_mark: | [routes-segments-snake-case](./docs/rules/routes-segments-snake-case.md) | Enforces usage of snake_cased dynamic segments in routes |


### Ember Object

|    | Rule ID | Description |
|:---|:--------|:------------|
| :white_check_mark: | [avoid-leaking-state-in-ember-objects](./docs/rules/avoid-leaking-state-in-ember-objects.md) | Avoids state leakage |
|  | [classic-decorator-hooks](./docs/rules/classic-decorator-hooks.md) | Ensure correct hooks are used for both classic and non-classic classes |
|  | [classic-decorator-no-classic-methods](./docs/rules/classic-decorator-no-classic-methods.md) | Prevent usage of classic APIs such as get/set in classes that aren't explicitly decorated with @classic |
|  | [computed-property-getters](./docs/rules/computed-property-getters.md) | Enforce the consistent use of getters in computed properties |
|  | [no-proxies](./docs/rules/no-proxies.md) | Disallows using array or object proxies |


### Ember Data

|    | Rule ID | Description |
|:---|:--------|:------------|
|  | [no-empty-attrs](./docs/rules/no-empty-attrs.md) | Prevents usage of empty attributes in ember data models |
| :wrench: | [use-ember-data-rfc-395-imports](./docs/rules/use-ember-data-rfc-395-imports.md) | Use "Ember Data Packages" from Ember RFC #395 |


### Testing

|    | Rule ID | Description |
|:---|:--------|:------------|
|  | [no-test-and-then](./docs/rules/no-test-and-then.md) | Disallow use of `andThen` test wait helper. |
|  | [no-test-import-export](./docs/rules/no-test-import-export.md) | Disallow importing of "-test.js" in a test file and exporting from a test file. |


### Stylistic Issues

|    | Rule ID | Description |
|:---|:--------|:------------|
| :wrench: | [order-in-components](./docs/rules/order-in-components.md) | Enforces proper order of properties in components |
| :wrench: | [order-in-controllers](./docs/rules/order-in-controllers.md) | Enforces proper order of properties in controllers |
| :wrench: | [order-in-models](./docs/rules/order-in-models.md) | Enforces proper order of properties in models |
| :wrench: | [order-in-routes](./docs/rules/order-in-routes.md) | Enforces proper order of properties in routes |
| :white_check_mark: | [use-brace-expansion](./docs/rules/use-brace-expansion.md) | Enforces usage of brace expansion |

### Deprecated

> :warning: We're going to remove deprecated rules in the next major release. Please migrate to successor/new rules.

| Rule ID | Replaced by |
|:--------|:------------|
| [avoid-leaking-state-in-components](./docs/rules/avoid-leaking-state-in-components.md) | [avoid-leaking-state-in-ember-objects](./docs/rules/avoid-leaking-state-in-ember-objects.md) |
| [local-modules](./docs/rules/local-modules.md) | [new-module-imports](./docs/rules/new-module-imports.md) |
| [no-get-properties](./docs/rules/no-get-properties.md) | [no-get](./docs/rules/no-get.md) |

<!--RULES_TABLE_END-->

For the simplified list of rules, [go here](./lib/recommended-rules.js).

## 🍻 Contribution guide

In order to add a new rule, you should:
- Create issue on GH with description of proposed rule
- Generate a new rule using the [official yeoman generator](https://github.com/eslint/generator-eslint)
- Run `yarn start`
- Write test scenarios & implement logic
- Describe the rule in the generated `docs` file
- Make sure all tests are passing
- Run `yarn run update` in order to update readme and recommended configuration
- Create PR and link created issue in description

Please be aware that we're using `yarn` in this repository, so if you plan to add some dependencies - make sure you commit `yarn.lock` file too.

If you have any suggestions, ideas or problems feel free to add new [issue](https://github.com/ember-cli/eslint-plugin-ember/issues), but first please make sure your question does not repeat previous ones.

## ⭐️ Contributors
- [Adrian Zalewski](https://github.com/bardzusny)
- [Alex LaFroscia](https://github.com/alexlafroscia)
- [Bryan Mishkin](https://github.com/bmish)
- [Casey Watts](https://github.com/caseywatts)
- [Jacek Bandura](https://github.com/jbandura)
- [Kamil Ejsymont](https://github.com/netes)
- [Michał Sajnóg](https://github.com/michalsnik)
- [Rafał Leszczyński](https://github.com/rafleszczynski)
- [Robert Wagner](https://github.com/rwwagner90)
- [Steve Gargan](https://github.com/sgargan)
- [Tobias Bieniek](https://github.com/Turbo87)

##  🙌 Credits
- [DockYard team](http://github.com/DockYard) - for great inspiration with their [styleguide](https://github.com/DockYard/styleguides/blob/master/engineering/ember.md)
- [Rob Hilgefort](https://github.com/rjhilgefort) - for making it possible to redeploy new plugin under existing `eslint-plugin-ember` package name

## 🔓 License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
