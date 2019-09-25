## no-duplicate-attributes

This rule forbids multiple attributes passed to a Component, Helper, or an ElementNode with the same name.

This rule **forbids** the following:

```hbs
{{employee-details name=name age=age name=name}}
```

This rule **allows** the following:

```hbs
{{employee-details name=name age=age}}
```
