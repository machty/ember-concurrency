# broccoli-lint-eslint

[![Latest NPM release][npm-badge]][npm-badge-url]
[![TravisCI Build Status][travis-badge]][travis-badge-url]
[![License][license-badge]][license-badge-url]
[![Dependencies][dependencies-badge]][dependencies-badge-url]
[![Dev Dependencies][devDependencies-badge]][devDependencies-badge-url]


> Lint JavaScript with [ESLint][eslint] as part of your [Broccoli][broccoli] build pipeline.


Most of the test setup and the build configuration is based on [sindresorhus/grunt-eslint](https://github.com/sindresorhus/grunt-eslint).
The internal validation is heavily inspired by [eslint cli.js](https://github.com/eslint/eslint/blob/master/lib/cli.js).


## Installation

```bash
npm install --save broccoli-lint-eslint
```

`broccoli-lint-eslint@5` uses `eslint@5` which requires Node.js 6 or above.
If you need support for Node.js 4, you may use `broccoli-lint-eslint@4` which
uses `eslint@4` and is compatible with Node.js 4:

```bash
npm install --save broccoli-lint-eslint@4
```


## Usage

```javascript
var ESLint = require('broccoli-lint-eslint');
var outputNode = ESLint.create(inputNode, options);
```

### API

* `inputNode` A [Broccoli node](https://github.com/broccolijs/broccoli/blob/master/docs/node-api.md)

* `options` {Object}: Options to control how `broccoli-lint-eslint` is run.
  * `format` {string|function}: The path, or function reference, to a custom formatter (See [eslint/tree/master/lib/formatters](https://github.com/eslint/eslint/tree/master/lib/formatters) for alternatives).

    Default: `'eslint/lib/formatters/stylish'`

  * `testGenerator` {`function(relativePath, errors), returns reporter output string`}: The function used to generate test modules. You can provide a custom function for your client side testing framework of choice.

    Default: `null`

    - relativePath - The relative path to the file being tested.
    - errors - An array of eslint error objects found.

    If you provide a `string` one of the [predefined test generators](lib/test-generators.js) is used. Currently supported are `qunit` and `mocha`.

    Example usage:

    ```javascript
    var path = require('path');

    function testGenerator(relativePath, errors) {
      return "module('" + path.dirname(relativePath) + "');\n";
             "test('" + relativePath + "' should pass ESLint', function() {\n" +
             "  ok(" + passed + ", '" + moduleName + " should pass ESLint." + (errors ? "\\n" + errors : '') + "');\n" +
             "});\n";
    };

    return ESLint.create(inputNode, {
      options: {
        configFile: this.eslintrc.app + '/eslint.json'
      },
      testGenerator: testGenerator
    });
    ```

  * `group` {string|undefined}: Groups the generated ESLint tests into a single file and test suite with the given group name.

    Default: `undefined`

  * `throwOnError` {boolean}: Cause exception error on first violation with `error`-level severity.

    Default: `false`

  * `throwOnWarn` {boolean}: Cause exception error on first violation with `warn`-level severity.
  _NOTE_: Setting this to true will automatically enable `throwOnError` behavior.

    Default: `false`

  * `persist` {boolean}: Persist the state of filter output across restarts

    Default: `false`

  * `console`: {Object}: A custom console object with a `log` method for
  `broccoli-lint-eslint` to use when logging formatter output.

    Default: The global `console` object

  * `options` {options}: [Options native to ESLint CLI](http://eslint.org/docs/developer-guide/nodejs-api#cliengine). While all options will be passed to the [ESLint CLIEngine](http://eslint.org/docs/developer-guide/nodejs-api#cliengine), these are the ones that `broccoli-lint-eslint` makes use of in particular:

    * `configFile` {string}: Path to eslint configuration file.

        Default: `./eslintrc`

    * `rulePaths` {Array}: Paths to a directory with custom rules. Your custom rules will be used in addition to the built-in ones. Recommended read: [Working with Rules](https://github.com/eslint/eslint/blob/master/docs/developer-guide/working-with-rules.md).

      Default: [built-in rules directory](https://github.com/eslint/eslint/tree/master/lib/rules)

    * `ignore` {boolean}: `false` disables use of `.eslintignore`, `ignorePath` and `ignorePattern`

      Default: `true`

  * `extensions` {Array}: File extensions to lint. _NOTE_: If you add Typescript files `typescript-eslint-parser` has to be installed and specified as the parser. For more information take a look at the [`typescript-eslint-parser`](https://github.com/eslint/typescript-eslint-parser)

    Default: `['js']`

[eslint]: http://eslint.org/
[broccoli]: https://github.com/joliss/broccoli

<!-- Badging -->
[npm-badge]: https://img.shields.io/npm/v/broccoli-lint-eslint.svg
[npm-badge-url]: https://www.npmjs.com/package/broccoli-lint-eslint
[travis-badge]: https://img.shields.io/travis/ember-cli/broccoli-lint-eslint/master.svg?label=TravisCI
[travis-badge-url]: https://travis-ci.org/ember-cli/broccoli-lint-eslint
[license-badge]: https://img.shields.io/npm/l/broccoli-lint-eslint.svg
[license-badge-url]: LICENSE.md
[dependencies-badge]: https://david-dm.org/ember-cli/broccoli-lint-eslint/status.svg
[dependencies-badge-url]: https://david-dm.org/ember-cli/broccoli-lint-eslint
[devDependencies-badge]: https://david-dm.org/ember-cli/broccoli-lint-eslint/dev-status.svg
[devDependencies-badge-url]: https://david-dm.org/ember-cli/broccoli-lint-eslint#info=devDependencies
