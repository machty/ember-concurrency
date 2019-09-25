## Plugin Support

You can customize the linter with rules that are more specific to your use case with the `ember-template-lint` plugin system.

Plugins can define new rules and set up default configurations that can be extended.

### Defining plugin objects

Each plugin object can include these properties.

* `name` -- `string` (required)

  The name of the plugin. Will be used to namespace any configuration objects.

* `rules` -- `Object`

  Object that defines new rules.
  Each key represents the name of the rule that is defined.
  Each value should be a Rule object. See [Rule APIs](#rule-apis) for more detail.

* `configurations` -- `Object`

  Object that defines new configurations that can be extended.
  Each key represents the name of the configuration object.
  Each value should be a configuration object, that can include the [same properties as the base config object](../README.md#configuration-keys) in any `.template-lintrc.js` -- i.e. `rules`, `extends`, `ignore`, etc.

Sample plugin object:

```javascript
{
  // Name of plugin
  name: 'my-plugin',

  // Define rules for this plugin. Each path should map to a plugin rule
  rules: {
    'disallow-inline-components': require('./lib/template-lint-rules/disallow-inline-components'),
    'another-custom-rule': require('.lib/template-lint-rules/another-custom-rule')
  },

  // Define configurations for this plugin that can be extended by the base configuration
  configurations: {
    'no-inline': {
      rules: {
        'disallow-inline-components': true
      }
    }
  }
}
```

### Adding Plugins to Your Configuration

In order to enable a plugin, you must add it to the `plugins` key in your configuration file.

`plugins` accepts an array of either plugin objects or strings to be passed to `require` which resolve to plugin objects.

```javascript
// .template-lintrc.js

module.exports = {
  plugins: [

    // Define a plugin inline
    {
      name: 'inline-plugin',

      ...
    },

    // Define a plugin that is exported elsewhere (i.e. a third-party plugin)
    './plugins/some-local-plugin',
    'some-npm-package/third-party-plugin',
  ],

  extends: [
    // Extend configuration defined in inline plugins
    'configuration-defined-in-my-inline-plugin',

    // Extend configuration defined in plugins in other files
    'some-local-plugin:recommended',
    'third-party-plugin:another-configuration'
  ],

  rules: {
    // Use rules defined in plugins
    'rule-defined-in-my-inline-plugin': true
    'rule-defined-in-some-local-plugin': true
  }
}
```

### Rule APIs

Every rule defined by a plugin can use these public APIs defined by `ember-template-lint`.

#### Building a rule object

Each file that defines a rule should export a class that extends from the base rule object.

Sample rule:

```javascript
'use strict';

const Rule = require('ember-template-lint').Rule;

module.exports = class NoEmptyComments extends Rule {
  visitor() {
    return {
      CommentStatement(node) {
        if (node.value.trim() === '') {
          this.log({
            message: 'comments cannot be empty',
            line: node.loc && node.loc.start.line,
            column: node.loc && node.loc.start.column,
            source: this.sourceForNode(node)
          });
        }
      }
    };
  }
};
```

You can override the following methods on the base plugin class:

* `function visitor(): visitorObject`

  The `visitor` function should return an object that maps Handlebars node types to functions. Whenever the Handlebars parser encounters a particular type of node, any handler function that you define for that node will be called on it. You can reference the [Handlebars Compiler API](https://github.com/wycats/handlebars.js/blob/master/docs/compiler-api.md) for more detail on the types of nodes and their interfaces.

The base rule also has a few helper functions that can be useful in defining rule behavior:

* `function log(options)`

  Report a lint error. The `log` function accepts an Object as its only argument, which can contain the following parameters:
    - `message` -- `string`
      The error message to display.
    - `line` -- `number`
      The line number of the error in the source string.
    - `column` -- `number`
      The column number of the error in the source string.
    - `source` -- `string`
      The source string that caused the error.
    - `fix` -- `string`
      An optional string to display with the recommended fix.

* `function sourceForNode(node): string`

  Given a Handlebars AST node, return the string source of that node. Useful to generate `source` when logging errors with `log`.

* `function isLocal(ASTNode): boolean`

  Given an AST node, check if it is derived from a local / block param.

#### AST Node Helpers

There are a number of helper functions exported by [`ember-template-lint`](../lib/helpers/ast-node-info.js) that can be used with AST nodes in your rule's visitor handlers.

You can access these helpers via:

```js
const helpers = require('ember-template-lint').ASTHelpers;
```

* `function isConfigurationHtmlComment(node): boolean`

  Returns true if this node is an HTML comment that is meant to set linter configuration (i.e. `<!-- template-lint enabled=false -->`).

* `function isNonConfigurationHtmlComment(node): boolean`

  Returns true if this node is *not* an HTML comment that is meant to set linter configuration.

* `function isTextNode(node): boolean`

  Returns true if this node is a `TextNode` node.

* `function isCommentStatement(node): boolean`

  Returns true if this node is a `CommentStatement` node.

* `function isMustacheCommentStatement(node): boolean`

  Returns true if this node is a `MustacheCommentStatement` node.

* `function isElementNode(node): boolean`

  Returns true if this node is an `ElementNode` node.

* `function isComponentNode(node): boolean`

  Returns true if this node is a `ComponentNode` node.

* `function isMustacheStatement(node): boolean`

  Returns true if this node is a `MustacheStatement` node.

* `function isBlockStatement(node): boolean`

  Returns true if this node is a `BlockStatement` node.

* `function hasAttribute(node, attributeName): boolean`

  Returns true if this node has an attribute whose name matches `attributeName`.

* `function findAttribute(node, attributeName): Object`

  Returns any attributes on the node with a name that matches `attributeName`.

* `function isImgElement(node): boolean`

  Returns true if this node is an `img` element.

* `function isLinkElement(node): boolean`

  Returns true if this node is a link (`a`) element.

* `function childrenFor(node): Object[]`

  Returns any child nodes of this node.

* `function hasChildren(node): boolean`

  Returns true if this node has any child nodes.
