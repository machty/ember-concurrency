# mdast-html [![Build Status](https://img.shields.io/travis/wooorm/mdast-html.svg)](https://travis-ci.org/wooorm/mdast-html) [![Coverage Status](https://img.shields.io/codecov/c/github/wooorm/mdast-html.svg)](https://codecov.io/github/wooorm/mdast-html)

**mdast-html** compiles markdown to HTML.  Built on [**mdast**](https://github.com/wooorm/mdast),
an extensively tested and pluggable parser.

## Installation

[npm](https://docs.npmjs.com/cli/install):

```bash
npm install mdast-html
```

**mdast-html** is also available for [bower](http://bower.io/#install-packages),
and [duo](http://duojs.org/#getting-started), and as an AMD, CommonJS, and
globals module, [uncompressed](mdast-html.js) and [compressed](mdast-html.min.js).

## Table of Contents

*   [Command line](#command-line)

*   [Programmatic](#programmatic)

    *   [mdast.use(html, options)](#mdastusehtml-options)

*   [Configuration](#configuration)

*   [CommonMark](#commonmark)

*   [Integrations](#integrations)

*   [License](#license)

## Command line

Use **mdast-html** together with **mdast**:

```bash
npm install --global mdast mdast-html
```

Let’s say `example.md` looks as follows:

```md
# Hello & World

**Alpha**, _bravo_, and ~~Charlie~~.
```

Then, run **mdast-html** on `example.md`:

```bash
mdast -u mdast-html example.md -o
```

Yields (check out the newly created `example.html` file):

```html
<h1>Hello &amp; World</h1>
<p><strong>Alpha</strong>, <em>bravo</em>, and <del>Charlie</del>.</p>
```

## Programmatic

### [mdast](https://github.com/wooorm/mdast#api).[use](https://github.com/wooorm/mdast#mdastuseplugin-options)(html, [options](#configuration))

**Parameters**

*   `html` — This plugin;
*   `options` (`Object?`) — See [below](#configuration).

Let’s say `example.js` looks as follows:

```js
var mdast = require('mdast');
var html = require('mdast-html');

var doc = '# Hello & World\n' +
    '\n' +
    '**Alpha**, _bravo_, and ~~Charlie~~.\n';

var result = mdast().use(html).process(doc);

console.log(result);
/*
 * '<h1>Hello &amp; World</h1>\n<p><strong>Alpha</strong>, <em>bravo</em>, and <del>Charlie</del>.</p>'
 */
```

## Configuration

All options, including the `options` object itself, are optional:

*   `entities` (`true`, `'numbers'`, or `'escape'`, default: `true`)
    — How to encode non-ASCII and HTML-escape characters: the default
    generates named entities (`&` > `&amp;`); `'numbers'` generates
    numbered entities (`&` > `&#x26;`), and `'escape'` only encodes
    characters which are required by HTML to be escaped: `&`, `<`, `>`,
    `"`, `'`, and `` ` ``, leaving non-ASCII characters untouched.

*   `xhtml` (`boolean`, default: `false`)
    — Whether or not to terminate self-closing tags (such as `img`) with a
    slash;

*   `sanitize` (`boolean`, default: `false`)
    — Whether or not to allow the use of HTML inside markdown.

These can passed to `mdast.use()` as a second argument, or on the CLI:

```bash
mdast --use 'html=sanitize:false,xhtml:false,entities:"escape"' example.md
```

You can define these in `.mdastrc` or `package.json` [files](https://github.com/wooorm/mdast/blob/master/doc/mdastrc.5.md)
too. An example `.mdastrc` file could look as follows:

```json
{
  "plugins": {
    "html": {
        "sanitize": false,
        "xhtml": false,
        "entities": "numbers"
    }
  },
  "settings": {
    "commonmark": true
  }
}
```

Where the object at `plugins.html` are the options for **mdast-html**.
The object at `settings` determines how **mdast** parses markdown code.
Read more about the latter on [**mdast**’s readme](https://github.com/wooorm/mdast#mdastprocessvalue-options-done).

## CommonMark

> You still need to set `commonmark: true` in
> [**mdast**’s options](https://github.com/wooorm/mdast#mdastprocessvalue-options-done)

[CommonMark](http://commonmark.org) support is a goal but not (yet) a
necessity. There are some (roughly 115 of 550, relating to inline
precedence, lists, emphasis and strongness) issues which I’d like
to cover in the future. Note that this sounds like a lot, but they
have to do with obscure differences which do not often occur in the
real world. Read more on some of the reasoning in
[`doc/commonmark.md`](doc/commonmark.md).

## Integrations

**mdast-html** works great with:

*   [**mdast-toc**](https://github.com/wooorm/mdast-toc), which generates
    tables of contents;

*   [**mdast-github**](https://github.com/wooorm/mdast-github), which generates
    references to GitHub issues, PRs, users, and more;

*   [**mdast-comment-config**](https://github.com/wooorm/mdast-comment-config)
    and [**mdast-yaml-config**](https://github.com/wooorm/mdast-yaml-config),
    which specify how HTML is compiled in the document itself;

*   [**mdast-highlight.js**](https://github.com/ben-eb/mdast-highlight.js) and
    [**mdast-midas**](https://github.com/ben-eb/mdast-midas) which highlight
    code-blocks;

*   [**mdast-autolink-headings**](https://github.com/ben-eb/mdast-autolink-headings),
    which generates GitHub style anchors for each of the headings;

*   ...and [more](https://github.com/wooorm/mdast/blob/master/doc/plugins.md#list-of-plugins).

All [**mdast** nodes](https://github.com/wooorm/mdast/blob/master/doc/mdastnode.7.md)
can be compiled to HTML. Unknown **mdast** nodes are compiled to `div` nodes.

In addition, **mdast-html** can be told how to compile nodes through three
`data` properties:

*   `htmlName` — Tag-name to compile as;
*   `htmlContent` — HTML content to add (instead of `children` and `value`);
*   `htmlAttributes` — Map of attributes to add.

For example, the following node:

```json
{
  "type": "emphasis",
  "data": {
    "htmlName": "i",
    "htmlAttributes": {
      "id": "foo"
    },
    "htmlContent": "bar"
  },
  "children": [{
    "type": "text",
    "value": "baz",
  }]
}
```

...would yield:

```markdown
<i id="foo">bar</i>
```

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)
