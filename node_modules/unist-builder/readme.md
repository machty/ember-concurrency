# unist-builder [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Helper for creating [**unist**][unist] trees with [hyperscript][]-like syntax.

## Installation

[npm][]:

```bash
npm install unist-builder
```

## Usage

```js
var u = require('unist-builder')

var tree = u('root', [
  u('subtree', {id: 1}),
  u('subtree', {id: 2}, [
    u('node', [u('leaf', 'leaf-1'), u('leaf', 'leaf-2')]),
    u('leaf', {id: 3}, 'leaf-3')
  ])
])

console.dir(tree, {depth: null})
```

results in the following tree:

```js
{
  type: 'root',
  children: [
    {type: 'subtree', id: 1},
    {
      type: 'subtree',
      id: 2,
      children: [
        {
          type: 'node',
          children: [
            {type: 'leaf', value: 'leaf-1'},
            {type: 'leaf', value: 'leaf-2'}
          ]
        },
        {type: 'leaf', id: 3, value: 'leaf-3'}
      ]
    }
  ]
}
```

## API

### `u(type[, props][, children|value])`

Creates a node from `props`, `children`, and optionally `value`.

###### Signatures

*   `u(type[, props], children)` — create a [parent][]
*   `u(type[, props], value)` — create a [text][]
*   `u(type[, props])` — create a void node

###### Parameters

*   `type` (`string`) — node [type][]
*   `props` (`Object`) — other values assigned to `node`
*   `children` ([`Array.<Node>`][node]) — children of `node`
*   `value` (`*`) — value of `node` (cast to string)

###### Returns

[`Node`][node].

## Related

*   [`unist-builder-blueprint`](https://github.com/syntax-tree/unist-builder-blueprint)
    — Convert unist trees to `unist-builder` notation
*   [`hastscript`](https://github.com/syntax-tree/hastscript)
    — Create [hast][] elements

## Contribute

See [`contributing.md` in `syntax-tree/unist`][contributing] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © Eugene Sharygin

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/syntax-tree/unist-builder.svg

[travis]: https://travis-ci.org/syntax-tree/unist-builder

[codecov-badge]: https://img.shields.io/codecov/c/github/syntax-tree/unist-builder.svg

[codecov]: https://codecov.io/github/syntax-tree/unist-builder

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[contributing]: https://github.com/syntax-tree/unist/blob/master/contributing.md

[coc]: https://github.com/syntax-tree/unist/blob/master/code-of-conduct.md

[unist]: https://github.com/syntax-tree/unist

[hast]: https://github.com/syntax-tree/hast

[hyperscript]: https://github.com/dominictarr/hyperscript

[node]: https://github.com/syntax-tree/unist#node

[parent]: https://github.com/syntax-tree/unist#parent

[text]: https://github.com/syntax-tree/unist#text

[type]: https://github.com/syntax-tree/unist#type
