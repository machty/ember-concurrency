# broccoli-filter

[![Build Status](https://travis-ci.org/broccolijs/broccoli-filter.svg?branch=master)](https://travis-ci.org/broccolijs/broccoli-filter)
[![Build status](https://ci.appveyor.com/api/projects/status/hc68s0vbn9di4ehi/branch/master?svg=true)](https://ci.appveyor.com/project/joliss/broccoli-filter/branch/master)

Helper base class for Broccoli plugins that map input files into output files
one-to-one.

## API

```js
class Filter {
  /**
   * Abstract base-class for filtering purposes.
   *
   * Enforces that it is invoked on an instance of a class which prototypically
   * inherits from Filter, and which is not itself Filter.
   */
  constructor(inputNode: BroccoliNode, options: FilterOptions): Filter;

  /**
   * Abstract method `processString`: must be implemented on subclasses of
   * Filter.
   *
   * The return value is written as the contents of the output file
   */
  abstract processString(contents: string, relativePath: string): string;

  /**
   * Virtual method `getDestFilePath`: determine whether the source file should
   * be processed, and optionally rename the output file when processing occurs.
   *
   * Return `null` to pass the file through without processing. Return
   * `relativePath` to process the file with `processString`. Return a
   * different path to process the file with `processString` and rename it.
   *
   * By default, if the options passed into the `Filter` constructor contain a
   * property `extensions`, and `targetExtension` is supplied, the first matching
   * extension in the list is replaced with the `targetExtension` option's value.
   */
  virtual getDestFilePath(relativePath: string): string;
}
```

### Options

* `extensions`: An array of file extensions to process, e.g. `['md', 'markdown']`.
* `targetExtension`: The file extension of the corresponding output files, e.g.
  `'html'`.
* `inputEncoding`: The character encoding used for reading input files to be
  processed (default: `'utf8'`). For binary files, pass `null` to receive a
  `Buffer` object in `processString`.
* `outputEncoding`: The character encoding used for writing output files after
  processing (default: `'utf8'`). For binary files, pass `null` and return a
  `Buffer` object from `processString`.
* `name`, `annotation`: Same as
  [broccoli-plugin](https://github.com/broccolijs/broccoli-plugin#new-plugininputnodes-options);
  see there.

All options except `name` and `annotation` can also be set on the prototype
instead of being passed into the constructor.

### Example Usage

```js
var Filter = require('broccoli-filter');

Awk.prototype = Object.create(Filter.prototype);
Awk.prototype.constructor = Awk;
function Awk(inputNode, search, replace, options) {
  options = options || {};
  Filter.call(this, inputNode, {
    annotation: options.annotation
  });
  this.search = search;
  this.replace = replace;
}

Awk.prototype.extensions = ['txt'];
Awk.prototype.targetExtension = 'txt';

Awk.prototype.processString = function(content, relativePath) {
  return content.replace(this.search, this.replace);
};
```

In `Brocfile.js`, use your new `Awk` plugin like so:

```
var node = new Awk('docs', 'ES6', 'ECMAScript 2015');

module.exports = node;
```

## FAQ

### Upgrading from 0.1.x to 1.x

You must now call the base class constructor. For example:

```js
// broccoli-filter 0.1.x:
function MyPlugin(inputTree) {
  this.inputTree = inputTree;
}

// broccoli-filter 1.x:
function MyPlugin(inputNode) {
  Filter.call(this, inputNode);
}
```

Note that "node" is simply new terminology for "tree".

### Source Maps

**Can this help with compilers that are almost 1:1, like a minifier that takes
a `.js` and `.js.map` file and outputs a `.js` and `.js.map` file?**

Not at the moment. We don't know yet how to implement this and still have the
API look beautiful. Such cases complicate the caching logic, as we have to make
sure to rebuild a file if either the `.js` or the `.js.map` file changes.

For now, your best bet is the
[broccoli-multifilter](https://github.com/broccolijs/broccoli-multifilter)
plugin base class.
