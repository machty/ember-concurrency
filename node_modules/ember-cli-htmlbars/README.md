# Ember CLI HTMLBars

[![Build Status](https://travis-ci.org/ember-cli/ember-cli-htmlbars.svg?branch=master)](https://travis-ci.org/ember-cli/ember-cli-htmlbars)
[![Build status](https://ci.appveyor.com/api/projects/status/b5njc8lsjce76mv6/branch/master?svg=true)](https://ci.appveyor.com/project/embercli/ember-cli-htmlbars/branch/master)

### Handlebars 2.0 Support

Handlebars 2.0 support has been removed. If you are using ember-cli-htmlbars with a 1.9.x project please continue
to use ember-cli-htmlbars@0.6.x.

### Using as a Broccoli Plugin

```javascript
var HtmlbarsCompiler = require('ember-cli-htmlbars');

var templateTree = new HtmlbarsCompiler('app/templates', {
  isHTMLBars: true,

  // provide the templateCompiler that is paired with your Ember version
  templateCompiler: require('./bower_components/ember/ember-template-compiler')
});
```

### Registering a Plugin

```javascript
var SomeTransform = require('./some-path/transform');

module.exports = {
  name: 'my-addon-name',

  included: function() {
    // we have to wrap these in an object so the ember-cli
    // registry doesn't try to call `new` on them (new is actually
    // called within htmlbars when compiling a given template).
    this.app.registry.add('htmlbars-ast-plugin', {
      name: 'some-transform',
      plugin: SomeTransform
    });
  }
};
```

#### Options for registering a `htmlbars-ast-plugin`

* `name` - String. The name of the AST transform for debugging purposes.
* `plugin` - A function of type [`ASTPluginBuilder`](https://github.com/glimmerjs/glimmer-vm/blob/master/packages/%40glimmer/syntax/lib/parser/tokenizer-event-handlers.ts#L329-L341).
* `dependencyInvalidation` - Boolean. A flag that indicates the AST Plugin may, on a per-template basis, depend on other files that affect its output.
* `cacheKey` - function that returns any JSON-compatible value - The value returned is used to invalidate the persistent cache across restarts, usually in the case of a dependency or configuration change.
* `baseDir` - `() => string`. A function that returns the directory on disk of the npm module for the plugin. If provided, a basic cache invalidation is performed if any of the dependencies change (e.g. due to a npm install/upgrade).

#### Implementing Dependency Invalidation in an AST Plugin

Plugins that set the `dependencyInvalidation` option to `true` can provide function for the `plugin` of type `ASTDependencyPlugin` as given below.

Note: the `plugin` function is invoked without a value for `this` in context.

```ts
import {ASTPluginBuilder, ASTPlugin} from "@glimmer/syntax/dist/types/lib/parser/tokenizer-event-handlers";

export type ASTDependencyPlugin = ASTPluginWithDepsBuilder | ASTPluginBuilderWithDeps;

export interface ASTPluginWithDepsBuilder {
  (env: ASTPluginEnvironment): ASTPluginWithDeps;
}

export interface ASTPluginBuilderWithDeps extends ASTPluginBuilder {
  /**
   * @see {ASTPluginWithDeps.dependencies} below.
   **/
  dependencies(relativePath): string[];
}

export interface ASTPluginWithDeps extends ASTPlugin {
  /**
   * If this method exists, it is called with the relative path to the current
   * file just before processing starts. Use this method to reset the
   * dependency tracking state associated with the file.
   */
  resetDependencies?(relativePath: string): void;
  /**
   * This method is called just as the template finishes being processed.
   *
   * @param relativePath {string} A relative path to the file that may have dependencies.
   * @return {string[]} paths to files that are a dependency for the given
   * file. Any relative paths returned by this method are taken to be relative
   * to the file that was processed.
   */
  dependencies(relativePath: string): string[];
}
```

### Precompile HTMLBars template strings within other addons

```javascript
module.exports = {
  name: 'my-addon-name',

  setupPreprocessorRegistry: function(type, registry) {
    var htmlbarsPlugin = registry.load('template').find(function(plugin) {
      return plugin.name === 'ember-cli-htmlbars';
    });

    // precompile any htmlbars template string via the precompile method on the
    // ember-cli-htmlbars plugin wrapper; `precompiled` will be a string of the
    // form:
    //
    //   Ember.HTMLBars.template(function() {...})
    //
    var precompiled = htmlbarsPlugin.precompile("{{my-component}}");
  }
};
```
