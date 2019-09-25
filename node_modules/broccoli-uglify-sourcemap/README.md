[![Build Status](https://travis-ci.org/ember-cli/broccoli-uglify-sourcemap.svg?branch=master)](https://travis-ci.org/ember-cli/broccoli-uglify-sourcemap)

A broccoli filter that applies uglify-js while properly generating or
maintaining sourcemaps.

### installation

```sh
npm install --save broccoli-uglify-sourcemap
```

### usage

```js
var uglify = require('broccoli-uglify-sourcemap');

// basic usage
var uglified = uglify(input);

// advanced usage
var uglified = uglify(input, {
  exclude: [..], // array of globs, to not minify

  uglify: {
    mangle: false,    // defaults to true
    compress: false,  // defaults to true
    sourceMap: false, // defaults to true
    //...
  },

  async: true,   // run uglify in parallel, defaults to false
  concurrency: 3 // number of parallel workers, defaults to number of CPUs - 1
});
```

To disable parallelization:

```
$ JOBS=0
$ JOBS=1
```
