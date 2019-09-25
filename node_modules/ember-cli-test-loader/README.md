## Ember CLI Test Loader

Defines a `TestLoader` object that reviews all of the modules in
`requirejs.entries` and loads those identified as tests.

`TestLoader.prototype.shouldLoadModule` can be overridden in order to customize
the criteria for identifying test modules.

### Usage

Within tests/test-helper.js:

```javascript
  import TestLoader from 'ember-cli-test-loader/test-support';

  // optionally override TestLoader.prototype.shouldLoadModule

  TestLoader.load();
```

#
#
#
#
---
_**Note:** 1.0.0 will move to package.json from bower.json, but that is not enabled yet. The default ember-cli blueprint specifies 0.2.2 which should definitely not allow 1.0.0. - [[Link](https://github.com/ember-cli/ember-cli-test-loader/issues/19)]_