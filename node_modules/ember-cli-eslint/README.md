ember-cli-eslint
==============================================================================

[![Latest NPM release][npm-badge]][npm-badge-url]
[![TravisCI Build Status][travis-badge]][travis-badge-url]
[![Ember Observer Score][ember-observer-badge]][ember-observer-badge-url]

[npm-badge]: https://img.shields.io/npm/v/ember-cli-eslint.svg
[npm-badge-url]: https://www.npmjs.com/package/ember-cli-eslint
[travis-badge]: https://img.shields.io/travis/ember-cli/ember-cli-eslint/master.svg
[travis-badge-url]: https://travis-ci.org/ember-cli/ember-cli-eslint
[ember-observer-badge]: https://emberobserver.com/badges/ember-cli-eslint.svg
[ember-observer-badge-url]: https://emberobserver.com/addons/ember-cli-eslint

[ESLint](http://eslint.org/) for [Ember CLI](https://ember-cli.com/) apps and addons


Installation
------------------------------------------------------------------------------

ESLint 4 (for Node 4 and above):

```
ember install ember-cli-eslint@4
```

ESLint 3 (for Node 4 and above):

```
ember install ember-cli-eslint@3
```

ESLint 2 (for Node 0.10 and above):

```
ember install ember-cli-eslint@2
```

After installation, an `.eslintrc.js` file will be placed in both the root of
your project and the `/tests` directory.

Furthermore, a `.eslintignore` file can be used to exclude files from
linting while the linter is running. Its syntax is identical to
`.gitignore` files.


### Disabling JSHint

Congratulations! You've made the leap into the next generation of JavaScript
linting. At the moment, however, `ember-cli` defaults to generating
applications and addons with a `jshint` configuration.

<details>
  <summary>
    If you notice the two awkwardly running side by side, click here!
  </summary>

#### ember-cli >= 2.5.0

As of `ember-cli v.2.5.0`,
[`jshint` is provided through its own `ember-cli-jshint` addon](https://github.com/ember-cli/ember-cli/pull/5757).
Running `npm uninstall --save-dev ember-cli-jshint`, in addition to removing
any `.jshintrc` files from your project should guarantee that its behavior
is disabled.

#### ember-cli < 2.5.0

Controlling linting is a bit trickier on versions of `ember-cli` prior to
`2.5.0`. Within your `ember-cli-build.js` file, `ember-cli-qunit` or
`ember-cli-mocha` can be configured to have their default linting process
disabled during:

```javascript
module.exports = function(defaults) {
  const app = new EmberApp(defaults, {
    'ember-cli-qunit': {
      useLintTree: false
    }
  });
};
```

or

```javascript
module.exports = function(defaults) {
  const app = new EmberApp(defaults, {
    'ember-cli-mocha': {
      useLintTree: false
    }
  });
};
```

Alongside this setting, the `hinting` property can then be used to
enable/disable globally:

```javascript
const isTesting = process.env.EMBER_ENV === 'test';

module.exports = function(defaults) {
  const app = new EmberApp(defaults, {
    hinting: !isTesting,
  });
};
```

</details>


Usage
------------------------------------------------------------------------------

ESLint will be run by `ember-cli-qunit` or `ember-cli-mocha` automatically
when you run `ember test`.  If ESLint is *not* being run automatically, try
updating your `ember-cli` and/or `ember-cli-qunit`/`ember-cli-mocha`
dependencies.


### Configuration

`ember-cli-eslint` can be configured through the `eslint` key in your
`ember-cli-build.js` file:

```js
let app = new EmberApp(defaults, {
  eslint: {
    testGenerator: 'qunit',
    group: true,
    rulesDir: 'eslint-rules',
    extensions: ['js'],
  }
});
```

- `testGenerator` is automatically detected if `ember-qunit`/`ember-cli-qunit`
  or `ember-mocha`/`ember-cli-mocha` are used, but can also be set to `qunit`
  and `mocha` manually.

- `group` can be set to `false` to go back to the previous behavior where
  every generated test was contained in its own separate module.

- `rulesDir` is the name of the directory for your custom eslint rules.
  It defaults to `eslint-rules`.

- `extensions` is an array containing the file extensions to lint. If you want to lint JavaScript and TypeScript files for example it should be set to `['js', 'ts']`. _NOTE_: If you add Typescript files `typescript-eslint-parser` has to be installed and specified as the parser. For more information take a look at the [`typescript-eslint-parser`](https://github.com/eslint/typescript-eslint-parser)

### On Build Files

Please note that if you are using this to lint files which are part of the build
process (ie. index.js, ember-cli-build.js, config/), whether in an application or
as part of an addon, they will not be linted. It is recommended that `eslint` is
setup separately to lint these files and can be setup as an npm script and run as
part of a CI process.


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone` this repository
* `cd ember-cli-eslint`
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`
* `ember try:each`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`


### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
