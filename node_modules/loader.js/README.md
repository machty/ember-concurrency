loader.js [![Build Status](https://travis-ci.org/ember-cli/loader.js.svg?branch=master)](https://travis-ci.org/ember-cli/loader.js)
=========

Minimal AMD loader mostly stolen from [@wycats](https://github.com/wycats).

## No Conflict

To prevent the loader from overriding `require`, `define`, or `requirejs` you can instruct the loader
to use no conflict mode by providing it an alternative name for the various globals that are normally used.

Example:

```js
loader.noConflict({
  define: 'newDefine',
  require: 'newRequire'
});
```

## Extra stuff

### `define.alias('old/path', 'new-name')`

`define.alias` allows creation of a symlink from one module to another, for example:

```js
define('foo', [], () => 'hi');
define.alias('foo', 'foo/bar/baz');

require('foo/bar/baz') // => 'hi';
require('foo') === require('foo/bar/baz');
```

### `require('require')`

When within a module, one can require `require`. This provides a `require` scoped to the current module. Enabling dynamic, relatively path requires.

```js

define('foo/apple', ['require'], function() { return 'apple'; });
define('foo/bar', ['require'], function(require){ return require('./apple'););

require('foo/bar'); // 'apple';
```

This scoped `require` also enables a module some reflection, in this case the ability for a module to see its own `moduleId`;

```js

define('my/name/is', ['require'], function(require) {
  require.moduleId // => 'my/name/is';
});
```

### `define.exports('foo', {})`

`define.exports` enables a fastpath for non-lazy dependency-less modules, for example:

Rather then:

```js
define("my-foo-app/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = Ember.HTMLBars.template({ "id": "VVZNWoRm", "block": "{\"statements\":[[1,[26,[\"welcome-page\"]],false],[0,\"\\n\"],[0,\"\\n\"],[1,[26,[\"outlet\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "my-foo-app/templates/application.hbs" } });
});
```

We can author:

```js
define.exports('my-app/template/apple', { hbs: true, "id": "VVZNWoRm", "block": "{\"statements\":[[1,[26,[\"welcome-page\"]],false],[0,\"\\n\"],[0,\"\\n\"],[1,[26,[\"outlet\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "my-foo-app/templates/application.hbs" }});
```

benefits:

* less bytes
* no reification step
* no need to juggle pre-parse voodoo.

### `require.unsee('foo');`

`require.unsee` allows one to unload a given module. *note* The side-effects of that module cannot be unloaded.
This is quite useful, especially for test suites. Being able to unload run tests, mitigates many common memory leaks:

example:

```js
define('my-app/tests/foo-test.js', ['qunit'], function(qunit) {
  let app;

  qunit.module('my module', {
    beforeEach() {
      app = new App();
    }

    // forgot to `null` out app in the afterEach
  });

  test('my app exists', function(assert) {
    assert.ok(app);
  })
})
```

---

Note: To be able to take advantage of alternate `define` method name, you will also need to ensure that your
build tooling generates using the alternate.  An example of this is done in the [emberjs-build](https://github.com/emberjs/emberjs-build)
project in the [babel-enifed-module-formatter plugin](https://github.com/emberjs/emberjs-build/blob/v0.4.2/lib/utils/babel-enifed-module-formatter.js).

## wrapModules

It is possible to hook loader to augment or transform the loaded code.  `wrapModules` is an optional method on the loader that is called as each module is originally loaded.  `wrapModules` must be a function of the form `wrapModules(name, callback)`. The `callback` is the original AMD callback.  The return value of `wrapModules` is then used in subsequent requests for `name`

This functionality is useful for instrumenting code, for instance in code coverage libraries.

```js
loader.wrapModules = function(name, callback) {
            if (shouldTransform(name) {
                    return myTransformer(name, callback);
                }
            }
            return callback;
    };
```

## makeDefaultExport

loader.js creates default exports for ember-cli `amdStrict` mode. If you do not need this behavior you can disable it like so:

```js
loader.makeDefaultExport = false;
```

## Tests

We use [testem](https://github.com/airportyh/testem) for running our test suite.

You may run them with:
```sh
npm test
```

You can also launch testem development mode with:
```sh
npm run test:dev
```

## License

loader.js is [MIT Licensed](https://github.com/ember-cli/loader.js/blob/master/LICENSE.md).
