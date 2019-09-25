[![Build Status](https://travis-ci.org/pzuraq/ember-compatibility-helpers.svg?branch=master)](https://travis-ci.org/pzuraq/ember-compatibility-helpers) [![npm version](https://badge.fury.io/js/ember-compatibility-helpers.svg)](https://badge.fury.io/js/ember-compatibility-helpers)

# ember-compatibility-helpers

Provides flags for features in Ember, allowing you to write code that will work
with whatever version the consuming application is on. This addon is intended
to help addon authors write backwards/forwards compatibility code.

The flags are replaced at build time with boolean literals (`true` or `false`)
by a Babel transform. When ran through a minifier (with dead code elimination) the entire section will be stripped, meaning that the section of code which is not used
will not be added to production builds - zero cost compatibility!

## Installation

```
ember install ember-compatibility-helpers
```

## Available Flags

```js
import {
  // General functions for checking against Ember version
  gte,
  lte,

  // Flags for specific Ember functionality
  HAS_UNDERSCORE_ACTIONS,
  HAS_MODERN_FACTORY_INJECTIONS,

  IS_GLIMMER_2,
  IS_RECORD_DATA,

  SUPPORTS_FACTORY_FOR,
  SUPPORTS_GET_OWNER,
  SUPPORTS_SET_OWNER,
  SUPPORTS_NEW_COMPUTED,
  SUPPORTS_INVERSE_BLOCK,
  SUPPORTS_CLOSURE_ACTIONS,
  SUPPORTS_UNIQ_BY_COMPUTED
} from 'ember-compatibility-helpers';
```

More welcome, open an issue or a PR!

## Example Usage

Function usage:

```js
import Component from '@ember/component';
import { computed } from '@ember/object';

import { gte } from 'ember-compatibility-helpers';

export default Component.extend({
  foo: computed({
    get() {
      return 'bar';
    }
  }),

  baz: computed({
    get() {
      // checks version against ember-source
      if (gte('3.1.0')) {
        return this.foo;
      } else {
        return this.get('foo');
      }
    }
  }),
  
  boo() {
    if (gte('my-addon-name', '3.5')) {
      return {};
    } else {
      return Ember.Object.create({});
    }
  }
});
```

Flag usage:

```javascript
import Component from '@ember/component';
import { computed } from '@ember/object';

import { SUPPORTS_NEW_COMPUTED } from 'ember-compatibility-helpers';

function fooMacro() {
  if (SUPPORTS_NEW_COMPUTED) {
    return computed({
      get() {
        return this.get('foo');
      },

      set(key, value) {
        this.set('foo', value);
        return value
      }
    });
  } else {
    return computed(function(key, value) {
      if (arguments.length === 2) {
        this.set('foo', value);
        return value;
      }

      return this.get('foo');
    })
  }
}

export default Component.extend({
  bar: fooMacro()
});
```

## Development

* `git clone <repository-url>` this repository
* `cd ember-compatibility-helpers`
* `yarn`

## Running Tests

* `npm test`
