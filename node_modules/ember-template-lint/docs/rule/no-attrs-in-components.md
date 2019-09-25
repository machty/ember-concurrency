## no-attrs-in-components

This rule prevents the usage of `attrs` property to access values passed to the component since all the values can be accessed directly from the template.

This rule **forbids** the following:

```hbs
{{attr.foo}}
```
This rule **allows** the following:

```hbs
{{foo}}
```

or if you using Ember 3.1 and above:

```hbs
{{@foo}}
```
