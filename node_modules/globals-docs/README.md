# globals-docs

[![build status](https://secure.travis-ci.org/documentationjs/globals-docs.png)](http://travis-ci.org/documentationjs/globals-docs)

Documentation URIs for JavaScript globals.

## `docs`

Docs: an object of documentation as a plain-old-javascript object.

Has keys that correspond to environments:

- builtin
- nonstandard
- browser
- worker
- node





## `getDoc`

Get a URL for a global object.

### Parameters

| name | type | description |
| ---- | ---- | ----------- |
| `name` | `string` | name of the global object |
| `env` | `Array<string>` | environments that will be reached. By default tries all environments |


### Examples

```js
getDoc('Array'); // yields MDC documentation for Array
```

Returns  the URL of the documentation resource, if found
