## no-unbound

`{{unbound}}` is a legacy hold over from the days in which Ember's template engine was less performant. Its use today
is vestigial, and it no longer offers performance benefits.

It is also a poor practice to use it for rendering only the initial value of a property that may later change. 

This rule **forbids** the following:

```hbs
{{unbound aVar}}
```

```hbs
{{some-component foo=(unbound aVar)}}
```
