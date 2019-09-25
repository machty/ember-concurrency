## Use angle bracket syntax for components

### Rule name: `no-curly-component-invocation`

There are two ways to invoke a component in a template: curly compoment syntax (`{{my-component}}`), and angle bracket syntax (`<MyComponent />`). The difference between them is syntactical. You should favour angle bracket syntax as it improves readability of templates, i.e. disambiguates components from helpers, and is also the future direction Ember is going with the Octane Edition.

#### Bad

```hbs
{{bad-code}}
{{#bad-code}}{{/bad-code}}
{{nested/bad-code}}
{{#nested/bad-code}}{{/nested/bad-code}}
```

#### Good

```hbs
<GoodCode />
<GoodCode></GoodCode>
<Nested::GoodCode />
<Nested::GoodCode></Nested::GoodCode>

{{! whitelisted helpers}}
{{some-valid-helper param}}
{{some/some-valid-helper param}}

{{! in-built helpers}}
{{if someProperty "yay"}}
{{#each items as |item|}}
  {{item}}
{{/each}}
```

## Configuration
### Whitelisting helpers
To be able to differentiate between components and helpers used within curlies, e.g. `{{my-helper}}`, you can add a whitelist of all your known helpers to this rule's configuration. To do this add the following to your `.template-lintrc.js` which enables your rule.

```js
module.exports = {
  rules: {
    'no-curly-component-invocation': {
        allow: [
        'some-random-helper',
        'another-helper',
      ],
    },
  },
};
```

To get a list of of all the helpers in your app run the following code in your browser's Developer Tools Console when your app has loaded:

``` js
var componentLikeHelpers = Object.keys(require.entries)
  .filter(name => name.includes('/helpers/'))
  .map(name => {
    let path = name.split('/helpers/');
    return path.pop();
  })
  .filter(name => !name.includes('/'))
  .uniq();

copy(JSON.stringify(componentLikeHelpers));
```

Hat tip to @lifeart for [this code](https://github.com/lifeart/ember-ast-hot-load#how-to-use-this-addon).

### Blacklisting components without dashes
Since Ember 3.10 components have not required dashes in their name, e.g. `{{datepicker}}`. To help the linter throw an error on these curly component invocations, which it would otherwise have thought to be a helper or property, you can explicitly add it to the `disallow` section of the rule's config. Any curly statements matching an entry in `disallow` will throw a lint error.

```js
module.exports = {
  rules: {
    'no-curly-component-invocation': {
        disallow: [
        'heading',
        'datepicker',
      ],
    },
  },
};
```

To get a list of of all the components in your app which don't have dashes in their name run the following code in your browser's Developer Tools Console when your app has loaded:

``` js
var componentsWithoutDashes = Object.keys(require.entries)
  .filter(name => name.includes('/components/'))
  .filter(name => !name.includes('-'))
  .map(name => {
    let path = name.split('/components/');
    return path.pop();
  })
  .uniq();

copy(JSON.stringify(componentsWithoutDashes));
```

### Matching on components without dashes in their name
Before Ember 3.10 components were required to have at least one dash, `-`, in their name. By default this rule assumes that all components have `-` in their name. If you'd like to change this behaviour to match all curly invocations, even those without dashes then set the `requireDash` option to `false`.

```js
module.exports = {
  rules: {
    'no-curly-component-invocation': {
        requireDash: false,
    },
  },
};
```