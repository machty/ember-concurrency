# broccoli-sass

The broccoli-sass plugin compiles `.scss` and `.sass` files with
[Dart Sass][] or [LibSass][].

[Dart Sass]: https://sass-lang.com/dart-sass
[LibSass]: https://sass-lang.com/libsass

This is a fork of broccoli-sass that includes support for more options and provides (partial)
support for source maps by embedding the content of the SASS source files in the source map using `sourcesContent`.

Be aware that the paths in the generated source map not correct, but this module does what I need
until the [underlying issue](https://github.com/sass/libsass/issues/908) is resolved.

## Installation

```bash
npm install --save-dev broccoli-sass-source-maps sass
```

## Usage

```js
var compileSass = require('broccoli-sass-source-maps')(require('sass'));

var outputTree = compileSass(inputTrees, inputFile, outputFile, options);
```

Note that when using Dart Sass, **synchronous compilation is twice as fast as
asynchronous compilation** by default, due to the overhead of asynchronous
callbacks. To avoid this overhead, you can use the [`fibers`][] package to call
asynchronous importers from the synchronous code path. To enable this, pass the
`Fiber` class to the `fiber` option:

[`fibers`]: https://www.npmjs.com/package/fibers

```javascript
var compileSass = require('broccoli-sass-source-maps')(require('sass'));
var Fiber = require('fibers');

var outputTree = compileSass(inputTrees, inputFile, outputFile, {fiber: Fiber});
```


* **`inputTrees`**: An array of trees that act as the include paths for
  Sass. If you have a single tree, pass `[tree]`.

* **`inputFile`**: Relative path of the main `.scss` or `.sass` file to compile.
  Broccoli-sass expects to find this file in the *first* input tree
  (`inputTrees[0]`).

* **`outputFile`**: Relative path of the output CSS file.

* **`options`**: An optional hash of options for libsass and caching writer. 
  * Supported Sass options are:
  `functions`, `indentedSyntax`, `omitSourceMapUrl`, `outputStyle`, `precision`,
  `sourceComments`, `sourceMap`, `sourceMapEmbed`, and `sourceMapContents`.
  * Options for caching writer include: `annotation`, `cacheInclude`, and `cacheExclude` (see details [here][bcw-options]).

### Example

```js
var appCss = compileSass(['styles', 'vendor'], 'myapp/app.scss', 'assets/app.css');
```

[bcw-options]: https://github.com/ember-cli/broccoli-caching-writer/tree/979abf92c83af7d625b1fd35c94b4e5f56668b18#new-cachingwriterinputnodes-options

## Choosing the version of Sass

You must specify which version of [Dart Sass][] or [Node Sass][] to use by
passing it as a parameter to the module. Add either `sass` (for Dart Sass) or
`node-sass` to _your_ package.json and then provide that version as a parameter
to the module:

```js
// Uses Dart Sass.
var compileSass = require('broccoli-sass-source-maps')(require('sass'));

// Uses Node Sass.
var compileSass = require('broccoli-sass-source-maps')(require('node-sass'));
```
