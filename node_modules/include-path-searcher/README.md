# include-path-searcher

[![Build Status](https://travis-ci.org/joliss/include-path-searcher.png?branch=master)](https://travis-ci.org/joliss/include-path-searcher)

Utility functions for searching multiple include paths.

## Installation

```bash
npm install --save include-path-searcher
```

## Usage

```js
var includePathSearcher = require('include-path-searcher')
```

### findFileSync

```js
includePathSearcher.findFileSync(relativePath, includePaths) // => fullPath
```

Searches for the file identified by `relativePath` in any of the given
directories (`includePaths`). Returns the full path of the first file found,
or throws an error if none found. For example:

```js
includePathSearcher.findFileSync('foo.txt', ['dir1', 'dir2'])
```

This returns either `'dir1/foo.txt'` or `'dir2/foo.txt'`. If `foo.txt` does
not exist in either directory, it throws an error.
