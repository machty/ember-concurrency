ember-data-rfc395-data
==============================================================================

JSON data for [RFC #395](https://github.com/emberjs/rfcs/blob/master/text/0395-ember-data-packages.md)

### Related Projects

- [babel-plugin-ember-modules-api-polyfill](https://github.com/ember-cli/babel-plugin-ember-modules-api-polyfill)
- [ember-modules-codemod](https://github.com/ember-cli/ember-modules-codemod)
- [ember-rfc176-data](https://github.com/ember-cli/ember-rfc176-data) for inspiration

## Contents

### Globals to New Modules 

| Before                    | After                                                                 |
| ---                       | ---                                                                   |
| `DS.AbortError`           | `import { AbortError } from '@ember-data/adapter/error';`             |
| `DS.Adapter`              | `import Adapter from '@ember-data/adapter';`                          |
| `DS.AdapterError`         | `import AdapterError from '@ember-data/adapter/error';`               |
| `DS.attr`                 | `import { attr } from '@ember-data/model';`                           |
| `DS.belongsTo`            | `import { belongsTo } from '@ember-data/model';`                      |
| `DS.BuildURLMixin`        | `import { BuildURLMixin } from '@ember-data/adapter';`                |
| `DS.ConflictError`        | `import { ConflictError } from '@ember-data/adapter/error';`          |
| `DS.EmbeddedRecordsMixin` | `import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';` |
| `DS.errorsArrayToHash`    | `import { errorsArrayToHash } from '@ember-data/adapter/error';`      |
| `DS.errorsHashToArray`    | `import { errorsHashToArray } from '@ember-data/adapter/error';`      |
| `DS.ForbiddenError`       | `import { ForbiddenError } from '@ember-data/adapter/error';`         |
| `DS.hasMany`              | `import { hasMany } from '@ember-data/model';`                        |
| `DS.InvalidError`         | `import { InvalidError } from '@ember-data/adapter/error';`           |
| `DS.JSONAPIAdapter`       | `import JSONAPIAdapter from '@ember-data/adapter/json-api';`          |
| `DS.JSONAPISerializer`    | `import JSONAPISerializer from '@ember-data/serializer/json-api';`    |
| `DS.JSONSerializer`       | `import JSONSerializer from '@ember-data/serializer/json';`           |
| `DS.Model`                | `import Model from '@ember-data/model';`                              |
| `DS.normalizeModelName`   | `import { normalizeModelName } from '@ember-data/store';`             |
| `DS.NotFoundError`        | `import { NotFoundError } from '@ember-data/adapter/error';`          |
| `DS.RecordData`           | `import RecordData from '@ember-data/record-data';`                   |
| `DS.RESTAdapter`          | `import RESTAdapter from '@ember-data/adapter/rest';`                 |
| `DS.RESTSerializer`       | `import RESTSerializer from '@ember-data/serializer/rest';`           |
| `DS.Serializer`           | `import Serializer from '@ember-data/serializer';`                    |
| `DS.ServerError`          | `import { ServerError } from '@ember-data/adapter/error';`            |
| `DS.Store`                | `import Store from '@ember-data/store';`                              |
| `DS.TimeoutError`         | `import { TimeoutError } from '@ember-data/adapter/error';`           |
| `DS.Transform`            | `import Transform from '@ember-data/serializer/transform';`           |
| `DS.UnauthorizedError`    | `import { UnauthorizedError } from '@ember-data/adapter/error';`      |


### New Modules to Globals

#### `@ember-data/adapter`
| Module                                                           | Global                 |
| ---                                                              | ---                    |
| `import Adapter from '@ember-data/adapter';`                     | `DS.Adapter`           |
| `import { BuildURLMixin } from '@ember-data/adapter';`           | `DS.BuildURLMixin`     |
| `import { AbortError } from '@ember-data/adapter/error';`        | `DS.AbortError`        |
| `import AdapterError from '@ember-data/adapter/error';`          | `DS.AdapterError`      |
| `import { ConflictError } from '@ember-data/adapter/error';`     | `DS.ConflictError`     |
| `import { ForbiddenError } from '@ember-data/adapter/error';`    | `DS.ForbiddenError`    |
| `import { InvalidError } from '@ember-data/adapter/error';`      | `DS.InvalidError`      |
| `import { NotFoundError } from '@ember-data/adapter/error';`     | `DS.NotFoundError`     |
| `import { ServerError } from '@ember-data/adapter/error';`       | `DS.ServerError`       |
| `import { TimeoutError } from '@ember-data/adapter/error';`      | `DS.TimeoutError`      |
| `import { UnauthorizedError } from '@ember-data/adapter/error';` | `DS.UnauthorizedError` |
| `import { errorsArrayToHash } from '@ember-data/adapter/error';` | `DS.errorsArrayToHash` |
| `import { errorsHashToArray } from '@ember-data/adapter/error';` | `DS.errorsHashToArray` |
| `import JSONAPIAdapter from '@ember-data/adapter/json-api';`     | `DS.JSONAPIAdapter`    |
| `import RESTAdapter from '@ember-data/adapter/rest';`            | `DS.RESTAdapter`       |

#### `@ember-data/model`
| Module                                           | Global         |
| ---                                              | ---            |
| `import { attr } from '@ember-data/model';`      | `DS.attr`      |
| `import Model from '@ember-data/model';`         | `DS.Model`     |
| `import { belongsTo } from '@ember-data/model';` | `DS.belongsTo` |
| `import { hasMany } from '@ember-data/model';`   | `DS.hasMany`   |

#### `@ember-data/record-data`
| Module                                              | Global          |
| ---                                                 | ---             |
| `import RecordData from '@ember-data/record-data';` | `DS.RecordData` |

#### `@ember-data/serializer`
| Module                                                                | Global                    |
| ---                                                                   | ---                       |
| `import Serializer from '@ember-data/serializer';`                    | `DS.Serializer`           |
| `import JSONSerializer from '@ember-data/serializer/json';`           | `DS.JSONSerializer`       |
| `import JSONAPISerializer from '@ember-data/serializer/json-api';`    | `DS.JSONAPISerializer`    |
| `import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';` | `DS.EmbeddedRecordsMixin` |
| `import RESTSerializer from '@ember-data/serializer/rest';`           | `DS.RESTSerializer`       |
| `import Transform from '@ember-data/serializer/transform';`           | `DS.Transform`            |

#### `@ember-data/store`
| Module                                                    | Global                  |
| ---                                                       | ---                     |
| `import Store from '@ember-data/store';`                  | `DS.Store`              |
| `import { normalizeModelName } from '@ember-data/store';` | `DS.normalizeModelName` |


### Scripts

The tables above can be generated using the scripts in the `scripts` folder, e.g.:

```
node scripts/generate-markdown-table.js
```


## Contributing

### mappings.json format

The `mappings.json` file contains an array of entries with the following format:

```ts
interface Mapping {
  /**
    The globals based API that this module and export replace.
   */
  global: string;

  /**
    The module to import.
   */
  module: string;

  /**
    The export name from the module.
   */
  export: string;

  /**
    The recommended `localName` to use for a given module/export. Only present
    when a name other than the value for `export` should be used.

    This is useful for things like ember-data-codemod or eslint-plugin-ember
    so that they can provide a nice suggested import for a given global path usage.
   */
  localName?: string;

  /**
    A replacement module/export which should be used instead.
  */
  replacement?: {
    module: string;
    export: string;
  }
}
```
