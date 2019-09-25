## invocable-blacklist

Disallow certain components or helpers from being used. Use case is you bring in some addon like ember-composable-helpers, but your team deems one or many of the helpers not suitable and wants to guard against their usage.

Given a config of:

```js
'invocable-blacklist': ['foo']
```

This rule **forbids** the following:

```hbs
{{foo}}
```

```hbs
{{#foo}}{{/foo}}
```

### Configuration

  * array of strings - helpers or components to blacklist
